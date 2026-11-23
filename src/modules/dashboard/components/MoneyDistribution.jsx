
import Card from '../../../components/ui/Card'

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function MoneyDistribution({ allocations }) {
  const total =
    allocations.unassigned +
    allocations.reserved +
    allocations.savings

  const items = [
    {
      label: 'Sin asignar',
      amount: allocations.unassigned,
      color: 'bg-primary-500',
    },
    {
      label: 'Reservado',
      amount: allocations.reserved,
      color: 'bg-violet-300',
    },
    {
      label: 'Ahorros',
      amount: allocations.savings,
      color: 'bg-emerald-500',
    },
  ]

  return (
    <Card
      title="Distribución de tu dinero"
      description="Cómo está organizado el saldo de tus cuentas"
    >
      <div className="flex h-3 overflow-hidden rounded-full bg-neutral-100">
        {items.map((item) => (
          <div
            key={item.label}
            className={item.color}
            style={{
              width: `${total > 0 ? (item.amount / total) * 100 : 0}%`,
            }}
          />
        ))}
      </div>

      <div className="mt-5 space-y-5">
        {items.map((item) => {
          const percentage = total > 0
            ? (item.amount / total) * 100
            : 0

          return (
            <div key={item.label}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${item.color}`} />

                  <span className="text-sm text-neutral-600">
                    {item.label}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-900">
                    {formatCurrency(item.amount)}
                  </p>

                  <p className="text-xs text-neutral-500">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default MoneyDistribution
