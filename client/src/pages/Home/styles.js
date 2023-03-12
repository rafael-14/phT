import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    padding: 8px 16px;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
    transition: all 0.2s ease-in;
    margin: 0px 10% 16px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;

export const TableContainer = styled.table`
  border-collapse: collapse;
  width: 80%;
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
    }
  }
  .active {
    background: ${({ theme }) => theme.colors.primary.main};
    color: #fff;
    border-radius: 8px;
    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
