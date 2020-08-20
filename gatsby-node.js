const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach(post => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          })
        })
      })
    )

    const people = path.resolve('./src/templates/people.js')
    resolve(
      graphql(
        `
          {
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
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulPerson.edges
        posts.forEach(post => {
          createPage({
            path: `/people/${post.node.slug}/`,
            component: people,
            context: {
              slug: post.node.slug,
            },
          })
        })
      })
    )

  })
}