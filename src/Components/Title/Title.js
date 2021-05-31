import Title from 'react-titles/Title6'
import withMediaQuery from '../HighOrderComponents/withMediaQuery'

const ResponsiveTitle = (props) => {
    return withMediaQuery(Title, (size, titleProps=props) => {
        const sizes = {
            mobile: 300,
            tablet: 400,
            small: 500,
            large: 600,
            extraLarge: 700
        }
    
        return {
            size: sizes[size],
            ...titleProps
        }
    })
}

export default ResponsiveTitle