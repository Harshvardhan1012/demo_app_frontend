import { nanoid } from "nanoid"

const STORAGE_KEY = "expense_idempotency_key"

export function getOrCreateIdempotencyKey(): string {
  const stored = sessionStorage.getItem(STORAGE_KEY)
  if (stored) return stored
  const key = nanoid()
  sessionStorage.setItem(STORAGE_KEY, key)
  return key
}

export function rotateIdempotencyKey(): string {
  const key = nanoid()
  sessionStorage.setItem(STORAGE_KEY, key)
  return key
}
