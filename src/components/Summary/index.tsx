import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext, useEffect, useState } from "react";
import { Transaction, TransactionContext } from "../../contexts/TransactionsContext";

interface SummaryInfo{
  totalIncome: number,
  totalOutcome: number,
  total: number
}

export const Summary = () => {
  let summaryInfo;
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

  summaryInfo = calculateSummary(transactions)

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