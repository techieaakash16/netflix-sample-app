export const FETCH_DATA = "FETCH_DATA";
export const REMOVE_DATA_FROM_MY_LIST = "REMOVE_DATA_FROM_MY_LIST";
export const ADD_DATA_TO_MY_LIST = "ADD_DATA_TO_MY_LIST";
export const TOGGLE_ADD_REMOVE_BUTTON = "TOGGLE_ADD_REMOVE_BUTTON";

export function fetchAndSaveData(data) {
  return {
    type: FETCH_DATA,
    payload: data
  };
}

export function removeDataFromMyListAndAddToRecomm(myListIndex) {
  return {
    type: REMOVE_DATA_FROM_MY_LIST,
    payload: myListIndex
  };
}

export function addDataFromRecommToMyList(recommIndex) {
  return {
    type: ADD_DATA_TO_MY_LIST,
    payload: recommIndex
  };
}

export function toggleAddRemoveButton(index, value, typeOfButton) {
  return {
    type: TOGGLE_ADD_REMOVE_BUTTON,
    payload: { index: index, value: value, typeOfButton: typeOfButton }
  };
}
