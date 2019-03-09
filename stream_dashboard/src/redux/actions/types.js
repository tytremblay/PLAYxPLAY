export const GET_ALL_STREAMS = 'GET_ALL_STREAMS';
export const SET_STREAM_ON_DEVICE = 'SET_STREAM_ON_DEVICE';
export const GET_DEVICES = 'GET_DEVICES';
export const SET_PROGRAM = 'SET_PROGRAM';
export const SET_PREVIEW = 'SET_PREVIEW';

export const success = action => {
  return `${action}_SUCCESS`;
};

export const fail = action => {
  return `${action}_FAIL`;
};
