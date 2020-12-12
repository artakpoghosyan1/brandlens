import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getBrowserPermissions } from '../../services/permissions'

interface IProtectedRouteProps {
    exact?: boolean
    path: string
}

export const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = React.memo((props) => {
    const { children, ...rest } = props
    const [mediaAccess, setMediaAccess] = React.useState<boolean | null>(false)

    React.useEffect(() => {
        ;(async function () {
            const cameraAccess = await getBrowserPermissions('camera')
            const audioAccess = await getBrowserPermissions('microphone')

            const granted = cameraAccess.state === 'granted' && audioAccess.state === 'granted'
            setMediaAccess(granted || null)
        })()
    }, [])

    return (
        <Route {...rest}>
            {mediaAccess ? children : mediaAccess === false ? null : <Redirect to={{ pathname: '/accesses' }} />}
        </Route>
    )
})
