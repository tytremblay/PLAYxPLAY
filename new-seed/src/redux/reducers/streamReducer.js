import { GET_ALL_STREAMS, SET_STREAM_ON_DEVICE, success, fail } from '../actions/types';

const initialState = {
  streams: [
    { id: 'firstinspires1', event_name: 'San Diego Regional', device: 'blue' },
    {
      id: 'firstinspires3',
      event_name: 'Central Valley Regional',
      device: 'red'
    },
    {
      id: 'mar_robotics_lol',
      event_name: 'Middle-o-Nowhere District',
      device: 'green'
    }
  ]
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
      console.log('Setting stream on device.');
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
    default:
      return state;
  }
}
