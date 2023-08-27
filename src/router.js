import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ForgetPassword1 from "./components/forgetPassword/ForgetPassword1";
import CheckEmail from "./components/forgetPassword/CheckEmail";
import UpdateProfile from "./components/HomeChildComponents/UpdateProfile";
import MainSection from "./components/HomeChildComponents/MainSection";
import AnnouncementSection from "./components/HomeChildComponents/AnnouncementSection";
import ProfileSection from "./components/HomeChildComponents/ProfileSection";
import TaskDetails from "./components/HomeChildComponents/TaskDetails";
import AllUsers from "./components/HomeChildComponents/AllUsers";
import AssignTask from "./components/HomeChildComponents/AssignTask";

Vue.use(VueRouter);

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
export function updateCurrentUser(user) {
  currentUser = user; // Update the in-memory variable
}

// setting routes
const routes = [
  { name: "login", path: "/", component: LoginPage },
  {
    path: "/home",
    component: HomePage,
    children: [
      { name: "mainSection", path: "/", component: MainSection },
      {
        name: "updateProfile",
        path: "/home/updateprofile/:id",
        component: UpdateProfile,
      },
      {
        name: "announcementSection",
        path: "/home/announcements",
        component: AnnouncementSection,
      },
      {
        name: "profileSection",
        path: "/home/profile/:id",
        component: ProfileSection,
      },
      { name: "taskDetails", path: "/home/task/:id", component: TaskDetails },
      {
        name: "assignTask",
        path: "/home/assigntask",
        component: AssignTask,
        beforeEnter: (to, from, next) => {
          if (
            currentUser
              ? currentUser.role === "Manager" || currentUser?.role === "Admin"
              : false
          ) {
            next();
          } else {
            next({ name: "mainSection" });
          }
        },
      },
      {
        name: "allUsers",
        path: "/home/users",
        component: AllUsers,
        beforeEnter: (to, from, next) => {
          // Check if the user role is manager or admin

          if (currentUser?.role === "Admin") {
            next();
          } else {
            next({ name: "mainSection" });
          }
        },
      },
    ],
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem("token")) next({ name: "login" });
      else {
        next();
      }
    },
  },
  { name: "forgetPass", path: "/forgetPassword", component: ForgetPassword1 },
  { name: "checkEmail", path: "/emailVerification", component: CheckEmail }
];
export const router = new VueRouter({
  mode: "history",
  routes,
});
