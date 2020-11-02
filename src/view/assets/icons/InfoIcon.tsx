import * as React from 'react'

interface IInfoIconProps {
    width?: number
    height?: number
}

export const InfoIcon: React.FC<IInfoIconProps> = ({ width, height }) => {
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d)">
                <path
                    d="M15.5835 9.91671H18.4168V12.75H15.5835V9.91671ZM15.5835 15.5834H18.4168V24.0834H15.5835V15.5834ZM17.0002 2.83337C9.18016 2.83337 2.8335 9.18004 2.8335 17C2.8335 24.82 9.18016 31.1667 17.0002 31.1667C24.8202 31.1667 31.1668 24.82 31.1668 17C31.1668 9.18004 24.8202 2.83337 17.0002 2.83337ZM17.0002 28.3334C10.7527 28.3334 5.66683 23.2475 5.66683 17C5.66683 10.7525 10.7527 5.66671 17.0002 5.66671C23.2477 5.66671 28.3335 10.7525 28.3335 17C28.3335 23.2475 23.2477 28.3334 17.0002 28.3334Z"
                    fill="white"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d"
                    x="-1.1665"
                    y="-2.16663"
                    width="36.3333"
                    height="36.3333"
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

InfoIcon.defaultProps = {
    width: 34,
    height: 34,
}
