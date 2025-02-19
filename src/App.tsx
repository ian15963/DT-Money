import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { Transactions } from "./pages/Transactions"
import { TransactionContextProvider } from "./contexts/TransactionsContext"

function App() {

  return (
    <TransactionContextProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle/>
        <Transactions/>
      </ThemeProvider>
    </TransactionContextProvider>
  )

}
export default App
