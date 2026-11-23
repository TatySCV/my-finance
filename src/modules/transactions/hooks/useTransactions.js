
import { useMemo, useState } from "react";

import { useFinance } from "../../../contexts/FinanceContext";

import {
  getTransactionsByPeriod,
  calculateTransactionSummary,
  filterTransactions,
  sortTransactionsByDate,
} from "../utils/transactionUtils";

function useTransactions() {
  const {
    transactions: allTransactions,
    addTransaction,
    accounts: financeAccounts,
  } = useFinance();

  const [period, setPeriod] = useState({
    year: 2026,
    month: 11,
  });

  const [filters, setFilters] = useState({
    type: "",
    account: "",
    category: "",
    status: "",
    search: "",
  });

  const periodTransactions = useMemo(() => {
    return getTransactionsByPeriod(
      allTransactions,
      period.year,
      period.month,
    );
  }, [allTransactions, period]);

  const summary = useMemo(() => {
    return calculateTransactionSummary(periodTransactions);
  }, [periodTransactions]);

  const transactions = useMemo(() => {
    const filtered = filterTransactions(periodTransactions, filters);

    return sortTransactionsByDate(filtered);
  }, [periodTransactions, filters]);

  // Entrega las cuentas activas con sus IDs y nombres
  const accounts = useMemo(
    () =>
      financeAccounts.filter(
        (account) => account.status === "active",
      ),
    [financeAccounts],
  );

  const categories = useMemo(() => {
    return [
      ...new Set(
        allTransactions
          .filter((item) => item.category)
          .map((item) => item.category),
      ),
    ];
  }, [allTransactions]);

  function updateFilter(name, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters({
      type: "",
      account: "",
      category: "",
      status: "",
      search: "",
    });
  }

  function handleAddTransaction(transaction) {
    const newTransaction = addTransaction(transaction);

    if (!newTransaction) {
      return false;
    }

    const [year, month] = transaction.date.split("-");

    setPeriod({
      year: Number(year),
      month: Number(month),
    });

    clearFilters();

    return true;
  }

  return {
    period,
    setPeriod,
    filters,
    updateFilter,
    clearFilters,
    transactions,
    summary,
    accounts,
    categories,
    addTransaction: handleAddTransaction,
  };
}

export default useTransactions;
