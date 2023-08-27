<template>
  <!--NavBar-->
  <nav>
    <v-list
      color="#013365"
      class="pt-0"
      dark
      height="100vh"
      style="position: relative"
    >
      <!--Logo-Image-->
      <div class="d-flex flex-column align-center py-5 nav-head">
        <v-img src="../../assets/logo.png" width="100" heifht="100"></v-img>
        <!--Main-Heading-->
        <h3 class="text-h5 pt-3 text-center">NB Management System</h3>
      </div>
      <!--Menu-List-->
      <router-link class="text-decoration-none" to="/home">
        <v-list-item class="link mb-2 mt-6">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link class="text-decoration-none" to="/home/announcements">
        <v-list-item class="link mb-2">
          <v-list-item-icon>
            <v-icon>mdi-bullhorn-outline </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Announcements</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link
        class="text-decoration-none"
        :to="{ name: 'profileSection', params: { id: user._id } }"
      >
        <v-list-item class="link mb-2">
          <v-list-item-icon>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link
        v-if="user.role === 'Admin' || user.role === 'Manager'"
        class="text-decoration-none"
        to="/home/assigntask"
      >
        <v-list-item class="link mb-2">
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Assigned Task</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link
        v-if="user.role === 'Admin'"
        class="text-decoration-none"
        to="/home/users"
      >
        <v-list-item class="link mb-2">
          <v-list-item-icon>
            <v-icon>mdi-shield-crown-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>All Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <!--Logout-Button-->
      <div
        class="pb-4 text-center logout-box"
        style="position: absolute; bottom: 3rem; left: 2rem"
      >
        <v-btn rounded size="large" @click="logoutUser">
          <v-icon class="mx-2">mdi-logout-variant</v-icon>
          Logout
        </v-btn>
      </div>
    </v-list>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    // function to logout
    logoutUser() {
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
<style>
.link {
  transition: ease-in-out 1s;
}
.nav-head {
  background: #fff;
}
.nav-head h3 {
  color: black;
}
.link:hover {
  background-color: #02274b;
  color: rgb(255, 251, 251) !important;
  border-radius: 15px 50px;
}

.logout-box > button {
  color: #013365 !important;
  background: white !important;
}
.logout-box > button:hover {
  color: white !important;
  background: #02274b !important;
}
</style>
