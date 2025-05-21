import React, { useEffect } from 'react'
import styled from 'styled-components'
import ChatBot from '../components/explore/ChatBot'

const ChatPageContainer = styled.div`
  position: fixed; // Changed from relative/default to fixed
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; // Use 100vh for full viewport height
  display: flex;
  flex-direction: column;
  background-image: url('${import.meta.env.BASE_URL}VespucciMap2.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden; // This should prevent scrolling of the page itself
  padding-top: 70px; // IMPORTANT: Adjust this to your actual Navbar height
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    // padding-top: 80px; // Adjust if navbar height is different on desktop
  }
`;

const Chat: React.FC = () => {
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <ChatPageContainer>
      <ChatBot />
    </ChatPageContainer>
  );
};

export default Chat;