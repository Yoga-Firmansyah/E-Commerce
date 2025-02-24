<template>
  <a-carousel arrows>
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>
    <div
    class="d-flex justify-content-center"
      v-for="(slider, id) in sliders"
      :class="{ active: id == 0 }"
      :key="slider.id"
    >
      <img :src="slider.image" class="d-block w-100 rounded-lg" />
    </div>
  </a-carousel>
</template>
<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
const store = useStore();

onMounted(() => {
  store.dispatch("slider/getSliders");
});

const sliders = computed(() => {
  return store.state.slider.sliders;
});
</script>
<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 75vh;
  line-height: 75vh;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
