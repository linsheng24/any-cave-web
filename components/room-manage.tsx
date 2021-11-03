import {styled} from "@material-ui/core";
import {Scrollbars} from 'react-custom-scrollbars';
import {Grid} from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useRecoilState} from "recoil";
import {DrawOpen} from "../states/atoms/main";
import {ToggleCaveMap} from "../states/atoms/cave";
import useUser from "../states/hooks/use-user";

const ManageContainer = styled(Grid)({
  width: '100%',
  height: '100vh'
});

const OpenSwitch = styled(Grid)({
  width: '100%',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.5s',
  background: '#FFFFFF',
  '&:hover': {
    background: '#EEEEEE'
  }
});

const RoomListContainer = styled(Grid)({
  height: '50px',
});

const Content = styled(Grid)({
  height: 'calc(100vh - 50px)',
});

const RoomManage = () => {
  const [drawOpen, setDrawOpen] = useRecoilState(DrawOpen);
  const [toggleCaveMap, setToggleCaveMap] = useRecoilState(ToggleCaveMap);
  const { user } = useUser();
  const caves = user.data.caves;
  const handleClick = (caveId) => {
    // @ts-ignore
    setToggleCaveMap({
      ...toggleCaveMap,
      [caveId]: !toggleCaveMap[caveId]
    })
  };

  const roomListItems = caves.map(cave => {
    const toggle = Boolean(toggleCaveMap[cave.caveId]);
    return <>
      <ListItemButton onClick={() => handleClick(cave.caveId)}>
        {toggle ? <ExpandLess/> : <ExpandMore/>}
        <ListItemText primary={cave.name}/>
      </ListItemButton>
      <Collapse in={toggle} timeout="auto" unmountOnExit>
        {
          cave.rooms.map((room) => <List component="div" disablePadding>
            <ListItemButton>
              <ListItemText primary={room.name}/>
            </ListItemButton>
          </List>)
        }
      </Collapse>
    </>;
  });

  // const roomListItems = caveListItems.map((item) => {
  //   return <>
  //     <ListItemButton onClick={() => handleClick(item.caveId)}>
  //       {item.toggle ? <ExpandLess/> : <ExpandMore/>}
  //       <ListItemText primary={item.caveName}/>
  //     </ListItemButton>
  //     <Collapse in={item.toggle} timeout="auto" unmountOnExit>
  //       {
  //         item.rooms.map((room) => <List component="div" disablePadding>
  //           <ListItemButton>
  //             <ListItemText primary={room.roomName}/>
  //           </ListItemButton>
  //         </List>)
  //       }
  //     </Collapse>
  //   </>;
  // });

  return <ManageContainer
    container
    direction="row"
    justifyContent="center"
  >
    <OpenSwitch onClick={() => setDrawOpen(false)}><ArrowBackIcon/></OpenSwitch>
    <Content xs={12}>
      <Scrollbars>
        <RoomListContainer>
          <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div">
                Cave List
              </ListSubheader>
            }
          >
            {roomListItems}
          </List>
        </RoomListContainer>
      </Scrollbars>
    </Content>
  </ManageContainer>;
}

export default RoomManage;
