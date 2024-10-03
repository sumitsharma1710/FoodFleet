import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/HomePage.vue";
import Login from "./pages/LoginPage.vue";
import SignUp from "./pages/SignupPage.vue";
import Forgotpassword from "./pages/ForgotpasswordPage.vue";
import Dashboard from "./pages/UserDashboard.vue";
import ResetPassword from "./pages/ResetPassword.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login},
        {path: '/forgotPassword', component: Forgotpassword},
        {path: '/signup', component: SignUp},
        {path: '/dashboard', component: Dashboard},
        {path: '/user/v1/resetPassword/:token', component: ResetPassword}
    ]
})
export default router;