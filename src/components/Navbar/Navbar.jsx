import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";

const isActive = (e) => {
    return e.isActive ? s.active : s.item;
}


const Navbar = () => {
    return (
    <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to="/profile" className={isActive}>Profile</NavLink>
        </div>
        <div className={`${s.item} ${s.active}`}>
            <NavLink to='/dialogs' className={isActive}>Messages</NavLink>
        </div>
        <div className={`${s.item} ${s.active}`}>
            <NavLink to='/users' className={isActive}>Users</NavLink>
        </div>
        <div className={s.item}>
            <a>News</a>
        </div>
        <div className={s.item}>
            <a>Music</a>
        </div>
        <div className={s.item}>
            <a>Settings</a>
        </div>
        <div className={s.item}>
            <a>Friends</a>
        </div>
    </nav>
    )
}

export default Navbar;