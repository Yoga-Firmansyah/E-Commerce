<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-4">
        <div class="card border-0 rounded shadow">
          <div class="card-body p-2">
            <img :src="product.image" class="w-100 border" />
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <label class="font-weight-bold" style="font-size: 20px">
              {{ product.title }}
            </label>
            <hr />
            <div
              class="price-product"
              id="price-product"
              style="font-size: 1.35rem"
            >
              <span class="font-weight-bold mr-4" style="color: green"
                >Rp. {{ calculateDiscount(product) }}</span
              >
              <s class="font-weight-bold" style="text-decoration-color: red"
                >Rp. {{ product.price }}</s
              >
            </div>
            <table class="table table-borderless mt-3">
              <tbody>
                <tr>
                  <td class="font-weight-bold">DISKON</td>
                  <td>:</td>
                  <td>
                    <button
                      class="btn btn-sm"
                      style="color: #ff2f00; border-color: #ff2f00"
                    >
                      DISKON {{ product.discount }} %
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">BERAT</td>
                  <td>:</td>
                  <td>
                    <span
                      class="badge badge-pill badge-success"
                      style="
                        font-size: 14px;
                        border-radius: 0.3rem;
                        padding: 0.25em 0.5em 0.2em;
                      "
                    >
                      {{ product.weight }} gram</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              @click.prevent="
                addToCart(
                  product.id,
                  calculateDiscount(product),
                  product.weight
                )
              "
              class="btn btn-primary btn-lg btn-block"
            >
              <i class="fa fa-shopping-cart"></i> TAMBAH KE KERANJANG
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <label class="font-weight-bold" style="font-size: 20px"
              >KETERANGAN</label
            >
            <hr />
            <div v-html="product.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();

const store = useStore();

onMounted(() => {
  store.dispatch("product/getDetailProduct", route.params.slug);
});

const product = computed(() => {
  return store.state.product.product;
});

function addToCart(product_id, price, weight) {
  const token = store.state.auth.token;

  if (!token) {
    return router.push({ name: "login" });
  }

  store.dispatch("cart/addToCart", {
    product_id: product_id,
    price: price,
    weight: weight,
    quantity: 1,
  });
}
</script>
