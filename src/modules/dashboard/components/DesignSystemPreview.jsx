
import { useState } from 'react'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Card from '../../../components/ui/Card'

function DesignSystemPreview() {
  const [amount, setAmount] = useState('')

  return (
    <main className="min-h-screen bg-neutral-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">

        <header>
          <p className="text-sm font-semibold text-primary-600">
            MY FINANCE / DESIGN SYSTEM
          </p>

          <h1 className="mt-2 text-3xl font-bold text-neutral-900">
            Componentes de interfaz
          </h1>

          <p className="mt-2 text-neutral-500">
            Biblioteca visual de My Finance.
          </p>
        </header>

        <Card title="Botones" description="Variantes disponibles">
          <div className="flex flex-wrap gap-3">
            <Button>Principal</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="outline">Contorno</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Eliminar</Button>
          </div>
        </Card>

        <Card title="Campos de entrada">
          <div className="max-w-md space-y-4">
            <Input
              label="Nombre del movimiento"
              placeholder="Ej. Compra supermercado"
            />

            <Input
              label="Monto"
              name="amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              helperText="Ingresa el monto en pesos chilenos."
            />
          </div>
        </Card>

        <Card
          title="Resumen financiero"
          description="Ejemplo de tarjeta reutilizable"
        >
          <p className="text-sm text-neutral-500">
            Saldo disponible
          </p>

          <p className="mt-2 text-3xl font-bold text-primary-700">
            $1.250.000
          </p>

          <p className="mt-2 text-sm text-success">
            +12,5% respecto al mes anterior
          </p>
        </Card>

      </div>
    </main>
  )
}

export default DesignSystemPreview
