<template>
  <div class="card border-0 rounded shadow">
    <div class="card-body">
      <h5 class="font-weight-bold">MAIN MENU</h5>
      <hr />
      <ul class="list-group">
        <router-link
          :to="{ name: 'dashboard' }"
          class="list-group-item text-decoration-none text-dark text-uppercase"
          ><i class="fas fa-tachometer-alt"></i> Dashboard</router-link
        >
        <router-link :to="{name: 'order'}" class="list-group-item text-decoration-none text-dark text-uppercase"><i class="fas fa-shopping-cart"></i> My Order</router-link>
        <a
          @click="logout"
          style="cursor: pointer"
          class="list-group-item text-decoration-none text-dark text-uppercase"
          ><i class="fas fa-sign-out-alt"></i> Logout</a
        >
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();

const router = useRouter();

function logout() {
  store.dispatch("auth/logout").then(() => {
    router.push({
      name: "login",
    });
  });
}
</script>
