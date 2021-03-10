
const validateRegisterInfo = (values)=>{
    let errors = {};
    errors.submit = true;
    if(!values.username.trim()) {
        errors.username = "Username required";
        errors.submit = false;
    }
    if(!values.password) {
        errors.password = "Password required";
        errors.submit = false;
    }
    if(!values.password2) {
        errors.password2= "Password required";
        errors.submit = false;
    }
    else if((values.password !== values.password2) && (values.password) && (values.password2)){
        errors.password = "Passwords do not match";
        errors.password2 = "Passwords do not match";
        errors.submit = false;
    }
    return errors;
}
export default validateRegisterInfo;