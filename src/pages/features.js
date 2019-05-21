import React from 'react'
import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

const FeaturesPage = ({ data }) => {
    // const features = mergeFeaturesResources(
    //     data.features.aggregations,
    //     data.features.fields.resources
    // )
    return <PageTemplate data={data} />
}

export default FeaturesPage

// TODO: change query so that it gets all features, and not just those for a specific section
export const query = graphql`
    query featuresOverview($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "layout" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        features: allFeaturesUsageYaml {
          nodes{
            section_id
            aggregations {
                id
                usage {
                    total
                    buckets {
                        id
                        count
                    }
                }
            }
          }
        }
    }
`
