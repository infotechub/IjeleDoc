import {
  ADD_MENUS,
  SELECT_MODULE,
  SET_ACTIVE_SUBMENU,
  TOGGLE_MENU,
  TOGGLE_SIDEBAR,
} from "../constants/ActionTypes"

const INIT_STATE = {
  selectedAppModule: "",
  menus: [],
  showSidebar: "",
  activeMenuOrder: "",
  activeSUbmenuOrder: "",
}
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SELECT_MODULE: {
      // debugger
      return {
        ...state,
        selectedAppModule: action.payload,
      }
    }

    case ADD_MENUS: {
      // debugger
      return {
        ...state,
        menus: action.payload,
      }
    }

    case TOGGLE_SIDEBAR: {
      return {
        ...state,
        showSidebar: state.showSidebar === "" ? " d-none " : "",
      }
    }

    case TOGGLE_MENU: {
      return {
        ...state,
        activeMenuOrder: action.payload === state.activeMenuOrder?'':action.payload,
      }
    }

    case SET_ACTIVE_SUBMENU: {
      return {
        ...state,
        activeSUbmenuOrder: action.payload,
      }
    }
    default:
      return INIT_STATE
  }
}
