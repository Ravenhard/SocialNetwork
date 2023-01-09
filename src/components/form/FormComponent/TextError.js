import React from 'react';
import style from './Texterror.module.css'


function TextError(props) {
    return (
        <div className={style.error}>
            {props.children}
        </div>
    );
}

export default TextError;