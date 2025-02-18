import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction{
  id: number,
  description: string,
  type: string,
  category: string,
  price: number,
  createdAt: string
}

export const Transactions = () => {

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
    <div>
      <Header/>
      <Summary/>
      <TransactionsContainer>
        <SearchForm/>
        <TransactionsTable>
          <tbody>
              {transactions?.map(transaction => {
                return(
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                    <PriceHighlight variant="income">
                      {transaction.price}
                    </PriceHighlight>
                    </td>
                    <td>{transaction.type}</td>
                    <td>{transaction.createdAt}</td>
                  </tr>
                )
              })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}