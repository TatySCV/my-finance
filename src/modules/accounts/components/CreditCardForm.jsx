
import { useState } from 'react'

import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'

const brandOptions = [
  { value: 'Visa', label: 'Visa' },
  { value: 'Mastercard', label: 'Mastercard' },
  { value: 'American Express', label: 'American Express' },
  { value: 'Otra', label: 'Otra' },
]

function CreditCardForm({
  onSubmit,
  onCancel,
  initialData = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    issuer: initialData?.issuer || '',
    brand: initialData?.brand || 'Visa',
    creditLimit: initialData?.creditLimit ?? '',
    billingDay: initialData?.billingDay ?? '',
    paymentDueDay: initialData?.paymentDueDay ?? '',
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
      newErrors.name = 'Ingresa un nombre para la tarjeta.'
    }

    if (!formData.issuer.trim()) {
      newErrors.issuer = 'Ingresa el banco o institución.'
    }

    if (
      formData.creditLimit === '' ||
      !Number.isFinite(Number(formData.creditLimit)) ||
      Number(formData.creditLimit) <= 0
    ) {
      newErrors.creditLimit = 'Ingresa un cupo válido.'
    }

    const billingDay = Number(formData.billingDay)
    const paymentDueDay = Number(formData.paymentDueDay)

    if (
      !formData.billingDay ||
      !Number.isInteger(billingDay) ||
      billingDay < 1 ||
      billingDay > 31
    ) {
      newErrors.billingDay = 'Ingresa un día entre 1 y 31.'
    }

    if (
      !formData.paymentDueDay ||
      !Number.isInteger(paymentDueDay) ||
      paymentDueDay < 1 ||
      paymentDueDay > 31
    ) {
      newErrors.paymentDueDay = 'Ingresa un día entre 1 y 31.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      name: formData.name.trim(),
      issuer: formData.issuer.trim(),
      brand: formData.brand,
      creditLimit: Number(formData.creditLimit),
      billingDay,
      paymentDueDay,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nombre de la tarjeta"
        name="name"
        placeholder="Ej. CMR Falabella"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Input
        label="Banco o institución"
        name="issuer"
        placeholder="Ej. Banco Falabella"
        value={formData.issuer}
        onChange={handleChange}
        error={errors.issuer}
        required
      />

      <Select
        label="Marca de la tarjeta"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        options={brandOptions}
        required
      />

      <Input
        label="Cupo total"
        name="creditLimit"
        type="number"
        placeholder="Ej. 1500000"
        value={formData.creditLimit}
        onChange={handleChange}
        error={errors.creditLimit}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Día de facturación"
          name="billingDay"
          type="number"
          placeholder="Ej. 15"
          value={formData.billingDay}
          onChange={handleChange}
          error={errors.billingDay}
          required
        />

        <Input
          label="Día de vencimiento"
          name="paymentDueDay"
          type="number"
          placeholder="Ej. 5"
          value={formData.paymentDueDay}
          onChange={handleChange}
          error={errors.paymentDueDay}
          required
        />
      </div>

      <p className="text-xs text-neutral-500">
        Ingresa los días del ciclo mensual indicados por tu institución.
        Si el día no existe en un mes, se considerará el último día de ese mes.
      </p>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button type="submit">
          {isEditing ? 'Guardar cambios' : 'Agregar tarjeta'}
        </Button>
      </div>
    </form>
  )
}

export default CreditCardForm
