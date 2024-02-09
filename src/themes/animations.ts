import { keyframes } from '@emotion/react';

export const loadingAnimation = () => keyframes`
  from {
    border-color: #E4E8EC;
    background-color: #E4E8EC;
  }
  to {
    border-color: #D8D8D8;
    background-color: #D8D8D8;
  }
`;
