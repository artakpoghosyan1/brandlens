import { injectGlobal } from 'emotion'
import { colors } from '../constants/Colors'

injectGlobal`
    *,
    *:after, *:before {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    
    html, body, #root {
        height: 100%;
    } 
    
    body {
        color: ${colors.mainTextColor};
    }
    
    ul {
        list-style: none;
    }
`
