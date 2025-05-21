import React, { useState } from 'react'
import styled from 'styled-components'
import AgentCard from '../components/agents/AgentCard'
import AgentFilter from '../components/agents/AgentFilter'

const AgentsContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.md}`}; // Adjusted horizontal padding
  padding-top: calc(80px + ${({ theme }) => theme.spacing.xl}); // Adjusted top padding for smaller screens
  background-size: cover;
  background-position: top center;
  background-attachment: fixed;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.sm}`}; // Further reduce padding for mobile
    padding-top: calc(70px + ${({ theme }) => theme.spacing.lg}); // Adjust navbar space
  }
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg}; // Adjusted margin
  text-align: center;
  font-size: 2rem; // Adjusted font size for mobile
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const GlassPanel = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md}; // Adjusted padding
  margin: 0 auto ${({ theme }) => theme.spacing.lg}; // Adjusted margin
  max-width: 800px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin: 0 auto ${({ theme }) => theme.spacing.xl};
  }
`;

const PageDescription = styled.p`
  text-align: center;
  font-size: 1rem; // Adjusted font size
  color: ${({ theme }) => theme.colors.secondary};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`;

const AgentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); // Adjusted minmax
  gap: ${({ theme }) => theme.spacing.md}; // Adjusted gap
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.lg};
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

export interface Agent {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  tokenCost: number | string;
}

// Mock data for agents
const mockAgents: Agent[] = [
  {
    id: 1,
    name: 'Web Navigator',
    description: 'Browses the web and retrieves information from various sources.',
    icon: '🌐',
    category: 'research',
    tokenCost: '-',
  },
  {
    id: 2,
    name: 'Data Analyst',
    description: 'Processes and analyzes complex datasets to extract insights.',
    icon: '📊',
    category: 'data',
    tokenCost: '-',
  },
  {
    id: 3,
    name: 'Content Creator',
    description: 'Generates articles, blog posts, and creative content.',
    icon: '✍️',
    category: 'creative',
    tokenCost: '-',
  },
  {
    id: 4,
    name: 'Code Assistant',
    description: 'Helps write, debug, and optimize code in various languages.',
    icon: '💻',
    category: 'development',
    tokenCost: '-',
  },
  {
    id: 5,
    name: 'Market Analyzer',
    description: 'Tracks crypto markets and provides investment insights.',
    icon: '📈',
    category: 'finance',
    tokenCost: '-',
  },
  {
    id: 6,
    name: 'Learning Guide',
    description: 'Creates personalized learning paths and educational materials.',
    icon: '🎓',
    category: 'education',
    tokenCost: '-',
  },
];

const Agents: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredAgents = filter === 'all' 
    ? mockAgents 
    : mockAgents.filter(agent => agent.category === filter);
  
  return (
    <AgentsContainer>
      <GlassPanel>
      <PageTitle>AI Agents</PageTitle>
      <PageDescription>
        Unlock powerful AI agents to assist with research, content creation, development, and more.
        Use your tokens to access these capabilities.
      </PageDescription>
    </GlassPanel>
      
      <AgentFilter filter={filter} setFilter={setFilter} />
      
      <AgentsGrid>
        {filteredAgents.map((agent, index) => {
          // Alternate animation directions for visual interest
          const animationType = index % 3 === 0 ? 'right' : index % 3 === 1 ? 'up' : 'left';
          return (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              animationType={animationType} 
              index={index}
            />
          );
        })}
      </AgentsGrid>
    </AgentsContainer>
  );
};

export default Agents;