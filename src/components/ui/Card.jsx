
function Card({
  children,
  title,
  description,
  action,
  padding = 'p-5',
  className = '',
}) {
  return (
    <section
      className={`
        rounded-2xl border border-neutral-200
        bg-white shadow-sm
        ${padding}
        ${className}
      `}
    >
      {(title || description || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="font-semibold text-neutral-900">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-neutral-500">
                {description}
              </p>
            )}
          </div>

          {action}
        </div>
      )}

      {children}
    </section>
  )
}

export default Card
