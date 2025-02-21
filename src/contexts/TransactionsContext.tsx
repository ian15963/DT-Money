import { createContext, ReactNode, useEffect, useState } from "react";

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
    const url = new URL(`http://localhost:3000/transactions`);
    if(query){
      url.searchParams.append('q', query)
    }
    const response = await fetch(url)
    const dados = await response.json();
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