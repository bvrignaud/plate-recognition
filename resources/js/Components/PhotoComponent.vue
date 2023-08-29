<script lang="ts">
import { defineComponent } from "vue";
import Camera from "simple-vue-camera";
import { usePlateRecognizer } from "@/composables/usePlateRecognizer";

export default defineComponent({
  components: {
    Camera,
  },
  data() {
    return {
      plates: [],
    }
  },
  setup() {
    const { postSnapshot } = usePlateRecognizer()
    return { postSnapshot }
  },
  methods: {
    async cameraAction(opt: string) {
      if (opt === "snap") {
        const blob = this.$refs.camera?.snapshot();
        blob.then(async (data: Blob) => {
          // console.log('data', data)
          const response = await this.postSnapshot(data)
          console.log(response)
          this.plates = response
          if (response.length) {
            alert(response[0].plate)
          } else {
            alert("aucune plaque n'a été trouvée !")
          }
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
  <div class="text-center">
    <h2>Résultats :</h2>
    {{ plates }}
  </div>
</template>
