import express from 'express';
import accountControllers from '../controllers/accountController';
import { createAccountValidator } from '../middlewares/accountValidator';

//createAccount,  getAccounts
const router = express.Router();

router.post('/', createAccountValidator, accountControllers.createAccount);
router.get('/', accountControllers.getAccounts);

export default router;
