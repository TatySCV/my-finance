
import { Receipt } from 'lucide-react'

import Card from '../../../components/ui/Card'
import TransactionItem from './TransactionItem'

function TransactionList({ transactions, accounts }) {
  return (
    <Card
      title="Historial de movimientos"
      description={`${transactions.length} movimientos encontrados`}
    >
      {transactions.length > 0 ? (
        <div className="divide-y divide-neutral-100">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              accounts={accounts}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-10 text-center">
          <Receipt size={32} className="text-neutral-300" />

          <p className="mt-3 text-sm font-semibold text-neutral-700">
            No se encontraron movimientos
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            Prueba modificando los filtros o seleccionando otro período.
          </p>
        </div>
      )}
    </Card>
  )
}

export default TransactionList
