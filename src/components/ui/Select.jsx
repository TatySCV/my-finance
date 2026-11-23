
function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Seleccionar...',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
}) {
  const selectId = name || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-neutral-700"
        >
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        className={`
          w-full rounded-xl border bg-white px-4 py-3
          text-sm text-neutral-900 outline-none transition
          focus:ring-2 focus:ring-primary-100
          disabled:cursor-not-allowed disabled:bg-neutral-100
          ${error
            ? 'border-danger focus:border-danger'
            : 'border-neutral-200 focus:border-primary-500'}
        `}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="text-xs text-danger">{error}</span>}

      {!error && helperText && (
        <span className="text-xs text-neutral-500">{helperText}</span>
      )}
    </div>
  )
}

export default Select
