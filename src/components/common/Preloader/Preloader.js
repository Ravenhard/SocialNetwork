import preloader from "../../../assets/images/preloader.svg";
import React from "react";


let Preloader = (props) => {
    return <div style={{backgroundColor: 'white'}}>
        <img style={{width: '100px'}} src={preloader}/>
    </div>
}

export default Preloader;