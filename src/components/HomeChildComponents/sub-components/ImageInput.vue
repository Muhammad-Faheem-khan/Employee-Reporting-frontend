<template>
  <div class="check4">
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input
      type="file"
      ref="file"
      accept=".jpg, .jpeg, .png, .svg"
      :name="uploadFieldName"
      @change="onFileChange($event.target.name, $event.target.files)"
      style="display: none"
    />
    <!-- error dialog displays any potential error messages -->
    <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <v-card-text class="subheading">{{ errorText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "image-input",
  data: () => ({
    errorDialog: null,
    errorText: "",
    uploadFieldName: "file",
    maxSize: 1024,
  }),
  props: {
    // Use "value" to enable using v-model
    value: String,
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      const { maxSize } = this;
      let imageFile = file[0];

      if (file.length > 0) {
        let size = imageFile.size / maxSize / maxSize;
        if (!imageFile.type.match("image.*")) {
          // check whether the upload is an image
          this.errorDialog = true;
          this.errorText = "Please choose an image file";
        } else if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorDialog = true;
          this.errorText =
            "Your file is too big! Please select an image under 1MB";
        } else {
          // Append file into FormData and turn file into image URL
          let reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onload = (e) => {
            let image = e.target.result;
            this.$emit("input", image);
            if (imageFile) {
              this.$store.commit("setUserImg", imageFile);
            }
          };
        }
      }
    },
  },
};
</script>

<style>
.check4 {
  background-color: white;
  height: 160px;
  padding: 5px;
  border-radius: 50%;
  box-shadow: 3px 3px 3px 2px #f5f4f4;
}
</style>
