import express from 'express';
import transactionControllers from '../controllers/transactionController';
import { transactionValidator } from '../middlewares/transactionValidator';

const router = express.Router();

router.get('/', transactionControllers.getTransactions);
router.post('/deposit', transactionValidator, transactionControllers.deposit);
router.post('/create/withdraw',transactionValidator, transactionControllers.withdrawal);

export default router;
