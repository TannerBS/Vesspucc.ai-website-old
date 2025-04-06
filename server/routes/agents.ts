import express from 'express';
import * as agentController from '../controllers/agentController';

const router = express.Router();

// Get all agents
router.get('/', agentController.getAllAgents);

// Get agent by ID
router.get('/:id', agentController.getAgentById);

// Execute agent task
router.post('/:id/execute', agentController.executeAgentTask);

export default router;