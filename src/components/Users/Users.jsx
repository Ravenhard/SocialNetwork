import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <Paginator
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            totalItemsCount={props.totalUsersCount}
            pageSize={props.pageSize}
        />

        {
            props.users.map(u => <User
                    user={u}
                    followingInProgress={props.followingInProgress}
                    key={u.id}
                    unfollow={props.unfollow}
                    follow={props.follow}
                />
            )
        }
    </div>
}

export default Users;
