import { createSelector } from 'reselect'
import { IState } from '../IState'

export const framesCountSumSelector = createSelector(
    ({ currentRecordedVideo }: IState) => currentRecordedVideo,
    (currentRecordedVideo) => {
        return currentRecordedVideo!.framesCounts.reduce((sum, framesCount) => {
            sum += framesCount

            return sum
        }, 0)
    }
)
