<template>
    <div id="app" class="center-container">
        <div class="header">
     
      <div class="header-text">Введіть пароль для реєстрації</div>
    </div>
    <div class="border">
        <div>
<div class="input-name">Пароль</div>
    <InputText class="edit-name" v-model="userPassword" type="password" />
</div> 
<div > 
<div class="input-name">Підтвердіть пароль</div>
    <InputText class="edit-name" v-model="userConfirmPassword" type="password" />
</div>  
<Button class="register" @click="registerAcc">
            Зареєструватися
</Button>
        
</div>

    </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
const { onMounted } = require("vue");
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const userEmail = ref("");
const userToken = ref("");
const userPassword = ref("");
const userConfirmPassword = ref("");

const router = useRouter();

onMounted (() => {
    console.log( router.currentRoute.value.query.token)
    userToken.value = router.currentRoute.value.query.token;
    getUserByToken();
    
});

const getUserByToken = () =>{

    
   
    axios
      .get(`https://diploma-lya6.onrender.com/get/user/by/token/${userToken.value}`)
      .then((response) => {
        console.log(response.data.data);
        userEmail.value = response.data.data.email;
        
      })
      .catch((error) => {
        console.log(error);
    if(error.response.status == 404){
        router.push('/');
    
      }
    
})
}
const registerAcc = () =>{
    if(userPassword.value == userConfirmPassword.value){
        axios
      .post(`https://diploma-lya6.onrender.com/application/approved/user`, {
        email: userEmail.value,
        password: userPassword.value,
        dublicatePassword: userConfirmPassword.value,
      })
      .then((response) => {
        console.log(response.data);
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
    if(error.response.status == 404){
        router.push('/');
    
      }
    
})
    }
    else{
        toast.error("Паролі не співпадають");
    }
    

}

</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Add this line to prevent horizontal scrolling */
    
}
.edit-name{
  border: none;
  background: white;
    border-radius: 50px;
  padding: 10px 10px;
  width: 250px;
  color: #000000;
  font-size: small;

}
.edit-name:focus{
    outline: none;
    border: none;
    background: white;
        border-radius: 50px;
    padding: 10px 10px;
    width: 250px;
    color: #000000;
    font-size: small;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); /* Adjust values as needed */
}
.input-name {
  font-size: 15px;
  margin-top: 10px;
  
  
  
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
}

.container {
    display: flex;
  }
  .text {
    flex: 0 0 45%;
     /* Adjust as needed */
     left : 0;
  }
  .border{
  /* border: 1px solid #747070; */
  
  border-radius: 20px;
  padding: 10px 10px 10px 10px;
  background: #f9f6a5;
  top:50%;

  margin-top: 20px;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); /* Adjust values as needed */
  }
  .app{
    background-color: #dac2c2;
  }

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
  z-index: 4;
  font-weight: 500;
  color: #000000;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); /* Adjust values as needed */
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
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 100% of the viewport height */
}

.center-container {
  display: flex;
  flex-direction: column;
}

.input-container {
  margin: 10px;
}
.register{
    margin-top: 20px;
    background-color: white;
    border: none;
    outline: none;
    font-size: 20px;
    left: 50%;
    transform: translate(-50%);
    font-weight: 500;
    color: #000000;
    font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
    border-radius: 50px;
    padding: 10px 10px;
    
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); /* Adjust values as needed */
}
</style>