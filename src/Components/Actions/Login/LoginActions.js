import {useState,useContext} from "react";
import UserContext from "../../User";
import {login} from '../../../api/api';
import { useHistory } from 'react-router-dom';


const LoginActions =(validateInfo)=> {
    const {setUserInfo} = useContext(UserContext);
    const [values, setValues] = useState({
            username: '',
            password: ''
    });
    const history = useHistory();
    const [errors, setErrors] = useState({})
    const [ifSubmited,setIfSubmited] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setErrors(validateInfo(values));
        setIfSubmited(true);
        const checkLogIn = await login(values);
        if(checkLogIn){
            setUserInfo({
                username:values.username,
                isAuthenticated: true
            })
        }
        setIfSubmited(false);
        history.push("/home");
    };

    return {handleChange, values, handleSubmit, errors,ifSubmited};
}

export default LoginActions;