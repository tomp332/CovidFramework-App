const validateInfo = (values) => {
    let errors = {};

    if (!values.username.trim()) {
        errors.username = "Username required";
    }
    if (!values.password) {
        errors.password = "Password required";
        errors.login = "Correct";
    } else if (values.loginError) {
        errors.loginError = "Wrong credentials, please try again!";
    } else if (!values.loginError) {
        errors.loginError = "";
    }
    return errors;
}
export default validateInfo;