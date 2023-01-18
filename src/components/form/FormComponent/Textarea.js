import React from 'react';
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Textarea(props) {
    const { label, name, ...rest } = props;
    return (
        <div className='form-control' >
            <div>
                <label htmlFor={name}>{label}</label>
            </div>
            <div>
                <Field as='textarea' id={name} name={name} {...rest} />
            </div>
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
}

export default Textarea;