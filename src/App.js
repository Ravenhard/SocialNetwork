import './App.css';
import React, {Suspense} from "react";
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginForm from "./components/form/LoginForm";
import {ThemeProvider, theme} from "@chakra-ui/react";
import {Component} from "react";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return < Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <ThemeProvider theme={theme}>
                    <div className='app-wrapper-content'>
                        <Suspense fallback={<div> СУЧАРА </div>}>
                            <Routes>
                                <Route path='profile' element={
                                    <ProfileContainer/>}>
                                    <Route path=':userId' element={<ProfileContainer/>}/>
                                </Route>
                                <Route
                                    path="/dialogs/*"
                                    element={<DialogsContainer/>}/>
                                <Route
                                    path="/users"
                                    element={<UsersContainer/>}/>
                                <Route
                                    path="/login"
                                    element={<LoginForm/>}/>
                            </Routes>
                        </Suspense>
                    </div>
                </ThemeProvider>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

export default compose(
    connect(mapStateToProps, {initializeApp}))(App);
