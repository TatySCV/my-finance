
function Checkbox({
  label,
  name,
  checked = false,
  onChange,
  disabled = false,
  error,
  className = '',
}) {
  return (
    <div className={className}>
      <label className="inline-flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="
            h-4 w-4 rounded border-neutral-300
            accent-primary-600
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-primary-500
            disabled:cursor-not-allowed
          "
        />

        {label && (
          <span className={`text-sm ${disabled ? 'text-neutral-400' : 'text-neutral-700'}`}>
            {label}
          </span>
        )}
      </label>

      {error && (
        <p className="mt-1 text-xs text-danger">{error}</p>
      )}
    </div>
  )
}

export default Checkbox
