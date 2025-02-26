import { useCallback, useMemo } from "react";
import { Transaction, TransactionContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

interface SummaryInfo{
  totalIncome: number,
  totalOutcome: number,
  total: number
}

export const useSummary = () => {

  const transactions = useContextSelector(TransactionContext,
    (context) => {
      return context.transactions
    }
  )

  const calculateSummary = useCallback((transactions: Transaction[]) => {
    const summary = {} as SummaryInfo
    summary['totalIncome'] = transactions?.filter(transaction => transaction.type == 'income')
      ?.map(t => t.price)?.reduce((a, b) => a +b, 0);
    summary['totalOutcome'] = transactions?.filter(transaction => transaction.type == 'outcome')
    ?.map(t => t.price)?.reduce((a, b) => a +b, 0)
    
    const total = summary['totalIncome'] - summary['totalOutcome'];
    summary['total'] = !isNaN(total) ? total : 0;
    return summary;
  }, [])

  const summaryInfo = useMemo(() => {
    return calculateSummary(transactions)
  }, transactions)

  return summaryInfo
}