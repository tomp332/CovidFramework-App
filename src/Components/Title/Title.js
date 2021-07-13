import Title from 'react-titles/Title2'
import withMediaQuery from '../HighOrderComponents/withMediaQuery'
import './Title.css'
const ResponsiveTitle = (props) => {
    return withMediaQuery(Title, (size, titleProps = props) => {
        const sizes = {
            mobile: 200,
            tablet: 400,
            small: 300,
            large: 450,
            extraLarge: 450
        }


        return {
            size: sizes[size],
            ...titleProps
        }
    })
}

export default ResponsiveTitle