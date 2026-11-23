import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  ChartNoAxesCombined,
  Menu,
} from 'lucide-react'

const mobileItems = [
  { label: 'Inicio', path: '/', icon: LayoutDashboard },
  { label: 'Movimientos', path: '/movimientos', icon: ArrowLeftRight },
  { label: 'Cuentas', path: '/cuentas', icon: Wallet },
  { label: 'Presupuesto', path: '/presupuesto', icon: ChartNoAxesCombined },
  { label: 'Más', path: '/mas', icon: Menu },
]

function MobileNavigation() {
  return (
    <nav className="
      fixed inset-x-0 bottom-0 z-40
      border-t border-neutral-200 bg-white
      px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2
      lg:hidden
    ">
      <div className="grid grid-cols-5">
        {mobileItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `
                flex flex-col items-center gap-1 rounded-lg py-2
                text-[10px] font-medium transition-colors
                ${isActive
                  ? 'text-primary-700'
                  : 'text-neutral-500'}
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={21}
                    strokeWidth={isActive ? 2.4 : 1.8}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileNavigation