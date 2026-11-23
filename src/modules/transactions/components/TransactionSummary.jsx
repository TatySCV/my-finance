
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

import Card from '../../../components/ui/Card'
import { formatCurrency } from '../utils/transactionUtils'

const summaryCards = [
  {
    key: 'income',
    title: 'Ingresos',
    description: 'Ingresos confirmados del período',
    icon: TrendingUp,
    color: 'text-success',
    iconBackground: 'bg-green-50',
  },
  {
    key: 'expenses',
    title: 'Gastos',
    description: 'Gastos confirmados del período',
    icon: TrendingDown,
    color: 'text-danger',
    iconBackground: 'bg-red-50',
  },
  {
    key: 'balance',
    title: 'Balance',
    description: 'Ingresos menos gastos',
    icon: Wallet,
    color: 'text-primary-700',
    iconBackground: 'bg-primary-50',
  },
]

function TransactionSummary({ summary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {summaryCards.map((item) => {
        const Icon = item.icon

        return (
          <Card key={item.key}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral-500">
                  {item.title}
                </p>

                <p className={`mt-3 text-2xl font-bold ${item.color}`}>
                  {formatCurrency(summary[item.key])}
                </p>

                <p className="mt-2 text-xs text-neutral-500">
                  {item.description}
                </p>
              </div>

              <div className={`rounded-xl p-3 ${item.iconBackground}`}>
                <Icon size={22} className={item.color} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default TransactionSummary
