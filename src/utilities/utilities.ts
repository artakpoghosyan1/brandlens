export const mapRange = (value: number, low1: number = 0, high1: number, low2: number = 0, high2: number): number => {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)
}

export const getFrameUnit = (containerWidth: number, framesCount: number): number => containerWidth / framesCount

export const frameUnitToSecond = (frameUnit: number, fps: number): number => frameUnit * fps

export const trimmesCountToSecond = (framesCount: number, fps: number): number => framesCount / fps

export const getTrimmedWidthInPx = (framesCount: number, trimmedValue: number, frameUnit: number): number => {
    return (framesCount - Math.abs(trimmedValue)) * frameUnit
}
