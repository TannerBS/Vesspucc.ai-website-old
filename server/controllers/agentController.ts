import { Request, Response } from 'express';

interface Agent {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  tokenCost: number;
  capabilities: string[];
}

// Mock data for development
const agents: Agent[] = [
  {
    id: 1,
    name: 'Web Navigator',
    description: 'Browses the web and retrieves information from various sources.',
    icon: '🌐',
    category: 'research',
    tokenCost: 5,
    capabilities: ['web_search', 'content_extraction', 'summarization']
  },
  {
    id: 2,
    name: 'Data Analyst',
    description: 'Processes and analyzes complex datasets to extract insights.',
    icon: '📊',
    category: 'data',
    tokenCost: 10,
    capabilities: ['data_processing', 'visualization', 'statistics']
  },
  // More agents would be here
];

export const getAllAgents = async (req: Request, res: Response): Promise<void> => {
  try {
    // Filter by category if provided
    const category = req.query.category as string;
    
    if (category && category !== 'all') {
      const filteredAgents = agents.filter(agent => agent.category === category);
      res.json({ success: true, data: filteredAgents });
      return;
    }
    
    res.json({ success: true, data: agents });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAgentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const agent = agents.find(a => a.id === parseInt(req.params.id));
    
    if (!agent) {
      res.status(404).json({ success: false, error: 'Agent not found' });
      return;
    }
    
    res.json({ success: true, data: agent });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

interface ExecuteTaskRequest {
  task: string;
  parameters: Record<string, any>;
}

export const executeAgentTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { task, parameters } = req.body as ExecuteTaskRequest;
    
    const agent = agents.find(a => a.id === parseInt(id));
    
    if (!agent) {
      res.status(404).json({ success: false, error: 'Agent not found' });
      return;
    }
    
    // Here you would implement the actual agent execution logic
    // For now, return a mock response
    
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    res.json({
      success: true,
      data: {
        result: `Task executed successfully by ${agent.name}`,
        taskId: Date.now(),
        tokensCost: agent.tokenCost,
        // More response data would go here
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};