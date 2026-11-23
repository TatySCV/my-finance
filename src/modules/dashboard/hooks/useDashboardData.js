
import { useMemo } from 'react'

import { dashboardMockData } from '../data/dashboardMockData'
import { useFinance } from '../../../contexts/FinanceContext'

function useDashboardData(selectedPeriod) {
  const {
    accounts,
    transactions,
  } = useFinance()

  const allocations = dashboardMockData.allocations

  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  )

  const monthlyTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      transaction.date.startsWith(selectedPeriod) &&
      transaction.status === 'confirmed'
    )
  }, [selectedPeriod, transactions])

  const totalIncome = monthlyTransactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalExpenses = monthlyTransactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const recentTransactions = [...monthlyTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return {
    totalBalance,
    totalIncome,
    totalExpenses,
    recentTransactions,
    monthlyTransactions,
    allocations,
  }
}

export default useDashboardData
