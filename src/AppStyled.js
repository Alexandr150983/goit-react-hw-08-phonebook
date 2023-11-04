import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledAppContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0px 15px;
`;

export const StyledNavLink = styled(NavLink)`
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  display: inline-block;
  padding: 20px;
  font-size: 22px;
  text-decoration: none;
  margin-right: 15px;

  transition: all 0.3s;

  &.active {
    border: 1px solid white;
    background-color: black;
    color: white;
  }
`;
