import React from 'react'
import styled from 'styled-components'
import { Agent } from '../../pages/Agents'

interface AgentCardProps {
  agent: Agent;
}

const Card = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  transition: transform ${({ theme }) => theme.transitions.normal}, 
              box-shadow ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

const AgentIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const AgentName = styled.h3`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

const AgentDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const TokenCost = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => `${theme.colors.accent}30`};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UseButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Card>
      <AgentIcon>{agent.icon}</AgentIcon>
      <AgentName>{agent.name}</AgentName>
      <AgentDescription>{agent.description}</AgentDescription>
      <TokenCost>
        <span style={{ marginRight: '0.5rem' }}>💰</span>
        {agent.tokenCost} Tokens
      </TokenCost>
      <UseButton>Use Agent</UseButton>
    </Card>
  );
};

export default AgentCard;