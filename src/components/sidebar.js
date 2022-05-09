import React, { useEffect } from "react"
import Menu from "./menu"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Navbar, Nav } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "@reach/router"
import { addMenus, selectModule } from "../actions/AppModule"
const getState = state => state
const Sidebar = () => {
  const location = useLocation()
  const { selectedAppModule, showSidebar } = useSelector(getState)
  const dispatch = useDispatch()
  const allMenuQuery = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          title
          appModules
        }
      }
      allMarkdownRemark(
        sort: { fields: frontmatter___submenuOrder, order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              menu
              menuOrder
              submenu
              submenuOrder
              module
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const { appModules } = allMenuQuery.site.siteMetadata
  // debugger
  useEffect(() => {
    // debugger
    if (selectedAppModule === "") {
      if (location.pathname !== "/") {
        dispatch(selectModule(location.pathname.split("/")[1]))
      }
    }
    const moduleIndex = appModules.indexOf(selectedAppModule) + 1
    const { edges } = allMenuQuery.allMarkdownRemark
    const duplicatedMenuOrder = edges.filter((edge, index) => {
      if(edge.node.frontmatter.module === moduleIndex){
        if(index === 0)
        return true
        if(edges[index-1].node.frontmatter.menuOrder !== edge.node.frontmatter.menuOrder)
        return true
      } 
      return false 
    }).map(edge => edge.node.frontmatter.menuOrder)
    debugger
    const distinct = [...new Set(duplicatedMenuOrder)]
    if (moduleIndex > 0) {
      const moduleFiles = edges
        .filter(edge => edge.node.frontmatter.module === moduleIndex)
        .map(moduleFile => ({
          menu: moduleFile.node.frontmatter.menu,
          menuOrder: moduleFile.node.frontmatter.menuOrder,
          name: moduleFile.node.frontmatter.submenu,
          submenuOrder: moduleFile.node.frontmatter.submenuOrder,
          module: moduleFile.node.frontmatter.module,
          href: moduleFile.node.fields.slug,
        }))
      const menus = distinct
        .map((menuOrder, index) => {
          const submenus = moduleFiles.filter(
            moduleFile => moduleFile.menuOrder === menuOrder
          )
          // debugger
          return {
            name: submenus[0].menu,
            menuOrder: submenus[0].menuOrder,
            submenus,
          }
        })
        .filter(menu => menu.submenus.length > 0)

      dispatch(addMenus(menus))
    }
  }, [
    selectedAppModule,
    allMenuQuery.allMarkdownRemark,
    appModules,
    dispatch,
    location.pathname,
  ])
  // console.log({menuListDiv})
  return (
    <Navbar
      color="light"
      light
      className={`col-md-3` + showSidebar + ` col-lg-2 d-md-block sidebar pt-10`}
    >
      <div className={`sidebar-sticky d-flex flex-column`}>
        <Nav className={`flex-column ml-0`}>
          <Menu />
        </Nav>
        <footer className="pt-4 mb-md-5 mt-md-auto pt-md-5 border-top">
          <Link target="_blank" to="https://sidmach.com">
            Sidmach technologies
          </Link>
          &nbsp;&#169; 2021
        </footer>
      </div>
    </Navbar>
  )
}
export default Sidebar
