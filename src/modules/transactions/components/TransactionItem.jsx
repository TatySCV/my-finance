
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
} from "lucide-react";

import Badge from "../../../components/ui/Badge";
import { formatCurrency } from "../utils/transactionUtils";

const statusConfig = {
  confirmed: {
    label: "Confirmado",
    variant: "success",
  },
  pending: {
    label: "Pendiente",
    variant: "warning",
  },
  voided: {
    label: "Anulado",
    variant: "danger",
  },
};

function formatDate(date) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function TransactionItem({ transaction, accounts }) {
  const isIncome = transaction.type === "income";
  const isTransfer = transaction.type === "transfer";
  const status = statusConfig[transaction.status];

  const account = accounts.find(
    (item) => String(item.id) === String(transaction.accountId),
  );

  const destinationAccount = accounts.find(
    (item) =>
      String(item.id) === String(transaction.destinationAccountId),
  );

  const accountName = account?.name || "Cuenta no disponible";
  const destinationAccountName =
    destinationAccount?.name || "Cuenta no disponible";

  const Icon = isTransfer
    ? ArrowLeftRight
    : isIncome
      ? ArrowDownLeft
      : ArrowUpRight;

  const amountColor = isIncome
    ? "text-success"
    : isTransfer
      ? "text-primary-700"
      : "text-danger";

  return (
    <div className="flex items-center justify-between gap-3 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`shrink-0 rounded-xl p-3 ${
            isTransfer
              ? "bg-primary-50 text-primary-600"
              : isIncome
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
          }`}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-800">
            {transaction.description}
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            {isTransfer ? (
              <>
                {accountName}
                {" → "}
                {destinationAccountName}
              </>
            ) : (
              <>
                {transaction.category} · {accountName}
              </>
            )}
          </p>

          <p className="mt-1 text-xs text-neutral-400">
            {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className={`text-sm font-semibold ${amountColor}`}>
          {isIncome ? "+" : isTransfer ? "" : "-"}
          {formatCurrency(transaction.amount)}
        </p>

        {status && (
          <div className="mt-1 flex justify-end">
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionItem;
