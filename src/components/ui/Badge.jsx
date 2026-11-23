
const variants = {
  primary: 'bg-primary-50 text-primary-700',
  success: 'bg-green-50 text-green-700',
  danger: 'bg-red-50 text-red-700',
  warning: 'bg-amber-50 text-amber-700',
  neutral: 'bg-neutral-100 text-neutral-600',
}

function Badge({
  children,
  variant = 'neutral',
  className = '',
}) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full
        px-2.5 py-1 text-xs font-semibold
        ${variants[variant] ?? variants.neutral}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge
