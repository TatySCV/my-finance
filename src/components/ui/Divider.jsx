
function Divider({
  orientation = 'horizontal',
  className = '',
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`
        shrink-0 bg-neutral-200
        ${orientation === 'vertical'
          ? 'h-full w-px'
          : 'h-px w-full'}
        ${className}
      `}
    />
  )
}

export default Divider
