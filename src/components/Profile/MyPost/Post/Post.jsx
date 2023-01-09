import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.posts}>
            <div className={s.item}>
                <img src="https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg"/>
                { props.message }
                <div>
                    <span>like {props.count}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;