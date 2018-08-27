import HomePage from "../pages/home/homepage.jsx";
import ServicePage from "../pages/services/service.jsx";
import _404Page from "../pages/404/page-not-found.jsx";
const RoutePackages = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
        role: "Route"
    },
    {
        path: "/services",
        name: "services",
        component: ServicePage,
        role: "Route"
    },
    {
        path: null,
        name: "404 not found",
        component: _404Page,
        role: "Route"
    }
];

export default RoutePackages;
