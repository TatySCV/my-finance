
import { useState } from 'react'

import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'

const accountTypeOptions = [
  { value: 'bank', label: 'Cuenta bancaria' },
  { value: 'wallet', label: 'Billetera digital' },
  { value: 'savings', label: 'Cuenta de ahorro' },
]

function AccountForm({
  onSubmit,
  onCancel,
  initialData = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'bank',
    initialBalance: initialData?.initialBalance ?? '',
  })

  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Ingresa un nombre para la cuenta.'
    }

    if (
      formData.initialBalance === '' ||
      Number(formData.initialBalance) < 0 ||
      !Number.isFinite(Number(formData.initialBalance))
    ) {
      newErrors.initialBalance = 'Ingresa un saldo inicial válido.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      name: formData.name.trim(),
      type: formData.type,
      initialBalance: Number(formData.initialBalance),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nombre de la cuenta"
        name="name"
        placeholder="Ej. Banco de Chile"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Select
        label="Tipo de cuenta"
        name="type"
        value={formData.type}
        onChange={handleChange}
        options={accountTypeOptions}
        required
      />

      <Input
        label="Saldo inicial"
        name="initialBalance"
        type="number"
        placeholder="Ej. 250000"
        value={formData.initialBalance}
        onChange={handleChange}
        error={errors.initialBalance}
        helperText={
          isEditing
            ? 'El saldo inicial se conserva para mantener el historial financiero.'
            : 'Ingresa el saldo que tiene actualmente esta cuenta.'
        }
        disabled={isEditing}
        required
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button type="submit" variant="primary">
          {isEditing ? 'Guardar cambios' : 'Guardar cuenta'}
        </Button>
      </div>
    </form>
  )
}

export default AccountForm
