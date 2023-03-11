import styled from "styled-components";

export const Container = styled.header`
  background: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  justify-content: center;
  height: 80px;
  align-items: center;
  color: ${({ theme }) => theme.colors.background};
  margin-bottom: 16px;
`;
