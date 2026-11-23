
import { useState } from 'react'
import { Plus } from 'lucide-react'

import Card from '../../components/ui/Card'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'

import useTransactions from './hooks/useTransactions'
import TransactionSummary from './components/TransactionSummary'
import TransactionFilters from './components/TransactionFilters'
import TransactionList from './components/TransactionList'
import TransactionModal from './components/TransactionModal'

function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    period,
    setPeriod,
    filters,
    updateFilter,
    clearFilters,
    transactions,
    summary,
    accounts,
    categories,
    addTransaction,
  } = useTransactions()

  const selectedPeriod = `${period.year}-${String(period.month).padStart(2, '0')}`

  function handlePeriodChange(value) {
    const [year, month] = value.split('-')

    setPeriod({
      year: Number(year),
      month: Number(month),
    })
  }

  function handleCreateTransaction(transaction) {
    const success = addTransaction(transaction)

    if (success) {
      setIsModalOpen(false)
    }
  }

  const periodOptions = [
    { value: '2026-11', label: 'Noviembre 2026' },
    { value: '2026-10', label: 'Octubre 2026' },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Movimientos
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Administra y consulta todos tus ingresos y gastos.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-56">
            <Select
              name="period"
              value={selectedPeriod}
              onChange={(event) => handlePeriodChange(event.target.value)}
              options={periodOptions}
            />
          </div>

          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            Nuevo movimiento
          </Button>
        </div>
      </div>

      <TransactionSummary summary={summary} />

      <Card
        title="Filtros"
        description="Encuentra movimientos según sus características."
      >
        <TransactionFilters
          filters={filters}
          updateFilter={updateFilter}
          clearFilters={clearFilters}
          accounts={accounts}
          categories={categories}
        />
      </Card>

      <TransactionList
        transactions={transactions}
        accounts={accounts}
      />

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        accounts={accounts}
        categories={categories}
        onSubmit={handleCreateTransaction}
      />
    </div>
  )
}

export default TransactionsPage
