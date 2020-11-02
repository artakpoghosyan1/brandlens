import * as React from 'react'

interface IDropLeftComponentProps {
    target: React.ReactElement
}

export const DropLeftComponent: React.FC<IDropLeftComponentProps> = React.memo((props) => {
    const onTargetClick = () => {
        console.log('aaaaaa')
    }

    return <>{React.cloneElement(props.target, { onClick: onTargetClick })}</>
})
