import React from 'react';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormikControl from "./FormComponent/FormikControl";

function DialogAddMessageForm(props) {

    const initialValues = {
        message: '',
    }
    const validationSchema = Yup.object({
        message: Yup.string().required('Required'),
    })
    const onSubmit = values => {
        props.sendMessage(values.message)
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
                        <Form>
                            <FormikControl
                                control='textarea'
                                label=''
                                name='message'
                            />
                            <button
                                type='submit'
                                disabled={!formik.isValid}
                            >
                                Submit
                            </button>
                        </Form>
                    )
                }
            }
        </Formik>
    );
}

export default DialogAddMessageForm;