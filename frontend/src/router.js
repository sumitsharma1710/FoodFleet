import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/HomePage.vue";
import Login from "./pages/LoginPage.vue";
import SignUp from "./pages/SignupPage.vue";
import Forgotpassword from "./pages/ForgotpasswordPage.vue";
import Dashboard from "./pages/UserDashboard.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login},
        {path: '/forgotPassword', component: Forgotpassword},
        {path: '/signup', component: SignUp},
        {path: '/dashboard', component: Dashboard}
    ]
})
export default router;