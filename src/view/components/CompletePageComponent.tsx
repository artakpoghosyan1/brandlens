import * as React from 'react'
import { PageComponent } from './shared/PageComponent'
import { PageHeaderComponent } from './shared/PageHeaderComponent'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { BackIcon } from '../assets/icons/BackIcon'
import { PageBodyComponent } from './shared/PageBodyComponent'
import { ControlButtonComponent } from './shared/ControlButtonComponent'
import { ButtonComponent } from './shared/ButtonComponent'
import { css } from 'emotion'
import { NextIcon } from '../assets/icons/NextIcon'
import video from '../assets/videos/overlayAnimation.mp4'

const completeCss = css`
    padding-right: 5px;
`

const completeVideo = css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
`

const completeButtonsCss = css`
    float: right;
`

const completeBodyCss = css`
    margin-top: 32px;
`

const completeHeaderCss = css`
    padding-top: 29px;
`

const footerCss = css`
    padding-bottom: 23px;
`

export const CompletePageComponent: React.FC = React.memo(() => {
    return (
        <PageComponent className={completeCss}>
            <video src={video} autoPlay loop={true} className={completeVideo} />

            <PageHeaderComponent className={completeHeaderCss}>
                <button className={clearButtonDefaultStylesCss}>
                    <BackIcon />
                </button>
            </PageHeaderComponent>

            <PageBodyComponent className={completeBodyCss}>
                <ControlButtonComponent className={completeButtonsCss} />
            </PageBodyComponent>

            <footer className={footerCss}>
                <ButtonComponent fullBleed className={completeButtonsCss}>
                    Next
                    <NextIcon />
                </ButtonComponent>
            </footer>
        </PageComponent>
    )
})
