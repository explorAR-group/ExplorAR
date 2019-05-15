import axios from 'axios';
import { LOCALIP } from '../../constants';

/**
 * ACTION TYPES
 */
const SET_SELECTED_POIS = 'SET_SELECTED_POIS';
const SET_ALL_POIS = 'SET_ALL_POIS';
const TOGGLE_FULLVIEW = 'TOGGLE_FULLVIEW';

/**
 * INITIAL STATE
 */
const initialState = {
  allPois: [],
  selectedPois: []
};

/**
 * ACTION CREATORS
 */
export const setselectedPois = category => ({
  type: SET_SELECTED_POIS,
  category
});

const setAllPois = poiList => ({
  type: SET_ALL_POIS,
  poiList
});

export const toggleFullview = id => ({
  type: TOGGLE_FULLVIEW,
  id
});

/**
 * THUNK CREATORS
 */
export const getAllPoisThunk = (lat, long) => {
  return async dispatch => {
    try {
      let { data } = await axios.get(
        `http://${LOCALIP}:8080/api/pointsOfInterest/?lat=${lat}&long=${long}`
      );
      //add fullview property for front end UI
      data = data.map(poi => {
        poi.fullView = false;
        return poi;
      });
      dispatch(setAllPois(data));
    } catch (error) {
      console.warn(error);
    }
  };
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  let stateCopy = { ...state };
  switch (action.type) {
    case SET_SELECTED_POIS:
      stateCopy.selectedPois = stateCopy.allPois.filter(
        poi => poi.category === action.category
      );
      return stateCopy;
    case SET_ALL_POIS:
      stateCopy.allPois = action.poiList;
      stateCopy.selectedPois = action.poiList;
      return stateCopy;
    case TOGGLE_FULLVIEW:
      stateCopy.selectedPois = stateCopy.selectedPois.map(poi => {
        if (poi.id === action.id) {
          console.warn('poi.id select', poi.id);
          poi.fullView = !poi.fullView;
          console.warn('FULLview select status post', poi.fullView);
        }
        return poi;
      });
      console.warn('after toggle');
      return stateCopy;
    default:
      return state;
  }
}
