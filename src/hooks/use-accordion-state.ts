import { useCallback, useEffect, useState } from "react"

/**
 * Custom hook to manage accordion state with localStorage persistence
 * @param storagePrefix - Prefix for localStorage keys
 * @param initialValue - Initial expanded items (if no localStorage data)
 */
export function useAccordionState(
  storagePrefix: string,
  initialValue: string[] = []
) {
  const [expandedItems, setExpandedItems] = useState<string[]>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    const storageKey = `${storagePrefix}-expanded`
    const savedState = localStorage.getItem(storageKey)

    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        setExpandedItems(parsedState)
      } catch {
        console.error("Failed to parse accordion state from localStorage")
      }
    }
    setIsLoaded(true)
  }, [storagePrefix])

  // Handle accordion value change
  const handleValueChange = useCallback(
    (values: string[]) => {
      setExpandedItems(values)
      // Save to localStorage
      const storageKey = `${storagePrefix}-expanded`
      localStorage.setItem(storageKey, JSON.stringify(values))
    },
    [storagePrefix]
  )

  // Toggle single item
  const toggleItem = useCallback(
    (itemId: string) => {
      setExpandedItems((prev) => {
        const newItems = prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]

        const storageKey = `${storagePrefix}-expanded`
        localStorage.setItem(storageKey, JSON.stringify(newItems))
        return newItems
      })
    },
    [storagePrefix]
  )

  // Expand all
  const expandAll = useCallback(
    (allItemIds: string[]) => {
      setExpandedItems(allItemIds)
      const storageKey = `${storagePrefix}-expanded`
      localStorage.setItem(storageKey, JSON.stringify(allItemIds))
    },
    [storagePrefix]
  )

  // Collapse all
  const collapseAll = useCallback(() => {
    setExpandedItems([])
    const storageKey = `${storagePrefix}-expanded`
    localStorage.setItem(storageKey, JSON.stringify([]))
  }, [storagePrefix])

  return {
    expandedItems,
    handleValueChange,
    toggleItem,
    expandAll,
    collapseAll,
    isLoaded,
  }
}
