<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div
        v-for="category in categories"
        :key="category.id"
        class="col-md-2 col-4 mb-3"
      >
        <router-link
          :to="{ name: 'detail_category', params: { slug: category.slug } }"
        >
          <div class="card h-100 border-0 rounded shadow">
            <div class="card-body text-center">
              <img :src="category.image" style="width: 100px" />
              <hr />
              <label class="font-weight-bold">{{ category.name }}</label>
            </div>
          </div>
        </router-link>
      </div>
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
