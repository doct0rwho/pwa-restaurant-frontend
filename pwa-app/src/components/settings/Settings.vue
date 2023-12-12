<template>
    <div>
        <div class="header">
      <Button class="back-button" @click="redirectToProfile">
        <i class="pi pi-chevron-left"></i>
      </Button>
      <div class="header-text">Особистий профіль</div>
    </div>
    <div class="chosen-text">Редагування даних</div>
    <div class="log-input-email">
    <InputText class="register-input" v-model="userEmail" placeholder="Email"  :disabled="google"  />
</div>   
<div class="log-input-password">
    <InputText class="register-input" v-model="userName" placeholder="Name"  />
</div>
<div>
              <Button class="logclient-button" @click="editClient">
                <div class="regclient-button-text">
                  Зберегти
                </div>
              </Button>
            </div>
    </div>
</template>
<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter();
const token = ref("");
const userName = ref("");
const userEmail = ref("");
const google = ref(false);

onMounted(() => {
  checkToken();
});
const checkToken = () => {
    if (localStorage.getItem("token") != null) {
                token.value = localStorage.getItem("token");
                getUser();
            }
            else {
                router.push("/");
            }
};
const getUser = () =>{
    const email = localStorage.getItem("email");
        axios.get(`https://diploma-lya6.onrender.com/get/user/data/${email}`).then((response) => {
          response.data;
          console.log(response.data.data[0].userName);
          userName.value = response.data.data[0].userName; 
          userEmail.value = response.data.data[0].email;
          google.value = response.data.data[0].googleStatus;

           
        
        })
        .catch((error) => {
          console.log(error);          
       
        });
        
}
const editClient = () => {
    const email = localStorage.getItem("email");
    console.log(userEmail.value)
    console.log(userName.value)
    const data = {
        email: email,
        newemail: userEmail.value,
        name: userName.value,       
    };
    axios
        .post("https://diploma-lya6.onrender.com/edit/user/data", data)
        .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
            toast.success('Дані успішно змінено');  
            localStorage
        } else {
            toast.error('Помилка');
        }
        })
        .catch((error) => {
          if(error.response.status === 402){
            toast.error('Користувач з таким email вже існує');
          }
          else{
            toast.error('Помилка');
          }
        console.log(error);
        });
};
const redirectToProfile = () => {
  router.push("/profile");
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
  top: 50px;
  left: 0;
  margin-left: 15px;
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
.log-input-email{
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 40px;
  background-color: white;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
}
.log-input-password{
  position: absolute;
  top: 175px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 40px;
  background-color: white;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
}
.register-input{
    border: none;
    background: rgba(249, 246, 165, 0.3);
    border-radius: 50px;
  padding: 10px 40px;
  width: 300px;
  color: #000000;
  font-size: small;
} 
.register-input:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.logclient-button{
    position: absolute;
    top: 240px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 40px;
    background-color: #f9f6a5;
    border: none;
    border-radius: 50px;
    padding: 10px 40px;
    font-size: 20px;
    font-weight: 500;
    color: #000000;
    font-family: "Neucha";
}
.logclient-button:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.regclient-button-text{
    margin-left: 0px;
}
</style>