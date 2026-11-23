
import AppRouter from './routes/AppRouter'
import { FinanceProvider } from './contexts/FinanceContext'

function App() {
  return (
    <FinanceProvider>
      <AppRouter />
    </FinanceProvider>
  )
}

export default App
