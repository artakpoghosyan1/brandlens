import * as React from 'react'

interface ICloseIconProps {
    width?: number
    height?: number
}

export const CloseIcon: React.FC<ICloseIconProps> = ({ width, height }) => {
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d)">
                <path
                    d="M26 7.21571L23.7843 5L15 13.7843L6.21571 5L4 7.21571L12.7843 16L4 24.7843L6.21571 27L15 18.2157L23.7843 27L26 24.7843L17.2157 16L26 7.21571Z"
                    fill="white"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d"
                    x="0"
                    y="0"
                    width="30"
                    height="30"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="-1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

CloseIcon.defaultProps = {
    width: 30,
    height: 30,
}
