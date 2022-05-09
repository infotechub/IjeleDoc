import { useLocation } from "@reach/router"
import { graphql, Link } from "gatsby"
import React, { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "reactstrap"
import { selectModule } from "../../actions/AppModule"
import Header from '../../components/header'

const getState = state => state
export default ({ data }) => {
  // console.log({ data })
  const [tableData, setTableData] = useState([])
  const { selectedAppModule } = useSelector(getState)
  const {appModules} = data.site.siteMetadata
  const location = useLocation()
  const columns = [
    {
      name: '#',
      selector: 'sn',
      sortable: true,
    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Link',
      sortable: true,
      cell: row => <Link to={row.link}>{row.link}</Link>
    }
  ]
  const dispatch = useDispatch()
  useEffect(() => {
    const moduleUrl = location.pathname.split('/')[1]
    if(selectedAppModule !== moduleUrl) {
      dispatch(selectModule(moduleUrl))
    }
    const tableDataT = data.allMarkdownRemark.edges.filter(edge => {
      const appMod = appModules.indexOf(selectedAppModule) + 1
      return appMod === edge.node.frontmatter.module
    }).map((edge, index) =>({
      sn: index + 1,
      title: edge.node.frontmatter.title,
      link: edge.node.fields.slug
    }))
    setTableData(tableDataT)
  }, [selectedAppModule, appModules, data.allMarkdownRemark.edges, dispatch, location.pathname])
  return (
    <>
    <Header />
    <main role="main" className="d-flex col-md-9 ml-sm-auto col-lg-10 px-md-4 h-100 bg-white">
      <Container>
          <DataTable
            title={`${selectedAppModule} Module`}
            columns={columns}
            data = {tableData}
            pagination
          />
       </Container>
    </main>
    </>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        appModules
      }
    }
    allMarkdownRemark(
      sort: { fields: frontmatter___submenuOrder, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            module
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
