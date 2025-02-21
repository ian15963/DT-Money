import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
  query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export const SearchForm = () => {

  const {
    register, 
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  const handleSearchTransactions = (data: SearchFormInputs) => {

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