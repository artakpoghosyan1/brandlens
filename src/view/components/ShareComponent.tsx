import * as React from 'react'
import { css } from 'emotion'
import { PageContainerComponent } from './shared/PageContainerComponent'

interface IShareComponentProps {}

export const ShareComponent: React.FC<IShareComponentProps> = React.memo((props) => {
    return <PageContainerComponent></PageContainerComponent>
})
