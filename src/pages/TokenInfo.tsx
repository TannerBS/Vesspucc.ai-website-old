import React from 'react'
import styled from 'styled-components'
import TokenStats from '../components/token/TokenStats.tsx'
import TokenPurchase from '../components/token/TokenPurchase.tsx'
import TokenUsage from '../components/token/TokenUsage.tsx'

const TokenContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  padding-top: calc(80px + ${({ theme }) => theme.spacing.xxl}); // For navbar space
  background-image: url('/src/assets/images/VespucciMap4.jpg');
  background-size: cover;
  background-position: top center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const PageDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const TokenSections = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TokenCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const TokenInfo: React.FC = () => {
  return (
    <TokenContainer>
      <TokenCard style={{ marginTop: '2rem', marginBottom: '2rem', marginRight: 'auto', marginLeft: 'auto', maxWidth: '72vw', position: 'relative', zIndex: 1 }}>
      <PageTitle>Vespucc.ai Tokens</PageTitle>
      <PageDescription>
        Our tokens power the Vespucc.ai ecosystem, giving you access to AI agents and exclusive features.
        Hold tokens to unlock capabilities, spend them to use advanced agent features.
      </PageDescription>
      </TokenCard>
      
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