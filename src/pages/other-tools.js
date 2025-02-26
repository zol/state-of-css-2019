import { graphql } from 'gatsby'
import PageTemplate from 'core/pages/PageTemplate'

export default PageTemplate

export const query = graphql`
    query otherTools($locale: String) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: "other-tools" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: otherToolsYaml(section_id: { eq: "other-tools" }) {
            aggregations {
                id
                usage {
                    total
                    buckets {
                        id
                        count
                        percentage
                    }
                }
                # others {
                #     buckets {
                #         id
                #         count
                #         percentage
                #     }
                # }
            }
        }
    }
`
