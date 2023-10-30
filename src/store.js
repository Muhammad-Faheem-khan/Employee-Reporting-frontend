import Vue from "vue";
import Vuex from "vuex";
import { router, updateCurrentUser } from "./router";
import { send } from "emailjs-com";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentUser: {},
    user: {},
    allUsers: [],
    announcements: [],
    allTasks: [],
    taskDetail: {},
    allNotifications: [],
    userImg: null,
    alertValue: false,
    alertColor: "",
    alertText: "",
    apiLoading: false,
  },
  mutations: {
    setApiLoading(state, data) {
      state.apiLoading = data;
    },
    getCurrentUser(state, data) {
      state.currentUser = data;
    },

    getUser(state, user) {
      if(user.dob === 'null'){
        user.dob = '2000-01-01'
      }
      if(user.joiningDate === 'null'){
        user.joiningDate = '2000-01-01'
      }
      state.user = user;
    },

    getAllUsers(state, data) {
      state.allUsers = data;
    },

    setAlertValue(state, data) {
      state.alertValue = data;
    },
    setAlertColor(state, data) {
      state.alertColor = data;
    },
    setAlertText(state, data) {
      state.alertText = data;
    },
    getAllAnnouncements(state, data) {
      state.announcements = data;
    },

    getAllTasks(state, data) {
      state.allTasks = data;
    },
    setUserImg(state, data) {
      state.userImg = data;
    },
    getTask(state, data) {
      state.taskDetail = data;
    },
    getNotifications(state, data){
      state.allNotifications = data
    }
  },
  actions: {
    getCurrentUser(context) {
      let userData = JSON.parse(localStorage.getItem("currentUser"));

      updateCurrentUser(userData);
      context.commit("getCurrentUser", userData);
    },

    getAllUsers(context) {
      fetch(`http://srv418011.hstgr.cloud/api/users/`, {
        method: "GET",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          context.commit("getAllUsers", res);
        });
    },

    // check user info from local storage as well as from Api response
    loginValidation(context, data) {
      context.commit("setApiLoading", true);
      fetch(`http://srv418011.hstgr.cloud/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.userID,
          password: data.password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          context.commit("setApiLoading", false);
          if (!res.message && res.user.isActive) {
            sessionStorage.setItem("token", res.token);
            localStorage.setItem("currentUser", JSON.stringify(res.user));
            router.push("/home");
          } else if (res?.user && !res?.user?.isActive) {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", "This email is blocked");
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
        setTimeout(() => {
          context.commit("setApiLoading", false);
        }, 10000);
    },

    viewUserProfile(context, data) {
      context.commit("setApiLoading", true);
      fetch(`http://srv418011.hstgr.cloud/api/users/${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          context.commit("setApiLoading", false);
          context.commit("getUser", res);
        });
    },

    createUser(context, data) {
      fetch(`http://srv418011.hstgr.cloud/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...data }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "User registered successfully") {
            context.dispatch("getAllUsers");
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            const toSend = {
              name: res.newUser.name, // Replace with the recipient's name
              email: res.newUser.email,
              password: res.newUser.password,
            };

            send(
              "service_o0wu018", // Replace with your Email.js service ID
              "template_n80jmqv", // Replace with your Email.js template ID
              toSend,
              "jfe56FTlamrr-k5M4", // Replace with your Email.js API key
            )
              .then((response) => {
                console.log("SUCCESS!", response);
                // Perform any additional actions here
              })
              .catch((error) => {
                console.error("FAILED...", error);
                // Handle the error here
              });
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
    },

    deactivateUser(context, data) {
      fetch(`http://srv418011.hstgr.cloud/api/users/userStatus/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ isActive: data.isActive }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "User Status Changed") {
            context.dispatch("getAllUsers");
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
    },

    deleteUser(context, id) {
      fetch(`http://srv418011.hstgr.cloud/api/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "User deleted successfully.") {
            context.dispatch("getAllUsers");
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
    },

    updateUser(context, data) {
      fetch(`http://srv418011.hstgr.cloud/api/users/update/${data.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: data.formData,
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "User profile is updated") {
            if (data.id === context.state.currentUser._id) {
              localStorage.setItem("currentUser", JSON.stringify(res.user));
            }
            context.dispatch("getCurrentUser");
            context.dispatch("viewUserProfile", data.id);
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
          context.commit("setUserImg", null);
        });
    },

    resetpassword(context, data) {
      context.commit("setApiLoading", true);
      fetch(`http://srv418011.hstgr.cloud/api/users/resetPassword/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          context.commit("setApiLoading", false);
          if (res.message === "Email is reset.") {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            const toSend = {
              name: res.newUser.name, // Replace with the recipient's name
              email: res.newUser.email,
              password: res.newUser.password,
            };
            send(
              "service_o0wu018", // Replace with your Email.js service ID
              "template_xveklqg", // Replace with your Email.js template ID
              toSend,
              "jfe56FTlamrr-k5M4", // Replace with your Email.js API key
            )
              .then((response) => {
                console.log("SUCCESS!", response);
                // Perform any additional actions here
              })
              .catch((error) => {
                console.error("FAILED...", error);
                // Handle the error here
              });
            setTimeout(() => {
              context.commit("setAlertValue", false);
              if (data.type !== "resend") {
                router.push({
                  name: "checkEmail",
                  query: {
                    email: JSON.stringify([data.email]),
                  },
                });
              }
            }, 2000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
    },

    getAllAnnouncements(context, data) {
      context.commit("setApiLoading", true);
      fetch(
        `http://srv418011.hstgr.cloud/api/announcement?limit=${data.limit}&offset=${data.offset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      )
        .then((response) => response.json())
        .then((res) => {
          context.commit("setApiLoading", false);
          context.commit("getAllAnnouncements", res);
        });
    },

    createAnnouncement(context, data) {
      fetch(`http://srv418011.hstgr.cloud/api/announcement/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "Announcement is added.") {
            context.dispatch("getAllAnnouncements", {limit: 10, offset: 0});
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
    },

    deleteAnnouncement(context, id) {
      fetch(`http://srv418011.hstgr.cloud/api/announcement/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "Announcement deleted successfully") {
            context.dispatch("getAllAnnouncements", {limit: 10, offset:0});
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
    },

    updateAnnouncement(context, data) {
      fetch(`http://srv418011.hstgr.cloud/api/announcement/update/${data.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: data.formData,
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "Announcement is updated") {
            context.dispatch("getAllAnnouncements", {limit:10, offset: 0});
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
    },

    getAllTasks(context, data) {
      context.commit("setApiLoading", true);
      let url = "";
      if (data?.user?.role === "Admin") {
        if (data?.query === "filter") {
          url = `http://srv418011.hstgr.cloud/api/task?limit=${data.limit}&offset=${data.offset}&assignedBy=${data?.filterQuery?.assignedBy}&assignedToIds=${data?.filterQuery?.assignedToIds}&department=${data.filterQuery.department}&priority=${data.filterQuery.priority}&status=${data.filterQuery.status}`;
        } else {
          url = `http://srv418011.hstgr.cloud/api/task?limit=${data.limit}&offset=${data.offset}`;
        }
      }else if (data?.query === "assignedBy") {
        url = `http://srv418011.hstgr.cloud/api/task?assignedBy=${data?.user._id}&limit=${data.limit}&offset=${data.offset}`;
      }else if (data?.query === "assignedTo") {
        url = `http://srv418011.hstgr.cloud/api/task?assignedToIds=${data?.user?._id}&limit=${data.limit}&offset=${data.offset}`;
      }

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        params: data.filterQuery ? data.filterQuery : "",
      })
        .then((response) => response.json())
        .then((res) => {
          context.commit("getAllTasks", res);
          context.commit("setApiLoading", false);
        });
    },

    createTask(context, data) {
      fetch(`http://srv418011.hstgr.cloud/api/task/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "New task is assigned") {
            context.dispatch("getAllTasks", {
              user: JSON.parse(localStorage.getItem("currentUser")),
              query: "assignedBy",
              limit: 10,
              offset: 0
            });
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
    },

    viewTaskDetail(context, data) {
      context.commit("setApiLoading", true);
      fetch(`http://srv418011.hstgr.cloud/api/task/${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          context.commit("setApiLoading", false);
          context.commit("getTask", res);
        });
    },

    changeStatus(context, data) {
      fetch(`http://srv418011.hstgr.cloud/api/task/status/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({ status: data.status }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if(res){
            context.dispatch("viewTaskDetail", data.id);
            context.commit("setAlertValue", true);
            context.commit("setAlertText", "Task status is updated.");
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }else{
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
          
        });
    },

    deleteTask(context, data) {
      fetch(`http://srv418011.hstgr.cloud/api/task/delete/${data}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "Task deleted successfully.") {
            context.dispatch("getAllTasks",{
              user: JSON.parse(localStorage.getItem("currentUser")),
              query: "assignedBy",
              limit: 10,
              offset: 0
            });
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 4000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
          
        });
    },

    submitResponse(context, data) {
      fetch(`http://srv418011.hstgr.cloud/api/task/${data.id}/response`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: data.formData,
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "Response is submitted") {
            context.dispatch("viewTaskDetail", data.id);
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
    },

    deleteResponse(context, data) {
      fetch(
        `http://srv418011.hstgr.cloud/api/task/${data.taskId}/delete/${data.resId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.message === "Response deleted successfully") {
            context.dispatch("viewTaskDetail", data.taskId);
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "#013365");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 4000);
          } else {
            context.commit("setAlertValue", true);
            context.commit("setAlertText", res.message);
            context.commit("setAlertColor", "red");
            setTimeout(() => {
              context.commit("setAlertValue", false);
            }, 3000);
          }
        });
    },

    getNotifications(context, userId){
      fetch(`http://srv418011.hstgr.cloud/api/notifications/${userId}/unread`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          context.commit('getNotifications', res)
        });
    },
    markUnread(context, id){
      fetch(`http://srv418011.hstgr.cloud/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then(() => {
          context.dispatch('getNotifications', context.state.currentUser)
        });
    }
  },
});
