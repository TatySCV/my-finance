
import { X } from 'lucide-react'

import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'

function TransactionFilters({
  filters,
  updateFilter,
  clearFilters,
  accounts,
  categories,
}) {
  const hasActiveFilters = Object.values(filters).some(Boolean)

  return (
    <div className="space-y-4">
      <Input
        name="search"
        placeholder="Buscar movimiento..."
        value={filters.search}
        onChange={(event) => updateFilter('search', event.target.value)}
        className="w-full"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Select
          name="type"
          value={filters.type}
          onChange={(event) => updateFilter('type', event.target.value)}
          options={[
            { value: 'income', label: 'Ingresos' },
            { value: 'expense', label: 'Gastos' },
            { value: 'transfer', label: 'Transferencias' },
          ]}
          placeholder="Todos los tipos"
        />

        <Select
          name="account"
          value={filters.account}
          onChange={(event) => updateFilter('account', event.target.value)}
          options={accounts.map((account) => ({
            value: String(account.id),
            label: account.name,
          }))}
          placeholder="Todas las cuentas"
        />

        <Select
          name="category"
          value={filters.category}
          onChange={(event) => updateFilter('category', event.target.value)}
          options={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          placeholder="Todas las categorías"
        />

        <Select
          name="status"
          value={filters.status}
          onChange={(event) => updateFilter('status', event.target.value)}
          options={[
            { value: 'confirmed', label: 'Confirmados' },
            { value: 'pending', label: 'Pendientes' },
            { value: 'voided', label: 'Anulados' },
          ]}
          placeholder="Todos los estados"
        />
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
          >
            <X size={15} />
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  )
}

export default TransactionFilters
