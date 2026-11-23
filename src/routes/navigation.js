import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  ChartNoAxesCombined,
  PieChart,
  PiggyBank,
  CreditCard,
  HandCoins,
  FileChartColumn,
  Settings,
} from 'lucide-react'

export const navigationGroups = [
  {
    title: 'GENERAL',
    items: [
      {
        label: 'Dashboard',
        path: '/',
        icon: LayoutDashboard,
      },
      {
        label: 'Movimientos',
        path: '/movimientos',
        icon: ArrowLeftRight,
      },
    ],
  },
  {
    title: 'FINANZAS',
    items: [
      {
        label: 'Cuentas',
        path: '/cuentas',
        icon: Wallet,
      },
      {
        label: 'Presupuesto',
        path: '/presupuesto',
        icon: ChartNoAxesCombined,
      },
      {
        label: 'Distribución',
        path: '/distribucion',
        icon: PieChart,
      },
      {
        label: 'Ahorros y metas',
        path: '/ahorros',
        icon: PiggyBank,
      },
      {
        label: 'Créditos',
        path: '/creditos',
        icon: CreditCard,
      },
      {
        label: 'Deudas',
        path: '/deudas',
        icon: HandCoins,
      },
    ],
  },
  {
    title: 'OTROS',
    items: [
      {
        label: 'Informes',
        path: '/informes',
        icon: FileChartColumn,
      },
      {
        label: 'Configuración',
        path: '/configuracion',
        icon: Settings,
      },
    ],
  },
]