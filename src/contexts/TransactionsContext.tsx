import { ReactNode, useCallback, useEffect, useState } from "react";
import { API } from "../lib/axios";
import { createContext } from "use-context-selector";
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
  fetchTransactions: (query?: string) => Promise<void>,
  saveTransactions: (data: CreateTransaction) => Promise<void>
}

interface TransactionContextProvider{
  children: ReactNode
}

interface CreateTransaction{
  description: string,
  category: string,
  type: 'income' | 'outcome',
  price: number
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider = ({children}: TransactionContextProvider) => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const fetchTransactions = useCallback(async (query?: string) => {
      const response = await API.get('/transactions', {
        params: {
          _sort: "createdAt",
          _order: "desc",
          q: query
        }
      })
      const dados = await response.data;
      setTransactions(dados);
    }, [])

  const saveTransactions = useCallback(async (data: CreateTransaction) => {
    const {description, category, price, type} = data

    const response = await API.post(`/transactions`, {
          description: description,
          category: category,
          price: price,
          type: type,
          createdAt: new Date()
        })
    
      setTransactions(state => [response.data, ...state])
  }, [])
  
  useEffect(() => {
    fetchTransactions()
  }, [])
    
  return(
    <TransactionContext.Provider value={{
      transactions: transactions,
      fetchTransactions: fetchTransactions,
      saveTransactions: saveTransactions
      }}>
      {children}
    </TransactionContext.Provider>
  );
}