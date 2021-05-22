import { ThemeProvider } from '@emotion/react'

export const theme = {
    colors: {
        // backgrounds
        bgLightest: '',
        bgLight: '#444444',
        bgMain: '#1d1d1d',
        bgDark: '',
        bgDarkest: '',

        // text
        textLightest: '',
        textLight: '',
        textMain: '#fafafa',
        textDark: '',
        textDarkest: '',

        // palette
        primary: '#98d14a',  // green
        secondary: '',

        // notifications
        info: '',
        warning: '',
        error: '',
    }
}

const GlobalThemeProvider = props => <ThemeProvider {...props} theme={theme} />

export default GlobalThemeProvider