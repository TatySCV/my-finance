
const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
  secondary:
    'bg-primary-50 text-primary-700 hover:bg-primary-100 focus-visible:ring-primary-500',
  outline:
    'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 focus-visible:ring-primary-500',
  ghost:
    'text-neutral-600 hover:bg-neutral-100 focus-visible:ring-primary-500',
  danger:
    'bg-danger text-white hover:bg-red-700 focus-visible:ring-red-500',
}

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-semibold
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant] ?? variants.primary}
        ${sizes[size] ?? sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button
