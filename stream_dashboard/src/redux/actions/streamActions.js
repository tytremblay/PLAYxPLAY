import { GET_ALL_STREAMS, SET_STREAM_ON_DEVICE } from './types';

export const getAllStreams = () => dispatch => {
  dispatch({
    type: GET_ALL_STREAMS,
    payload: {
      request: {
        method: 'get',
        url: '/streams'
      }
    }
  });
};

export const setStreamOnDevice = (channel, device) => dispatch => {
  console.log(`Setting ${device} to ${channel}`);
  dispatch({
    type: SET_STREAM_ON_DEVICE,
    payload: {
      request: {
        method: 'post',
        url: `/devices/${device}`,
        data: {
          channel: channel
        }
      }
    }
  });
};
