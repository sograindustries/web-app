import * as React from 'react';
import { Line, CartesianGrid, ComposedChart } from 'recharts';

interface Props {
    data: number[];
}

const SAMPLES_PER_SECOND = 250;
const PIXELS_PER_SECOND = 945 / 4;

function EcgChartGraph(props: Props) {
    const seconds = props.data.length / SAMPLES_PER_SECOND;
    const formattedData = props.data.map((el, i) => {
        return {
            name: i,
            value: el,
        };
    });

    const bigSquares = [];
    const smallSquares = [];
    for (let i = 0; i < seconds * PIXELS_PER_SECOND; i += Math.floor(PIXELS_PER_SECOND / 25)) {
        if (i % 5 === 0) {
            bigSquares.push(i);
        } else {
            smallSquares.push(i);
        }
    }

    const hBigSquares = [];
    const hSmallSquares = [];
    for (let i = 0; i < seconds * PIXELS_PER_SECOND; i += Math.floor(PIXELS_PER_SECOND / 25)) {
        if (i % 5 === 0) {
            hBigSquares.push(i);
        } else {
            hSmallSquares.push(i);
        }
    }

    return (
        <div style={{ position: 'relative', overflowX: 'auto', display: 'flex' }}>
            <ComposedChart
                width={PIXELS_PER_SECOND * seconds}
                height={300}
                data={formattedData}
                style={{ position: 'absolute' }}
            >
                <CartesianGrid
                    verticalPoints={smallSquares}
                    horizontalPoints={hSmallSquares}
                    stroke="rgba(255, 0, 0, 0.2)"
                    strokeWidth={1}
                />
            </ComposedChart>
            <ComposedChart width={PIXELS_PER_SECOND * seconds} height={300} data={formattedData}>
                <CartesianGrid
                    verticalPoints={bigSquares}
                    horizontalPoints={hBigSquares}
                    stroke="rgba(255, 0, 0, 0.5)"
                    strokeWidth={1}
                />

                <Line
                    isAnimationActive={false}
                    type="linear"
                    dot={false}
                    dataKey="value"
                    stroke="black"
                    strokeWidth={2}
                />
            </ComposedChart>
            <div
                ref={ref => {
                    if (ref) {
                        ref.scrollIntoView();
                    }
                }}
            />
        </div>
    );
}

export default EcgChartGraph;
