import { createContext, ReactNode, useEffect, useState } from "react";
import { API } from "../lib/axios";

export interface Transaction{
  id: number,
  description: string,
  type: "income" | "outcome",
  category: string,
  price: number,
  createdAt: string
}

interface TransactionContextType{
  transactions: Transaction[],
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionContextProvider{
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider = ({children}: TransactionContextProvider) => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const fetchTransactions = async (query?: string) => {
    const response = await API.get('/transactions', {
      params: {
        q: query
      }
    })
    const dados = await response.data;
    setTransactions(dados);
  }
  
  useEffect(() => {
    fetchTransactions()
  }, [])
    
  return(
    <TransactionContext.Provider value={{
      transactions: transactions,
      fetchTransactions: fetchTransactions
      }}>
      {children}
    </TransactionContext.Provider>
  );
}