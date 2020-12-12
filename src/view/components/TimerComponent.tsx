import * as React from 'react'
import { css, cx } from 'emotion'
import styled from '@emotion/styled'

interface ITimerComponentProps {}

const OPTION_WIDTH = 52
const LEFT_PADDING = 28

const timerCss = css`
    display: flex;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 22px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    width: 316px;
    position: relative;
    padding: 0 ${LEFT_PADDING}px;
`

const timerItemCss = css`
    width: ${OPTION_WIDTH}px;
    height: 44px;
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const selectedCss = css`
    color: transparent;
`

const SelectMarker = styled('li')<{ position: number }>`
    transition: all 0.2s;
    transform: translateX(${(props) => props.position}px);
    position: absolute;
    background-color: #fff;
    color: #000;
    left: ${LEFT_PADDING}px;
`

const timerOptions = [
    { label: '0.3x', id: 0.3 },
    { label: '0.5x', id: 0.5 },
    { label: '1x', id: 1 },
    { label: '2x', id: 2 },
    { label: '3x', id: 3 },
]

export const TimerComponent: React.FC<ITimerComponentProps> = React.memo(() => {
    const [selectedItem, setSelectedItem] = React.useState(timerOptions[2])

    const onItemClickHandler = (selectedId) => {
        setSelectedItem(selectedId)
    }

    return (
        <ul className={timerCss}>
            {timerOptions.map((timer) => (
                <li
                    key={timer.id}
                    className={cx(timerItemCss, timer.id === selectedItem.id ? selectedCss : '')}
                    onClick={() => onItemClickHandler(timer)}
                >
                    {timer.label}
                </li>
            ))}
            <SelectMarker
                className={timerItemCss}
                position={timerOptions.findIndex((item) => item.id === selectedItem.id) * OPTION_WIDTH}
            >
                <span className={css``}>{selectedItem.label}</span>
            </SelectMarker>
        </ul>
    )
})
