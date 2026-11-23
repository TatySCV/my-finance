
import Modal from '../../../components/ui/Modal'
import TransactionForm from './TransactionForm'

function TransactionModal({
  isOpen,
  onClose,
  accounts,
  categories,
  onSubmit,
}) {
  function handleSubmit(transaction) {
    onSubmit(transaction)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nuevo movimiento"
      description="Completa los datos para registrar una operación."
      size="lg"
    >
      <TransactionForm
        accounts={accounts}
        categories={categories}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  )
}

export default TransactionModal
