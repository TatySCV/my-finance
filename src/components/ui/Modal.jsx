
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
}) {
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`w-full ${sizes[size] || sizes.md} max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl`}
      >
        <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
          <div>
            <h2
              id="modal-title"
              className="text-lg font-bold text-neutral-900"
            >
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-neutral-500">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
