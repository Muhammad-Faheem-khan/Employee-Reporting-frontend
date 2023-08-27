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
      <div class="d-flex justify-space-between col-lg-12 task-row">
        <h1 class="mt-6 mb-5 text-h4 ml-3 font-weight-medium">Assigned Task</h1>

        <v-dialog v-model="assignTask" width="500" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mt-6 ml-5 create-btn"
              outlined
              height="2rem"
              color="#013365"
              @click="assignTask = true"
              v-bind="attrs"
              v-on="on"
            >
              Create Task
            </v-btn>
          </template>

          <v-card>
            <v-card-title
              style="background-color: #013365"
              class="d-flex justify-space-between"
            >
              <h3 class="text-h5" style="color: #fff">Create New Task</h3>
              <v-btn icon @click="assignTask = false">
                <v-icon color="#fff">mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row class="pt-5 task-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Task Name</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex justify-start py-0 px-3 mr-0"
                >
                  <v-text-field
                    label="Task Name"
                    v-model="taskData.name"
                    :rules="[rules.required]"
                    color="indigo"
                    class="mr-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="pt-5 task-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Department Name</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex justify-start py-0 px-3 mr-0"
                >
                  <v-text-field
                    label="Department Name"
                    v-model="taskData.department"
                    :rules="[rules.required]"
                    color="indigo"
                    class="mr-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-4 task-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Assigned To</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex flex-column justify-start py-0 px-3"
                >
                  <v-select
                    :rules="[rules.required]"
                    v-model="taskData.assignedToIds"
                    :items="allUsers"
                    item-text="name"
                    item-value="_id"
                    label="Assignees"
                    multiple
                    chips
                  >
                    <template v-slot:selection="{ item }">
                      {{ item.name }}
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row class="mb-4 task-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Priority</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex flex-column justify-start py-0 px-3"
                >
                  <v-select
                    :rules="[rules.required]"
                    v-model="taskData.priority"
                    :items="priorityOptions"
                    label="Priority"
                    chips
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="mb-4 task-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Status</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex flex-column justify-start py-0 px-3"
                >
                  <v-select
                    :rules="[rules.required]"
                    v-model="taskData.status"
                    :items="statusOptions"
                    label="Status"
                    chips
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="flex-container">
                <v-col md="3" sm="3" class="d-flex justify-center py-0">
                  <h4 class="mt-4 text-center">Deadline</h4>
                </v-col>
                <!--Date of Birth-->
                <v-col md="8" m="9" class="d-flex justify-start py-0">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="[rules.required]"
                        v-model="taskData.deadline"
                        label="Deadline"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="taskData.deadline"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row class="pt-5 task-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Description</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex justify-start py-0 px-3 mr-0"
                >
                  <v-textarea
                    solo
                    v-model="taskData.description"
                    :rules="[rules.required]"
                    label="Description"
                    color="indigo"
                    class="rounded-lg"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row class="mb-4 task-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Files</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex flex-column justify-start py-0 px-3"
                >
                  <v-file-input
                    name="files"
                    v-model="taskData.files"
                    placeholder="Upload your documents"
                    label="File input"
                    multiple
                    prepend-icon="mdi-paperclip"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip small label color="primary">
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#013365" text @click="handleCreateTask()">
                Create Task
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div class="row justify-space-between px-4 py-4 d-none d-sm-none d-md-flex">
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
          class="task-card rounded-lg px-4 py-4 mt-3 mb-5 d-none d-sm-none d-md-flex"
        >
          <div class="row d-flex justify-space-between">
            <div class="col-md-4">{{ item.name ? item.name : "-" }}</div>
            <div class="col-md-2">
              {{ item.assignedBy ? item.assignedBy.name : "-" }}
            </div>
            <div class="col-md-2">{{ item.status ? item.status : "-" }}</div>
            <div class="col-md-2">
              {{ item.deadline ? getFormattedDate(item.deadline) : "-" }}
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
          class="task-card card text-bg-light rounded-lg px-4 py-4 mt-3 d-sm-flex d-md-none d-lg-none"
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
              >{{ item.deadline ? getFormattedDate(item.deadline) : "-" }}
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
  </v-container>
