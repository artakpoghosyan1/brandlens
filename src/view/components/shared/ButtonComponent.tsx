import * as React from 'react'
import { colors } from '../../constants/Colors'
import styled from '@emotion/styled'

interface IButtonComponentProps {
    dark: boolean
}

const ButtonStyled = styled('button')<IButtonComponentProps>`
    border: none;
    background-color: ${(props) => (props.dark ? colors.darkGrayColor : colors.lightColor)};
    color: ${(props) => (props.dark ? '#fff' : colors.tertiaryTextColor)};
    font-size: 20px;
    text-transform: uppercase;
    padding: 16px 0;
    border-radius: 46px;
`

export const ButtonComponent: React.FC<IButtonComponentProps> = React.memo(({ dark, children }) => {
    return <ButtonStyled dark={dark}>{children}</ButtonStyled>
})
