import * as React from 'react'
import { containerCss } from '../styles/sharedStyles'
import { css } from 'emotion'
import { TitleComponent } from './shared/TitleComponent'
import { colors } from '../constants/Colors'
import { ButtonComponent } from './shared/ButtonComponent'
import { CloseButtonComponent } from './shared/CloseButtonComponent'

interface IAccessesComponentProps {}

const accessesCss = css`
    background-color: ${colors.darkBackgroundColor};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    .${containerCss} {
        height: auto;
    }
`

const accessesTitleCss = css`
    text-align: left;
    margin-bottom: 58px;
`

const accessesListCss = css`
    margin-bottom: 46px;
    li + li {
        margin-top: 32px;
    }
`

export const AccessesComponent: React.FC<IAccessesComponentProps> = React.memo(() => {
    return (
        <div className={accessesCss}>
            <div className={containerCss}>
                <CloseButtonComponent />

                <TitleComponent className={accessesTitleCss}>Enable access so you can start taking videos</TitleComponent>

                <ul className={accessesListCss}>
                    <li>Enable Camera Access</li>
                    <li>Enable Microphone Access</li>
                </ul>

                <ButtonComponent>Allow Access</ButtonComponent>
            </div>
        </div>
    )
})
