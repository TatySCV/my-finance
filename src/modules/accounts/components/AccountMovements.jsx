
import { useMemo, useState } from 'react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
} from 'lucide-react'

import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import Select from '../../../components/ui/Select'
import { formatCurrency } from '../../transactions/utils/transactionUtils'

function AccountMovements({ account, transactions }) {
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const accountTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        return (
          String(transaction.accountId) === String(account.id) ||
          String(transaction.destinationAccountId) === String(account.id)
        )
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [transactions, account.id])

  const periods = useMemo(() => {
    return [
      ...new Set(
        accountTransactions.map((transaction) =>
          transaction.date.slice(0, 7),
        ),
      ),
    ].sort().reverse()
  }, [accountTransactions])

  const filteredTransactions = accountTransactions.filter((transaction) => {
    const matchesPeriod =
      !selectedPeriod || transaction.date.startsWith(selectedPeriod)

    const matchesType =
      !selectedType || transaction.type === selectedType

    return matchesPeriod && matchesType
  })

  const confirmedTransactions = filteredTransactions.filter(
    (transaction) => transaction.status === 'confirmed',
  )

  const totalIncome = confirmedTransactions
    .filter(
      (transaction) =>
        transaction.type === 'income' &&
        String(transaction.accountId) === String(account.id),
    )
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalExpenses = confirmedTransactions
    .filter(
      (transaction) =>
        transaction.type === 'expense' &&
        String(transaction.accountId) === String(account.id),
    )
    .reduce((total, transaction) => total + transaction.amount, 0)

  function getMovementInfo(transaction) {
    if (transaction.type === 'transfer') {
      const isIncoming =
        String(transaction.destinationAccountId) === String(account.id)

      return {
        label: isIncoming
          ? 'Transferencia recibida'
          : 'Transferencia enviada',
        icon: <ArrowLeftRight className="h-5 w-5 text-purple-600" />,
        amount: isIncoming ? transaction.amount : -transaction.amount,
        color: isIncoming ? 'text-green-600' : 'text-neutral-700',
      }
    }

    if (transaction.type === 'income') {
      return {
        label: transaction.category,
        icon: <ArrowDownLeft className="h-5 w-5 text-green-600" />,
        amount: transaction.amount,
        color: 'text-green-600',
      }
    }

    return {
      label: transaction.category,
      icon: <ArrowUpRight className="h-5 w-5 text-red-600" />,
      amount: -transaction.amount,
      color: 'text-red-600',
    }
  }

  function getStatusLabel(status) {
    const labels = {
      confirmed: 'Confirmado',
      pending: 'Pendiente',
      voided: 'Anulado',
    }

    return labels[status] || status
  }

  function getStatusVariant(status) {
    if (status === 'confirmed') return 'success'
    if (status === 'pending') return 'warning'
    return 'secondary'
  }

  const periodOptions = periods.map((period) => {
    const [year, month] = period.split('-')
    const date = new Date(Number(year), Number(month) - 1)

    return {
      value: period,
      label: date.toLocaleDateString('es-CL', {
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  const typeOptions = [
    { value: 'income', label: 'Ingresos' },
    { value: 'expense', label: 'Gastos' },
    { value: 'transfer', label: 'Transferencias' },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-neutral-500">Ingresos</p>
          <p className="mt-2 text-xl font-bold text-green-600">
            {formatCurrency(totalIncome)}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-neutral-500">Gastos</p>
          <p className="mt-2 text-xl font-bold text-red-600">
            {formatCurrency(totalExpenses)}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-neutral-500">
            Movimientos confirmados
          </p>
          <p className="mt-2 text-xl font-bold text-neutral-900">
            {confirmedTransactions.length}
          </p>
        </Card>
      </div>

      <Card title={`Movimientos de ${account.name}`}>
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            label="Período"
            value={selectedPeriod}
            onChange={(event) => setSelectedPeriod(event.target.value)}
            options={periodOptions}
            placeholder="Todos los períodos"
          />

          <Select
            label="Tipo de movimiento"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            options={typeOptions}
            placeholder="Todos los tipos"
          />
        </div>

        {filteredTransactions.length === 0 ? (
          <p className="py-6 text-center text-sm text-neutral-500">
            No hay movimientos para los filtros seleccionados.
          </p>
        ) : (
          <div className="divide-y divide-neutral-100">
            {filteredTransactions.map((transaction) => {
              const movement = getMovementInfo(transaction)

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="rounded-xl bg-neutral-50 p-3">
                      {movement.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-neutral-900">
                        {transaction.description}
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        {movement.label} · {transaction.date}
                      </p>

                      <Badge variant={getStatusVariant(transaction.status)}>
                        {getStatusLabel(transaction.status)}
                      </Badge>
                    </div>
                  </div>

                  <p className={`shrink-0 text-sm font-semibold ${movement.color}`}>
                    {movement.amount > 0 ? '+' : ''}
                    {formatCurrency(movement.amount)}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}

export default AccountMovements
