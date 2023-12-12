<template>    
        <div>
        <div class="header">
      <Button class="back-button" @click="redirectToHomePage">
        <i class="pi pi-chevron-left"></i>
      </Button>
      <div class="header-text">Особистий профіль робітника</div>
    </div>
    <div class="chosen-text">{{ userName }}</div>

            <div>
              <Button class="settings-button" @click="redirectToStaffSettings">
                <div class="settings-button-text">
                  Налаштуваня профілю
                </div>
                <div class="history-button-text-symbol">
                  <i class="pi pi-chevron-right"></i>
                </div>
              </Button>
            </div>
            <div>
              <Button class="quit-button" @click="logout">
                <div class="quit-button-text">
                  Вийти
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
// import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter();
const token = ref("");
const userName = ref("");


onMounted(() => {
  checkToken();
});

const redirectToHomePage = () => {
  router.push("/");
};

const redirectToStaffSettings = () => {
  router.push("/staff/profile/settings");
};
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
        axios.get(`https://diploma-lya6.onrender.com/get/worker/data/${email}`).then((response) => {
          response.data;
          console.log(response.data.data[0].workerFirstNamee);
          var user = response.data.data[0].workerFirstName + ' ' + response.data.data[0].workerLastName;           
            if(user.length > 28 ){
                user = user.slice(0, 28) + '...';
                userName.value = user;
            }else{
                userName.value = user;
            }
        
        })
        .catch((error) => {
          console.log(error);          
       
        });
        
}
const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    router.push("/");
}
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

.history-button-text-symbol{
    position: absolute;
    top: 10px;
    left: 270px;
}
.settings-button{
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
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
.settings-button:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.settings-button-text{
    margin-left: 25px;
}
.quit-button{
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
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
.quit-button:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.quit-button-text{
    margin-left: 85px;
}
</style>