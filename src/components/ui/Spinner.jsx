
function Spinner({
  size = 'md',
  color = 'primary',
  label = 'Cargando...',
}) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-[3px]',
  }

  const colors = {
    primary: 'border-primary-200 border-t-primary-600',
    white: 'border-white/30 border-t-white',
    neutral: 'border-neutral-200 border-t-neutral-600',
  }

  return (
    <span
      role="status"
      aria-label={label}
      className={`
        inline-block animate-spin rounded-full
        ${sizes[size] ?? sizes.md}
        ${colors[color] ?? colors.primary}
      `}
    >
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default Spinner
