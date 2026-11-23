import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import Card from "../../../components/ui/Card";

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CL", {
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(value);
}

function IncomeExpenseChart({ transactions, period }) {
  const [year, month] = period.split("-").map(Number);

  // Obtener la cantidad de días del mes seleccionado
  const daysInMonth = new Date(year, month, 0).getDate();

  // Inicializar todos los días del mes
  const dailyData = Array.from({ length: daysInMonth }, (_, index) => ({
    day: String(index + 1),
    ingresos: 0,
    gastos: 0,
  }));

  // Incorporar los movimientos correspondientes a cada día
  transactions.forEach((transaction) => {
    const day = Number(transaction.date.slice(8, 10));
    const currentDay = dailyData[day - 1];

    if (!currentDay) return;

    if (transaction.type === "income") {
      currentDay.ingresos += transaction.amount;
    } else if (transaction.type === "expense") {
      currentDay.gastos += transaction.amount;
    }
  });

  return (
    <Card
      title="Ingresos y gastos"
      description="Comportamiento financiero del período seleccionado"
    >
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dailyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e4e4e7"
            />

            <XAxis
              dataKey="day"
              interval={daysInMonth > 20 ? 4 : 2}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#71717a", fontSize: 11 }}
            />

            <YAxis
              tickFormatter={formatCurrency}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#71717a", fontSize: 12 }}
              width={55}
            />

            <Tooltip
              formatter={(value, name) => [
                `$${Number(value).toLocaleString("es-CL")}`,
                name,
              ]}
              labelFormatter={(label) => `Día ${label}`}
            />

            <Legend />

            <Bar
              dataKey="ingresos"
              name="Ingresos"
              fill="#8b4de8"
              radius={[4, 4, 0, 0]}
              maxBarSize={14}
            />

            <Bar
              dataKey="gastos"
              name="Gastos"
              fill="#f87171"
              radius={[4, 4, 0, 0]}
              maxBarSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default IncomeExpenseChart;
