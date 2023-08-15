import { Suspense, lazy, useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Spiner from './Spiner/Spiner';
import {
  Header,
  Img,
  Nav,
  Link,
  LogOut,
  WrapperIcon,
  WrapperEmail,
  HomeWrapper,
} from './Header.styled';
import logo from '../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthentificated,
  selectToken,
  selectUserData,
} from 'redux/authSlice';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOutUserThunk, refreshUserThunk } from 'redux/operations';
import AccountMenu from './IconMenu/IconMenu';

const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const Contacts = lazy(() => import('../pages/Contacts/Contacts'));

export const App = () => {
  const authenticated = useSelector(selectAuthentificated);
  const userEmail = useSelector(selectUserData);
  const token = useSelector(selectToken);
  const authentificated = useSelector(selectAuthentificated);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOutUserThunk());
  };

  useEffect(() => {
    if (!token || authentificated) return;
    dispatch(refreshUserThunk());
  }, [token, dispatch, authentificated]);

  return (
    <div className="main">
      <Header>
        <WrapperIcon>
          <Img src={logo} alt="logo_website" />
          <HomeWrapper>
            <Link to="/">
              <HomeIcon /> Home
            </Link>
            {authenticated && (
              <Link to="/contacts">
                <PermContactCalendarIcon />
                Contacts
              </Link>
            )}
          </HomeWrapper>
        </WrapperIcon>

        <Nav>
          {!authenticated ? (
            <>
              <Link to="/register">
                <AppRegistrationIcon /> Sign up
              </Link>
              <Link to="/login">
                <LoginIcon />
                Log in
              </Link>
            </>
          ) : (
            <>
              <WrapperEmail>{userEmail.email}</WrapperEmail>
              <LogOut onClick={handleLogOut}>
                <LogoutIcon />
                Log Out
              </LogOut>
            </>
          )}
        </Nav>
        <AccountMenu />
      </Header>

      <main>
        <Suspense fallback={<Spiner />}>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
