import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";

interface SummaryInfo{
  totalIncome: number,
  totalOutcome: number,
  total: number
}

export const Summary = () => {

  const [summaryInfo, setSummaryInfo] = useState<SummaryInfo>();
  const {transactions} = useContext(TransactionContext)

  useEffect(() => {
    const summary = {} as SummaryInfo
    summary['totalIncome'] = transactions?.filter(transaction => transaction.type == 'income')
      ?.map(t => t.price)?.reduce((a, b) => a +b, 0);
    summary['totalOutcome'] = transactions?.filter(transaction => transaction.type == 'outcome')
    ?.map(t => t.price)?.reduce((a, b) => a +b, 0)
    summary['total'] = summary['totalIncome'] - summary['totalOutcome']

    setSummaryInfo(summary)
  }, [])

  return(
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp color="#00b37e" size={32}/>
        </header>

        <strong>{summaryInfo?.totalIncome}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown color="#f75a68" size={32}/>
        </header>

        <strong>{summaryInfo?.totalOutcome}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar color="#00b37e" size={32}/>
        </header>

        <strong>{summaryInfo?.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}