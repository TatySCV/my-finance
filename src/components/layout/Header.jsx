import { useLocation } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { navigationGroups } from '../../routes/navigation'
import IconButton from '../ui/IconButton'

function Header() {
  const location = useLocation()

  const currentItem = navigationGroups
    .flatMap((group) => group.items)
    .find((item) => item.path === location.pathname)

  const pageTitle = currentItem?.label ?? 'My Finance'

  const currentDate = new Intl.DateTimeFormat('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  return (
    <header className="
      flex min-h-20 items-center justify-between gap-4
      border-b border-neutral-200 bg-white px-5
      md:px-8
    ">
      <div>
        <h2 className="text-lg font-bold text-neutral-900">
          {pageTitle}
        </h2>

        <p className="hidden text-xs capitalize text-neutral-500 sm:block">
          {currentDate}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <IconButton
          icon={Search}
          label="Buscar"
        />

        <IconButton
          icon={Bell}
          label="Notificaciones"
        />

        <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
          MF
        </div>
      </div>
    </header>
  )
}

export default Header