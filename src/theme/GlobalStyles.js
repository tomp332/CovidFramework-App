import { Global, css } from '@emotion/react'
import Background from '../media/background.jpg'

const styles = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    html,
    body {  
        height: 100%;
    }

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        background-image: url("${Background}");
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
    
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
    
    // .wrapper {
        
    // }
`

const GlobalStyles = props => <Global {...props} styles={styles} />

export default GlobalStyles