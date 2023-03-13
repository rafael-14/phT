import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const TableContainer = styled.table`
  border-collapse: collapse;
  width: 80%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  elevation: 2;
`;

export const Pagination = styled.div`
  margin-top: 16px;
  justify-content: center;
  display: flex;
  a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color 0.3s;
    &:hover {
      background: ${({ theme }) => theme.colors.primary.lighter};
      border-radius: 8px;
      transition: all 0.2s ease-in;
    }
  }
  .active {
    background: ${({ theme }) => theme.colors.primary.main};
    color: #fff;
    border-radius: 8px;
    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      transition: all 0.2s ease-in;
    }
  }
`;
