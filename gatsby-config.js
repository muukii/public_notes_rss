module.exports = {
  siteMetadata: {
    title: `.Muukii`,
    author: {
      name: `Muukii`,
      summary: `.Muukii`,
    },
    description: `.Muukii`,
    siteUrl: `https://muukii.app`,
    social: {
      twitter: `muukii_app`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/blog`,
    //     name: `blog`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allNotion } }) => {
              console.log("Rss")
              return allNotion.edges.map(node => {
                return {
                  title: node.node.title,
                  url: node.node.raw.url,
                  guid: node.node.raw.url,
                }
              })
            },
            query: `
              {
                allNotion(sort: {order: DESC, fields: createdAt}) {
                  edges {
                    node {
                      id
                      title
                      raw {
                        id
                        url
                      }
                      createdAt
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Muukii",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: require.resolve(`./plugins/gatsby-source-notion-db-index`),
      options: {
        token: process.env["notion_token"],
        databaseId: process.env["notion_db_id"],
      },
    },
  ],
}
