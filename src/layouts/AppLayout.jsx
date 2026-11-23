import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import MobileNavigation from '../components/layout/MobileNavigation'

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="
          flex-1 overflow-y-auto
          px-5 py-6 pb-24
          md:px-8 md:py-8
          lg:pb-8
        ">
          <Outlet />
        </main>
      </div>

      <MobileNavigation />
    </div>
  )
}

export default AppLayout