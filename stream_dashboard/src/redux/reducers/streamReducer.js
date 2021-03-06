import {
  GET_ALL_STREAMS,
  SET_STREAM_ON_DEVICE,
  GET_DEVICES,
  success,
  fail,
  SET_PREVIEW,
  SET_PROGRAM
} from '../actions/types';

const initialState = {
  streams: [
    {
      event_name: 'A THIS IS TEST DATA, NOT ACTUAL API DATA',
      device: '',
      type: 'twitch',
      id: 'firstinspires5',
      key: 'HIJAKE'
    },
    {
      event_name: 'B THIS IS TEST DATA, NOT ACTUAL API DATA',
      device: '',
      type: 'twitch',
      id: 'firstinspires1',
      key: 'CAKELIE'
    },
    {
      event_name: 'C THIS IS TEST DATA, NOT ACTUAL API DATA',
      device: '',
      type: 'twitch',
      id: 'firstinspires2',
      key: 'FUNISFAKENEWS'
    }
  ],
  devices: [{ 10: '10.10.10.10' }, { 9: '10.10.10.10' }]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_STREAMS:
      console.log('retrieving all streams');
      return state;
    case success(GET_ALL_STREAMS):
      console.log('Got streams!', action.payload.data);
      return {
        ...state,
        streams: action.payload.data
      };
    case fail(GET_ALL_STREAMS):
      console.log("Couldn't get streams!");
      return state;
    case SET_STREAM_ON_DEVICE:
      console.log('Setting stream on device.', action.payload);
      return state;
    case success(SET_STREAM_ON_DEVICE):
      console.log('Successfully set stream');
      return {
        ...state,
        streams: action.payload.data
      };
    case fail(SET_STREAM_ON_DEVICE):
      console.log("Couldn't set stream!");
      return state;
    case GET_DEVICES:
      console.log('Getting devices.');
      return state;
    case success(GET_DEVICES):
      console.log('Got devices!', action.payload.data);
      return {
        ...state,
        devices: action.payload.data
      };
    case fail(GET_DEVICES):
      console.log("Couldn't get devices!");
      return state;
    case SET_PREVIEW:
      console.log('Setting device to preview');
      return state;
    case success(SET_PREVIEW):
      console.log('Successfully set device to preview!');
      return state;
    case fail(SET_PREVIEW):
      console.log("Couldn't set device to preview!");
      return state;
    case SET_PROGRAM:
      console.log('Setting device to program');
      return state;
    case success(SET_PROGRAM):
      console.log('Successfully set device to program!');
      return state;
    case fail(SET_PROGRAM):
      console.log("Couldn't set device to program!");
      return state;
    default:
      return state;
  }
}
