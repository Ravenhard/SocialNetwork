import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import FormikControl from "../../form/FormComponent/FormikControl";
import React from "react";

const ProfileDataForm = (props) => {

    const initialValues = {
        fullName: props.profile.fullName,
        lookingForAJob: props.profile.lookingForAJob,
        lookingForAJobDescription: props.profile.lookingForAJobDescription,
        aboutMe: props.profile.aboutMe,
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        },
    }
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Required'),
        lookingForAJob: Yup.bool().oneOf([true], "Must agree to something"),
        lookingForAJobDescription: Yup.string().required('Required'),
        aboutMe: Yup.string().required('Required'),
    })
    const onSubmit = (profile) => {
        props.saveProfile(profile).then(
            () => {
                props.setEditMode(false)
            }
        )
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
                                control='input'
                                type='Text'
                                label='Fullname'
                                name='fullName'
                            />
                            <div>
                                <div>
                                    <label>
                                        <b>Looking for a Job</b>
                                    </label>
                                </div>
                                <Field
                                    type='checkbox'
                                    name='lookingForAJob'
                                    label='Looking for a Job'
                                />
                            </div>
                            <FormikControl
                                control='textarea'
                                label='My Professional skills: '
                                name='lookingForAJobDescription'
                            />
                            <FormikControl
                                control='textarea'
                                label='About me: '
                                name='aboutMe'
                            />
                            <span><b>Contacts: </b></span>
                            <div style={{marginLeft: 10}}>
                                <FormikControl
                                    control='input'
                                    type='Text'
                                    label='facebook: '
                                    name='contacts.facebook'
                                />
                                <FormikControl
                                    control='input'
                                    type='Text'
                                    label='website: '
                                    name='contacts.website'
                                />
                                <FormikControl
                                    control='input'
                                    type='Text'
                                    label='vk: '
                                    name='contacts.vk'
                                />
                                <FormikControl
                                    control='input'
                                    type='Text'
                                    label='twitter: '
                                    name='contacts.twitter'
                                />
                                <FormikControl
                                    control='input'
                                    type='Text'
                                    label='instagram: '
                                    name='contacts.instagram'
                                />
                                <FormikControl
                                    control='input'
                                    type='Text'
                                    label='youtube: '
                                    name='contacts.youtube'
                                />
                                <FormikControl
                                    control='input'
                                    type='Text'
                                    label='github: '
                                    name='contacts.github'
                                />
                                <FormikControl
                                    control='input'
                                    type='Text'
                                    label='mainLink: '
                                    name='contacts.mainLink'
                                />
                            </div>

                            <button type='submit' disabled={!formik.isValid}>
                                Save
                            </button>
                        </Form>
                    )
                }
            }
        </Formik>
    );
}

export default ProfileDataForm