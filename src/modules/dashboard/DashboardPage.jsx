import { useState } from 'react'

import PeriodSelector from './components/PeriodSelector'
import SummaryCards from './components/SummaryCards'
import MoneyDistribution from './components/MoneyDistribution'
import IncomeExpenseChart from './components/IncomeExpenseChart'
import RecentTransactions from './components/RecentTransactions'

import useDashboardData from './hooks/useDashboardData'

function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState(() => {
    const now = new Date()

    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
    ].join('-')
  })

  const {
    totalBalance,
    totalIncome,
    totalExpenses,
    recentTransactions,
    monthlyTransactions,
    allocations,
  } = useDashboardData(selectedPeriod)

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Encabezado */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            ¡Bienvenida a My Finance!
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Aquí tienes un resumen de tus finanzas personales.
          </p>
        </div>

        <PeriodSelector
          value={selectedPeriod}
          onChange={setSelectedPeriod}
        />
      </div>

      {/* Resumen financiero */}
      <SummaryCards
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
      />

      {/* Distribución y gráfico */}
      <div className="grid gap-6 xl:grid-cols-2">
        <MoneyDistribution allocations={allocations} />

        <IncomeExpenseChart
          transactions={monthlyTransactions}
          period={selectedPeriod}
        />
      </div>

      {/* Movimientos recientes */}
      <RecentTransactions transactions={recentTransactions} />

    </div>
  )
}

export default DashboardPage