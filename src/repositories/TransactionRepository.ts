import Transaction from "../models/Transaction"
import ReturnBalanceService from "../services/ReturnBalanceService"

interface createTransactionDTO {
  title: string
  value: number
  type: string
}

class TransactionRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  all() {
    return this.transactions
  }

  balance() {
    const returnBalance = new ReturnBalanceService(this)

    const transactionsWithBalance = {
      transactions: this.transactions,
      balance: returnBalance.execute(),
    }

    return transactionsWithBalance
  }

  create({ title, value, type }: createTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionRepository
