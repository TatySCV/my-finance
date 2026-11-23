
/**
 * Formatea un monto en pesos chilenos.
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Obtiene los movimientos de un mes y año determinados.
 */
export function getTransactionsByPeriod(transactions, year, month) {
  return transactions.filter((transaction) => {
    const date = new Date(`${transaction.date}T00:00:00`);

    return (
      date.getFullYear() === Number(year) &&
      date.getMonth() === Number(month) - 1
    );
  });
}

/**
 * Calcula ingresos, gastos y balance.
 * Solo considera movimientos confirmados.
 */
export function calculateTransactionSummary(transactions) {
  const confirmedTransactions = transactions.filter(
    (transaction) => transaction.status === "confirmed",
  );

  const income = confirmedTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = confirmedTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
    total: confirmedTransactions.length,
  };
}

/**
 * Aplica filtros a los movimientos.
 * El filtro de cuenta utiliza accountId y destinationAccountId.
 */
export function filterTransactions(transactions, filters) {
  return transactions.filter((transaction) => {
    const matchesType =
      !filters.type || transaction.type === filters.type;

    const matchesAccount =
      !filters.account ||
      String(transaction.accountId) === String(filters.account) ||
      String(transaction.destinationAccountId) === String(filters.account);

    const matchesCategory =
      !filters.category || transaction.category === filters.category;

    const matchesStatus =
      !filters.status || transaction.status === filters.status;

    const matchesSearch =
      !filters.search ||
      transaction.description
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    return (
      matchesType &&
      matchesAccount &&
      matchesCategory &&
      matchesStatus &&
      matchesSearch
    );
  });
}

/**
 * Ordena los movimientos desde el más reciente.
 */
export function sortTransactionsByDate(transactions) {
  return [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
}

/**
 * Calcula los saldos de las cuentas bancarias y billeteras.
 * Utiliza IDs para relacionar los movimientos con las cuentas.
 */
export function calculateAccountBalances(accounts, transactions) {
  return accounts.map((account) => {
    const accountTransactions = transactions.filter(
      (transaction) =>
        transaction.status === "confirmed" &&
        (
          transaction.accountId === account.id ||
          transaction.destinationAccountId === account.id
        ),
    );

    const balance = accountTransactions.reduce((total, transaction) => {
      if (
        transaction.type === "income" &&
        transaction.accountId === account.id
      ) {
        return total + transaction.amount;
      }

      if (
        transaction.type === "expense" &&
        transaction.accountId === account.id
      ) {
        return total - transaction.amount;
      }

      if (transaction.type === "transfer") {
        if (transaction.accountId === account.id) {
          return total - transaction.amount;
        }

        if (transaction.destinationAccountId === account.id) {
          return total + transaction.amount;
        }
      }

      return total;
    }, account.initialBalance);

    return {
      ...account,
      balance,
    };
  });
}

/**
 * Calcula el cupo utilizado, disponible y deuda de cada tarjeta.
 */
export function calculateCreditCardBalances(creditCards, transactions) {
  return creditCards.map((card) => {
    const cardTransactions = transactions.filter(
      (transaction) =>
        transaction.status === "confirmed" &&
        transaction.creditCardId === card.id,
    );

    const purchases = cardTransactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          transaction.paymentMethod === "credit_card",
      )
      .reduce(
        (total, transaction) => total + transaction.amount,
        0,
      );

    const payments = cardTransactions
      .filter(
        (transaction) => transaction.type === "credit_card_payment",
      )
      .reduce(
        (total, transaction) => total + transaction.amount,
        0,
      );

    const usedCredit = Math.max(0, purchases - payments);

    return {
      ...card,
      usedCredit,
      availableCredit: Math.max(0, card.creditLimit - usedCredit),
      debt: usedCredit,
    };
  });
}
