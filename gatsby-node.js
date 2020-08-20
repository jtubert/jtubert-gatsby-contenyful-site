const Promise = require('bluebird')
const path = require('path')

exports.createPages = async function ({ actions, graphql }) {
  return graphql(`
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulPerson {
              edges {
                node {
                  name
                  slug
                  shortBio {
                    shortBio
                  }
                  title
                  heroImage: image {
                    fluid(background: "") {
                      base64
                      tracedSVG
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
            }
          }
  `).then(res => {
    res.data.allContentfulBlogPost.edges.forEach(edge => {
      actions.createPage({
        path: `/blog/${edge.node.slug}/`,
        component: require.resolve('./src/templates/blog-post.js'),
        context: {
          slug: edge.node.slug,
        },
      })
    })

    res.data.allContentfulPerson.edges.forEach(edge => {
      actions.createPage({
        path: `/people/${edge.node.slug}/`,
        component: require.resolve('./src/templates/people.js'),
        context: {
          slug: edge.node.slug,
        },
      })
    })
  })

}