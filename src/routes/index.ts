import { Router } from "express"
import transactionRoutes from "./transactions.route"

const routes = Router()
routes.use("/transactions", transactionRoutes)

export default routes
