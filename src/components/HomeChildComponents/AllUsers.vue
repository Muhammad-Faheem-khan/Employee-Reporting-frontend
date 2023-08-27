<template>
  <!--Main-Conatiner-->
  <v-container>
    <!--Alert-->
    <div style="position: absolute; right: 1rem; width: 20rem">
      <v-alert
        :value="alertValue"
        style="z-index: 100"
        dismissible
        :color="alertColor"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-check-circle"
      >
        {{ alertText }}
      </v-alert>
    </div>
    <!--Heading-->
    <div class="row d-flex justify-center">
      <div class="d-flex justify-space-between col-lg-12 announce-row">
        <h1 class="mt-6 mb-5 text-h4 ml-3 font-weight-medium">All Employees</h1>

        <v-dialog v-model="createUser" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mt-6 ml-5 create-btn"
              outlined
              height="2rem"
              color="#013365"
              v-bind="attrs"
              v-on="on"
            >
              Create New User
            </v-btn>
          </template>

          <v-card>
            <v-card-title
              style="background-color: #013365"
              class="d-flex justify-space-between"
            >
              <h3 class="text-h5" style="color: #fff">Create New User</h3>
              <v-btn icon @click="handleClose()">
                <v-icon color="#fff">mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row class="pt-5 announce-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Email</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex justify-start py-0 px-3 mr-0"
                >
                  <v-text-field
                    v-model="newUser.email"
                    :rules="[rules.required, rules.email]"
                    label="email"
                    color="indigo"
                    class="mr-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-4 announce-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Employee Name</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex flex-column justify-start py-0 px-3"
                >
                  <v-text-field
                    v-model="newUser.name"
                    :rules="[rules.required]"
                    label="Employee Name"
                    color="indigo"
                    class="mr-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-4 announce-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Employee Code</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex flex-column justify-start py-0 px-3"
                >
                  <v-text-field
                    v-model="newUser.employeeCode"
                    :rules="[rules.required]"
                    label="Employee Code"
                    color="indigo"
                    class="mr-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-4 announce-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Employee Role</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex flex-column justify-start py-0 px-3"
                >
                  <v-select
                    :rules="[rules.required]"
                    v-model="newUser.role"
                    :items="roles"
                    label="Employee Role"
                    chips
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#013365" text @click="handleInvitation()">
                Send Invitation
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div v-if="apiLoading" class="d-flex justify-center mt-15 pt-14">
      <v-progress-circular
        :size="50"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <v-row v-else>
      <v-col cols="11" lg="11" class="d-flex flex-wrap justify-space-evenly">
        <v-card
          v-for="user in allUsers"
          :key="user.id"
          class="mx-auto mb-5"
          width="320"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ user.employeeCode }}
              </div>
              <v-list-item-title class="text-h6 mb-1">
                {{ user.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                user.departmentName
              }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{
                user.designation
              }}</v-list-item-subtitle>
              <v-list-item-subtitle
                v-if="!user.isActive"
                class="font-weight-bold"
                >Deactivated User</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
              <v-img
                width="100"
                contain
                :src="
                  user.img
                    ? user.img
                    : `https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png`
                "
                alt="loading"
                class="rounded-lg"
              ></v-img>
            </v-list-item-avatar>
            <v-menu right :close-on-click="closeOnClick">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  x-small
                  class="ml-4 pa-0 edit-buttons"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon size="18" v-bind="attrs" v-on="on">
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item class="px-0" style="width: 7rem">
                  <v-list-item-title
                    class="action-btns py-2 text-center"
                    @click="deactivateUser(user._id, user.isActive)"
                    >{{
                      user.isActive ? "Deactivate" : "Activate"
                    }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item class="px-0" style="width: 7rem">
                  <v-list-item-title
                    class="action-btns py-2 text-center"
                    @click="deleteuser(user._id)"
                    >Delete</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>

          <v-card-actions>
            <router-link
              class="text-decoration-none"
              :to="{ name: 'profileSection', params: { id: user._id } }"
            >
              <v-btn outlined rounded text> View Profile </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AllUsers",

  created() {
    this.$store.dispatch("getCurrentUser");
    this.$store.dispatch("getAllUsers");
  },
  data() {
    return {
      closeOnClick: true,
      createUser: false,
      isUploading: false,
      uploadProgress: 0,
      roles: ["Admin", "Manager", "Employee"],
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      newUser: {
        email: "",
        employeeCode: "",
        name: "",
        role: "",
      },
      options: [{ title: "Deactivate" }, { title: "Delete" }],
    };
  },

  computed: {
    apiLoading() {
      return this.$store.state.apiLoading;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
    alertValue() {
      return this.$store.state.alertValue;
    },
    alertText() {
      return this.$store.state.alertText;
    },
    alertColor() {
      return this.$store.state.alertColor;
    },
  },

  methods: {
    handleClose() {
      this.createUser = false;
      this.newUser.email = "";
      this.newUser.employeeCode = "";
      this.newUser.name = "";
      this.newUser.role = "";
    },
    handleInvitation() {
      if (
        this.newUser.role &&
        this.newUser.name &&
        this.newUser.employeeCode &&
        this.newUser.email
      ) {
        this.$store.dispatch("createUser", this.newUser);
        this.createUser = false;
        this.newUser.email = "";
        this.newUser.employeeCode = "";
        this.newUser.name = "";
        this.newUser.role = "";
      } else {
        this.$store.commit("setAlertValue", true);
        this.$store.commit("setAlertText", "Incomplete User Info");
        this.$store.commit("setAlertColor", "red");

        setTimeout(() => {
          this.$store.commit("setAlertValue", false);
        }, 3000);
      }
    },

    deactivateUser(id, isActive) {
      console.log(isActive);
      this.$store.dispatch("deactivateUser", { id, isActive });
    },
    deleteuser(id) {
      this.$store.dispatch("deleteUser", id);
    },
  },
};
</script>

<style>
.action-btns {
  color: #013365;
}
.action-btns:hover {
  cursor: pointer;
  background: #013365;
  color: #fff;
  font-weight: 500;
}
.edit-buttons {
  position: absolute;
  top: 0;
  right: 0;
}

@media screen and (max-width: 500px) {
  .announce-row {
    flex-direction: column;
    align-items: center;
  }
}
</style>
