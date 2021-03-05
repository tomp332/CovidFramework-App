import {useState,useContext} from "react";
import UserContext from "../../User";
import {login} from '../../../api/api';

const LoginActions =(validateInfo)=> {
    const {userInfo,setUserInfo} = useContext(UserContext);
    const [values, setValues] = useState({
            username: '',
            password: ''
    });

    const [errors, setErrors] = useState({})
    const [ifSubmited,setIfSubmited] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setErrors(validateInfo(values));
        setIfSubmited(true);
        const checkLogIn = login(values);
        if(checkLogIn){
            setUserInfo({
                username:values.username,
                isAuthenticated: true
            })
        }
        setIfSubmited(false);
    };


    return {handleChange, values, handleSubmit, errors,ifSubmited};
}

export default LoginActions;