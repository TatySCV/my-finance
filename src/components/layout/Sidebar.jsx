import { NavLink } from 'react-router-dom'
import { WalletCards } from 'lucide-react'
import { navigationGroups } from '../../routes/navigation'

function Sidebar() {
  return (
    <aside className="
      hidden h-screen w-64 shrink-0 flex-col
      border-r border-neutral-200 bg-white
      lg:flex
    ">
      {/* Brand */}
      <div className="flex h-20 items-center gap-3 border-b border-neutral-100 px-6">
        <div className="
          flex h-10 w-10 items-center justify-center
          rounded-xl bg-primary-100 text-primary-700
        ">
          <WalletCards size={23} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-neutral-900">
            My Finance
          </h1>
          <p className="text-xs text-neutral-500">
            Personal Finance
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
        {navigationGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.12em] text-neutral-400">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `
                      flex items-center gap-3 rounded-xl px-3 py-2.5
                      text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'}
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={19}
                          strokeWidth={isActive ? 2.3 : 1.8}
                        />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-100 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-neutral-50 p-3">
          <div className="
            flex h-9 w-9 items-center justify-center
            rounded-full bg-primary-100 text-sm font-bold
            text-primary-700
          ">
            MF
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-800">
              Mi espacio
            </p>
            <p className="text-xs text-neutral-500">
              Finanzas personales
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar