import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeroSection = styled.section`
  min-height: 80vh; // Adjusted min-height
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg}; // Adjusted padding

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 90vh;
    padding: ${({ theme }) => theme.spacing.xxl};
  }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: ${({ theme }) => theme.spacing.lg}; // Adjusted padding
  max-width: 800px;
  width: 90%; // Ensure it doesn't exceed screen width
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.boxShadow.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
    width: auto; // Reset width for larger screens
  }
`;

const Title = styled.h1`
  font-size: 2.5rem; // Adjusted font size
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // Adjusted margin
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem; // Adjusted font size
  margin-bottom: ${({ theme }) => theme.spacing.lg}; // Adjusted margin
  color: ${({ theme }) => theme.colors.secondary};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const HeroButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  font-weight: 600;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  /* Removed cursor: pointer to maintain the feather cursor */
  transition: all ${({ theme }) => theme.transitions.normal};
  margin: ${({ theme }) => theme.spacing.md};
  display: inline-block;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: 0.9rem;
    margin: ${({ theme }) => theme.spacing.xs};
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroSection>
      <GlassCard>
        <Title>Vespucc.ai</Title>
        <Subtitle>Discover a new world of AI exploration powered by cryptocurrency.</Subtitle>
        <div>
          <HeroButton to="/explore">Start Exploring</HeroButton>
          <HeroButton to="/token">Learn About Tokens</HeroButton>
        </div>
      </GlassCard>
    </HeroSection>
  )
}

export default Hero