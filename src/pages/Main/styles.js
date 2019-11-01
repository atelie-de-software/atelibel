import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TextDecibel = styled.Text`
  font-size: 40px;
  color: ${props => props.color};
`;
