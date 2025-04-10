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

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <ContentOverlay>
        <Hero />
        <Features />
      </ContentOverlay>
    </HomeContainer>
  );
};

export default Home;