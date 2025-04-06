import React from 'react'
import styled from 'styled-components'
import TokenStats from '../components/token/TokenStats'
import TokenPurchase from '../components/token/TokenPurchase'
import TokenUsage from '../components/token/TokenUsage'

const TokenContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  padding-top: calc(80px + ${({ theme }) => theme.spacing.xxl}); // For navbar space
  background-color: ${({ theme }) => theme.colors.background};
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.background},
    ${({ theme }) => `${theme.colors.secondary}30`}
  );
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: 2.5rem;
`;

const PageDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const TokenSections = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1000px;
  margin: 0 auto;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TokenCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
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
      
      <TokenCard style={{ marginTop: '2rem' }}>
        <TokenUsage />
      </TokenCard>
    </TokenContainer>
  );
};

export default TokenInfo;