
import { useState } from 'react'
import { CreditCard, Plus, Pencil, Power, Trash2 } from 'lucide-react'

import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import Modal from '../../../components/ui/Modal'

import CreditCardForm from './CreditCardForm'
import { useFinance } from '../../../contexts/FinanceContext'

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function CreditCardsSection() {
  const {
    creditCards,
    addCreditCard,
    updateCreditCard,
    deactivateCreditCard,
    reactivateCreditCard,
    deleteCreditCard,
  } = useFinance()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const activeCards = creditCards.filter(
    (card) => card.status === 'active'
  )

  const inactiveCards = creditCards.filter(
    (card) => card.status === 'inactive'
  )

  function openCreateModal() {
    setSelectedCard(null)
    setIsModalOpen(true)
  }

  function openEditModal(card) {
    setSelectedCard(card)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setSelectedCard(null)
  }

  function handleSubmit(formData) {
    if (selectedCard) {
      updateCreditCard(selectedCard.id, formData)
    } else {
      addCreditCard(formData)
    }

    closeModal()
  }

  function handleDeactivate(card) {
    const confirmed = window.confirm(
      `¿Deseas desactivar la tarjeta ${card.name}?`
    )

    if (confirmed) {
      deactivateCreditCard(card.id)
    }
  }

  function handleReactivate(card) {
    reactivateCreditCard(card.id)
  }

  function handleDelete(card) {
    const confirmed = window.confirm(
      `¿Deseas eliminar la tarjeta ${card.name}? Esta acción no se puede deshacer.`
    )

    if (!confirmed) return

    const deleted = deleteCreditCard(card.id)

    if (!deleted) {
      window.alert(
        'No es posible eliminar esta tarjeta porque tiene movimientos asociados.'
      )
    }
  }

  function renderCard(card, isActive) {
    // Calculamos el porcentaje antes de utilizarlo en el JSX
    const usedPercentage =
      card.creditLimit > 0
        ? Math.min((card.usedCredit / card.creditLimit) * 100, 100)
        : 0

    return (
      <div
        key={card.id}
        className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
      >
        {/* Encabezado */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
              <CreditCard size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900">
                {card.name}
              </h3>

              <p className="text-sm text-neutral-500">
                {card.issuer} · {card.brand}
              </p>
            </div>
          </div>

          <Badge variant={isActive ? 'success' : 'default'}>
            {isActive ? 'Activa' : 'Inactiva'}
          </Badge>
        </div>

        {/* Información del cupo */}
        <div className="mt-5">
          <p className="text-sm text-neutral-500">
            Cupo total
          </p>

          <p className="mt-1 text-2xl font-bold text-neutral-900">
            {formatCurrency(card.creditLimit)}
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">
                Cupo utilizado
              </span>

              <span className="font-medium text-neutral-800">
                {formatCurrency(card.usedCredit)}
              </span>
            </div>

            {/* Barra de utilización */}
            <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-purple-600 transition-all"
                style={{ width: `${usedPercentage}%` }}
              />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">
                Cupo disponible
              </span>

              <span className="font-semibold text-green-700">
                {formatCurrency(card.availableCredit)}
              </span>
            </div>
          </div>
        </div>

        {/* Fechas de facturación y vencimiento */}
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-neutral-50 p-3">
          <div>
            <p className="text-xs text-neutral-500">
              Día de facturación
            </p>

            <p className="mt-1 font-medium text-neutral-800">
              Día {card.billingDay}
            </p>
          </div>

          <div>
            <p className="text-xs text-neutral-500">
              Día de vencimiento
            </p>

            <p className="mt-1 font-medium text-neutral-800">
              Día {card.paymentDueDay}
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openEditModal(card)}
          >
            <Pencil size={15} className="mr-1" />
            Editar
          </Button>

          {isActive ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeactivate(card)}
            >
              <Power size={15} className="mr-1" />
              Desactivar
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleReactivate(card)}
            >
              <Power size={15} className="mr-1" />
              Reactivar
            </Button>
          )}

          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(card)}
          >
            <Trash2 size={15} className="mr-1" />
            Eliminar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <section className="space-y-5">
      {/* Título y botón */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Tarjetas de crédito
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Administra tus tarjetas, cupos y fechas de pago.
          </p>
        </div>

        <Button onClick={openCreateModal}>
          <Plus size={17} className="mr-2" />
          Agregar tarjeta
        </Button>
      </div>

      {/* Estado vacío */}
      {activeCards.length === 0 && inactiveCards.length === 0 && (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center">
          <CreditCard
            size={32}
            className="mx-auto text-neutral-400"
          />

          <p className="mt-3 font-medium text-neutral-700">
            Todavía no tienes tarjetas registradas.
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            Agrega tu primera tarjeta de crédito para comenzar.
          </p>
        </div>
      )}

      {/* Tarjetas activas */}
      {activeCards.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {activeCards.map((card) => renderCard(card, true))}
        </div>
      )}

      {/* Tarjetas inactivas */}
      {inactiveCards.length > 0 && (
        <div className="space-y-3 pt-3">
          <h3 className="text-sm font-semibold text-neutral-500">
            Tarjetas inactivas
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {inactiveCards.map((card) => renderCard(card, false))}
          </div>
        </div>
      )}

      {/* Modal de creación y edición */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedCard ? 'Editar tarjeta' : 'Nueva tarjeta'}
        description={
          selectedCard
            ? 'Actualiza los datos de tu tarjeta.'
            : 'Ingresa los datos de tu tarjeta de crédito.'
        }
      >
        <CreditCardForm
          onSubmit={handleSubmit}
          onCancel={closeModal}
          initialData={selectedCard}
          isEditing={Boolean(selectedCard)}
        />
      </Modal>
    </section>
  )
}

export default CreditCardsSection
