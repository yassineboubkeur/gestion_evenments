import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  gap: 8px;
  
`;

const waveAnimation = keyframes`
  0%, 60%, 100% {
    transform: scaleY(0.4);
  }
  30% {
    transform: scaleY(1);
  }
`;

const LoadingLine = styled.div`
  width: 10px;
  height: 40px;
  background-color: ${props => props.color};
  border-radius: 5px;
  animation: ${waveAnimation} 1.2s infinite ease-in-out;
  animation-delay: ${props => props.delay};
  transform-origin: bottom center;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-family: Arial, sans-serif;
  color: #666;
  text-align: center;
`;

const LoadingComponent = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  
  return (
    <div className='z-[1000]' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <LoadingContainer>
        {colors.map((color, index) => (
          <LoadingLine 
            key={index}
            color={color}
            delay={`${index * 0.1}s`}
          />
        ))}
      </LoadingContainer>
      <LoadingText><strong>Loading...</strong> </LoadingText>
    </div>
  );
};

export default LoadingComponent;