

const routes = {
    home:{
        path:'/',
        component:'./components/router/Home',
        loggedIn:null
    },
    login: {
        path: '/login',
        component: './components/router/Login',
        loggedIn: false, // Accessible always
    },

    not_found: {
        path: '*',
        component: './components/router/Not_Found',
        loggedIn: null, // Accessible always
    },
};


const filterRoutes = (isLoggedIn) => {
    return Object.values(routes).filter(route => {
        if (route.loggedIn === null) {
            return true; // Always accessible
        }
        return route.loggedIn === isLoggedIn;
    });
};

const getRoute = (name) => {
    return routes[name];
}

export {filterRoutes,getRoute}

