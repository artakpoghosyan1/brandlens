import * as React from 'react'
import { clearButtonDefaultStylesCss } from '../../styles/sharedStyles'
import styled from '@emotion/styled'
import { cx } from 'emotion'

interface IControlButtonComponentProps extends React.DOMAttributes<HTMLElement> {
    className?: string
    large?: boolean
}

const ControlBtnStyled = styled('button')<{ large?: boolean }>`
    background: rgba(255, 255, 255, 0.8);
    width: ${(props) => (props.large ? '46px' : '44px')};
    height: ${(props) => (props.large ? '46px' : '44px')};
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ControlButtonComponent: React.FC<IControlButtonComponentProps> = React.memo((props) => {
    const { className, ...rest } = props
    return (
        <ControlBtnStyled large={props.large} className={cx(className || '', clearButtonDefaultStylesCss)} {...rest}>
            {props.children}
        </ControlBtnStyled>
    )
})
