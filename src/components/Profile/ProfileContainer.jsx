import React from "react";
import Profile from "./Profile";
import {getStatus, getUserProfile, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {AuthRedirect} from "../hoc/AuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile () {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.autorizedUsedId;
        }
        if (userId) {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.router.params.userId != this.props.router.params.userId) {
            this.refreshProfile();
        }
    }

    render() {

        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         isOwner = {!this.props.router.params.userId}
                         updateStatus={this.props.updateStatus}
                         savePhoto={this.photo.savePhoto}
                />
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
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }),
    withRouter,
    AuthRedirect,
    withNavigate,
)(ProfileContainer)

