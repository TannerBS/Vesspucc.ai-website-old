import React from 'react'
import styled from 'styled-components'

const ExploreContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px; // For navbar space
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const GlassPanel = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const AgentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const AgentCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
`;

const LearnMoreButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-top: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
`;

const Explore: React.FC = () => {
  // Sample agent data
  const agents = [
    { id: 1, name: 'Web Navigator', description: 'Browse and analyze web content' },
    { id: 2, name: 'Data Analyst', description: 'Process and visualize complex datasets' },
    { id: 3, name: 'Content Creator', description: 'Generate articles, images, and more' },
    { id: 4, name: 'Research Assistant', description: 'Find and summarize information' },
  ];

  return (
    <ExploreContainer>
      <ContentContainer>
        <GlassPanel>
          <Title>Explore Vespucc.ai</Title>
          <p>Discover AI agents and tools available on our platform</p>
          
          <AgentGrid>
            {agents.map(agent => (
              <AgentCard key={agent.id}>
                <h3>{agent.name}</h3>
                <p>{agent.description}</p>
                <LearnMoreButton>Learn More</LearnMoreButton>
              </AgentCard>
            ))}
          </AgentGrid>
        </GlassPanel>
      </ContentContainer>
    </ExploreContainer>
  );
};

export default Explore;