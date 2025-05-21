import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import WhitePaperModal from '../common/WhitePaperModal';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing.lg} 0`}; // Adjusted padding
  margin-top: ${({ theme }) => theme.spacing.xl}; // Adjusted margin

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xl} 0`};
    margin-top: ${({ theme }) => theme.spacing.xxl};
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr; // Single column for mobile
  gap: ${({ theme }) => theme.spacing.lg}; // Adjusted gap

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); // Adjust minmax and breakpoint
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.xl};
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); // Original for larger
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  // text-align: center; // Center text for mobile if desired
  // @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
  //   text-align: left; // Revert for larger screens
  // }
`;

const FooterTitle = styled.h3`
  font-size: 1.1rem; // Adjusted font size
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // Adjusted margin
  color: ${({ theme }) => theme.colors.accent};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.25rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.background};
  margin-bottom: ${({ theme }) => theme.spacing.xs}; // Adjusted margin
  font-size: 0.9rem; // Adjusted font size
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem; // Reset to original or adjust as needed
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const DocButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.background};
  margin-bottom: ${({ theme }) => theme.spacing.xs}; // Adjusted margin
  text-align: left;
  font-family: inherit;
  font-size: 0.9rem; // Adjusted font size
  padding: 0;
  /* Removed cursor: pointer to maintain the feather cursor */
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem; // Reset to original or adjust as needed
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.background};
  font-size: 1.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
`;

const Footer: React.FC = () => {
  const [isWhitePaperOpen, setIsWhitePaperOpen] = useState(false);

  const openWhitePaper = () => {
    setIsWhitePaperOpen(true);
  };

  const closeWhitePaper = () => {
    setIsWhitePaperOpen(false);
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Vespucc.ai</FooterTitle>
          <p>Exploring the digital frontier with AI agents and cryptocurrency.</p>
          <SocialLinks>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              𝕏
            </SocialIcon>
            <SocialIcon href="https://discord.com" target="_blank" rel="noopener noreferrer">
              𝔻
            </SocialIcon>
            <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer">
              𝔾
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Navigation</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/explore">Explore</FooterLink>
          <FooterLink to="/agents">AI Agents</FooterLink>
          <FooterLink to="/token">Token Info</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/faq">FAQ</FooterLink>
          <DocButton onClick={openWhitePaper}>Documentation</DocButton>
          <FooterLink to="/tutorials">Tutorials</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/disclaimer">Disclaimer</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} Vespucc.ai. All rights reserved.
      </Copyright>
      
      {/* Add the WhitePaper Modal */}
      <WhitePaperModal isOpen={isWhitePaperOpen} onClose={closeWhitePaper} />
    </FooterContainer>
  );
};

export default Footer;