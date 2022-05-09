/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `NOVO HUB`,
    appModules: ["a1234", "p0987", "c3478", "e4985"],
    description: "An online guide in using the novo hub web platform"
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              fromHeading: 1,
              toHeading: 6
            }
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          },
          `gatsby-remark-autolink-headers`
        ],
      },
    },
    `gatsby-plugin-emotion`,
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-react-redux-persist',
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: './src/reducers/index',
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          // if `isJSON` is set to `false`, `eval` is used to deserialize redux state,
          // otherwise `JSON.parse` is used
          isJSON: true,
          unsafe: false,
          ignoreFunction: true,
        },
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: true,
        // [optional] - name of key on `window` where serialized state will be stored, default:
        windowKey: '__PRELOADED_STATE__',
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // {
		// 	resolve: 'gatsby-plugin-pdf',
		// 	options: {
		// 		allPages: true,
		// 		styleTagOptions: {
		// 			content: 'header{display:none;} footer{display:none;} .cookie-bar{display:none;}'
		// 		}
		// 	},
		// },
  ],
}
