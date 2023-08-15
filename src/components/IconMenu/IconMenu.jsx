import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthentificated, selectUserData } from 'redux/authSlice';
import HomeIcon from '@mui/icons-material/Home';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { LinkMobil, LogOutMobil, MobileMenu } from 'components/Header.styled';
import { logOutUserThunk } from 'redux/operations';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MenuIcon from '@mui/icons-material/Menu';

export default function AhcountMenu() {
  const authenticated = useSelector(selectAuthentificated);
  const userEmail = useSelector(selectUserData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logOutUserThunk());
  };

  return (
    <MobileMenu>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'flex-end',
          margin: '0 20px 0 0',
        }}
      >
        <p>{userEmail?.email}</p>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'transparent',
                boxShadow: '0px 0px 5px 0px rgba(0, 5, 0, 0.5)',
              }}
            >
              <MenuIcon
                sx={{
                  width: 30,
                  height: 30,
                  color: 'rgba(0, 0, 0)',
                }}
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: '250px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <LinkMobil to="/">
          <MenuItem>
            <HomeIcon
              sx={{
                width: 30,
                height: 30,
                color: 'rgba(0, 5, 0, 0.5)',
                marginRight: '10px',
              }}
            />
            Home
          </MenuItem>
        </LinkMobil>
        {authenticated && (
          <LinkMobil to="/contacts">
            <MenuItem onClick={handleClose}>
              <PermContactCalendarIcon
                sx={{
                  width: 30,
                  height: 30,
                  color: 'rgba(0, 5, 0, 0.5)',
                  marginRight: '10px',
                }}
              />
              My contacts
            </MenuItem>
          </LinkMobil>
        )}

        <Divider />
        {!authenticated ? (
          <div>
            <LinkMobil to="/register">
              <MenuItem>
                <AppRegistrationIcon
                  sx={{
                    width: 30,
                    height: 30,
                    color: 'rgba(0, 5, 0, 0.5)',
                    marginRight: '10px',
                  }}
                />
                Sign Up
              </MenuItem>
            </LinkMobil>
            <LinkMobil to="/login">
              <MenuItem>
                <LoginIcon
                  sx={{
                    width: 30,
                    height: 30,
                    color: 'rgba(0, 5, 0, 0.5)',
                    marginRight: '10px',
                  }}
                />
                Log In
              </MenuItem>
            </LinkMobil>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <Logout
                  sx={{
                    width: 30,
                    height: 30,
                    color: 'rgba(0, 5, 0, 0.5)',
                    marginRight: '10px',
                  }}
                />
              </ListItemIcon>
              <LogOutMobil>Logout</LogOutMobil>
            </MenuItem>
          </div>
        )}
      </Menu>
    </MobileMenu>
  );
}
