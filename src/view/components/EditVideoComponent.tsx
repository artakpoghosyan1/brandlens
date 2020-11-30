import * as React from 'react'
import { css } from 'emotion'
import { colors } from '../constants/Colors'
import { BackIcon } from '../assets/icons/BackIcon'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { DoneIcon } from '../assets/icons/DoneIcon'
import { TrimComponent } from './Trim/TrimComponent'
import { PageComponent } from './shared/PageComponent'
import { PageHeaderComponent } from './shared/PageHeaderComponent'
import { TrimVideoComponent } from './Trim/TrimVideoComponent'
import { PageBodyComponent } from './shared/PageBodyComponent'
import { TrimContext } from '../contexts/TrimContext'

const editWrapperCss = css`
    background-color: ${colors.codGray};
    padding: 30px 18px 23px;

    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
`

const editHeaderCss = css`
    margin-bottom: 30px;
`

const editBodyCss = css`
    position: relative;
    padding-bottom: 60px;
`

export const EditVideoComponent: React.FC = React.memo(() => {
    const [videoCurrentTime, setVideoCurrentTime] = React.useState<number>(0)
    const [shouldPauseTrimmingVideo, setShouldPauseTrimmingVideo] = React.useState<boolean>(false)
    const [leftTrimValue, setLeftTrimValue] = React.useState<number>(0)
    const [rightTrimValue, setRightTrimValue] = React.useState<number>(0)

    return (
        <TrimContext.Provider
            value={{
                leftTrimValue,
                setLeftTrimValue,
                rightTrimValue,
                setRightTrimValue,
                videoCurrentTime,
                setVideoCurrentTime,
                shouldPauseTrimmingVideo,
                setShouldPauseTrimmingVideo,
            }}
        >
            <PageComponent className={editWrapperCss}>
                <PageHeaderComponent className={editHeaderCss}>
                    <button className={clearButtonDefaultStylesCss}>
                        <DoneIcon />
                    </button>

                    <button className={clearButtonDefaultStylesCss}>
                        <BackIcon />
                    </button>
                </PageHeaderComponent>

                <PageBodyComponent className={editBodyCss}>
                    <TrimVideoComponent />
                </PageBodyComponent>
                <footer>
                    <TrimComponent />
                </footer>
            </PageComponent>
        </TrimContext.Provider>
    )
})
