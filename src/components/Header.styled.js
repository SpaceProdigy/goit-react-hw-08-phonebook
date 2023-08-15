import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;
  box-shadow: 0px 0px 1.5px 0px rgba(0, 0, 0, 0.5);
  &.active {
    color: white;
    background-color: rgba(250, 217, 69, 0.7);
  }

  &:hover {
    background-color: rgba(250, 217, 69, 0.7);
  }
`;

export const LinkMobil = styled(NavLink)`
  font-weight: 500;
  text-decoration: none;
  color: black;
  &.active {
    color: rgba(250, 217, 69, 0.7);
  }
`;

export const Header = styled.header`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  width: 100%;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.5);
  z-index: 100;

  > nav {
    display: flex;
    align-items: center;
    gap: 8px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  @media (min-width: 1200px) {
    max-width: 1280px;
  }
`;

export const Nav = styled.nav`
  margin-right: 20px;
`;

export const Img = styled.img`
  height: 35px;
  margin-left: 20px;
`;

export const LogOut = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;
  background: inherit;
  border: none;
  box-shadow: 0px 0px 1.5px 0px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(250, 217, 69, 0.7);
  }

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const LogOutMobil = styled.button`
  text-decoration: none;
  color: black;
  font-weight: 500;
  background: transparent;
  border: none;
  font-size: 1rem;
`;

export const WrapperIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const WrapperEmail = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  gap: 8px;
`;

export const MobileMenu = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const HomeWrapper = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    gap: 15px;
    display: flex;
  }
`;
