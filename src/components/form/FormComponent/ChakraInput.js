import React from 'react';
import { Field } from "formik";
import { Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

function ChakraInput(props) {
    const { label, name, ...rest } = props
    return (
        <div>
            <Field name={name} >
                {
                    ({field, form}) => {
                        return <FormControl isInvalid={form.errors[name] && form.touched[name]} >
                            <FormLabel htmlFor={name}>{label}</FormLabel>
                            <Input id={name} {...rest} {...field} bg='white' />
                            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                        </FormControl>
                    }
                }
            </Field>
        </div>
    );
}

export default ChakraInput;