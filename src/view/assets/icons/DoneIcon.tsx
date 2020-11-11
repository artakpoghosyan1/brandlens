import * as React from 'react'

export const DoneIcon: React.FC = () => {
    return (
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d)">
                <path
                    d="M26.5 15.125H9.76625L17.4525 7.43875L15.5 5.5L4.5 16.5L15.5 27.5L17.4387 25.5613L9.76625 17.875H26.5V15.125Z"
                    fill="white"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d"
                    x="0.5"
                    y="0.5"
                    width="30"
                    height="30"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
