import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Agents from './Agents'
import TokenInfo from './TokenInfo'
import Explore from './Explore'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  /* Use a relative path from the public directory, prepended with the base URL */
  background-image: url('${import.meta.env.BASE_URL}VespucciMap1.jpg');
  background-size: cover;
  background-position: top center;
  background-attachment: fixed;
`;

const ContentOverlay = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgba(245, 230, 211, 0.3), ${({ theme }) => theme.colors.background});
  padding-top: 80px; // Navbar height
  // Add overflow-x: hidden here if content inside tends to overflow horizontally
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem; // Adjusted padding for smaller screens
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 4rem 2rem; // Original padding for larger screens
  }
`;

const CallToAction = styled.div`
  text-align: center;
  margin: 2rem 0; // Adjusted margin
  padding: 2rem 1rem; // Adjusted padding
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 4rem 0;
    padding: 4rem;
  }
`;

const CTATitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.2rem; 
  }
`;

const CTAText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled.a` // Assuming it's an anchor, adjust if it's a button or Link
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
    font-size: 1.1rem;
  }
`;

const PageContainer = styled.div`
  position: relative;
`;

const PageSection = styled.div`
  min-height: 100vh;
  position: relative;
`;

const PageDivider = styled.div`
  height: 100px;
  background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.colors.background} 50%, transparent);
  position: relative;
  z-index: 10;
  margin: 2rem 0;
`;

const Home: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [visiblePages, _] = useState<string[]>(['home']);
  
  // Removed automatic page transition on scroll to keep pages separate
  // Initial state only shows the home page
  useEffect(() => {
    // No scroll event listener needed as we're not auto-loading pages
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    
    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [visiblePages]);
  
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <PageContainer>
      <PageSection>
        <HomeContainer>
          <ContentOverlay>
            <Section ref={addToRefs}>
              <Hero />
            </Section>
            <Section ref={addToRefs}>
              <Features />
            </Section>
            <Section ref={addToRefs}>
              <CallToAction>
                <CTATitle>Ready to explore with Vespucc.ai?</CTATitle>
                <CTAText>Join our community of explorers and discover the digital frontier with AI-powered navigation tools.</CTAText>
                <CTAButton href="https://discord.gg/ttAV3CZk" target="_blank" rel="noopener noreferrer">
                  Get Started
                </CTAButton>
              </CallToAction>
            </Section>
          </ContentOverlay>
        </HomeContainer>
      </PageSection>
      
      {visiblePages.includes('agents') && (
        <>
          <PageDivider />
          <PageSection ref={addToRefs}>
            <Agents />
          </PageSection>
        </>
      )}
      
      {visiblePages.includes('tokens') && (
        <>
          <PageDivider />
          <PageSection ref={addToRefs}>
            <TokenInfo />
          </PageSection>
        </>
      )}
      
      {visiblePages.includes('explore') && (
        <>
          <PageDivider />
          <PageSection ref={addToRefs}>
            <Explore />
          </PageSection>
        </>
      )}
    </PageContainer>
  );
};

export default Home;