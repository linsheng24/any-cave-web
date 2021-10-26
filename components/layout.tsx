// @ts-ignore
import Head from "next/head";
import {Grid, styled} from "@material-ui/core";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import {Avatar, BottomNavigation, BottomNavigationAction, Drawer, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import useUser from "../states/hooks/use-user";
import UserService from "../services/auth-service";
import AuthService from "../services/auth-service";

type Props = {
  children: JSX.Element;
};

const HeadContainer = styled('div')({
  display: 'flex',
  justifyContent: 'right',
  padding: '15px',
  width: '100%',
  position: 'fixed',
  '& a': {
    cursor: 'pointer'
  }
});

const BodyContainer = styled('div')({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
});

const MainContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  flex: 1
});

const Layout = ({ children }: Props) => {
  const [drawOpen, setDrawOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { mutate } = useUser();

  const handleClick = (event: React.MouseEvent) => {
    // @ts-ignore
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    new AuthService().logout();
    mutate().then(r => setAnchorEl(null));
  };

  return (
    <>
      <Head>
        <title>AnyCave</title>
      </Head>
      <HeadContainer>
        <a
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar src="/broken-image.jpg"/>
        </a>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Account</MenuItem>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      </HeadContainer>
      <BodyContainer>
        <MainContainer onKeyDown={() => setDrawOpen(false)}>
          <Drawer
            variant="temporary"
            open={drawOpen}
            onClose={() => setDrawOpen(false)}
            sx={{
              display: {xs: 'block'},
              '& .MuiDrawer-paper': {boxSizing: 'border-box', width: {xs: '100%', sm: '400px'}},
            }}
          >
            <p>test</p>
          </Drawer>
          {children}
        </MainContainer>

        <BottomNavigation showLabels>
          <BottomNavigationAction label="room" icon={<ListAltIcon/>} onClick={() => setDrawOpen(true)}/>
          <BottomNavigationAction label="message" icon={<MailOutlineIcon/>}/>
          <BottomNavigationAction label="public" icon={<PodcastsIcon/>}/>
        </BottomNavigation>
      </BodyContainer>
    </>
  );
};

export default Layout
