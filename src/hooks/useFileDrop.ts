import { useCallback, useEffect, useRef, useState } from 'react'

import type { TranslationKey } from '@/i18n/en'

const MAX_BYTES = 10 * 1024 * 1024

export type SelectedFile = {
  file: File
  previewUrl: string
}

/** Drag-and-drop + file-picker state for the upload zone, with type/size validation. */
export function useFileDrop() {
  const [isDragging, setIsDragging] = useState(false)
  const [selected, setSelected] = useState<SelectedFile | null>(null)
  // A key rather than a message, so the error re-renders in the active language.
  const [errorKey, setErrorKey] = useState<TranslationKey | null>(null)

  // Revoke the outstanding object URL when the page unmounts.
  const previewUrlRef = useRef<string | null>(null)
  useEffect(() => {
    previewUrlRef.current = selected?.previewUrl ?? null
  }, [selected])
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    }
  }, [])

  const acceptFile = useCallback((file: File | undefined) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErrorKey('upload.errorType')
      return
    }
    if (file.size > MAX_BYTES) {
      setErrorKey('upload.errorSize')
      return
    }

    setErrorKey(null)
    setSelected((previous) => {
      if (previous) URL.revokeObjectURL(previous.previewUrl)
      return { file, previewUrl: URL.createObjectURL(file) }
    })
  }, [])

  const clear = useCallback(() => {
    setSelected((previous) => {
      if (previous) URL.revokeObjectURL(previous.previewUrl)
      return null
    })
    setErrorKey(null)
  }, [])

  const dropHandlers = {
    onDragEnter: (event: React.DragEvent) => {
      event.preventDefault()
      setIsDragging(true)
    },
    onDragOver: (event: React.DragEvent) => {
      event.preventDefault()
      setIsDragging(true)
    },
    onDragLeave: (event: React.DragEvent) => {
      event.preventDefault()
      setIsDragging(false)
    },
    onDrop: (event: React.DragEvent) => {
      event.preventDefault()
      setIsDragging(false)
      acceptFile(event.dataTransfer.files[0])
    },
  }

  return { isDragging, selected, errorKey, acceptFile, clear, dropHandlers }
}
