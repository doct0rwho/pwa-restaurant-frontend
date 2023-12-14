<template>
    <div>
<div class="header">
    <Button class="back-button" @click="redirectToProfile">
        <i class="pi pi-chevron-left"></i>
      </Button>
      <div class="header-text">Історія</div>
      
       
      </div>
    </div>
    <div  class="chosen-text" >
        Ваша історія:
        <div class="divider-line1"></div>
        <div style="margin-left: 40px; margin-top: 20px;" v-for="item in history" :key="item._id">         
          <div class="border">    
          <div>Сума: № {{item.price}}  </div>                 
          <div>Замовлення: 
            <div v-for="item in item.items" :key="item.nameMenuItem">
              <div style="margin-left: 40px;">{{item.nameMenuItem}}</div>     
                  
            </div>
            
          </div>
         
         
         </div> 
         <div class="divider-line2"></div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
const { onMounted } = require("vue");
import { useRouter } from 'vue-router';

const history = ref([]);

const router = useRouter();



onMounted (() => {
    getHistory();
});

const redirectToProfile = () => {
  router.push('/profile');
};

const getHistory = () => {
    console.log("getHistory");
    let email = localStorage.getItem("email");
    axios
      .get(`https://diploma-lya6.onrender.com/get/all/orders/${email}`)
      .then((response) => {
        console.log(response.data.data);
        history.value = response.data.data;
        console.log( history.value);
      })
      .catch((error) => {
        console.log(error);
      });
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
  top: 60px;
  left: 0;
  margin-left: 8px;
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
.divider-line1 {
  /* Styles for the divider line */
  height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  margin-top: 10px;
  margin-left: -16px;
  width: 100vw;
}
.divider-line2 {
  /* Styles for the divider line */
  height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  margin-top: 10px;
  margin-left: -16px;
  width: 100vw;
}
.border{
  /* border: 1px solid #747070; */
  border-radius: 20px;
  padding: 10px 50px 10px 20px;
  background: #f9f6a5;

  margin-top: 20px;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); /* Adjust values as needed */
  }
  .border2{
  /* border: 1px solid #747070; */
  border-radius: 20px;
  padding: 10px 50px 10px 20px;
  background: #f9f6a5;
    
  margin-top: 20px;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); /* Adjust values as needed */
  }
  
.divider-line2 {
  /* Styles for the divider line */
  height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  margin-top: 10px;
  margin-left: -56px;
  width: 100vw;
}
</style>