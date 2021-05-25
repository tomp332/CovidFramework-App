import React, {useContext} from 'react';
import * as yup from 'yup';
import styled from '@emotion/styled';
import Title from "react-titles/Title6";
import {Link, useHistory} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {css, keyframes} from '@emotion/react'
import UserContext from "../../User";
import "./Login.css"; // keep this until we figure out how to get emotion to animate
import {login} from '../../../api/api';


const Login = () => {

    const {setUserInfo} = useContext(UserContext)
    const history = useHistory()

    const LoginSchema = yup.object().shape({
        username: yup.string()
            .min(5, 'Username Too Short')
            .max(15, 'Username Too Long')
            .required('Username is Required'),
        password: yup.string()
            .required('Username is Required')
    })

    return (
        <LoginPageWrapper>
            <div className="title">
                <Title size={300} text1="LOGIN" open={true}/>
            </div>
            <Formik
                initialValues={{username: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    const data = await login(values);
                    if (data !== null) {
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('username', values.username)
                        setUserInfo({
                            username: values.username,
                            isAuthenticated: true,
                        })
                        setSubmitting(false)
                        history.push("/home");
                    } else {
                        setErrors({
                            userAuthenticated: false,
                        })
                        setSubmitting(false)
                    }
                }}
            >
                {({errors, isSubmitting}) => (
                    <StyledForm>
                        <Exit to="/" style={{textDecoration: 'none'}}>&times;</Exit>
                        <FormLabel for="username">Username</FormLabel>
                        <StyledField id="userame" type="text" name="username"/>
                        <StyledErrorMessage name="username" component="div"/>
                        <FormLabel for="password">Password</FormLabel>
                        <StyledField type="password" name="password"/>
                        <StyledErrorMessage name="password" component="div"/>
                        <LoginButton
                            className={isSubmitting ? "loading" : null}
                            disabled={isSubmitting}
                            value="Login"
                            type="submit">
                            {isSubmitting ? 'Submitting...' : 'Login'}
                        </LoginButton>
                        {
                            errors.userAuthenticated === false ?
                                <SubmissionErrorMessage name="userAuthenticated" component="div">Unable to
                                    Login</SubmissionErrorMessage> : null
                        }
                    </StyledForm>
                )}
            </Formik>
        </LoginPageWrapper>
    )
}

export default Login;


const loading = keyframes`
  0% {
    background-position: -1000px 0;
    background-color: red;
  }
  50% {
    background-position: 1000px 0;
    background-color: lightgrey;
  }
  100% {
    background-position: -1000px 0;
    background-color: red;
  }
}
`

const loadingStyles = css`
  animation: ${loading} 3s infinite;
  background-image: linear-gradient(to right, #f6f7f9 0%, #e9ebee 20%, #f6f7f9 40%, #f6f7f9 100%);
`

const Exit = styled(Link)`
  position: absolute;
  right: 0;
  top: -0.5em;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
  border: none;
  font-size: 2em;
  color: #fff;

  &:visited {
    color: #fff;
  }
`

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`

const StyledForm = styled(Form)`
  display: grid;
  align-content: center;
  margin: 10% auto;
  background-color: #1d1d1d;
  min-width: 25%;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0 rgba(151, 208, 73, 0.6);
  padding: 2em;
  position: relative;
`

const FormLabel = styled.label`
  color: #aeaeae;
  font-weight: 600;
  font-size: 1.25em;
`

const StyledField = styled(Field)`
  padding: 1em 0.5em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  height: 2.5vh;
  color: black;
  border: 2px solid #ccc;
  border-radius: 6px;
  outline: none;
  width: 100%;
  vertical-align: middle;
  text-align: left;
  font-size: 1.05em;
  margin-bottom: 0.5em;
  transition: background 0.3s;
`

const LoginButton = styled.button`
  width: 100%;
  padding: 0.5em;
  border-radius: 5px;
  border: none;
  font-size: 1.25em;
  background-color: rgba(153, 209, 75, 0.8);
`

const StyledErrorMessage = styled(ErrorMessage)`
  color: #ff0033;
`

const SubmissionErrorMessage = styled.div`
  color: #ff0033;
`