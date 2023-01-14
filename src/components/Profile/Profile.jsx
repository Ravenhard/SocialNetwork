import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPost/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo
                isOwner = {props.isOwner}
                profile = {props.profile}
                status={props.status}
                updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;