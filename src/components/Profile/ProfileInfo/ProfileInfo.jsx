import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/images/vector-users-icon.jpg';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {useState} from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={s.namePhoto}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                { editMode
                    ? <ProfileDataForm
                        setEditMode={setEditMode}
                        profile={props.profile}
                        saveProfile={props.saveProfile}
                    />
                    : <ProfileData profile={props.profile}
                                   isOwner={props.isOwner}
                                   goToEditMode={ ()=>{setEditMode(true)} }
                    /> }


                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        <div>
            { isOwner && <div><button onClick={goToEditMode}>edit</button></div> }
        </div>
        <div>
            <b>Fullname</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b> : {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })
        }
        </div>
    </div>
}

const Contact = ({contactTitle,contactValue}) => {
    return <div className={s.contact} ><b>{contactTitle}</b>: {contactValue} </div>
}

export default ProfileInfo;