import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const ReactPaginate = styled.ul`
  list-style-type: none; /* Зняти дефолтні маркери */
  display: flex; /* Розташувати список горизонтально */
  padding: 0; /* Зняти внутрішні відступи списку */
`;

export const PaginationItem = styled.li`
  margin-right: 5px;
  cursor: pointer;
`;

export const ActivePage = styled.li`
  background-color: teal;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
`;
