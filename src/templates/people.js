import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'



class PeopleTemplate extends React.Component {
  render() {
    const person = get(this.props, 'data.contentfulPerson')
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero data={person} />
        </div>
      </Layout>
    )
  }
}

export default PeopleTemplate

export const pageQuery = graphql`
  query PeoplQueryBySlug($slug: String!) {
    contentfulPerson(slug: { eq: $slug }) {
      name
      shortBio {
        shortBio
      }
      title
      heroImage: image {
        fluid(
          maxWidth: 1180
          maxHeight: 480
          resizingBehavior: PAD
          background: "rgb:000000"
        ) {
          ...GatsbyContentfulFluid_tracedSVG
            
        }
      }
    }
  }
`
