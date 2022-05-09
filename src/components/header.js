import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import { NavbarBrand } from "reactstrap"
export default () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          appModules
        }
      }
    }
  `)

  const { appModules, title } = data.site.siteMetadata
  return (
    <header className="d-flex flex-column flex-md-row align-items-center px-md-4 bg-white border-bottom shadow-sm w-100">
      <NavbarBrand href="/" className="mr-auto p-0 d-flex bg-white">
        <img className="m-0" src="/images/AppLogo.png" alt={title} />
      </NavbarBrand>
      <div className="my-2 my-md-0 mr-md-3">
        {appModules.map((appModule, index) => (
          <Link key={index} className="p-3 text-dark" to={`/${appModule}`} style = {{display:"none"}}>
            {appModule} 
          </Link>
        ))}
      </div>
    </header>
  )
}
