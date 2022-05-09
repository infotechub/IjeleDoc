import React from "react"
import { Container } from "reactstrap"
import NavBar from "./navbar"
import Sidebar from "./sidebar"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/dashboard.css"
import "../styles/index.scss"
import { useSelector } from "react-redux"

// import { css } from "@emotion/core"

// import { rhythm } from "../utils/typography"
const getState = state => state
const Layout = props => {
  // debugger

  const { showSideBar } = useSelector(getState)
  const { children } = props
  return (
    <>
      <NavBar />
      <Sidebar toggleSidebar={showSideBar} />
      <main
        role="main"
        className="col-md-9 ml-sm-auto col-lg-10 px-md-4 h-100 bg-white pt-5"
      >
        <Container> {children} </Container>
      </main>
    </>
  )
}
export default Layout
