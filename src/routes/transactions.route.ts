import { Router } from "express"

import TransactionRepository from "../repositories/TransactionRepository"

import CreateTransactionService from "../services/CreateTransactionService"

const transactionRoutes = Router()
const transactionRepository = new TransactionRepository()

transactionRoutes.get("/", (request, response) => {
  const transactionsWithBalance = transactionRepository.balance()

  return response.json(transactionsWithBalance)
})

transactionRoutes.post("/", (request, response) => {
  try {
    const { title, value, type } = request.body

    const createTransaction = new CreateTransactionService(
      transactionRepository
    )

    const transaction = createTransaction.execute({ title, value, type })

    return response.json(transaction)
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message })
    }
  }
})

export default transactionRoutes
