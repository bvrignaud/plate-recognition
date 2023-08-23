<script lang="ts">
import { defineComponent } from "vue";
import Camera from "simple-vue-camera";

export default defineComponent({
  components: {
    Camera,
  },
  methods: {
    cameraAction(opt) {
      if (opt === "snap") {
        const blob = this.$refs.camera?.snapshot();
        blob.then((data) => {
          console.log(data);
        });
      }
    },
  }
});
</script>


<template>
  <div style="position: relative; border: #fffa00 2px solid">
    <camera
        :resolution="{ width: 375, height: 300 }"
        ref="camera"
        autoplay
    ></camera>
    <div
        style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          bottom: 0;
          left: 0;
        "
    >
      <button type="button" class="button" @click="cameraAction('snap')">
        <img
            src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
        />
      </button>
    </div>
  </div>
</template>
