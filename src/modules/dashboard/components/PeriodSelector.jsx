function PeriodSelector({ value, onChange }) {
  const options = Array.from({ length: 12 }, (_, index) => {
    const date = new Date()
    date.setDate(1)
    date.setMonth(date.getMonth() - index)

    const period = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
    ].join('-')

    const label = new Intl.DateTimeFormat('es-CL', {
      month: 'long',
      year: 'numeric',
    }).format(date)

    return { value: period, label }
  })

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="dashboard-period"
        className="text-sm font-medium text-neutral-600"
      >
        Período
      </label>

      <select
        id="dashboard-period"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PeriodSelector