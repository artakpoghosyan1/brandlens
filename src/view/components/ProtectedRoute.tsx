import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getBrowserPermissions } from '../../services/permissions'

interface IProtectedRouteProps {
    exact?: boolean
    path: string
}

export const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = React.memo((props) => {
    const { children, ...rest } = props
    const [isMediaAccessAllowed, setIsMediaAccessAllowed] = React.useState(false)

    React.useEffect(() => {
        ;(async function () {
            const cameraAccess = await getBrowserPermissions('camera')
            const audioAccess = await getBrowserPermissions('microphone')

            setIsMediaAccessAllowed(cameraAccess.state === 'granted' && audioAccess.state === 'granted')
        })()
    }, [])

    return <Route {...rest}>{isMediaAccessAllowed ? children : <Redirect to={{ pathname: '/accesses' }} />}</Route>
})
