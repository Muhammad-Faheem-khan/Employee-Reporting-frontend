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
        <h1 class="mt-6 mb-5 text-h4 ml-3 font-weight-medium">Task Details</h1>
        <v-dialog v-model="taskSubmission" width="500">
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex flex-column">
              <v-btn
                class="mt-6 ml-5 create-btn"
                outlined
                height="2rem"
                color="#013365"
                v-bind="attrs"
                v-on="on"
              >
                Submit Response
              </v-btn>
              <v-btn
                v-if="
                  currentUser?.role === 'Admin' ||
                  currentUser?._id === taskDetail?.assignedBy?._id
                "
                class="mt-3 ml-5 create-btn"
                @click="deleteTask()"
                outlined
                height="2rem"
                color="red"
              >
                Delete Task
              </v-btn>
            </div>
          </template>

          <v-card>
            <v-card-title class="d-flex justify-space-between">
              <h3 class="text-h5">Submit Task</h3>
              <v-btn icon @click="cancelTask()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row class="pt-5 task-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 mb-4 text-center">Description:</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex justify-start py-0 px-3 mr-0"
                >
                  <v-textarea
                    solo
                    v-model="response.description"
                    label="Description"
                    color="indigo"
                    class="rounded-lg"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row class="mb-4 task-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Upload Files:</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex flex-column justify-start py-0 px-3"
                >
                  <v-file-input
                    name="files"
                    v-model="response.files"
                    placeholder="Select files to submit"
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
              <v-btn
                :disabled="response.description === ''"
                color="#013365"
                text
                @click="handleUpload()"
              >
                Upload
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <div v-if="apiLoading" class="d-flex justify-center mt-15">
      <v-progress-circular
        :size="50"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>

    <v-row v-if="!apiLoading" class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <div class="mb-5 pb-5">
          <v-row class="flex-container">
            <v-col md="3" sm="3" class="d-flex justify-center py-0">
              <h4 class="mt-4 text-center">Task Name</h4>
            </v-col>
            <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
              <p class="text-center mt-2">{{ taskDetail.name }}</p>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-around flex-container">
            <v-col md="3" sm="3" class="d-flex justify-center py-0">
              <h4 class="mt-4 text-center">Assigned By</h4>
            </v-col>
            <v-col md="8" sm="9" class="d-flex justify-center py-0 pt-2">
              <p class="text-center mt-2">{{ taskDetail?.assignedBy?.name }}</p>
            </v-col>
          </v-row>
          <v-row class="flex-container">
            <v-col md="3" sm="3" class="d-flex justify-center py-0">
              <h4 class="mt-4 text-center">Assigned To</h4>
            </v-col>
            <v-col
              md="8"
              m="9"
              class="d-flex flex-column align-items-center py-0 pt-2"
            >
              <p
                class="text-center mb-1-0"
                v-for="(item, index) in taskDetail?.assignedToNames"
                :key="index"
              >
                {{ item }}
              </p>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-around flex-container">
            <v-col md="3" sm="3" class="d-flex justify-center py-0">
              <h4 class="mt-4 text-center">Department Name</h4>
            </v-col>
            <v-col md="8" sm="9" class="d-flex justify-center py-0 pt-2">
              <p class="text-center mt-2">
                {{ taskDetail?.department?.toUpperCase() }}
              </p>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-around flex-container">
            <v-col md="3" sm="3" class="d-flex justify-center py-0">
              <h4 class="mt-4 text-center">Created At</h4>
            </v-col>
            <v-col md="8" sm="9" class="d-flex justify-center py-0 pt-2">
              <p class="text-center mt-2">
                {{ getFormattedDate(taskDetail.createdAt) }}
              </p>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-around flex-container">
            <v-col md="3" sm="3" class="d-flex justify-center py-0">
              <h4 class="mt-4 text-center">Deadline</h4>
            </v-col>
            <v-col md="8" sm="9" class="d-flex justify-center py-0 pt-2">
              <p class="text-center mt-2">
                {{ getFormattedDate(taskDetail.deadline) }}
              </p>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-around flex-container">
            <v-col md="3" sm="3" class="d-flex justify-center py-0">
              <h4 class="mt-4 text-center">Priority</h4>
            </v-col>
            <v-col md="8" sm="9" class="d-flex justify-center py-0 pt-2">
              <p class="text-center mt-2">{{ taskDetail.priority }}</p>
            </v-col>
          </v-row>
          <v-row class="flex-container">
            <v-col md="3" sm="3" class="d-flex justify-center py-0">
              <h4 class="mt-4 text-center">Status</h4>
            </v-col>
            <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
              <p class="text-center mt-2">{{ taskDetail.status }}</p>

              <v-menu top :close-on-click="closeOnClick">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    x-small
                    color="#013365"
                    class="ml-4"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark size="15"> mdi-pencil </v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item class="px-0 text-center" style="width: 8rem"  v-for="(item, index) in items" :key="index">
                    <v-list-item-title
                    class="action-btns py-2"
                      @click="handleChangeStatus(item.title)"
                      >{{ item.title }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
          <v-row class="flex-container">
            <v-col md="3" sm="3" class="d-flex justify-center py-0">
              <h4 class="mt-4 text-center">Description</h4>
            </v-col>
            <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
              <p class="text-center mt-2">{{ taskDetail.description }}</p>
            </v-col>
          </v-row>
          <!-- v-if="taskDetail.files.length>0" -->
          <v-row class="flex-container">
            <v-col md="3" sm="3" class="d-flex justify-center py-0">
              <h4 class="mt-4 text-center">Files</h4>
            </v-col>
            <v-col
              md="8"
              m="9"
              class="downlaod-card d-flex flex-column align-center py-0 pt-2"
            >
              <div
                v-for="(file, index) in taskDetail.files"
                :key="index"
                class="upload-box px-2 mb-3 d-flex flex-column justify-center align-center"
                @click="() => downloadImage(file, 'task-file')"
              >
                <v-icon size="35" color="#013365">
                  mdi-arrow-down-circle-outline
                </v-icon>
                <h3 class="fs-4 mb-0 text-center">
                  <v-btn depressed class="white" style="color: #013365"
                    >Download File</v-btn
                  >
                </h3>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <div v-if="taskDetail?.responses?.length > 0 && !apiLoading">
      <h1 class="mt-6 mb-5 text-h5 ml-3 font-weight-medium">
        Submit Responses
      </h1>
      <v-row>
        <v-col
          cols="12"
          v-for="item in taskDetail?.responses"
          :key="item._id"
          class="mb-8 d-flex justify-center"
        >
          <v-card width="70%" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  {{ item.user.designation }}
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ item.user.name }}
                </v-list-item-title>

                <v-card-text>
                  <div class="text--primary">
                    {{ item.description }}
                  </div>
                </v-card-text>
                <v-list-item-subtitle
                  class="d-flex flex-column align-center justify-center"
                >
                  <div
                    v-for="(file, index) in item.files"
                    :key="index"
                    class="upload-box px-2 mb-3 d-flex flex-column justify-center align-center"
                    @click="() => downloadImage(file, 'task-file')"
                  >
                    <v-icon size="35" color="#013365">
                      mdi-arrow-down-circle-outline
                    </v-icon>
                    <h3 class="fs-4 mb-0 text-center">
                      <v-btn depressed class="white" style="color: #013365"
                        >Download File</v-btn
                      >
                    </h3>
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="80" color="grey">
                <v-img
                  width="100"
                  contain
                  :src="
                    item?.user?.img
                      ? item?.user?.img
                      : `https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png`
                  "
                  alt="loading"
                  class="rounded-lg"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-card-actions class="d-flex justify-end">
              <v-btn
                v-if="
                  currentUser.role === 'Admin' ||
                  currentUser._id === item.user._id
                "
                class="mt-3 ml-5 create-btn"
                @click="deleteResponse(item._id)"
                outlined
                height="2rem"
                color="red"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "TaskDetails",

  created() {
    this.$store.dispatch("getCurrentUser");
    const taskId = this.$route.params.id;
    this.$store.dispatch("viewTaskDetail", taskId);
  },

  data() {
    return {
      taskSubmission: false,
      closeOnClick: true,
      response: {
        description: "",
        files: [],
      },
      items: [
        { title: "Pending" },
        { title: "Working" },
        { title: "Completed" },
        { title: "Cancelled" },
      ],
    };
  },

  computed: {
    apiLoading() {
      return this.$store.state.apiLoading;
    },
    taskDetail() {
      return this.$store.state.taskDetail;
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
    getFormattedDate(timestamp) {
      const dateObject = new Date(timestamp);
      return dateObject.toDateString();
    },
    deleteResponse(resId) {
      this.$store.dispatch("deleteResponse", {
        taskId: this.$route.params.id,
        resId: resId,
      });
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.$route.params.id);
      this.$router.push("/home");
    },
    handleChangeStatus(status) {
      this.$store.dispatch("changeStatus", {
        status: status,
        id: this.$route.params.id,
      });
    },

    handleUpload() {
      if (this.response.description) {
        const formData = new FormData();
        formData.append("description", this.response.description);
        formData.append("user", this.currentUser._id);
        this.response.files.forEach((file) => {
          formData.append("files", file);
        });
        this.$store.dispatch("submitResponse", {
          formData: formData,
          id: this.$route.params.id,
        });

        this.taskSubmission = false;
        this.response.description = "";
        this.response.files = [];
      } else {
        this.$store.commit("setAlertValue", true);
        this.$store.commit("setAlertText", "Incomplete Info");
        this.$store.commit("setAlertColor", "red");
        this.createUser = false;
        setTimeout(() => {
          this.$store.commit("setAlertValue", false);
        }, 3000);
      }
    },
    cancelTask() {
      this.taskSubmission = false;
      this.response.description = "";
      this.response.files = [];
    },

    downloadImage(url, name) {
      fetch(url)
        .then((resp) => resp.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = name;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(() => alert("An error sorry"));
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
.downlaod-card {
  cursor: pointer;
}
.upload-box {
  width: 70%;
  margin-top: 0.5rem;
  border: 2px dashed #013365;
  border-radius: 10px;
}
@media screen and (max-width: 500px) {
  .task-row {
    flex-direction: column;
    align-items: center;
  }
}
</style>
