
function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
}) {
  const textareaId = name || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-neutral-700"
        >
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        className={`
          w-full resize-y rounded-xl border bg-white
          px-4 py-3 text-sm text-neutral-900
          placeholder:text-neutral-400 outline-none transition
          focus:ring-2 focus:ring-primary-100
          disabled:cursor-not-allowed disabled:bg-neutral-100
          ${error
            ? 'border-danger focus:border-danger'
            : 'border-neutral-200 focus:border-primary-500'}
        `}
      />

      {error && <span className="text-xs text-danger">{error}</span>}

      {!error && helperText && (
        <span className="text-xs text-neutral-500">{helperText}</span>
      )}
    </div>
  )
}

export default Textarea
