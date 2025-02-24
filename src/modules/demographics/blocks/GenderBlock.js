import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { gender } from '../../../constants'
import Block from 'core/components/Block'
import GaugeBarChart from 'core/charts/GaugeBarChart'
import ChartContainer from 'core/charts/ChartContainer'
import GenderLegends from 'modules/demographics/charts/GendersLegends'

const getChartData = (data, block) => {
    const blockData = data.data.aggregations.find(agg => agg.id === block.id)
    return blockData.breakdown.buckets
}

const GenderBreakdownBlock = ({ block, data }) => {
    const { units: defaultUnits = 'percentage' } = block
    const [units, setUnits] = useState(defaultUnits)

    const chartData = useMemo(() => getChartData(data, block), [data, block])

    return (
        <Block
            id={block.id}
            showDescription={false}
            className="Block--gender Gender__Block"
            units={units}
            setUnits={setUnits}
        >
            <ChartContainer height={200} fit={true}>
                <GaugeBarChart
                    units={units}
                    buckets={chartData}
                    mapping={gender}
                    i18nNamespace={block.id}
                />
            </ChartContainer>
            <GenderLegends data={chartData} units={units} />
        </Block>
    )
}

GenderBreakdownBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default memo(GenderBreakdownBlock)
