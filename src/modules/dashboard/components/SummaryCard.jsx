import Card from '../../../components/ui/Card'

function SummaryCard({
  title,
  amount,
  description,
  icon: Icon,
  variant = 'default',
}) {
  const amountColors = {
    default: 'text-primary-700',
    income: 'text-success',
    expense: 'text-danger',
  }

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">
            {title}
          </p>

          <p className={`mt-3 text-2xl font-bold ${amountColors[variant]}`}>
            {amount}
          </p>

          {description && (
            <p className="mt-2 text-xs text-neutral-500">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className="rounded-xl bg-primary-50 p-3 text-primary-600">
            <Icon size={21} />
          </div>
        )}
      </div>
    </Card>
  )
}

export default SummaryCard