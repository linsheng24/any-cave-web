// @ts-ignore
import Head from "next/head";
import {styled} from "@material-ui/core";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import {
  Avatar,
  Backdrop,
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
  Drawer,
  Menu,
  MenuItem
} from "@mui/material";
import React, {useEffect, useState} from "react";
import useUser from "../states/hooks/use-user";
import AuthService from "../services/auth-service";
import {Router, useRouter} from "next/router";
import {DrawOpen} from "../states/atoms/main";
import {useRecoilState} from "recoil";
import RoomManage from "./room-manage";

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

const LayoutBackdrop = styled(Backdrop)({
  backgroud: 'black',
  opacity: 1,
  zIndex: 1
});

const Layout = ({ children }: Props) => {
  const [drawOpen, setDrawOpen] = useRecoilState(DrawOpen);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, mutate, loading, error } = useUser();
  const router = useRouter()
  const isLogin = Boolean(user);
  const isError = Boolean(error);
  useEffect(() => {
    if (!isLogin && isError) {
      router.push('/login');
    } else if (isLogin) {
      router.push('/');
    }
  }, [isLogin, isError]);
  const isLoading = loading || (!isLogin && !isError)

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
  if (!user) {
    return <>
      <LayoutBackdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </LayoutBackdrop>
      {children}
    </>;
  }
  return (
    <>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <HeadContainer>
        <a
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar
            src="/broken-image.jpg"
            sx={{ width: 50, height: 50 }}
          />
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
            <RoomManage/>
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
