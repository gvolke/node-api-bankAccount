import Transaction from "../models/Transaction"
import TransactionRepository from "../repositories/TransactionRepository"
import ReturnBalanceService from "./ReturnBalanceService"

interface Request {
  title: string
  type: string
  value: number
}

class CreateTransactionService {
  private transactionRepository: TransactionRepository

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository
  }

  public execute({ title, type, value }: Request): Transaction {
    const returnBalance = new ReturnBalanceService(this.transactionRepository)

    const isBalanceEnough =
      returnBalance.execute().total - value < 0 && type === "outcome"

    const isTypeValid = type !== "income" && type !== "outcome"

    if (isTypeValid) {
      throw Error("The type must be 'income' or 'outcome'")
    }

    if (isBalanceEnough) {
      throw Error("There is not enough balance to carry out the operation")
    }

    const transaction = this.transactionRepository.create({
      title,
      value,
      type,
    })

    return transaction
  }
}

export default CreateTransactionService
