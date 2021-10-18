// @ts-ignore
import Head from "next/head";
import {Grid, styled} from "@material-ui/core";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import {BottomNavigation, BottomNavigationAction, Drawer} from "@mui/material";
import {useState} from "react";

type Props = {
  children: JSX.Element;
};

const BodyContainer = styled('div')({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
})

const MainContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  flex: 1
})

const MenuItem = styled('a')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '80px',
  cursor: 'pointer',
  transitionDuration: '0.3s',
  "&:hover": {
    color: '#cccccc'
  }
})

const FooterContainer = styled(Grid)(({theme}) => ({
  width: '100%',
  minHeight: '50px',
  paddingTop: 0,
  paddingBottom: 0,
  background: theme.palette.primary.light
}))

const Layout = ({ children }: Props) => {
  const [drawOpen, setDrawOpen] = useState(true);
  return (
    <>
      <Head>
        <title>AnyCave</title>
      </Head>
      <BodyContainer>
        <MainContainer onKeyDown={()=>setDrawOpen(false)}>
          <Drawer
            // container={<p>111</p>}
            variant="temporary"
            open={drawOpen}
            onClose={()=>setDrawOpen(false)}
            sx={{
              display: { xs: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: '100%', sm: '400px' } },
            }}
          >
            <p>test</p>
          </Drawer>
          {children}
        </MainContainer>
        <BottomNavigation showLabels >
          <BottomNavigationAction label="room" icon={<ListAltIcon />} onClick={()=>setDrawOpen(true)}/>
          <BottomNavigationAction label="message" icon={<MailOutlineIcon />} />
          <BottomNavigationAction label="public" icon={<PodcastsIcon />} />
        </BottomNavigation>
      </BodyContainer>
    </>
  );
};

export default Layout
