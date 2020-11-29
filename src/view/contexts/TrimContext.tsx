import * as React from 'react'

interface ITrimContext {
    videoCurrentTime: number
    headerValue: number
    setHeaderValue: React.Dispatch<React.SetStateAction<number>>
    onHeaderChange: (value: number | number[] | undefined | null) => void
    shouldPauseTrimmingVideo: boolean
    setShouldPauseTrimmingVideo: React.Dispatch<React.SetStateAction<boolean>>
    setVideoCurrentTime: React.Dispatch<React.SetStateAction<number>>
    leftTrimValue: number
    setLeftTrimValue: React.Dispatch<React.SetStateAction<number>>
    rightTrimValue: number
    setRightTrimValue: React.Dispatch<React.SetStateAction<number>>
}

export const TrimContext = React.createContext<ITrimContext>(undefined!)
