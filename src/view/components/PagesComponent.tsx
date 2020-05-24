import * as React from 'react'
import { isAllowedCameraSelector } from '../../data/selectors/isAllowedCameraSelector'
import { connect } from 'react-redux'
import { PreviewPageComponent } from './PreviewPageComponent'
import { HomeComponent } from './HomeComponent'

interface IPagesComponentProps {
    isAllowedCamera: boolean
}

const Pages: React.FunctionComponent<IPagesComponentProps> = React.memo(
    (props) => {
        return (
            <>
                {props.isAllowedCamera ? (
                    <PreviewPageComponent />
                ) : (
                    <HomeComponent />
                )}
            </>
        )
    }
)

const mapStateToProps = (state) => ({
    isAllowedCamera: isAllowedCameraSelector(state),
})

export const PagesComponent = connect(mapStateToProps)(Pages)
