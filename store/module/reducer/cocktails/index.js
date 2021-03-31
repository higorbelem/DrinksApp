import * as Types from '../../types';

const INITIAL_STATE = {
  cocktails: [],
  refreshing: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_COCKTAILS: {
      const newState = {...state, action};
      newState.cocktails = action.payload;
      return newState;
    }
    case Types.SET_REFRESHING: {
      const newState = {...state, action};
      newState.refreshing = action.payload;
      return newState;
    }
    default: {
      return state;
    }
  }
}
