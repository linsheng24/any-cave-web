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
import {CaveListItems} from "../states/atoms/cave";

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
  const [caveListItems, setCaveListItems] = useRecoilState(CaveListItems);

  // @ts-ignore
  const handleClick = (caveId) => {
    const newCaveListItems = caveListItems.map(item => ({
        ...item,
        toggle: caveId === item.caveId ? !item.toggle : item.toggle
      })
    );
    setCaveListItems(newCaveListItems);
  };

  const roomListItems = caveListItems.map((item) => {
    return <>
      <ListItemButton onClick={() => handleClick(item.caveId)}>
        {item.toggle ? <ExpandLess/> : <ExpandMore/>}
        <ListItemText primary={item.caveName}/>
      </ListItemButton>
      <Collapse in={item.toggle} timeout="auto" unmountOnExit>
        {
          item.rooms.map((room) => <List component="div" disablePadding>
            <ListItemButton>
              <ListItemText primary={room.roomName}/>
            </ListItemButton>
          </List>)
        }
      </Collapse>
    </>;
  });

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
