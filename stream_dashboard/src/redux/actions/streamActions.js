import {
  GET_ALL_STREAMS,
  SET_STREAM_ON_DEVICE,
  GET_DEVICES,
  SET_PROGRAM,
  SET_PREVIEW
} from './types';

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

export const setProgram = stream => dispatch => {
  dispatch({
    type: SET_PROGRAM,
    payload: {
      request: {
        url: `/devices/${stream.device}/program`,
        method: 'post',
        data: { stream: stream },
        headers: { 'Content-Type': 'application/json' }
      }
    }
  });
};

export const setPreview = stream => dispatch => {
  dispatch({
    type: SET_PREVIEW,
    payload: {
      request: {
        url: `/devices/${stream.device}/preview`,
        method: 'post',
        data: { stream: stream },
        headers: { 'Content-Type': 'application/json' }
      }
    }
  });
};
