import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Theme } from '../../styles/theme'

interface NavbarContainerProps {
  $scrolled: boolean;
  theme?: Theme;
}

const NavbarContainer = styled.header<NavbarContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.header};
  padding: ${({ theme }) => theme.spacing.md};
  transition: background-color ${({ theme }) => theme.transitions.normal};
  background-color: rgba(245, 230, 211, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.header};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

interface NavLinksProps {
  $isOpen: boolean;
  theme?: Theme;
}

const NavLinks = styled.nav<NavLinksProps>`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: rgba(245, 230, 211, 0.95);
    padding: ${({ theme }) => theme.spacing.md};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
`;

interface NavLinkProps {
  $isActive: boolean;
  theme?: Theme;
}

const NavLink = styled(Link)<NavLinkProps>`
  margin: 0 ${({ theme }) => theme.spacing.md};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.accent : theme.colors.secondary};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0')};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
    transition: width ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

const TokenButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white} !important;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-left: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
  display: inline-block;
  text-align: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing.sm} 0;
    margin-left: 0;
    width: 100%;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  /* Removed cursor: pointer to maintain the feather cursor */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = (): void => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <NavbarContainer $scrolled={scrolled}>
      <NavContent>
        <Logo to="/">
          {/* <LogoImg src="/src/assets/images/logo.svg" alt="Vespucc.ai Logo" /> */}
          Vespucc.ai
        </Logo>
        
        <HamburgerButton onClick={() => setIsOpen(!isOpen)}>
          ☰
        </HamburgerButton>
        
        <NavLinks $isOpen={isOpen}>
          <NavLink 
            to="/" 
            $isActive={location.pathname === '/'}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/chat" 
            $isActive={location.pathname === '/chat'}
            onClick={() => setIsOpen(false)}
          >
            Chat
          </NavLink>
          <NavLink 
            to="/agents" 
            $isActive={location.pathname === '/agents'}
            onClick={() => setIsOpen(false)}
          >
            AI Agents
          </NavLink>
          
          <TokenButton 
            to="/token"
            onClick={() => setIsOpen(false)}
          >
            Get Tokens
          </TokenButton>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;