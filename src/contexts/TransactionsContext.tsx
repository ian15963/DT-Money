import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction{
  id: number,
  description: string,
  type: "income" | "outcome",
  category: string,
  price: number,
  createdAt: string
}

interface TransactionContextType{
  transactions: Transaction[]
}

interface TransactionContextProvider{
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider = ({children}: TransactionContextProvider) => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const getAllTransactions = async () => {
    const response = await fetch(`http://localhost:3000/transactions`)
    const dados = await response.json();
    setTransactions(dados);
  }
  
  useEffect(() => {
    getAllTransactions()
  }, [])
    
  return(
    <TransactionContext.Provider value={{transactions: transactions}}>
      {children}
    </TransactionContext.Provider>
  );
}