import React from 'react'
import styled from 'styled-components'

const FeaturesSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} 0`};
  background-color: rgba(255, 255, 255, 0.3);
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  transition: transform ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.accent};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.secondary};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 1.6;
`;

const Features: React.FC = () => {
  return (
    <FeaturesSection>
      <SectionTitle>Discover a New World</SectionTitle>
      <FeaturesGrid>
        <FeatureCard>
          <FeatureIcon>🤖</FeatureIcon>
          <FeatureTitle>AI Agents</FeatureTitle>
          <FeatureDescription>
            Connect to a variety of MCP servers and access cutting-edge AI tools and data sources through our advanced AI agents.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>💰</FeatureIcon>
          <FeatureTitle>Crypto Payments</FeatureTitle>
          <FeatureDescription>
            Hold and spend our tokens to unlock the full capabilities of our AI agents and exclusive features.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🌐</FeatureIcon>
          <FeatureTitle>3D Experience</FeatureTitle>
          <FeatureDescription>
            Explore our platform through an immersive 3D interface inspired by historical cartography and modern web aesthetics.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
    </FeaturesSection>
  );
};

export default Features;