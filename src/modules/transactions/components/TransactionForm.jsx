
import { useState } from 'react'

import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'

function TransactionForm({
  accounts,
  categories,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    description: '',
    type: 'expense',
    amount: '',
    date: new Date().toLocaleDateString('en-CA'),
    accountId: '',
    destinationAccountId: '',
    category: '',
  })

  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === 'type'
        ? {
            accountId: '',
            destinationAccountId: '',
            category: '',
          }
        : {}),
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
      ...(name === 'type'
        ? {
            accountId: '',
            destinationAccountId: '',
            category: '',
          }
        : {}),
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    if (!formData.description.trim()) {
      newErrors.description = 'Ingresa una descripción.'
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Ingresa un monto válido.'
    }

    if (!formData.date) {
      newErrors.date = 'Selecciona una fecha.'
    }

    const selectedAccount = accounts.find(
      (account) => String(account.id) === String(formData.accountId),
    )

    if (!formData.accountId) {
      newErrors.accountId = 'Selecciona una cuenta.'
    } else if (!selectedAccount) {
      newErrors.accountId = 'La cuenta seleccionada no está activa.'
    }

    if (formData.type !== 'transfer' && !formData.category) {
      newErrors.category = 'Selecciona una categoría.'
    }

    if (formData.type === 'transfer') {
      const selectedDestination = accounts.find(
        (account) =>
          String(account.id) === String(formData.destinationAccountId),
      )

      if (!formData.destinationAccountId) {
        newErrors.destinationAccountId =
          'Selecciona la cuenta de destino.'
      } else if (!selectedDestination) {
        newErrors.destinationAccountId =
          'La cuenta de destino no está activa.'
      }

      if (
        formData.accountId &&
        String(formData.accountId) ===
          String(formData.destinationAccountId)
      ) {
        newErrors.destinationAccountId =
          'Selecciona una cuenta diferente.'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      description: formData.description.trim(),
      type: formData.type,
      amount: Number(formData.amount),
      date: formData.date,
      accountId: selectedAccount.id,
      ...(formData.type === 'transfer'
        ? { destinationAccountId: Number(formData.destinationAccountId) }
        : {}),
      ...(formData.type !== 'transfer'
        ? { category: formData.category }
        : {}),
      status: 'confirmed',
    })
  }

  const typeOptions = [
    { value: 'income', label: 'Ingreso' },
    { value: 'expense', label: 'Gasto' },
    { value: 'transfer', label: 'Transferencia' },
  ]

  const accountOptions = accounts.map((account) => ({
    value: String(account.id),
    label: account.name,
  }))

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }))

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Select
        label="Tipo de movimiento"
        name="type"
        value={formData.type}
        onChange={handleChange}
        options={typeOptions}
        placeholder="Seleccionar tipo"
      />

      <Input
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Ej. Sueldo, supermercado..."
        error={errors.description}
        required
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Monto"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0"
          error={errors.amount}
          required
        />

        <Input
          label="Fecha"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
        />
      </div>

      <Select
        label={formData.type === 'transfer' ? 'Cuenta de origen' : 'Cuenta'}
        name="accountId"
        value={formData.accountId}
        onChange={handleChange}
        options={accountOptions}
        placeholder="Seleccionar cuenta"
        error={errors.accountId}
        required
      />

      {formData.type === 'transfer' ? (
        <Select
          label="Cuenta de destino"
          name="destinationAccountId"
          value={formData.destinationAccountId}
          onChange={handleChange}
          options={accountOptions.filter(
            (account) => account.value !== formData.accountId,
          )}
          placeholder="Seleccionar cuenta de destino"
          error={errors.destinationAccountId}
          required
        />
      ) : (
        <Select
          label="Categoría"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          placeholder="Seleccionar categoría"
          error={errors.category}
          required
        />
      )}

      <div className="flex justify-end gap-3 border-t border-neutral-100 pt-5">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button type="submit">
          Guardar movimiento
        </Button>
      </div>
    </form>
  )
}

export default TransactionForm
