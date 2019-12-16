// default reducer
// Note: You can remove this reducer and create your own reducer

import {
  FETCH_DATA,
  REMOVE_DATA_FROM_MY_LIST,
  ADD_DATA_TO_MY_LIST,
  TOGGLE_ADD_REMOVE_BUTTON
} from "../actions";

const initialState = {
  myList: [],
  recommendations: [],
  toggleRemoveButton: false,
  toggleAddButton: false
};
export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_DATA:
      action.payload.mylist.map(obj => ({
        ...obj,
        toggleButtonOnHover: false
      }));
      action.payload.recommendations.map(obj => ({
        ...obj,
        toggleButtonOnHover: false
      }));
      return {
        ...state,
        myList: action.payload.mylist,
        recommendations: action.payload.recommendations
      };
    case REMOVE_DATA_FROM_MY_LIST:
      let myList = [...state.myList];
      let recomm = [...state.recommendations];
      if (myList) {
        let myListObj = { ...myList[action.payload] };
        myListObj.toggleButtonOnHover = false;
        recomm.push(myListObj);
        myList.splice(action.payload, 1);
      }
      return {
        ...state,
        myList: myList,
        recommendations: recomm
      };
    case ADD_DATA_TO_MY_LIST:
      let myList1 = [...state.myList];
      let recomm1 = [...state.recommendations];
      if (recomm1) {
        let recoObj = { ...recomm1[action.payload] };
        recoObj.toggleButtonOnHover = false;
        myList1.push(recoObj);
        recomm1.splice(action.payload, 1);
      }
      return {
        ...state,
        myList: myList1,
        recommendations: recomm1
      };
    case TOGGLE_ADD_REMOVE_BUTTON:
      let myListArr = [...state.myList];
      let recommArr = [...state.recommendations];

      if (action.payload.typeOfButton === "Remove") {
        myListArr[action.payload.index].toggleButtonOnHover =
          action.payload.value;
      } else {
        recommArr[action.payload.index].toggleButtonOnHover =
          action.payload.value;
      }
      return {
        ...state,
        myList: myListArr,
        recommendations: recommArr
      };
    default:
      return { ...state };
  }
};
