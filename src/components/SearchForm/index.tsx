import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const searchFormSchema = z.object({
  query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export const SearchForm = () => {

  const fetchTransactions = useContextSelector(TransactionContext,
    (context) => {
      return context.fetchTransactions
    }
  )

  const {
    register, 
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  const handleSearchTransactions = async (data: SearchFormInputs) => {
    await fetchTransactions(data.query)
  }

  return(
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Buscar por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20}/>
        Buscar
      </button>
    </SearchFormContainer>
  );
}