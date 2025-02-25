import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./style";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransacationFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

export type NewTransactionInputs = z.infer<typeof newTransacationFormSchema>

export const NewTransactionModal = () => {

  const saveTransactions = useContextSelector(
    TransactionContext,
    (context) => {
      return context.saveTransactions
    }
  )

  const {
    control,
    register, 
    handleSubmit,
    formState: {
      isSubmitting
    },
    reset
  } = useForm<NewTransactionInputs>({
    resolver: zodResolver(newTransacationFormSchema)
  });

  const handleNewTransactionSubmit = async (data: NewTransactionInputs) => {
    saveTransactions(data)
    reset()
  }

  return(
    <Dialog.Portal>
      <Overlay/>
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X/>
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleNewTransactionSubmit)}>
          <input 
            type="text" 
            placeholder="Descrição" 
            required
            {...register("description")}
          />
          <input 
            type="number" 
            placeholder="Preço" 
            required
            {...register("price", {valueAsNumber: true})}
          />
          <input 
            type="text" 
            placeholder="Categoria" 
            required
            {...register("category")}
          />

          <Controller
          control={control}
          name="type"
          render={({field}) => {
            return(
              <TransactionType onValueChange={field.onChange} value={field.value}>
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24}/>
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24}/>
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )
          }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}