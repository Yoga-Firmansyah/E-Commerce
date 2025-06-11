<template>
  <div class="card border-0 shadow rounded">
    <div class="card-body">
      <h5 class="font-weight-bold">
        <i class="fa fa-shopping-bag"></i> KATEGORI
      </h5>
      <hr />
      <ul class="list-group list-group-horizontal" >
        <router-link
          :to="{ name: 'detail_category', params: { slug: category.slug } }"
          class="list-group-item shadow-sm font-weight-bold text-decoration-none text-dark mr-2 "
          style="text-align: center"
          v-for="category in categories"
          :key="category.id"
        >
          <img :src="category.image" style="width: 40px" />
          {{ category.name }}
          </router-link>

        <router-link :to="{name: 'categories'}"
          class="list-group-item text-center active shadow-sm font-weight-bold text-decoration-none mr-2 d-flex align-items-center"
          >LIHAT KATEGORI LAINNYA <i class="fa fa-long-arrow-alt-right"></i
        ></router-link>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("category/getCategories");
});

const categories = computed(() => {
  return store.state.category.categories;
});
</script>
