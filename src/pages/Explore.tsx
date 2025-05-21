import React from 'react'
import styled from 'styled-components'
import ChatBot from '../components/explore/ChatBot'

const ExplorePageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url('${import.meta.env.BASE_URL}VespucciMap2.jpg');
  background-size: cover;
  background-position: center; // Changed from top center
  background-attachment: fixed;
  overflow: hidden; // Prevent scrolling of the page itself
  padding-top: 70px; // IMPORTANT: Adjust this to your actual Navbar height
  box-sizing: border-box; // Ensures padding is included in the 100vh

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    // Potentially adjust padding-top if navbar height changes on desktop
    // padding-top: 80px; 
  }
`;

const Explore: React.FC = () => {
  return (
    <ExplorePageContainer>
      <ChatBot />
    </ExplorePageContainer>
  );
};

export default Explore;