</template>

<script>
export default {
  name: "AssignTask",
  created() {
    this.$store.commit("getAllTasks", []);
    this.$store.dispatch("getAllTasks", {
      user: this.currentUser,
      query: "assignedBy",
      limit: this.limit,
      offset: this.offset,
    });
    this.$store.dispatch("getAllUsers");
  },
  data() {
    return {
      limit: 10,
      page: 1,
      menu2: false,
      assignTask: false,
      priorityOptions: ["High", "Medium", "Normal"],
      statusOptions: [
        "Assigned",
        "Pending",
        "Working",
        "Completed",
        "Cancelled",
      ],
      taskData: {
        name: "",
        assignedToIds: [],
        assignedToNames: [],
        priority: "",
        status: "",
        deadline: "",
        description: "",
        img: "",
        files: [],
        assignedBy: "",
        department: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },

  watch: {
    page() {
      this.$store.dispatch("getAllTasks", {
        user: this.currentUser,
        query: "assignedBy",
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
    allUsers() {
      return this.$store.state.allUsers;
    },
    allTasks() {
      return this.$store.state.allTasks;
    },
    currentUser() {
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
  },

  methods: {
    closePopUp() {
      this.assignTask = false;
      this.taskData.name = "";
      this.taskData.assignedToIds = [];
      this.taskData.assignedToNames = [];
      this.taskData.priority = "";
      this.taskData.status = "";
      this.taskData.deadline = "";
      this.taskData.description = "";
      this.taskData.img = "";
      this.taskData.files = [];
      this.taskData.assignedBy = "";
      this.taskData.department = "";
    },
    triggerFileInput() {
      this.$refs.fileUpload.click();
    },
    handleImgLoad(event) {
      this.taskData.img = event.target.files[0];
    },

    getFormattedDate(timestamp) {
      const dateObject = new Date(timestamp);
      return dateObject.toDateString();
    },

    handleCreateTask() {
      if (
        this.taskData.name &&
        this.taskData.priority &&
        this.taskData.status &&
        this.taskData.assignedToIds &&
        this.taskData.deadline
      ) {
        this.taskData.assignedToNames = this.taskData.assignedToIds.map(
          (id) => {
            const user = this.allUsers.find((u) => u._id === id);
            return user.name;
          },
        );
        const formData = new FormData();
        formData.append("name", this.taskData.name);
        formData.append("priority", this.taskData.priority);
        formData.append("status", this.taskData.status);
        formData.append("assignedToIds", this.taskData.assignedToIds);
        formData.append("assignedToNames", this.taskData.assignedToNames);
        formData.append("deadline", this.taskData.deadline);
        formData.append("department", this.taskData.department);
        formData.append("description", this.taskData.description);
        formData.append("assignedBy", this.currentUser._id);
        formData.append("img", this.taskData.img);
        this.taskData.files.forEach((file) => {
          formData.append("files", file);
        });
        this.$store.dispatch("createTask", formData);
        this.closePopUp();
      } else {
        this.$store.commit("setAlertValue", true);
        this.$store.commit("setAlertText", "Incomplete Info");
        this.$store.commit("setAlertColor", "red");
        this.createUser = false;
        setTimeout(() => {
          this.$store.commit("setAlertValue", false);
        }, 3000);
        this.closePopUp();
      }
    },
  },
};
</script>

<style>
.v-toolbar {
  flex: none;
}
.task-card:hover {
  background: #013365 !important;
  color: #fff;
  font-weight: bolder;
}

@media screen and (max-width: 500px) {
  .task-row {
    flex-direction: column;
    align-items: center;
  }
  .upload-box input {
    opacity: 0;
  }
}
</style>
