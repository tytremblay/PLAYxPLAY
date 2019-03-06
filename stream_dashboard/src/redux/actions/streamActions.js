import { GET_ALL_STREAMS, SET_STREAM_ON_DEVICE, GET_DEVICES } from './types';

export const getDevices = () => dispatch => {
  dispatch({
    type: GET_DEVICES,
    payload: {
      request: {
        url: '/devices',
        method: 'get'
      }
    }
  });
};

export const getAllStreams = () => dispatch => {
  dispatch({
    type: GET_ALL_STREAMS,
    payload: {
      request: {
        url: '/streams',
        method: 'get'
      }
    }
  });
};

export const setStreamOnDevice = (stream, device) => dispatch => {
  console.log(`Setting ${device} to ${stream}`);
  dispatch({
    type: SET_STREAM_ON_DEVICE,
    payload: {
      request: {
        url: `/devices/${device}`,
        method: 'post',
        data: {
          stream: stream
        },
        headers: { 'Content-Type': 'application/json' }
      }
    }
  });
};
