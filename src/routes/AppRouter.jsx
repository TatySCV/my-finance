import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import DashboardPage from '../modules/dashboard/DashboardPage'
import TransactionsPage from '../modules/transactions/TransactionsPage'
import AccountsPage from '../modules/accounts/AccountsPage'

function PlaceholderPage({ title }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">
        {title}
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Este módulo se encuentra en desarrollo.
      </p>
    </div>
  )
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />

          <Route
            path="movimientos"
            element={<TransactionsPage title="Movimientos" />}
          />

          <Route
            path="cuentas"
            element={<AccountsPage />}
          />

          <Route
            path="presupuesto"
            element={<PlaceholderPage title="Presupuesto" />}
          />

          <Route
            path="distribucion"
            element={<PlaceholderPage title="Distribución" />}
          />

          <Route
            path="ahorros"
            element={<PlaceholderPage title="Ahorros y metas" />}
          />

          <Route
            path="creditos"
            element={<PlaceholderPage title="Créditos" />}
          />

          <Route
            path="deudas"
            element={<PlaceholderPage title="Deudas" />}
          />

          <Route
            path="informes"
            element={<PlaceholderPage title="Informes" />}
          />

          <Route
            path="configuracion"
            element={<PlaceholderPage title="Configuración" />}
          />

          <Route
            path="mas"
            element={<PlaceholderPage title="Más módulos" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter