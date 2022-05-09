import { ADD_MENUS, SELECT_MODULE, SET_ACTIVE_SUBMENU, TOGGLE_MENU, TOGGLE_SIDEBAR } from "../constants/ActionTypes";

export const selectModule = (payload) =>({
    type: SELECT_MODULE,
    payload
})

export const addMenus = (payload) => ({
    type: ADD_MENUS,
    payload
})

export const toggleSidebar = (payload) => ({
    type: TOGGLE_SIDEBAR
})

export const toggleMenu = (payload) => ({
    type: TOGGLE_MENU,
    payload
})

export const setActiveSubmenu = (payload) => ({
    type: SET_ACTIVE_SUBMENU,
    payload
})
