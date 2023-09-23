import { Router } from "express"
import { uuid } from "uuidv4"

const transactionRoutes = Router()

interface transaction {
  title: string
  value: number
  type: string
}

const transactions: transaction[] = []

function getTotalIncomes() {
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  )

  const totalIncomes = incomeTransactions.reduce((accumulator, transaction) => {
    return accumulator + transaction.value
  }, 0)

  return totalIncomes
}

function getTotalOutcomes() {
  const outcomeTransactions = transactions.filter(
    (transaction) => transaction.type === "outcome"
  )

  const totalOutcomes = outcomeTransactions.reduce(
    (acummulator, transaction) => {
      return acummulator + transaction.value
    },
    0
  )

  return totalOutcomes
}

function findBalance() {
  const balance = {
    income: getTotalIncomes(),
    outcome: getTotalOutcomes(),
    total: getTotalIncomes() - getTotalOutcomes(),
  }

  return balance
}

transactionRoutes.get("/", (request, response) => {
  const transactionsWithBalance = {
    transactions: transactions,
    balance: findBalance(),
  }

  response.json(transactionsWithBalance)
})

transactionRoutes.post("/", (request, response) => {
  const { title, value, type } = request.body
  const isBalanceEnough =
    getTotalIncomes() - (getTotalOutcomes() + value) < 0 && type === "outcome"
  const isTypeValid = type !== "income" && type !== "outcome"

  if (isTypeValid) {
    return response
      .status(400)
      .json({ error: "The type must be 'income' or 'outcome'" })
  }

  if (isBalanceEnough) {
    return response
      .status(400)
      .json({ error: "There is not enough balance to carry out the operation" })
  }

  const transaction = {
    id: uuid(),
    title,
    value,
    type,
  }
  transactions.push(transaction)

  return response.json(transaction)
})

export default transactionRoutes
