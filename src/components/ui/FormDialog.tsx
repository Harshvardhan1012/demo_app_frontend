import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Expand, Shrink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './button'

interface FormDialogProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  defaultSize?: 'full' | 'default' // Size mode: full screen or default
  fullScreen?: boolean // Enable fullscreen toggle button
}

export function FormDialog({
  open,
  onClose,
  title,
  description,
  children,
  defaultSize = 'default',
  fullScreen = false,
}: FormDialogProps) {
  const [isFullScreen, setIsFullScreen] = useState(defaultSize === 'full')

  // Update fullscreen state when defaultSize changes
  useEffect(() => {
    setIsFullScreen(defaultSize === 'full')
  }, [defaultSize])

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}>
      <DialogContent
        className={cn(
          'overflow-y-auto flex flex-col',
          isFullScreen ? 'h-screen sm:max-w-full' : 'max-h-[90vh]'
        )}>
        <DialogHeader className="flex items-start justify-start p-0 gap-0">
          <div className="gap-4">
            <DialogTitle className="text-2xl">{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
            {fullScreen && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullScreen}
                className="shrink-0"
                type="button">
                {isFullScreen ? (
                  <Shrink className="h-4 w-4" />
                ) : (
                  <Expand className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </DialogHeader>
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
