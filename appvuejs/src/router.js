import Vue from 'vue';
import VueRouter from 'vue-router';
import ProfilePage from './components/ProfilePage.vue';
import LoginApp from './components/LoginApp.vue';
import LandingPage from './components/LandingPage.vue';
import ResgisterMoments from './components/RegisterMoments.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import ResetPassword from './components/ResetPassword.vue';
import ManageInitiatives from './components/ManageInitiatives.vue';
import DashboardApp from './components/DashboardApp.vue';
import HistoryPage from './components/HistoryPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: LoginApp },
  {
    path: '/landing',
    component: LandingPage,
    children: [
      { path: '/profile', name: 'profile', component: ProfilePage },
      { path: '/registerMoments', name: 'registerMoments', component: ResgisterMoments },
      { path: '/forgotPassword', component: ForgotPassword },
      { path: '/resetPassword', component: ResetPassword },
      { path: '/manageInitiatives', name: 'manageInititives', component: ManageInitiatives },
      { path: '/dashboard', name: 'dashboard', component: DashboardApp },
      { path: '/historyPage', name: 'historyPage', component: HistoryPage }
      // Add more routes as needed
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});
    
export default router;