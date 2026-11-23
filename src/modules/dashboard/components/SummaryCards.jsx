import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'

import SummaryCard from './SummaryCard'

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function SummaryCards({
  totalBalance,
  totalIncome,
  totalExpenses,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <SummaryCard
        title="Saldo total"
        amount={formatCurrency(totalBalance)}
        description="Saldo actual de todas tus cuentas"
        icon={Wallet}
      />

      <SummaryCard
        title="Ingresos del mes"
        amount={formatCurrency(totalIncome)}
        description="Ingresos del período seleccionado"
        icon={TrendingUp}
        variant="income"
      />

      <SummaryCard
        title="Gastos del mes"
        amount={formatCurrency(totalExpenses)}
        description="Gastos del período seleccionado"
        icon={TrendingDown}
        variant="expense"
      />
    </div>
  )
}

export default SummaryCards