import { Request, Response } from 'express';

interface TokenStats {
  price: number;
  marketCap: number;
  totalSupply: number;
  circulatingSupply: number;
  volume24h: number;
}

interface UserBalances {
  [key: string]: number;
}

// Mock token data
const tokenStats: TokenStats = {
  price: 0.0125,
  marketCap: 1250000,
  totalSupply: 100000000,
  circulatingSupply: 25000000,
  volume24h: 45625
};

// Mock user balances
const userBalances: UserBalances = {
  '0x1234567890abcdef': 1500,
  '0xabcdef1234567890': 25000,
  // More users would be here
};

export const getTokenStats = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ success: true, data: tokenStats });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getTokenBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { walletAddress } = req.params;
    
    if (!userBalances[walletAddress]) {
      res.json({ success: true, data: { balance: 0 } });
      return;
    }
    
    res.json({
      success: true,
      data: {
        balance: userBalances[walletAddress],
        walletAddress
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

interface PurchaseTokensRequest {
  amount: number;
  paymentMethod: string;
  walletAddress: string;
}

export const purchaseTokens = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, paymentMethod, walletAddress } = req.body as PurchaseTokensRequest;
    
    if (!amount || amount <= 0) {
      res.status(400).json({
        success: false,
        error: 'Invalid amount'
      });
      return;
    }
    
    if (!walletAddress) {
      res.status(400).json({
        success: false,
        error: 'Wallet address is required'
      });
      return;
    }
    
    // Calculate token amount based on price
    const tokenAmount = Math.floor(amount / tokenStats.price);
    
    // Here you would implement the actual purchase logic
    // For now, return a mock response
    
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    res.json({
      success: true,
      data: {
        transactionId: `tx_${Date.now()}`,
        amount,
        tokenAmount,
        paymentMethod,
        walletAddress,
        status: 'completed'
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};