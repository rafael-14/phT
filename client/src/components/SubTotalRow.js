import styled from "styled-components";

export default styled.td`
  text-align: center;
  padding: 8px;
  background: ${({ theme }) => theme.colors.primary.lighter};
  font-weight: 600;
`;
