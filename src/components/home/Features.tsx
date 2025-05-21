import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

const FeaturesSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} 0`}; // Adjusted padding
  background-color: rgba(255, 255, 255, 0.3);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xxl} 0`};
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}; // Adjusted margin
  font-size: 2rem; // Adjusted font size
  color: ${({ theme }) => theme.colors.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; // Single column for smallest screens
  gap: ${({ theme }) => theme.spacing.lg}; // Adjusted gap
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};


  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) { // Start two columns earlier if desired
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); // Adjusted minmax
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.xl};
    padding: 0 ${({ theme }) => theme.spacing.md}; // Keep md padding or adjust if needed
  }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(100px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-100px); }
  to { opacity: 1; transform: translateX(0); }
`;

const FeatureCard = styled.div<{ animationType?: 'left' | 'right' | 'none' }>`
  background: rgba(255, 255, 255, 0.7);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  opacity: 0;
  
  &.visible {
    opacity: 1;
    animation: ${({ animationType }) => 
      animationType === 'right' ? slideInRight : 
      animationType === 'left' ? slideInLeft : 'none'} 0.8s forwards;
  }
  
  &.visible:hover {
    transform: translateY(-5px) !important;
    box-shadow: ${({ theme }) => theme.boxShadow.lg} !important;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 1.6;
`;

const Features: React.FC = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    featureRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    
    return () => {
      featureRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);
  
  return (
    <FeaturesSection>
      <SectionTitle>Discover a New World</SectionTitle>
      <FeaturesGrid>
        <FeatureCard 
          animationType="right"
          ref={(el) => { featureRefs.current[0] = el; }}
        >
          <FeatureIcon>🤖</FeatureIcon>
          <FeatureTitle>AI Agents</FeatureTitle>
          <FeatureDescription>
            Connect to a variety of MCP servers and access cutting-edge AI tools and data sources through our advanced AI agents.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard
          animationType="none"
          ref={(el) => { featureRefs.current[1] = el; }}
        >
          <FeatureIcon>💰</FeatureIcon>
          <FeatureTitle>Crypto Payments</FeatureTitle>
          <FeatureDescription>
            Hold and spend our tokens to unlock the full capabilities of our AI agents and exclusive features.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard 
          animationType="left"
          ref={(el) => { featureRefs.current[2] = el; }}
        >
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