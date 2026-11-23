
import { createContext, useContext, useMemo, useState } from "react";

import { transactionMockData } from "../modules/transactions/data/transactionMockData";
import { dashboardMockData } from "../modules/dashboard/data/dashboardMockData";

import {
  calculateAccountBalances,
  calculateCreditCardBalances,
} from "../modules/transactions/utils/transactionUtils";

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(transactionMockData);

  // Cuentas bancarias y billeteras
  const [accountList, setAccountList] = useState(
    dashboardMockData.accounts.map((account) => ({
      ...account,
      type: account.type || "bank",
      status: account.status || "active",
    })),
  );

  // Tarjetas de crédito
  const [creditCards, setCreditCards] = useState([]);

  // Calcula los saldos de las cuentas bancarias
  const accounts = useMemo(() => {
    return calculateAccountBalances(accountList, transactions);
  }, [accountList, transactions]);

  // Calcula el cupo utilizado, disponible y deuda de cada tarjeta
  const calculatedCreditCards = useMemo(() => {
    return calculateCreditCardBalances(creditCards, transactions);
  }, [creditCards, transactions]);

  // -----------------------------
  // CUENTAS
  // -----------------------------

  function addAccount(accountData) {
    const newAccount = {
      ...accountData,
      id: Date.now(),
      status: "active",
    };

    setAccountList((current) => [...current, newAccount]);

    return newAccount;
  }

  function updateAccount(accountId, updatedData) {
    setAccountList((current) =>
      current.map((account) =>
        String(account.id) === String(accountId)
          ? { ...account, ...updatedData }
          : account,
      ),
    );
  }

  function deactivateAccount(accountId) {
    setAccountList((current) =>
      current.map((account) =>
        String(account.id) === String(accountId)
          ? { ...account, status: "inactive" }
          : account,
      ),
    );
  }

  function reactivateAccount(accountId) {
    setAccountList((current) =>
      current.map((account) =>
        String(account.id) === String(accountId)
          ? { ...account, status: "active" }
          : account,
      ),
    );
  }

  function deleteAccount(accountId) {
    const account = accountList.find(
      (item) => String(item.id) === String(accountId),
    );

    if (!account) return false;

    const hasTransactions = transactions.some(
      (transaction) =>
        String(transaction.accountId) === String(accountId) ||
        String(transaction.destinationAccountId) === String(accountId),
    );

    if (hasTransactions) return false;

    setAccountList((current) =>
      current.filter(
        (item) => String(item.id) !== String(accountId),
      ),
    );

    return true;
  }

  function isAccountActive(accountId) {
    return accountList.some(
      (account) =>
        String(account.id) === String(accountId) &&
        account.status === "active",
    );
  }

  // -----------------------------
  // TARJETAS DE CRÉDITO
  // -----------------------------

  function addCreditCard(cardData) {
    const newCreditCard = {
      ...cardData,
      id: Date.now(),
      status: "active",
    };

    setCreditCards((current) => [...current, newCreditCard]);

    return newCreditCard;
  }

  function updateCreditCard(cardId, updatedData) {
    setCreditCards((current) =>
      current.map((card) =>
        card.id === cardId ? { ...card, ...updatedData } : card,
      ),
    );
  }

  function deactivateCreditCard(cardId) {
    setCreditCards((current) =>
      current.map((card) =>
        card.id === cardId ? { ...card, status: "inactive" } : card,
      ),
    );
  }

  function reactivateCreditCard(cardId) {
    setCreditCards((current) =>
      current.map((card) =>
        card.id === cardId ? { ...card, status: "active" } : card,
      ),
    );
  }

  function deleteCreditCard(cardId) {
    const card = creditCards.find((item) => item.id === cardId);

    if (!card) return false;

    const hasTransactions = transactions.some(
      (transaction) => transaction.creditCardId === cardId,
    );

    if (hasTransactions) return false;

    setCreditCards((current) =>
      current.filter((item) => item.id !== cardId),
    );

    return true;
  }

  function isCreditCardActive(cardId) {
    return creditCards.some(
      (card) => card.id === cardId && card.status === "active",
    );
  }

  // -----------------------------
  // MOVIMIENTOS
  // -----------------------------

  function addTransaction(transaction) {
    // Busca la cuenta de origen por ID
    const originAccount = accountList.find(
      (account) =>
        String(account.id) === String(transaction.accountId),
    );

    // La cuenta de origen debe existir y estar activa
    if (!originAccount || originAccount.status !== "active") {
      return null;
    }

    let destinationAccount = null;

    // Validaciones para transferencias
    if (transaction.type === "transfer") {
      destinationAccount = accountList.find(
        (account) =>
          String(account.id) ===
          String(transaction.destinationAccountId),
      );

      if (
        !destinationAccount ||
        destinationAccount.status !== "active"
      ) {
        return null;
      }

      if (String(originAccount.id) === String(destinationAccount.id)) {
        return null;
      }
    }

    const newTransaction = {
      ...transaction,
      id: Date.now(),
      accountId: originAccount.id,
      ...(transaction.type === "transfer"
        ? { destinationAccountId: destinationAccount.id }
        : {}),
    };

    setTransactions((current) => [...current, newTransaction]);

    return newTransaction;
  }

  // -----------------------------
  // CONTEXTO
  // -----------------------------

  const value = {
    accounts,
    transactions,
    creditCards: calculatedCreditCards,

    // Cuentas
    addAccount,
    updateAccount,
    deactivateAccount,
    reactivateAccount,
    deleteAccount,
    isAccountActive,

    // Tarjetas
    addCreditCard,
    updateCreditCard,
    deactivateCreditCard,
    reactivateCreditCard,
    deleteCreditCard,
    isCreditCardActive,

    // Movimientos
    addTransaction,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error(
      "useFinance debe utilizarse dentro de FinanceProvider",
    );
  }

  return context;
}
