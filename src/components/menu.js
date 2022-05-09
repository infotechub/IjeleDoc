import React from "react"

import { Link } from "gatsby"
import { NavItem, Collapse, Nav, } from "reactstrap"

import { PlusCircle, MinusCircle, Menu } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { toggleMenu } from "../actions/AppModule"
//   import menuStyles from './menu.module.scss'
const getState = state => state
export default () => {
  const { menus, activeMenuOrder } = useSelector(getState)
  // debugger
  const dispatch = useDispatch()
  const toggleM = menuOrder => dispatch(toggleMenu(menuOrder))
  // debugger
  return (
    <>
      {menus.map((menu, index) => (
        <React.Fragment key={index}>
          <NavItem className="m-0">
            <Link
              to={"#"}
              activeClassName={`active`}
              className={`d-flex justify-content-between nav-link`}
              onClick={() => toggleM(menu.menuOrder)}
            >
              {menu.name} {menu.menuOrder !== activeMenuOrder? <PlusCircle className={`feather my-auto ml-2`} /> : <MinusCircle className={`feather my-auto ml-2`} /> }
            </Link>
          </NavItem>
          <Collapse
            isOpen={activeMenuOrder === menu.menuOrder ? true : false}
          >
            <Nav className={`flex-column ml-0`}>
              {menu.submenus.map((submenu, ind) => (
                <NavItem className="m-0" key={ind}>
                  <Link
                    activeClassName={`active`}
                    to={submenu.href}
                    className="nav-link"
                  >
                    <Menu className={`feather`} />
                    {submenu.name}
                  </Link>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </React.Fragment>
      ))}
    </>
  )
}

