import { useContext } from "react";
import { Transaction, TransactionContext } from "../contexts/TransactionsContext";

interface SummaryInfo{
  totalIncome: number,
  totalOutcome: number,
  total: number
}

export const useSummary = () => {

  const {transactions} = useContext(TransactionContext)

  const calculateSummary = (transactions: Transaction[]) => {
    const summary = {} as SummaryInfo
    summary['totalIncome'] = transactions?.filter(transaction => transaction.type == 'income')
      ?.map(t => t.price)?.reduce((a, b) => a +b, 0);
    summary['totalOutcome'] = transactions?.filter(transaction => transaction.type == 'outcome')
    ?.map(t => t.price)?.reduce((a, b) => a +b, 0)
    
    const total = summary['totalIncome'] - summary['totalOutcome'];
    summary['total'] = !isNaN(total) ? total : 0;
    return summary;
  }

  return calculateSummary(transactions)
}