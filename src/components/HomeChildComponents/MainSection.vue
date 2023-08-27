<template>
  <!--Profile-Section-->
  <div class="d-flex">
    <v-row>
      <v-col class="col-md-12 col-sm-12 col-12">
        <!--Main-Container-->
        <v-container style="position: relative">
          <!--Alert-->
          <div style="position: absolute; right: 0; width: 14rem">
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
          <!--User-Profile-->
          <div class="d-flex justify-space-between userData my-5">
            <!--User-Image-->
            <div class="col-lg-3 d-flex justify-center">
              <v-img
                width="200"
                height="200"
                contain
                :src="
                  userData.img
                    ? userData.img
                    : `https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png`
                "
                alt="loading"
                class="rounded-lg"
              ></v-img>
            </div>
            <div class="col-lg-8 pl-3 userData">
              <div class="d-flex justify-space-between mb-4">
                <!--User-FullName-->
                <h2 class="text-capitalize mt-4">
                  {{ userData ? userData.name : "User Name" }}
                </h2>
                <!--Update-Route-->
                <div>
                  <router-link
                    class="text-decoration-none"
                    :to="{ name: 'updateProfile', params: { id: userData._id } }"
                  >
                    <!--Update-Button-->
                    <v-btn
                      class="mt-3 ml-5"
                      outlined
                      height="2rem"
                      color="#013365"
                    >
                      Update
                    </v-btn>
                  </router-link>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      
                        <v-btn
                          class="ml-5"
                          fab
                          color="#013365"
                          small
                          v-bind="attrs"
                          v-on="on"
                        >
                              <v-badge
                              color="red"
                              content="6"
                            >
                            <v-icon color="#fff">
                              mdi-bell-outline
                            </v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="py-2" style="background-color: #013365; color: #fff" >Unread Notifications</v-card-title>
                      <v-list class="pt-0">
                      <v-list-item>
                        <v-list-item-title class="d-flex">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon
                              v-if="read"
                              color="#013365"
                              dark
                              v-bind="attrs"
                              v-on="on"
                              >
                              mdi-email-mark-as-unread
                            </v-icon>
                            <v-icon
                            v-else
                              color="#013365"
                              dark
                              v-bind="attrs"
                              v-on="on"
                              >
                              mdi-email
                            </v-icon>
                          </template>
                          <span>{{read ? 'Mark as read' : "Mark as unread"}}</span>
                        </v-tooltip>
                        <h3 class="mt-1 ml-2">New task is assigned by Ali Khan</h3>
                          
                          </v-list-item-title>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-title>
                          New task is assigned by Ali Khan
                          </v-list-item-title>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-title>
                          New task is assigned by Ali Khan
                          </v-list-item-title>
                      </v-list-item>
                    </v-list>
                    </v-card>
                    
                  </v-menu>
                  
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6 py-0 userData">
                  <div>
                    <p class="mb-0 text-para">
                      <b>Department</b>
                    </p>
                    <p v-if="userData?.departmentName" class="mb-1 text-para">
                      {{ userData.departmentName }}
                    </p>
                  </div>
                  <div>
                    <p class="mb-0 text-para">
                      <b>Designation</b>
                    </p>
                    <p v-if="userData?.designation" class="mb-1 text-para">
                      {{ userData.designation }}
                    </p>
                  </div>
                  <div>
                    <p class="mb-0 text-para">
                      <b>Joining Date</b>
                    </p>
                    <p v-if="userData?.joiningDate" class="mb-1 text-para">
                      {{ getFormattedDate(userData.joiningDate) }}
                    </p>
                  </div>
                </div>
                <div class="col-md-6 py-0 pr-0 userData">
                  <div>
                    <p class="mb-0 text-para">
                      <b>Employee Code</b>
                    </p>
                    <p v-if="userData?.employeeCode" class="mb-1 text-para">
                      {{ userData.employeeCode }}
                    </p>
                  </div>
                  <div>
                    <p class="mb-0 text-para">
                      <b>Email</b>
                    </p>
                    <p v-if="userData?.email" class="mb-1 text-para">
                      {{ userData.email }}
                    </p>
                  </div>
                  <div>
                    <p class="mb-0 text-para">
                      <b>Date of Birth</b>
                    </p>
                    <p v-if="userData?.dob" class="mb-1 text-para">
                      {{ getFormattedDate(userData.dob) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Task-Section-->

          <div>
            <div class="d-flex justify-space-between align-center">
              <!--Heading-->
              <h1 class="mt-6 pb-4 mb-5 text-h5 ml-3 font-weight-medium">
                {{ userData.role === "Admin" ? "All Task" : "My Task" }}
              </h1>
              <v-menu
                v-if="userData.role === 'Admin'"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
              >
                <template v-slot:activator="{ on, attrs }">
                  <div class="d-flex flex-column">
                    <v-btn
                      color="#013365"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      class="mr-3 mb-3 mt-5"
                    >
                      Add Filters
                    </v-btn>
                    <v-btn
                      outlined
                      color="#013365"
                      @click="resetFilters()"
                      class="mr-3 mb-5"
                    >
                      Reset Filter
                    </v-btn>
                  </div>
                </template>

                <v-card>
                  <v-list
                    style="background-color: #013365"
                    class="d-flex justify-space-between"
                  >
                    <v-list-item style="color: #fff">
                      <h3 class="text-h6">Filter By</h3>
                      <v-icon class="ml-3" color="#fff"
                        >mdi-filter-outline</v-icon
                      >
                    </v-list-item>
                    <v-list-item style="color: #fff" class="d-flex justify-end">
                      <v-btn icon @click="menu = false">
                        <v-icon color="#fff">mdi-close</v-icon>
                      </v-btn>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>

                  <v-list>
                    <v-list-item class="d-flex flex-column">
                      <v-select
                        v-model="filterQuery.assignedBy"
                        :items="allUsers"
                        item-text="name"
                        item-value="_id"
                        label="Assigned BY"
                        chips
                        style="width: 90%"
                      >
                        <template v-slot:selection="{ item }">
                          {{ item.name }}
                        </template>
                      </v-select>

                      <v-select
                        v-model="filterQuery.assignedToIds"
                        :items="allUsers"
                        item-text="name"
                        item-value="_id"
                        label="Assigned To"
                        chips
                        style="width: 90%"
                      >
                        <template v-slot:selection="{ item }">
                          {{ item.name }}
                        </template>
                      </v-select>

                      <v-text-field
                        label="Department Name"
                        style="width: 90%"
                        v-model="filterQuery.department"
                        color="indigo"
                      ></v-text-field>

                      <v-select
                        v-model="filterQuery.status"
                        :items="statusOptions"
                        label="Status"
                        chips
                        style="width: 90%"
                      >
                      </v-select>

                      <v-select
                        v-model="filterQuery.priority"
                        :items="priorityOptions"
                        label="Priority"
                        chips
                        style="width: 90%"
                      >
                      </v-select>
                    </v-list-item>
                  </v-list>

                  <v-card-actions class="pb-5">
                    <v-spacer></v-spacer>
                    <v-btn width="6rem" outlined @click="handleReset()">
                      Reset
                    </v-btn>
                    <v-btn
                      style="color: #fff"
                      width="6rem"
                      color="#013365"
                      @click="filteredTask()"
                    >
                      Filter
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </div>
            <div
              class="row justify-space-between px-4 py-4 d-none d-sm-none d-md-flex"
            >
              <div class="col-md-4 font-weight-bold">Task Name</div>
              <div class="col-md-2 font-weight-bold">Assigned by</div>
              <div class="col-md-2 font-weight-bold">Status</div>
              <div class="col-md-2 font-weight-bold">Deadline</div>
              <div class="col-md-2 font-weight-bold">Priority</div>
            </div>

            <div v-if="apiLoading" class="d-flex justify-center mt-15 pt-14">
              <v-progress-circular
                :size="50"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <div v-else>
              <router-link
                v-for="item in allTasks.tasks"
                :key="item._id"
                class="text-decoration-none"
                :to="{ name: 'taskDetails', params: { id: item._id } }"
              >
                <v-card
                  class="task-card rounded-lg px-4 py-4 mb-5 mt-3 d-none d-sm-none d-md-flex"
                >
                  <div class="row d-flex justify-space-between">
                    <div class="col-md-4">
                      {{ item.name ? item.name : "-" }}
                    </div>
                    <div class="col-md-2">
                      {{ item.assignedBy ? item.assignedBy.name : "-" }}
                    </div>
                    <div class="col-md-2">
                      {{ item.status ? item.status : "-" }}
                    </div>
                    <div class="col-md-2">
                      {{
                        item.deadline ? getFormattedDate(item.deadline) : "-"
                      }}
                    </div>
                    <div class="col-md-2">
                      {{ item.priority ? item.priority : "-" }}
                    </div>
                  </div>
                </v-card>
              </router-link>
            </div>

            <div v-if="!apiLoading">
              <router-link
                v-for="item in allTasks.tasks"
                :key="item.name"
                class="text-decoration-none"
                :to="{ name: 'taskDetails', params: { id: item._id } }"
              >
                <v-card
                  class="card text-bg-light rounded-lg px-3 py-4 mt-3 d-sm-flex d-md-none d-lg-none"
                >
                  <div class="row d-flex justify-space-between">
                    <div class="col-md-4 text-center">
                      <b>Task Name: </b>{{ item.name ? item.name : "-" }}
                    </div>
                    <div class="col-md-2 text-center">
                      <b>Assigned By: </b
                      >{{ item.assignedBy ? item.assignedBy.name : "-" }}
                    </div>
                    <div class="col-md-2 text-center">
                      <b>Status: </b>{{ item.status ? item.status : "-" }}
                    </div>
                    <div class="col-md-2 text-center">
                      <b>Deadline: </b
                      >{{
                        item.deadline ? getFormattedDate(item.deadline) : "-"
                      }}
                    </div>
                    <div class="col-md-2 text-center">
                      <b>Priority: </b>{{ item.priority ? item.priority : "-" }}
                    </div>
                  </div>
                </v-card>
              </router-link>
            </div>

            <div v-if="!apiLoading && totalPages > 1" class="text-center mt-8">
              <v-pagination
                v-model="page"
                :length="totalPages"
                :total-visible="7"
              ></v-pagination>
            </div>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
// import io from 'socket.io-client';
export default {
  name: "ProfileDetail",
  created() {
    // this.socket = io('http://localhost:5000'); // Replace with your actual backend URL
    // this.socket.on('connect', () => {
    //     console.log('Connected to Socket.IO server');
    // });
    // this.socket.on('newNotification', (notification) => {
    //   this.notifications.push(notification);
    // });
  },
  beforeMount() {
    this.$store.dispatch("getAllUsers");
    this.$store.commit("getAllTasks", []);
    this.$store.dispatch("getAllTasks", {
      user: this.userData,
      query: "assignedTo",
      limit: this.limit,
      offset: this.offset,
    });
  },
  data() {
    return {
      read: false,
      menu: false,
      limit: 10,
      page: 1,
      reviews: [],
      priorityOptions: ["High", "Medium", "Normal"],
      statusOptions: [
        "Assigned",
        "Pending",
        "Working",
        "Completed",
        "Cancelled",
      ],
      filterQuery: {
        assignedBy: "",
        assignedToIds: "",
        department: "",
        priority: "",
        status: "",
      },
    };
  },

  watch: {
    page() {
      this.$store.dispatch("getAllTasks", {
        user: this.userData,
        query: "assignedTo",
        limit: this.limit,
        offset: this.offset,
      });
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.allTasks.totalCount / this.limit);
    },
    offset() {
      return (this.page - 1) * this.limit;
    },
    apiLoading() {
      return this.$store.state.apiLoading;
    },
    // calculate value for performance section
    avg() {
      const sum = this.reviews.reduce((acc, cur) => acc + cur, 0);
      const length = this.reviews.length;
      if (!sum && !length) return 0;
      return Math.ceil(sum / length);
    },

    // get userData from store
    userData() {
      return this.$store.state.currentUser;
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
    allTasks() {
      return this.$store.state.allTasks;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
  },

  methods: {
    resetFilters() {
      this.$store.commit("getAllTasks", []);
      this.$store.dispatch("getAllTasks", {
        user: this.userData,
        query: "assignedTo",
        limit: this.limit,
        offset: this.offset,
      });
    },

    filteredTask() {
      this.$store.dispatch("getAllTasks", {
        user: this.userData,
        query: "filter",
        limit: this.limit,
        offset: this.offset,
        filterQuery: this.filterQuery,
      });
      this.menu = false;
      this.filterQuery.assignedBy = "";
      this.filterQuery.assignedToIds = "";
      this.filterQuery.department = "";
      this.filterQuery.priority = "";
      this.filterQuery.status = "";
    },

    handleReset() {
      this.menu = false;
      this.filterQuery.assignedBy = "";
      this.filterQuery.assignedToIds = "";
      this.filterQuery.department = "";
      this.filterQuery.priority = "";
      this.filterQuery.status = "";
    },

    getFormattedDate(timestamp) {
      const dateObject = new Date(timestamp);
      return dateObject.toDateString();
    },
  },
};
</script>

<style scoped>
.font-userlist {
  font-family: sans-serif;
}

.task-card:hover {
  background: #013365 !important;
  color: #fff;
  font-weight: bolder;
}

@media screen and (max-width: 959px) {
  .userData1 {
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width: 500px) {
  .userData {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .text-para {
    text-align: center;
  }
}
</style>
