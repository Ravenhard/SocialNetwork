import React from 'react';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormikControl from "./FormComponent/FormikControl";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

function LoginForm(props) {
    const checkboxOptions = [
        {key: 'Remember me', value: 'true'},
    ]
    const initialValues = {
        email: '',
        password: '',
        check: []
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
        check: Yup.array().required('Required')
    })
    const onSubmit = (values, actions) => {
        actions.setStatus(undefined);
        props.login(values.email, values.password, values.rememberMe, actions)
    }

    if (props.isAuth) {
        return <Navigate to='/profile'/>
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => {
                    return (
                        <div style={{width: 500, margin: 20}}>
                            <Form>
                                <FormikControl
                                    control='chakrainput'
                                    type='email'
                                    label='Email'
                                    name='email'
                                />
                                <FormikControl
                                    control='chakrainput'
                                    type='password'
                                    label='Password'
                                    name='password'
                                />
                                <FormikControl
                                    control='checkbox'
                                    label=''
                                    name='check'
                                    options={checkboxOptions}
                                />
                                <div style={{color: "red", }}>{
                                    formik.status ? <span> {formik.status}</span> : null
                                }</div>
                                <button
                                    type='submit'
                                    disabled={!formik.isValid}
                                >
                                    Submit
                                </button>
                            </Form>
                        </div>)
                }
            }
        </Formik>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(LoginForm);