import React from "react";
import Profile from "./Profile";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {AuthRedirect} from "../hoc/AuthRedirect";
import {compose} from "redux";
import {getAuthUserData} from "../../redux/auth-reducer";

class ProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.autorizedUsedId;
        }
        if (userId) {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }

    }

    render() {

        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus} />
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUsedId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let params = useParams();
        return <Component {...props} router={{ params }} />;
    }
    return ComponentWithRouterProp;
}

export const withNavigate = (Component) => {
    let RedirectTo =(props) => {
        return < Component {...props} navigate={useNavigate() } />
    }
    return RedirectTo;
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
    withRouter,
    AuthRedirect,
    withNavigate,
)(ProfileContainer)

