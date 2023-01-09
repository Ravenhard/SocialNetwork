import React from 'react';
import DataView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Field, ErrorMessage } from 'formik'
import TextError from "./TextError";
import Textarea from "./Textarea";

function DataPicker(props) {
    const { label, name, ...rest } = props;
    return (
        <div className='form-control' >
            <label htmlFor={name}>{label}</label>
            <Field name={name}>
                {
                    ({form, field}) => {
                        const { setFieldValue } = form
                        const { value } = field
                        return <DataView
                            {...field}
                            id={name}
                            {...rest}
                            selected={value}
                            onChange={val => setFieldValue(name, val)}
                        />
                    }
                }
            </Field>
            <ErrorMessage name={name} component={Textarea}/>
        </div>
    );
}

export default DataPicker;