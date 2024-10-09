import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/HomePage.vue";
import Login from "./pages/LoginPage.vue";
import SignUp from "./pages/SignupPage.vue";
import Forgotpassword from "./pages/ForgotpasswordPage.vue";
import Dashboard from "./pages/UserDashboard.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import NotFound from "./pages/NotFound.vue";
import store from "./store/store"; 


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login, meta: {auth : false}},
        {path: '/forgotPassword', component: Forgotpassword, meta: {auth : false}},
        {path: '/signup', component: SignUp, meta: {auth : false}},
        {path: '/dashboard', component: Dashboard , meta: {auth : true}},
        {path: '/user/v1/resetPassword/:token', component: ResetPassword},
        {path:'/:notFound(.*)', component: NotFound}
    ]
});

router.beforeEach((to, from , next)=>{
    const isAuthenticated = store.getters['auth/isAuthenticated']

    if(to.meta.auth && !isAuthenticated){
        next('/login')
    }
    else if (!to.meta.auth && isAuthenticated){
        next('/dashboard')
    }
    else{
        next()
    }
})
export default router;