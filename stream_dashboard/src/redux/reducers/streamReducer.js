import { GET_ALL_STREAMS, SET_STREAM_ON_DEVICE, success, fail } from '../actions/types';

const initialState = {
  streams: [
    {
      event_name: 'THIS IS TEST DATA, NOT ACTUAL API DATA',
      device: '',
      type: 'twitch',
      id: 'firstinspires5'
    },
    {
      event_name: 'Del Mar Regional presented by Qualcomm 2',
      device: '',
      type: 'twitch',
      id: 'firstinspires6'
    },
    {
      event_name: 'Orange County Regional',
      device: '',
      type: 'twitch',
      id: 'firstinspires7'
    },
    {
      event_name: 'Orange County Regional 2',
      device: '',
      type: 'twitch',
      id: 'firstinspires8'
    },
    {
      event_name: 'PCH District Gainesville Event',
      device: '',
      type: 'twitch',
      id: 'gafirst1'
    },
    {
      event_name: 'PCH District Gainesville Event 2',
      device: '',
      type: 'twitch',
      id: 'gafirst2'
    },
    {
      event_name: 'FIM District Gibraltar Event',
      device: '',
      type: 'twitch',
      id: 'FIRSTinMI01'
    },
    {
      event_name: 'FIM District Kettering University Event #1',
      device: '',
      type: 'twitch',
      id: 'firstupdatesnow'
    },
    {
      event_name: 'FIM District Southfield Event',
      device: '',
      type: 'twitch',
      id: 'FIRSTinMI05'
    },
    {
      event_name: 'NE District Granite State Event',
      device: '',
      type: 'twitch',
      id: 'nefirst_blue'
    },
    {
      event_name: 'NE District Granite State Event 2',
      device: '',
      type: 'twitch',
      id: 'nefirst_red'
    },
    {
      event_name: 'ONT District Durham College Event',
      device: '',
      type: 'twitch',
      id: 'FIRSTOntario1'
    },
    {
      event_name: 'ONT District Durham College Event 2',
      device: '',
      type: 'twitch',
      id: 'FIRSTOntario2'
    },
    {
      event_name: 'ONT District Durham College Event 3',
      device: '',
      type: 'twitch',
      id: 'firstontario2'
    },
    {
      event_name: 'FMA District Hatboro-Horsham Event',
      device: '',
      type: 'youtube',
      id: 'TkHaL4o2RYE'
    },
    {
      event_name: 'FMA District Hatboro-Horsham Event 2',
      device: '',
      type: 'youtube',
      id: 'tigS6YLO-Tk'
    },
    {
      event_name: 'Festival de Robotique a Montreal Regional',
      device: '',
      type: 'twitch',
      id: 'firstinspires1'
    },
    {
      event_name: 'Festival de Robotique a Montreal Regional 2',
      device: '',
      type: 'twitch',
      id: 'firstinspires2'
    },
    {
      event_name: 'Palmetto Regional',
      device: '',
      type: 'twitch',
      id: 'firstinspires3'
    },
    {
      event_name: 'Palmetto Regional 2',
      device: '',
      type: 'twitch',
      id: 'firstinspires4'
    },
    {
      event_name: 'Istanbul Regional',
      device: '',
      type: 'twitch',
      id: 'fikretyukselfoundation'
    },
    {
      event_name: 'FIT District Austin Event',
      device: '',
      type: 'twitch',
      id: 'firstintexasevents'
    },
    {
      event_name: 'FIT District El Paso Event',
      device: '',
      type: 'twitch',
      id: 'firstintexasevents2'
    },
    {
      event_name: 'CHS District Richmond VA Event sponsored by Dominion Energy',
      device: '',
      type: 'twitch',
      id: 'firstchesapeake2blue'
    },
    {
      event_name: 'CHS District Richmond VA Event sponsored by Dominion Energy 2',
      device: '',
      type: 'twitch',
      id: 'firstchesapeake2red'
    },
    {
      event_name: 'CHS District Haymarket VA Event sponsored by Booz Allen Hamilton',
      device: '',
      type: 'twitch',
      id: 'firstchesapeake1blue'
    },
    {
      event_name: 'CHS District Haymarket VA Event sponsored by Booz Allen Hamilton 2',
      device: '',
      type: 'twitch',
      id: 'firstchesapeake1red'
    },
    {
      event_name: 'PNW District Mount Vernon Event',
      device: '',
      type: 'twitch',
      id: 'firstwa_red1'
    },
    {
      event_name: 'PNW District Mount Vernon Event 2',
      device: '',
      type: 'twitch',
      id: 'firstwa_red2'
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
    default:
      return state;
  }
}
