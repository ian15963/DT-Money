import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { priceFormatter } from "../../util/formatter";
import { useSummary } from "../../hooks/useSummary";

export const Summary = () => {

  const summaryInfo = useSummary()

  return(
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp color="#00b37e" size={32}/>
        </header>

        <strong>{priceFormatter.format(summaryInfo?.totalIncome)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown color="#f75a68" size={32}/>
        </header>

        <strong>{priceFormatter.format(summaryInfo?.totalOutcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar color="#00b37e" size={32}/>
        </header>

        <strong>{priceFormatter.format(summaryInfo?.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}