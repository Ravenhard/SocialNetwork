import s from './MyPosts.module.css'
import React, {useRef} from "react";
import Post from "./Post/Post";
import ProfileAddMessageForm from "../../form/ProfileAddMessageForm";


const MyPosts = (props) => {
    let postsElements = props.posts.map( p=>  <Post message={p.message}  count = {p.likesCount}/> )

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <ProfileAddMessageForm addPost={props.addPost} />
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
}

export default MyPosts;