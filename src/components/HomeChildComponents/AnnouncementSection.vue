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
        <h1 class="mt-6 mb-5 text-h4 ml-3 font-weight-medium">Announcements</h1>

        <v-dialog
          v-if="currentUser.role === 'Admin'"
          persistent
          v-model="announcementPopUp"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mt-6 ml-5 create-btn"
              outlined
              height="2rem"
              color="#013365"
              v-bind="attrs"
              v-on="on"
            >
              Create Announcement
            </v-btn>
          </template>

          <v-card>
            <v-card-title
              style="background-color: #013365"
              class="d-flex justify-space-between"
            >
              <h3 class="text-h5" style="color: #fff">
                {{ isUpdating ? "Update Announcement" : "New Announcement" }}
              </h3>
              <v-btn icon @click="closePopUp()">
                <v-icon color="#fff">mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row class="pt-5 announce-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Description:</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex justify-start py-0 px-3 mr-0"
                >
                  <v-textarea
                    solo
                    v-model="announcementData.description"
                    label="Description"
                    color="indigo"
                    class="rounded-lg"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row class="mb-4 announce-row">
                <v-col md="3" sm="3" class="d-flex justify-center py-0 px-3">
                  <h4 class="mt-4 text-center">Upload Image:</h4>
                </v-col>
                <v-col
                  md="8"
                  sm="8"
                  class="d-flex flex-column justify-start py-0 px-3"
                >
                  <div
                    class="upload-box px-2 d-flex flex-column justify-content-center align-items-center"
                  >
                    <input
                      ref="fileUpload"
                      type="file"
                      accept=".jpg, .jpeg, .png, .svg"
                      @change="(e) => handleFileLoad(e)"
                    />
                    <v-img
                      v-if="
                        this.announcementData.img &&
                        typeof this.announcementData.img === 'string'
                      "
                      height="75px"
                      :src="this.announcementData.img"
                      contain
                    >
                    </v-img>
                    <v-icon v-else size="75" color="#013365">
                      mdi-image-area
                    </v-icon>
                    <h3 class="fs-4 mb-0 text-center">
                      <v-btn
                        depressed
                        class="white"
                        style="color: #013365"
                        @click="triggerFileInput()"
                        >Browse Image</v-btn
                      >
                    </h3>
                    <p class="text-center">Supports: JPG, JPEG, PNG, SVG</p>
                  </div>
                  <div v-if="this.announcementData.img">
                    <h5 class="text-center mt-3">
                      {{ this.announcementData.img.name }}
                    </h5>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="uploadBtn"
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
    <div v-if="apiLoading" class="d-flex justify-center mt-15 pt-14">
      <v-progress-circular
        :size="50"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <v-row v-else class="d-flex justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-card
          v-for="item in announcements"
          :key="item._id"
          class="mx-auto mb-10"
          color="#013365"
          dark
        >
          <v-card-title class="d-flex justify-space-between">
            <div>
              <v-icon large left> mdi-bullhorn-outline </v-icon>
              <span class="text-h6 font-weight-light">Attention Please</span>
            </div>
            <div>
              <div class="mr-3">
                <p class="mb-0 time-text">
                  {{ getFormattedTime(item.createdAt) }}
                </p>
                <p class="mb-0 date-text">
                  {{ getFormattedDate(item.createdAt) }}
                </p>
              </div>
              <v-menu
                v-if="currentUser.role === 'Admin'"
                right
                :close-on-click="closeOnClick"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    x-small
                    class="ml-4 pa-0 edit-buttons white"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon size="18" color="black" v-bind="attrs" v-on="on">
                      mdi-dots-vertical
                    </v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item class="px-0 text-center" style="width: 6rem">
                    <v-list-item-title
                      class="action-btns py-2"
                      @click="editAnnouncement(item)"
                      >Edit</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item class="px-0 text-center">
                    <v-list-item-title
                      class="action-btns py-2"
                      @click="deleteAnnouncement(item._id)"
                      >Delete</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-bold text-center">
            {{ item.description }}
          </v-card-text>
          <v-img v-if="item.img" height="200px" :src="item.img" contain>
          </v-img>
          <v-card-actions>
            <v-list-item class="grow"> </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
  name: "AnnouncementSection",

  created() {
    this.$store.dispatch("getAllAnnouncements", {
      limit: this.limit,
      offset: this.offset,
    });
  },

  data() {
    return {
      limit: 5,
      page: 1,
      isUpdating: false,
      closeOnClick: true,
      announcementPopUp: false,
      announcementData: {
        description: "",
        img: null,
      },
    };
  },

  watch: {
    page() {
      this.$store.dispatch("getAllAnnouncements", {
        limit: this.limit,
        offset: this.offset,
      });
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.$store.state.announcements.totalCount / this.limit);
    },
    offset() {
      return (this.page - 1) * this.limit;
    },
    apiLoading() {
      return this.$store.state.apiLoading;
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
    uploadBtn() {
      return this.announcementData.description === "";
    },
    announcements() {
      return this.$store.state.announcements.allAnnouncements;
    },
  },

  methods: {
    closePopUp() {
      this.isUpdating = false;
      this.announcementPopUp = false;
      this.announcementData.img = null;
      this.announcementData.description = "";
    },
    triggerFileInput() {
      this.$refs.fileUpload.click();
    },
    handleFileLoad(event) {
      this.announcementData.img = event.target.files[0];
    },

    handleUpload() {
      if (this.announcementData.description || this.announcementData.img) {
        const formData = new FormData();

        formData.append("description", this.announcementData.description);
        formData.append("announcer", this.currentUser._id);

        if (this.isUpdating) {
          if (typeof this.announcementData.img !== "string") {
            formData.append("img", this.announcementData.img);
          }
          this.$store.dispatch("updateAnnouncement", {
            formData: formData,
            id: this.announcementData._id,
          });
          window.scrollTo(0, 0);
        } else {
          formData.append("img", this.announcementData.img);
          this.$store.dispatch("createAnnouncement", formData);
        }
        this.isUpdating = false;
        this.announcementPopUp = false;
        this.announcementData.img = null;
        this.announcementData.description = "";
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
    getFormattedTime(timestamp) {
      const dateObject = new Date(timestamp);
      return dateObject.toLocaleTimeString();
    },
    getFormattedDate(timestamp) {
      const dateObject = new Date(timestamp);
      return dateObject.toDateString();
    },
    editAnnouncement(announcement) {
      this.announcementPopUp = true;
      this.isUpdating = true;
      console.log("data", announcement);
      this.announcementData = { ...announcement };
      console.log("this data", this.announcementData);
    },
    deleteAnnouncement(id) {
      this.$store.dispatch("deleteAnnouncement", id);
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
.time-text {
  font-size: medium;
}
.date-text {
  font-size: small;
}
.upload-box {
  width: 100%;
  margin-top: 0.5rem;
  border: 2px dashed #013365;
  border-radius: 10px;
}
.upload-box input {
  opacity: 0;
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
