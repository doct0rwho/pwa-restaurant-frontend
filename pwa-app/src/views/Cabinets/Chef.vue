<template>
    <div>
        <div class="header">
      <Button class="back-button" @click="redirectToHomePage">
        <i class="pi pi-chevron-left"></i>
      </Button>
      <div class="header-text">Робочий кабінет</div>
      <div>
        <Button class="edit-menu" @click="redirectToEditMenu">
           Меню
        </Button>
      </div>      
      <div class="chosen-text">Активні замовлення</div>
      <div class="table">
        <div class="main-divider-line"></div>
        <div v-for="order in orders" :key="order._id">
          <div class="item-name">
            {{ order.tableNumber }}
          </div>
          <div class="item-email">{{ order.order }}</div>
          <div>
            <Button
              class="accept"
              @click="
                OpenDialog(
                  order.tableNumber,
                  order.order,
                  order._id
                )
              "
            >
              Accept
            </Button>
            <Button class="decline" @click="deleteDemo(order._id)"> Decline </Button>
          </div>
          <div class="divider-line1"></div>
        </div>
      </div>
    </div>
    </div>
</template>
<script setup>
// import axios from "axios";
// import { onMounted } from "vue";
import { useRouter } from "vue-router";
// import { ref } from "vue";
// import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter();
const redirectToHomePage = () => {
  router.push("/");
};
const redirectToEditMenu = () => {
  router.push("/workerSpace/editMenu");
};
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  /* margin-left: -8px;
  margin-top: -8px; */
  right: 0;
  width: 100vw;
  height: 45px;
  background-color: #f9f6a5;
  font-size: 20px;
  z-index: 1;
  font-weight: 500;
  color: #000000;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); /* Adjust values as needed */
}
.back-button {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 0px;
  margin-top: 2px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
}
.header-text {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 45px;
  margin-top: 8px;
  height: 40px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.chosen-text {
  position: absolute;
  top: 140px;
  left: 0;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 8px;
  height: 40px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 30px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.edit-menu {
  background: #f9f6a5;
  border: none;
  color: black;
  position: absolute;
  top: 60px;
  border-radius: 20px;
  margin-right: 10px;
  width: 290px;
  height: 70px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 110px;
  font-size: 30px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.edit-menu:focus {
  outline: none;
  box-shadow: none;
}
.main-divider-line {
  /* Styles for the divider line */
  height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  margin-left: 0px;
  width: 100vw;
  top: 200px;
}
</style>