import React from "react"
import { useDispatch } from "react-redux"
import { Navbar, NavbarToggler } from "reactstrap"
import { toggleSidebar } from "../actions/AppModule"
import Header from "./header";
// import { css } from "@emotion/core"
// import { rhythm } from "../utils/typography"
const NavBar = () => {
  // debugger
  const dispatch = useDispatch()
  const toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Navbar sticky="top" className="p-0" color="light" light expand="md">
      <NavbarToggler href="#" onClick={toggle} />
      <Header />
    </Navbar>
  )
}

export default NavBar
