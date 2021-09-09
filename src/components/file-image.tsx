import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type FileImageProps = {
    name: string /* base name of image file */
    alt: string /* alt text for image object */
    type?: string /* dir name under contents -- blog, portfolio, landingpage, ... */
    post?: string /* sub dir name under type dir -- post dir of blog and others */
    title?: string /* title for display under the image */
    className?: string /* className style classes */
}

export const FileImage = ({ title, className, ...rest }) => {
    const query = useStaticQuery(graphql`
        {
            allFile {
                edges {
                    node {
                        base
                        ext
                        relativeDirectory
                        sourceInstanceName
                        publicURL
                    }
                }
            }
            allImageSharp {
                edges {
                    node {
                        parent {
                            ... on File {
                                base
                                ext
                                name
                                sourceInstanceName
                                relativeDirectory
                            }
                        }
                        gatsbyImageData(
                            layout: FULL_WIDTH
                            placeholder: BLURRED
                        )
                    }
                }
            }
        }
    `)

    const Title = ({ title }) => {
        if (!title) {
            return ""
        }
        return (
            <div
                className="mx-auto px-auto text-center \
                text-sm font-suns font-bold"
            >
                {title}
            </div>
        )
    }

    const NoImage = ({ name }) => {
        return (
            <div className="bg-error text-white">
                ファイル {name} が見つかりません
            </div>
        )
    }

    const Image = ({ name, alt, type, post, ...props }) => {
        const isSvg = name.match(/\.svg$/i)
        const edges = isSvg ? query.allFile.edges : query.allImageSharp.edges
        const found = edges.find(edge => {
            const node = isSvg ? edge.node : edge.node?.parent
            return (
                node &&
                node.base === name &&
                (post === "" || node.relativeDirectory === post) &&
                node.sourceInstanceName === type
            )
        })

        if (!found) {
            return <NoImage name={name} />
        } else if (isSvg) {
            return <img src={found.node.publicURL} alt={alt} {...props} />
        } else {
            const image = getImage(found.node.gatsbyImageData)

            return (
                <GatsbyImage
                    image={image}
                    alt={alt || found.node.parent.name}
                    {...props}
                />
            )
        }
    }

    return (
        <div className={className}>
            <Image {...rest} />
            <Title title={title} />
        </div>
    )
}

export default FileImage