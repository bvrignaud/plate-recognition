<script>
import { defineComponent } from "vue";
import Camera from "simple-vue-camera";
import { usePlateRecognizer } from "@/composables/usePlateRecognizer";

export default defineComponent({
  components: {
    Camera,
  },
  data() {
    return {
      loading: false,
      plates: [],
    }
  },
  setup() {
    const { postSnapshot } = usePlateRecognizer()
    return { postSnapshot }
  },
  methods: {
    cameraAction(opt) {
      if (opt === "snap") {
        const blob = this.$refs.camera?.snapshot();
        blob.then(async (data) => {
          this.loading = true;
          const response = await this.postSnapshot(data)
          console.log(response)
          this.plates = response
          this.loading = false;
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
      <div
        v-if="loading === true"
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
      <button v-else type="button" class="button" @click="cameraAction('snap')">
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
