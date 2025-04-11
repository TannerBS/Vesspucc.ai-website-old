import React from 'react'
import styled from 'styled-components'
import ChatBot from '../components/explore/ChatBot'

const ExploreContainer = styled.div`
  min-height: 100vh;
  background-image: url('/src/assets/images/VespucciMap2.jpg');
  background-size: cover;
  background-position: top center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
`;

const ContentOverlay = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgba(245, 230, 211, 0.3), ${({ theme }) => theme.colors.background});
  padding-top: 150px; // For navbar space
  padding-left: ${({ theme }) => theme.spacing.xl};
  padding-right: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
`;

const GlassPanel = styled.div`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Explore: React.FC = () => {
  return (
    <ExploreContainer>
      <ContentOverlay>
        <GlassPanel>
          <Title>Chat with Vespucc.ai</Title>
          <p>Interact with our AI assistant to explore the platform</p>
          <ChatBot />
        </GlassPanel>
      </ContentOverlay>
    </ExploreContainer>
  );
};

export default Explore;