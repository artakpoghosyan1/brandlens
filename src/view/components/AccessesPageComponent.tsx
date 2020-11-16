import * as React from 'react'
import { css } from 'emotion'
import { TitleComponent } from './shared/TitleComponent'
import { colors } from '../constants/Colors'
import { ButtonComponent } from './shared/ButtonComponent'
import { CloseButtonComponent } from './shared/CloseButtonComponent'
import { PageComponent } from './shared/PageComponent'

interface IAccessesPageComponentProps {}

const accessesCss = css`
    background-color: ${colors.darkBackgroundColor};
    justify-content: center;
    color: #fff;
    padding: 0 42px;
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

const closeBtnCss = css`
    position: absolute;
    top: 22px;
    left: 19px;
`

export const AccessesPageComponent: React.FC<IAccessesPageComponentProps> = React.memo(() => {
    return (
        <PageComponent className={accessesCss}>
            <CloseButtonComponent className={closeBtnCss} />

            <TitleComponent className={accessesTitleCss}>Enable access so you can start taking videos</TitleComponent>

            <ul className={accessesListCss}>
                <li>Enable Camera Access</li>
                <li>Enable Microphone Access</li>
            </ul>

            <ButtonComponent fullBleed>Allow Access</ButtonComponent>
        </PageComponent>
    )
})
