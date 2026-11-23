import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Receipt,
} from "lucide-react";
import { Link } from "react-router-dom";

import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

function RecentTransactions({ transactions }) {
  return (
    <Card
      title="Movimientos recientes"
      description="Últimas operaciones del período seleccionado"
      action={
        <Link
          to="/movimientos"
          className="whitespace-nowrap text-sm font-semibold text-primary-600 transition hover:text-primary-700"
        >
          Ver todos
        </Link>
      }
    >
      {transactions.length > 0 ? (
        <div className="divide-y divide-neutral-100">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`rounded-xl p-2.5 ${
                      isIncome
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {isIncome ? (
                      <ArrowDownLeft size={19} />
                    ) : (
                      <ArrowUpRight size={19} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-neutral-800">
                      {transaction.description}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {transaction.account} · {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p
                    className={`text-sm font-semibold ${
                      isIncome ? "text-success" : "text-neutral-800"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>

                  <Badge variant={isIncome ? "success" : "danger"}>
                    {isIncome ? "Ingreso" : "Gasto"}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center py-8 text-center">
          <Receipt size={28} className="text-neutral-300" />

          <p className="mt-3 text-sm font-medium text-neutral-700">
            Sin movimientos
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            No hay operaciones registradas en este período.
          </p>
        </div>
      )}
    </Card>
  );
}

export default RecentTransactions;
