import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'
import ShareBlock from '../share/ShareBlock'
import { useI18n } from '../i18n/i18nContext'
import { usePageContext } from '../helpers/pageContext'
import { getBlockTitle, getBlockDescription } from 'core/helpers/blockHelpers'
import { getBlockMeta } from '../helpers/blockHelpers'
import SharePermalink from '../share/SharePermalink'
import ChartUnitsSelector from 'core/charts/ChartUnitsSelector'

const BlockTitle = ({ id, showDescription, isShareable, values, title, units, setUnits }) => {
    const [showOptions, setShowOptions] = useState(false)
    const context = usePageContext()
    const { translate } = useI18n()

    title = title || getBlockTitle(id, context, translate, { values })

    let description = ''
    if (showDescription === true) {
        description = getBlockDescription(id, context, translate, {
            values
        })
    }
    const meta = getBlockMeta(id, context, translate)

    return (
        <div className={`Block__Heading Block__Heading--${id}`}>
            <div className={`Block__Title Block__Title--${showOptions ? 'open' : 'closed'}`}>
                <div className="Block__Title__Left">
                    <h3 className="Block__Title__Text Block__Title__Text--short">
                        <SharePermalink url={meta.link} />
                        {title}
                    </h3>
                    {/* <h3 className="Block__Title__Text Block__Title__Text--full">
                    {title || translate(`fullcharts.${id}`, { values })}
                </h3> */}
                    {isShareable && (
                        <ShareBlock
                            id={id}
                            className="Block__Title__Share"
                            values={values}
                            title={title}
                            toggleClass={() => {
                                setShowOptions(!showOptions)
                            }}
                        />
                    )}
                </div>
                <div className="Block__Title__Right">
                    {units && setUnits && (
                        <div className="Block__Title__ChartControls ChartControls">
                            {/* <ChartModeSelector mode={mode} onChange={setMode} /> */}
                            <ChartUnitsSelector units={units} onChange={setUnits} />
                        </div>
                    )}
                </div>
            </div>
            {showDescription && (
                <div className="Block__Description">
                    <ReactMarkdown source={description} escapeHtml={false} />
                </div>
            )}
        </div>
    )
}

BlockTitle.propTypes = {
    id: PropTypes.string.isRequired,
    showDescription: PropTypes.bool.isRequired,
    isShareable: PropTypes.bool.isRequired
}

BlockTitle.defaultProps = {
    showDescription: true,
    isShareable: true
}

export default BlockTitle
