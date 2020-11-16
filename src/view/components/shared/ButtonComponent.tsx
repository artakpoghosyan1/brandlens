import * as React from 'react'
import { colors } from '../../constants/Colors'
import styled from '@emotion/styled'

interface IButtonComponentProps {
    dark?: boolean
    fullBleed?: boolean
    className?: string
}

const ButtonStyled = styled('button')<IButtonComponentProps>`
    border: none;
    display: flex;
    background-color: ${(props) => (props.dark ? colors.darkGrayColor : colors.lightColor)};
    color: ${(props) => (props.dark ? '#fff' : colors.tertiaryTextColor)};
    font-size: ${(props) => (props.dark ? '20px' : '16px')};
    text-transform: ${(props) => (props.dark ? 'uppercase' : 'initial')};
    padding: 16px 16px;
    border-radius: 46px;
    width: ${(props) => (props.fullBleed ? '100%' : 'auto')};
    align-items: center;

    svg {
        margin-left: 10px;
    }
`

export const ButtonComponent: React.FC<IButtonComponentProps> = React.memo(({ dark, children, fullBleed, className }) => {
    return (
        <ButtonStyled className={className || ''} dark={dark}>
            {children}
        </ButtonStyled>
    )
})
