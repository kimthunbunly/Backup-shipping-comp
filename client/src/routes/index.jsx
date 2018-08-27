import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import NavigationBar from "../layouts/header/header.jsx";
import Footer from "../layouts/footer/footer.jsx";

import HomePage from "../pages/home/homepage.jsx";
import ContactUsPage from "../pages/about/contact.jsx";
// import LoginForm from "../pages/auth/sign-in.jsx";
import ServicesPage from "../pages/services/service.jsx";
import AvailableServicePage from "../pages/services/available-service.jsx";
import UserPage from "../pages/user/user-profile.jsx";
import PaymentPage from "../pages/payment/payment.jsx";
import UserProfile from "../pages/user/user-profile.jsx";
import MyShippingPage from "../pages/user/my-shippment.jsx";
import PartnerPage from "../pages/services/partner.jsx";
import TermOfUsePage from "../pages/legal/term-of-use.jsx";
import TermOfServicePage from "../pages/legal/term-of-service.jsx";
import PrivacyPage from "../pages/legal/privacy-policy.jsx";
import Admin from '../pages/admin/admin';

import PageNotFound from "../pages/404/page-not-found.jsx";
// import RegisterUser from "../views/pages/auth/register-user.jsx";
import "./index.css";
import PrivateRoute from "./privateRoute";
import RegisterUser from "../pages/auth/registerUser";
import LoginPage from "../pages/auth/loginPage";

class AppRoute extends React.Component {
    constructor(){
        super();
        this.state ={
            hideHeader:true,
            hideFooter:true,
        }
    }
    componentDidMount(){
        let URL = window.location.pathname;
        if (URL === '/admin') {
            this.setState({ hideHeader:false,
                            hideFooter:false})
        } else {
            this.setState({ hideHeader:true,
                            hideFooter:true})
        }
    }
    render() {
        return (
            <Router>
                <div className="page">
                    {this.state.hideHeader?
                    <NavigationBar />
                    :null}
                    <div className="m-main-page">
                        <Switch>
                            <Route path="/" component={HomePage} exact />
                            <Route path="/login" component={LoginPage} exact />
                            <Route
                                path="/register"
                                component={RegisterUser}
                                exact
                            />
                            <Route
                                path="/contact-us"
                                component={ContactUsPage}
                                exact
                            />
                            <Route
                                path="/services"
                                component={ServicesPage}
                                exact
                            />

                            <Route
                                path="/generated-services"
                                component={AvailableServicePage}
                                exact
                            />

                            <Route
                                path="/partners"
                                component={PartnerPage}
                                exact
                            />
                            <Route
                                path="/term-of-use"
                                component={TermOfUsePage}
                                exact
                            />
                            <Route
                                path="/term-of-service"
                                component={TermOfServicePage}
                                exact
                            />
                            <Route
                                path="/privacy-policy"
                                component={PrivacyPage}
                                exact
                            />
                            <Route
                                path="/admin"
                                component={Admin}
                                exact
                            />
                            <PrivateRoute
                                path="/user/profile"
                                component={UserPage}
                                exact
                            />
                            <PrivateRoute
                                path="/user/my-shipping"
                                component={MyShippingPage}
                                exact
                            />
                            <PrivateRoute
                                path="/payment"
                                component={PaymentPage}
                                exact
                            />
                            <PrivateRoute
                                path="/user/profile"
                                component={UserProfile}
                                exact
                            />
                            <Route component={PageNotFound} exact />
                        </Switch>
                    </div>
                    {this.state.hideHeader?
                    <Footer />
                    :null}
                </div>
            </Router>
        );
    }
}

export default AppRoute;
