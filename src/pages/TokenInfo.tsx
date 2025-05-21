import React from 'react'
import styled from 'styled-components'
import TokenStats from '../components/token/TokenStats.tsx'
import TokenPurchase from '../components/token/TokenPurchase.tsx'
import TokenUsage from '../components/token/TokenUsage.tsx'

const TokenContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`}; // Adjusted padding
  padding-top: calc(80px + ${({ theme }) => theme.spacing.lg}); // Adjusted top padding
  background-size: cover;
  background-position: top center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden; // Keep this

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
    padding-top: calc(80px + ${({ theme }) => theme.spacing.xxl});
  }
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md}; // Adjusted margin
  text-align: center;
  font-size: 2rem; // Adjusted font size
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const PageDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg}; // Adjusted margin
  font-size: 1rem; // Adjusted font size
  color: ${({ theme }) => theme.colors.secondary};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.2rem;
    margin: 0 auto ${({ theme }) => theme.spacing.xl};
  }
`;

const TokenSections = styled.div`
  display: grid;
  grid-template-columns: 1fr; // Single column by default for mobile
  gap: ${({ theme }) => theme.spacing.lg}; // Adjusted gap for mobile
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr; // Two columns for larger screens
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const TokenCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md}; // Adjusted padding
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const TokenInfo: React.FC = () => {
  return (
    <TokenContainer>
      <PageTitle>Vespucc.ai Tokens</PageTitle>
      <PageDescription>
        Our tokens power the Vespucc.ai ecosystem, giving you access to AI agents and exclusive features.
        Hold tokens to unlock capabilities, spend them to use advanced agent features.
      </PageDescription>
      
      
      <TokenSections>
        <TokenCard>
          <TokenStats />
        </TokenCard>
        
        <TokenCard>
          <TokenPurchase />
        </TokenCard>
      </TokenSections>
      
      <TokenCard style={{ marginTop: '2rem', position: 'relative', zIndex: 1 }}>
        <TokenUsage />
      </TokenCard>
    </TokenContainer>
  );
};

export default TokenInfo;