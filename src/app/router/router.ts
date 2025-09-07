import { RouteObject } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "./routes";
import App from "../../App";
import HomePage from "../../pages/home/HomePage";
import AuthPage from "../../pages/auth/AuthPage";


export const Router: RouteObject[] = [
    {
        path: HOME_ROUTE.path,
        Component: App,
        // ErrorBoundary: NotFound,
        children: [
            {
                path: HOME_ROUTE.path,
                Component: HomePage
            },
            {
                path: LOGIN_ROUTE.path,
                Component: AuthPage
            }
        ]
    }
]