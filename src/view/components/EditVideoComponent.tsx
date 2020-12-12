import * as React from 'react'
import { css } from 'emotion'
import { colors } from '../constants/Colors'
import { BackIcon } from '../assets/icons/BackIcon'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { TrimComponent } from './Trim/TrimComponent'
import { PageComponent } from './shared/PageComponent'
import { PageHeaderComponent } from './shared/PageHeaderComponent'
import { TrimVideoComponent } from './Trim/TrimVideoComponent'
import { PageBodyComponent } from './shared/PageBodyComponent'
import { TrimThumbsComponent } from './Trim/TrimThumbsComponent'
import { TrimDoneButtonComponent } from './Trim/TrimDoneButtonComponent'
import { TrimContextProvider } from '../contexts/TrimContextProvider'
import { CSSTransition } from 'react-transition-group'
import { useSelector } from 'react-redux'
import { IState } from '../../data/IState'

const editWrapperCss = css`
    background-color: ${colors.codGray};
    padding: 0 18px 23px;

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
    const openSingleTrim = useSelector((state: IState) => state.openSingleTrim)

    return (
        <TrimContextProvider>
            <PageComponent className={editWrapperCss}>
                <PageHeaderComponent className={editHeaderCss}>
                    <button className={clearButtonDefaultStylesCss} data-testid="trim-back-button">
                        <BackIcon />
                    </button>

                    <TrimDoneButtonComponent />
                </PageHeaderComponent>

                <PageBodyComponent className={editBodyCss}>
                    <TrimVideoComponent />
                </PageBodyComponent>
                <footer>
                    <CSSTransition in={!openSingleTrim} timeout={200} classNames="trim" unmountOnExit>
                        <TrimComponent />
                    </CSSTransition>

                    <TrimThumbsComponent />
                </footer>
            </PageComponent>
        </TrimContextProvider>
    )
})
