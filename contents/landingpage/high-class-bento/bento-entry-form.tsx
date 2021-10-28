import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "../components/layout-lp"
import { Form, Description } from "../components/contact"

export default ({ data, location }) => {
    const api_url = data.site.siteMetadata.contact.api_url
    const hasContactForm = api_url
    return (
        <Layout
            seo={{
                title: "Contact",
            }}
            location={location}
        >
            <div className="container mx-auto py-12">
                <div className="title py-12 text-center">
                    <h2 className="font-bold text-5xl text-color-1">
                        宅配高級弁当登録フォーム
                    </h2>
                </div>
                <div className="flex flex-wrap pb-40">
                    {hasContactForm && (
                        <div className="w-full lg:w-1/2 px-6">
                            <Form api={api_url} />
                        </div>
                    )}
                    <div
                        className={`w-full ${
                            hasContactForm ? "lg:w-1/2" : "lg:w-2/3 mx-auto"
                        } px-6 pt-8`}
                    >
                        <Description data={data.site.siteMetadata.contact} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query BentoEntryQuery {
        site {
            siteMetadata {
                contact {
                    api_url
                    description
                    mail
                    phone
                    address
                }
            }
        }
    }
`
