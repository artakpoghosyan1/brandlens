import * as React from 'react'
import { css, cx } from 'emotion'
import { PageComponent } from './shared/PageComponent'
import { PageHeaderComponent } from './shared/PageHeaderComponent'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { PageBodyComponent } from './shared/PageBodyComponent'
import { BackDarkIcon } from '../assets/icons/BackDarkIcon'
import { SaveIcon } from '../assets/icons/SaveIcon'
import { colors } from '../constants/Colors'
import { ShareIcon } from '../assets/icons/ShareIcon'

interface IShareComponentProps {
    hashTags: string[]
}

const shareFooterCss = css`
    display: flex;
    justify-content: space-between;
    margin-top: 9%;
`

const shareTitleCss = css`
    font-size: 20px;
`

const hashTagWrappersCss = css`
    display: flex;
    justify-content: space-between;
    margin-top: 19px;
`

const hashTagsCss = css`
    display: flex;
    font-size: 20px;
`

const hashTagCss = css`
    & + & {
        margin-left: 10px;
    }
`

const shareHeaderCss = css`
    padding: 6px 0;
`

const sharePageCss = css`
    padding: 0 15px 18px 15px;
`

const shareBodyCss = css`
    display: flex;
    flex-direction: column;
`

const shareButtonCss = css`
    ${clearButtonDefaultStylesCss};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    height: 81px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`

const saveBtnCss = css`
    border: 1px solid #000000;
`

const shareBtnCss = css`
    background-color: ${colors.springGreen};
`

const btnTextCss = css`
    margin-top: 10px;
`

const copyBtnCss = css`
    background-color: ${colors.mercury};
    border: 1px solid ${colors.alto};
    border-radius: 29px;
    font-size: 14px;
    padding: 5px 20px;
`

export const ShareComponent: React.FC<IShareComponentProps> = React.memo((props) => {
    return (
        <PageComponent className={sharePageCss}>
            <PageHeaderComponent className={shareHeaderCss}>
                <button className={clearButtonDefaultStylesCss}>
                    <BackDarkIcon />
                </button>

                <h2 className={shareTitleCss}>Start Again</h2>
            </PageHeaderComponent>

            <PageBodyComponent className={shareBodyCss}>
                <div
                    className={css`
                        flex-grow: 1;
                        background: red;
                    `}
                />

                <div className={hashTagWrappersCss}>
                    <div className={hashTagsCss}>
                        {props.hashTags.map((hashTag) => {
                            return <span className={hashTagCss}>{hashTag}</span>
                        })}
                    </div>

                    <button className={copyBtnCss}>Copy</button>
                </div>
            </PageBodyComponent>

            <footer className={shareFooterCss}>
                <button className={cx(shareButtonCss, saveBtnCss)}>
                    <SaveIcon />
                    <span className={btnTextCss}>Save device</span>
                </button>

                <button className={cx(shareButtonCss, shareBtnCss)}>
                    <ShareIcon />
                    <span className={btnTextCss}>Share</span>
                </button>
            </footer>
        </PageComponent>
    )
})
