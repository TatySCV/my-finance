
function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) {
  const variants = {
    ghost: 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
    primary: 'bg-primary-50 text-primary-700 hover:bg-primary-100',
    danger: 'text-danger hover:bg-red-50',
  }

  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex shrink-0 items-center justify-center
        rounded-xl transition-colors
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-primary-500 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant] ?? variants.ghost}
        ${sizes[size] ?? sizes.md}
        ${className}
      `}
    >
      {Icon && <Icon size={18} aria-hidden="true" />}
    </button>
  )
}

export default IconButton
