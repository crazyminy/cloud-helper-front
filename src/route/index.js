import Login from '../pages/Login';
import Home from '../pages/Home';
import ImgBed from '../pages/ImgBed';

const routes = [
    {
        path:"/home",
        component:Home
    },
    {
        path:'/login',
        component:Login,
        withoutAuth:true
    },
    {
        path:"/imgBed",
        component:ImgBed
    }
];

let config = {};
routes.forEach(route=>{
    if(route.withoutAuth){
        config[route.path] = false;
    }else{
        config[route.path] = true;
    }
})
export let authConfig = config;
export function findRoute(path){
    for(let i = 0;i<routes.length;i++){
        if(routes[i].path === path){
            return routes[i];
        }
    }
};


