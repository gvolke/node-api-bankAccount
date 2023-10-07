import TransactionRepository from "../repositories/TransactionRepository"

class ReturnBalanceService {
  private transactionRepository: TransactionRepository

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository
  }

  execute() {
    const totalIncomes = this.transactionRepository
      .all()
      .filter((transaction) => transaction.type === "income")
      .reduce((accumulator, transaction) => {
        return accumulator + transaction.value
      }, 0)

    const totalOutcomes = this.transactionRepository
      .all()
      .filter((transaction) => transaction.type === "outcome")
      .reduce((acummulator, transaction) => {
        return acummulator + transaction.value
      }, 0)

    const balance = {
      incomes: totalIncomes,
      outcomes: totalOutcomes,
      total: totalIncomes - totalOutcomes,
    }

    return balance
  }
}

export default ReturnBalanceService
