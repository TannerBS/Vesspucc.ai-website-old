import express from 'express';
import * as tokenController from '../controllers/tokenController';

const router = express.Router();

// Get token stats
router.get('/stats', tokenController.getTokenStats);

// Get user token balance
router.get('/balance/:walletAddress', tokenController.getTokenBalance);

// Purchase tokens
router.post('/purchase', tokenController.purchaseTokens);

export default router;