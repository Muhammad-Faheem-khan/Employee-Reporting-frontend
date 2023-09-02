<template>
  <div>
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
      <h1 class="mt-6 pb-4 mb-5 text-h4 ml-3 font-weight-medium">
        Profile Update
      </h1>
      <!--Upload-Image-->
      <v-row class="pb-5 mb-9">
        <v-col class="d-flex justify-center">
          <MainUpload />
        </v-col>
      </v-row>

      <div v-if="apiLoading" class="d-flex justify-center mt-15 pt-14">
        <v-progress-circular
          :size="50"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <!--Main-Form-->
      <div v-else class="mb-5 pb-5">
        <!--Full-Name-->
        <v-row class="d-flex justify-around flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Full Name</h4>
          </v-col>
          <v-col md="8" sm="9" class="d-flex justify-start py-0">
            <!--FirstName-Field-->
            <v-text-field
              required
              :rules="validation.nameValidation"
              :disabled="currentUser.role !== 'Admin'"
              label="Full Name"
              color="indigo"
              v-model="updateData.name"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--Department Name-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Department Name</h4>
          </v-col>
          <!--Job-Title-Field-->
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-text-field
              label="Department Name"
              color="indigo"
              :disabled="currentUser.role !== 'Admin'"
              class="mr-4"
              v-model="updateData.departmentName"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--Designation-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Designation</h4>
          </v-col>
          <!--Designation-Field-->
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-text-field
              label="Designation"
              color="indigo"
              class="mr-4"
              :disabled="currentUser.role !== 'Admin'"
              v-model="updateData.designation"
            ></v-text-field>
          </v-col>
        </v-row>

        <!--Job Description-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Job Description</h4>
          </v-col>
          <!--Job Description-Field-->
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-text-field
              label="Job Description"
              color="indigo"
              class="mr-4"
              :disabled="currentUser.role !== 'Admin'"
              v-model="updateData.jobDescription"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Employee Reporting To</h4>
          </v-col>
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-select
              :disabled="currentUser.role !== 'Admin'"
              v-model="updateData.employeeReportingTo"
              :items="allUsers"
              item-text="name"
              item-value="_id"
              label="Reporting To"
              chips
            >
              <template v-slot:selection="{ item }">
                {{ item.name }}
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Employee Status</h4>
          </v-col>
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-text-field
              label="Employee Status"
              color="indigo"
              class="mr-4"
              :disabled="currentUser.role !== 'Admin'"
              v-model="updateData.employeeStatus"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Salary</h4>
          </v-col>
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-text-field
              label="Salary"
              color="indigo"
              class="mr-4"
              :disabled="currentUser.role !== 'Admin'"
              v-model="updateData.salary"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--Joining date-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Joining date</h4>
          </v-col>
          <!--Joining date-->
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="updateData.joiningDate"
                  label="Joining Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="currentUser.role !== 'Admin'"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="updateData.joiningDate"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <!--Gender-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Gender</h4>
          </v-col>
          <!--Gender-Field-->
          <v-col md="8" sm="9" class="d-flex justify-start py-0">
            <v-select
              class="mr-4"
              :disabled="currentUser.role !== 'Admin'"
              :items="gender"
              label="Gender"
              color="indigo"
              v-model="updateData.gender"
            ></v-select>
          </v-col>
        </v-row>

        <!--Date of Birth-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Date of Birth</h4>
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
                  :disabled="currentUser.role !== 'Admin'"
                  v-model="updateData.dob"
                  label="Date of Birth"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="updateData.dob"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <!--CNIC-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">CNIC</h4>
          </v-col>
          <!--CNIC-Field-->
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-text-field
              v-model="updateData.cnic"
              :disabled="currentUser.role !== 'Admin'"
              :mask="['#####-#######-#']"
              :rules="[cnicFormatRule]"
              label="CNIC"
              hint="Format: XXXXX-XXXXXXX-X"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--Employee Code-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Employee Code</h4>
          </v-col>
          <!--Employee Code-Field-->
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-text-field
              :disabled="currentUser.role !== 'Admin'"
              label="Employee Code"
              color="indigo"
              class="mr-4"
              v-model="updateData.employeeCode"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--Mobile-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Company Mobile #</h4>
          </v-col>
          <!--Mobile-Field-->
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-text-field
              v-model="updateData.mobilePersonal"
              :disabled="currentUser.role !== 'Admin'"
              :mask="['####-#######']"
              :rules="[mobileFormatRule]"
              label="Personal Mobile number"
              hint="Format: 03XX-XXXXXXX"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--Mobile-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Personal Mobile #</h4>
          </v-col>
          <!--Mobile-Field-->
          <v-col md="8" m="9" class="d-flex justify-start py-0">
            <v-text-field
              v-model="updateData.mobileCompany"
              :disabled="currentUser.role !== 'Admin'"
              :mask="['####-#######']"
              :rules="[mobileFormatRule]"
              label="Company Mobile number"
              hint="Format: 03XX-XXXXXXX"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Role</h4>
          </v-col>
          <!--Gender-Field-->
          <v-col md="8" sm="9" class="d-flex justify-start py-0">
            <v-select
              class="mr-4"
              :disabled="currentUser.role !== 'Admin'"
              :items="roles"
              label="Role"
              color="indigo"
              v-model="updateData.role"
            ></v-select>
          </v-col>
        </v-row>

        <!--Email-->
        <v-row class="d-flex justify-around flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Email</h4>
          </v-col>
          <!--Email-Field-->
          <v-col md="8" sm="9" class="d-flex justify-start py-0">
            <v-text-field
              :rules="validation.emailValidation"
              :disabled="currentUser.role !== 'Admin'"
              color="indigo"
              label="Email"
              class="mr-4"
              v-model="updateData.email"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--Password-->
        <v-row class="d-flex justify-around flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Password</h4>
          </v-col>
          <!--Password-Field-->
          <v-col md="8" sm="9" class="d-flex justify-start py-0">
            <v-text-field
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="validation.passwordValidation"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              color="indigo"
              @click:append="show1 = !show1"
              label="Password"
              class="mr-4"
              v-model="password"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--Address-->
        <v-row class="flex-container">
          <v-col md="3" sm="3" class="d-flex justify-center py-0">
            <h4 class="mt-4 text-center">Address</h4>
          </v-col>
          <!--Address-Field-->
          <v-col md="8" sm="9" class="d-flex justify-start py-0">
            <v-text-field
              label="Address"
              color="indigo"
              :disabled="currentUser.role !== 'Admin'"
              class="mr-4"
              v-model="updateData.address"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mt-4 pt-4">
          <!--Cancel-Button-->
          <v-col class="d-flex justify-end">
            <router-link to="/home" class="text-decoration-none">
              <v-btn class="mx-2 my-2 mt-4" depressed> Cancel </v-btn>
            </router-link>
            <!--Save-Button-->
            <v-btn
              depressed
              dark
              color="#013365"
              class="mx-2 my-2 mr-4 mt-4"
              @click="updateUserData"
            >
              Save Data
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import MainUpload from "./sub-components/MainUpload.vue";
import * as validations from "../../validations";
export default {
  name: "MainProfile",
  components: {
    MainUpload,
  },

  created() {
    this.validation = validations;
    this.$store.dispatch("viewUserProfile", this.userId);
    this.$store.dispatch("getAllUsers");
  },

  data() {
    return {
      userId: this.$route.params.id,
      validation: "",
      show1: false,
      gender: ["Male", "Female", "Other"],
      roles: ["Admin", "Manager", "Employee"],
      menu1: false,
      menu2: false,
      password: "",

      updateData: {
        name: "",
        email: "",
        gender: "",
        job: "",
        img: "",
        cnic: "",
        mobilePersonal: "",
        mobileCompany: "",
        address: "",
        departmentName: "",
        employeeReportingTo: null,
        employeeStatus: "",
        salary: "",
        designation: "",
        jobDescription: "",
        joiningDate: "",
        dob: "",
        employeeCode: "",
        role: "",
      },
    };
  },

  computed: {
    apiLoading() {
      return this.$store.state.apiLoading;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
    userImg() {
      return this.$store.state.userImg;
    },
    cnicFormatRule() {
      return (v) => /^\d{5}-\d{7}-\d$/.test(v) || "Invalid CNIC format";
    },
    mobileFormatRule() {
      return (v) => /^\d{4}-\d{7}/.test(v) || "Invalid number";
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    oldData() {
      return this.$store.state.user;
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

  watch: {
    oldData: {
      immediate: true, // This will trigger the watcher when the component is created
      handler(newVal) {
        this.updateData = { ...newVal };
      },
    },
  },

  methods: {
    // function update user info and save it to local storage by setting img data from state and changing alert state to true
    updateUserData() {
      if (
        this.updateData.name !== "" &&
        this.updateData.email !== "" &&
        this.updateData.employeeCode !== "" &&
        this.updateData.role &&
        this.updateData.employeeReportingTo &&
        this.updateData.dob !== "" &&
        this.updateData.joiningDate !== ""
      ) {
        this.updateData.img = this.userImg;
        const formData = new FormData();
        formData.append("name", this.updateData.name);
        formData.append("address", this.updateData.address);
        formData.append("departmentName", this.updateData.departmentName);
        formData.append("designation", this.updateData.designation);
        formData.append("dob", this.updateData.dob);
        formData.append("email", this.updateData.email);
        formData.append("employeeCode", this.updateData.employeeCode);
        formData.append(
          "employeeReportingTo",
          this.updateData.employeeReportingTo,
        );
        formData.append("employeeStatus", this.updateData.employeeStatus);
        formData.append("gender", this.updateData.gender);
        formData.append("img", this.updateData.img);
        formData.append("isActive", this.updateData.isActive);
        formData.append("jobDescription", this.updateData.jobDescription);
        formData.append("joiningDate", this.updateData.joiningDate);
        formData.append("mobileCompany", this.updateData.mobileCompany);
        formData.append("mobilePersonal", this.updateData.mobilePersonal);
        formData.append("password", this.password);
        formData.append("role", this.updateData.role);
        formData.append("salary", this.updateData.salary);

        this.$store.dispatch("updateUser", {
          formData,
          id: this.updateData._id,
        });
        this.$router.push("/home");
      } else {
        window.scrollTo(0, 0);
        this.$store.commit("setAlertValue", true);
        this.$store.commit("setAlertText", "Fill up the User Info");
        this.$store.commit("setAlertColor", "red");
        setTimeout(() => {
          this.$store.commit("setAlertValue", false);
        }, 3000);
      }
    },

    formatCNIC() {
      // Remove any non-digit characters from the input
      const digits = this.cnic.replace(/\D/g, "");

      // Apply the CNIC format using regular expression
      const formattedCNIC = digits.replace(
        /^(\d{5})(\d{7})(\d{1})$/,
        "$1-$2-$3",
      );

      // Update the data property with the formatted CNIC
      this.cnic = formattedCNIC;
    },
  },
};
</script>

<style>
@media screen and (max-width: 600px) {
  .flex-container {
    flex-direction: column;
    width: 80%;
    margin: auto;
  }
}
</style>
