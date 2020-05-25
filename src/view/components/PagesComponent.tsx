import * as React from 'react'
import { isAllowedCameraSelector } from '../../data/selectors/isAllowedCameraSelector'
import { connect } from 'react-redux'
import { PreviewPageComponent } from './PreviewPageComponent'
import { HomeComponent } from './HomeComponent'
import { getBrowserPermissions } from '../../services/permissions'
import { LoadingComponent } from './LoadingComponent'

interface IPagesComponentProps {
    isAllowedCamera: boolean
}

const Pages: React.FunctionComponent<IPagesComponentProps> = React.memo((props) => {
    const [showPreviewPage, setShowPreviewPage] = React.useState<boolean | null>(null)

    React.useEffect(() => {
        getBrowserPermissions('camera').then((result) => {
            setShowPreviewPage(result.state !== 'granted')
        })
    }, [])

    return (
        <>
            {showPreviewPage === true && !props.isAllowedCamera ? (
                <PreviewPageComponent />
            ) : showPreviewPage === null ? (
                <LoadingComponent />
            ) : (
                <HomeComponent />
            )}
        </>
    )
})

const mapStateToProps = (state) => ({
    isAllowedCamera: isAllowedCameraSelector(state),
})

export const PagesComponent = connect(mapStateToProps)(Pages)
