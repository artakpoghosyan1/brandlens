import * as React from 'react'
import { TitleComponent } from './shared/TitleComponent'
import { css } from 'emotion'
import { InputComponent } from './shared/InputComponent'
import { ButtonComponent } from './shared/ButtonComponent'
import { colors } from '../constants/Colors'
import { PageComponent } from './shared/PageComponent'

const previewVideoCss = css`
    margin-bottom: 18px;
    flex-grow: 1;
    border-radius: 11px;
    overflow: hidden;

    > * {
        width: 100%;
        height: 100%;
    }
`

const startPageCss = css`
    padding: 15px 42px 12px 42px;
`

const inputsWrapperCss = css`
    margin-bottom: 24px;
`

const termsCss = css`
    font-size: 10px;
    color: ${colors.infoColor};
    text-align: center;
    padding-top: 15px;

    a {
        font-weight: 700;
        text-decoration: underline;
    }
`

export const StartPageComponent: React.FC = () => {
    return (
        <PageComponent className={startPageCss}>
            <TitleComponent>Create your day with us!</TitleComponent>

            <div className={previewVideoCss}>
                <iframe
                    src="https://www.youtube.com/embed/S2nBBMbjS8w"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            <div className={inputsWrapperCss}>
                <InputComponent type="text" placeholder="Name" />
                <InputComponent type="number" placeholder="Age" />
            </div>

            <ButtonComponent dark fullBleed>
                Start
            </ButtonComponent>

            <div className={termsCss}>
                <p>
                    by continuing, you agree to Brand Lens’s <a href="#">Terms of Use</a>
                </p>
                <p>
                    ans confirm that you have read Brand Lens’s <a href="#">Privacy Policy</a>
                </p>
            </div>
        </PageComponent>
    )
}
