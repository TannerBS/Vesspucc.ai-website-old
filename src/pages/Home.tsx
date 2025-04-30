import React from 'react'
import styled from 'styled-components'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'

const HomeContainer = styled.div`
  min-height: 100vh;
  background-image: url('/src/assets/images/VespucciMap1.jpg');
  background-size: cover;
  background-position: top center;
  background-attachment: fixed;
`;

const ContentOverlay = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgba(245, 230, 211, 0.3), ${({ theme }) => theme.colors.background});
  padding-top: 80px;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const CallToAction = styled.div`
  text-align: center;
  margin: 4rem 0;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const CTAButton = styled.a`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  display: inline-block;
  text-decoration: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <ContentOverlay>
        <Hero />
        <Section>
          <Features />
        </Section>
        <Section>
          <CallToAction>
            <CTATitle>Ready to explore with Vespucc.ai?</CTATitle>
            <p>Join our community of explorers and discover the digital frontier.</p>
            <CTAButton href="https://discord.gg/ttAV3CZk" target="_blank" rel="noopener noreferrer">
              Get Started
            </CTAButton>
          </CallToAction>
        </Section>
      </ContentOverlay>
    </HomeContainer>
  );
};

export default Home;