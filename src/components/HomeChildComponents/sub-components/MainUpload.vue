<template>
  <image-input v-model="avatar">
    <div slot="activator">
      <v-avatar
        size="200px"
        v-ripple
        v-if="!userData.img && !avatar"
        class="grey lighten-3 mb-3"
      >
        <v-icon size="110"> mdi-account-arrow-up-outline </v-icon>
      </v-avatar>
      <v-avatar size="200px" v-ripple v-else-if="!avatar" class="mb-3">
        <img :src="userData.img" alt="avatar" />
      </v-avatar>
      <v-avatar size="200px" v-ripple v-else class="mb-3">
        <img :src="avatar" alt="avatar" />
      </v-avatar>
    </div>
  </image-input>
</template>

<script>
import ImageInput from "./ImageInput.vue";
export default {
  name: "app",
  data() {
    return {
      avatar: null,
      saving: false,
      saved: false,
    };
  },

  computed: {
    userData() {
      return this.$store.state.user;
    },
  },
  components: {
    ImageInput: ImageInput,
  },
  watch: {
    // watch avater value
    avatar: {
      handler: function () {
        this.saved = false;
      },
      deep: true,
    },
  },
};
</script>

<style></style>
