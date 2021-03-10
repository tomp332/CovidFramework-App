import {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {register} from '../../../api/api';


const RegisterActions =(validateRegisterInfo)=> {
    const [values, setValues] = useState({
        username: '',
        password: '',
        password2: ''
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
        setErrors(validateRegisterInfo(values));
        // if(errors.submit){

        // }
        setIfSubmited(false);
    };

    useEffect(()=>{
        if(Object.keys(errors).length === 0){
            setIfSubmited(true);
        }
    },[errors]);

    return {handleChange, values, handleSubmit, errors,ifSubmited};
}

export default RegisterActions;