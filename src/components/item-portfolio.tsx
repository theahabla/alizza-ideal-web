import React, { useState, useEffect, useRef } from "react"
import Parallax from "../utils/parallax"
import recommended from "remark-preset-lint-recommended"
import remarkHtml from "remark-html"
import { ArrowRight } from "react-feather"
import { Button } from "./ui"
import { IndexPageQuery_portfolio_edges_node } from "../pages/__generated__/IndexPageQuery"
import { remark } from "remark"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type ItemPortfolioProps = {
    data: IndexPageQuery_portfolio_edges_node
    even: boolean
}
export const ItemPortfolio: React.FC<ItemPortfolioProps> = ({ data, even }) => {
    const [state, changeState] = useState({
        animated: false,
        percentage: 0,
    })
    const description = remark()
        .use(recommended)
        .use(remarkHtml)
        .processSync(data.frontmatter.description)
        .toString()
    const image = getImage(data.frontmatter.thumbnail)

    const getWindowHeight = () => {
        const w = window
        const d = document
        const e = d.documentElement
        const g = d.getElementsByTagName("body")[0]

        return w.innerHeight || e.clientHeight || g.clientHeight
    }

    const getWindowWidth = () => {
        const w = window
        const d = document
        const e = d.documentElement
        const g = d.getElementsByTagName("body")[0]

        return w.innerWidth || e.clientWidth || g.clientWidth
    }

    const updateState = (p) => changeState({ ...state, ...p })

    const percentageThreshold = 0.3

    let transform = useRef(0)

    useEffect(() => {
        transform.current =
            Math.min(getWindowHeight() / 2, 300) *
            Math.max(0, state.percentage - percentageThreshold)

        if (getWindowWidth() < 1024) {
            updateState({
                animated: true,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.percentage])

    if (state.percentage > percentageThreshold && !state.animated)
        updateState({ animated: true })

    return (
        <Parallax changePercentage={updateState}>
            <div className="large-container mx-auto">
                <div
                    className={`my-4 py-8 lg:py-24 portfolio-item md:flex ${
                        state.animated ? "begin-animation" : ""
                    } ${even ? "even flex-row-reverse" : ""}`}
                >
                    <div className="relative flex-1">
                        <div
                            className="image relative z-10"
                            style={{
                                transform: `translate(0px,${transform.current}px)`,
                            }}
                        >
                            <GatsbyImage
                                image={image}
                                alt={data.frontmatter.name || "Image"}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex md:px-4 lg:px-6 items-center">
                        <div
                            className={`flex flex-1 flex-wrap  ${
                                even ? "md:justify-end md:text-right" : ""
                            }`}
                        >
                            <h3 className="text-color-1 text-5xl font-black to-up">
                                {data.frontmatter.title}
                            </h3>
                            <div className="lg:mt-4 to-up">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                            <Button
                                to={data.fields.slug}
                                label={`View ${data.frontmatter.title}`}
                                title={"View"}
                                iconRight={<ArrowRight />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>
    )
}

export default ItemPortfolio
