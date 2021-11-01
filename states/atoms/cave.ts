import {atom} from "recoil";

export const CaveListItems = atom({
  key: 'caveListItems',
  default: [
    {
      caveId: '1',
      caveName: 'cave1',
      toggle: true,
      rooms: [
        {
          roomId: '1',
          roomName: 'room1',
        },
        {
          roomId: '2',
          roomName: 'room2',
        },
        {
          roomId: '3',
          roomName: 'room3',
        },
      ]
    },
    {
      caveId: '2',
      caveName: 'cave2',
      toggle: true,
      rooms: [
        {
          roomId: '4',
          roomName: 'room4',
        },
      ]
    },
    {
      caveId: '3',
      caveName: 'cave3',
      toggle: false,
      rooms: []
    }
  ],
});
