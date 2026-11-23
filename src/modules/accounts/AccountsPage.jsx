
import { useState } from 'react'
import {
  Wallet,
  TrendingUp,
  Landmark,
  ChevronDown,
  Plus,
  Trash2,
  Pencil,
  Power,
  PowerOff,
} from 'lucide-react'

import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'

import { useFinance } from '../../contexts/FinanceContext'
import { formatCurrency } from '../transactions/utils/transactionUtils'

import CreditCardsSection from './components/CreditCardsSection'
import AccountMovements from './components/AccountMovements'
import AccountForm from './components/AccountForm'

function AccountsPage() {
  const {
    accounts,
    transactions,
    addAccount,
    updateAccount,
    deleteAccount,
    deactivateAccount,
    reactivateAccount,
  } = useFinance()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [accountToEdit, setAccountToEdit] = useState(null)

  const activeAccounts = accounts.filter(
    (account) => account.status === 'active'
  )

  const inactiveAccounts = accounts.filter(
    (account) => account.status === 'inactive'
  )

  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  )

  function handleSelectAccount(account) {
    setSelectedAccount((current) =>
      current?.id === account.id ? null : account
    )
  }

  function handleAddAccount(accountData) {
    addAccount(accountData)
    setIsAddModalOpen(false)
  }

  function handleEditAccount(account) {
    setAccountToEdit(account)
  }

  function handleUpdateAccount(accountData) {
    updateAccount(accountToEdit.id, accountData)

    if (selectedAccount?.id === accountToEdit.id) {
      setSelectedAccount({
        ...selectedAccount,
        ...accountData,
      })
    }

    setAccountToEdit(null)
  }

  function handleDeleteAccount(account) {
    const confirmed = window.confirm(
      `¿Estás segura de que deseas eliminar la cuenta "${account.name}"?`
    )

    if (!confirmed) return

    const deleted = deleteAccount(account.id)

    if (!deleted) {
      window.alert(
        'No puedes eliminar esta cuenta porque tiene movimientos asociados. Puedes desactivarla para conservar su historial.'
      )
      return
    }

    if (selectedAccount?.id === account.id) {
      setSelectedAccount(null)
    }
  }

  function handleDeactivateAccount(account) {
    const confirmed = window.confirm(
      `¿Deseas desactivar la cuenta "${account.name}"? Se conservarán su saldo y sus movimientos, pero no debería utilizarse en nuevos registros.`
    )

    if (!confirmed) return

    deactivateAccount(account.id)

    if (selectedAccount?.id === account.id) {
      setSelectedAccount(null)
    }
  }

  function handleReactivateAccount(account) {
    reactivateAccount(account.id)
  }

  function renderAccountCard(account, isActive) {
    const isSelected = selectedAccount?.id === account.id

    return (
      <div key={account.id} className="space-y-2">
        <button
          type="button"
          onClick={() => handleSelectAccount(account)}
          className="w-full rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <Card
            className={`transition-all ${
              isSelected
                ? 'border-purple-300 ring-2 ring-purple-100'
                : 'hover:border-purple-200'
            } ${!isActive ? 'opacity-75' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-50 p-3">
                  <Landmark className="h-5 w-5 text-purple-700" />
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {account.name}
                  </h3>

                  <p className="text-xs text-neutral-500">
                    {account.type === 'wallet'
                      ? 'Billetera digital'
                      : account.type === 'savings'
                        ? 'Cuenta de ahorro'
                        : 'Cuenta bancaria'}
                  </p>
                </div>
              </div>

              <Badge variant={isActive ? 'success' : 'default'}>
                {isActive ? 'Activa' : 'Inactiva'}
              </Badge>
            </div>

            <div className="mt-6">
              <p className="text-sm text-neutral-500">
                Saldo actual
              </p>

              <p className="mt-1 text-2xl font-bold text-neutral-900">
                {formatCurrency(account.balance)}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
              <span className="flex items-center gap-2 text-xs text-neutral-500">
                <TrendingUp className="h-4 w-4" />
                Saldo inicial
              </span>

              <span className="text-sm font-medium text-neutral-700">
                {formatCurrency(account.initialBalance)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-purple-700">
              {isSelected ? 'Ocultar movimientos' : 'Ver movimientos'}

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isSelected ? 'rotate-180' : ''
                }`}
              />
            </div>
          </Card>
        </button>

        <div className="flex flex-wrap justify-end gap-1">
          <button
            type="button"
            onClick={() => handleEditAccount(account)}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-purple-700 transition-colors hover:bg-purple-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </button>

          {isActive ? (
            <button
              type="button"
              onClick={() => handleDeactivateAccount(account)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-50"
            >
              <PowerOff className="h-3.5 w-3.5" />
              Desactivar
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleReactivateAccount(account)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-green-700 transition-colors hover:bg-green-50"
            >
              <Power className="h-3.5 w-3.5" />
              Reactivar
            </button>
          )}

          <button
            type="button"
            onClick={() => handleDeleteAccount(account)}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Eliminar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Mis cuentas
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Administra y consulta los saldos de tus cuentas.
          </p>
        </div>

        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar cuenta
        </Button>
      </div>

      {/* Saldo total */}
      <Card className="border-purple-100 bg-purple-50/50">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-purple-100 p-3">
            <Wallet className="h-6 w-6 text-purple-700" />
          </div>

          <div>
            <p className="text-sm text-neutral-600">
              Saldo total en tus cuentas
            </p>

            <p className="text-2xl font-bold text-purple-700">
              {formatCurrency(totalBalance)}
            </p>
          </div>
        </div>
      </Card>

      {/* Cuentas activas */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">
            Cuentas activas
          </h2>

          <Badge variant="success">
            {activeAccounts.length}
          </Badge>
        </div>

        {activeAccounts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {activeAccounts.map((account) =>
              renderAccountCard(account, true)
            )}
          </div>
        ) : (
          <Card>
            <p className="text-center text-sm text-neutral-500">
              No tienes cuentas activas.
            </p>
          </Card>
        )}
      </section>

      {/* Cuentas inactivas */}
      {inactiveAccounts.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">
              Cuentas inactivas
            </h2>

            <Badge variant="default">
              {inactiveAccounts.length}
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {inactiveAccounts.map((account) =>
              renderAccountCard(account, false)
            )}
          </div>
        </section>
      )}

      {/* Movimientos de la cuenta seleccionada */}
      {selectedAccount && (
        <AccountMovements
          account={selectedAccount}
          transactions={transactions}
        />
      )}

      {/* Modal para agregar cuenta */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Agregar cuenta"
        description="Registra una nueva cuenta bancaria, billetera digital o cuenta de ahorro."
      >
        <AccountForm
          onSubmit={handleAddAccount}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Modal para editar cuenta */}
      <Modal
        isOpen={Boolean(accountToEdit)}
        onClose={() => setAccountToEdit(null)}
        title="Editar cuenta"
        description="Modifica los datos de tu cuenta. El saldo inicial y los movimientos históricos se conservarán."
      >
        {accountToEdit && (
          <AccountForm
            key={accountToEdit.id}
            initialData={accountToEdit}
            isEditing
            onSubmit={handleUpdateAccount}
            onCancel={() => setAccountToEdit(null)}
          />
        )}
      </Modal>

      {/* Sección de tarjetas de crédito */}
      <CreditCardsSection />
    </div>
  )
}

export default AccountsPage
