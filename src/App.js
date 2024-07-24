import React, {Suspense} from "react";
import './App.css';
import {Route, Routes} from "react-router-dom";
import {filterRoutes} from "./components/router/routes";
import {useAcaAPI} from "./context/DataContext";
import {useAuth} from "./context/AuthContext";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



// App.js

const loadComponent = (componentPath) => {
    const Component = React.lazy(() => import(`${componentPath}`));
    return <Component />;
};

const App = () => {
    const { loaded } = useAcaAPI();
    const {logged} = useAuth();
    const accessibleRoutes = filterRoutes(logged);

    return (
        <Suspense fallback={null}>
            <Routes>
                {loaded ? (
                    accessibleRoutes.map((el, key) => (
                        <Route key={key} path={el.path} element={loadComponent(el.component)} />
                    ))
                ) : (
                    <Route path="*" element={null} /> // Show loader if routes are not loaded
                )}
            </Routes>
            <ToastContainer />
        </Suspense>
    );
};

export default App;

