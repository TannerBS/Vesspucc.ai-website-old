import React from 'react'
import styled from 'styled-components'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'


const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>

      <ContentContainer>
        <Hero />
        <Features />
      </ContentContainer>
    </HomeContainer>
  )
}

export default Home