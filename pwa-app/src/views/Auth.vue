<template>
    <div id="auth">
        <div class="header">
            <Button class="back-button" @click="redirectToHomePage">
                <i class="pi pi-chevron-left"></i>
            </Button>
            <div class="header-text">
            Авторизація клієнта
            </div>  
        </div> 
        <div class="body">
            <div class="auth-form">
                <Button :style="{ textShadow: login ? '2px 2px 4px rgba(0, 0, 0, 0.5)' : 'none' }" class="login-button" @click="toLoginForm">                    
                    <div class="login-button-text">
                        Увійти
                    </div>
                </Button>
                <Button :style="{ textShadow: register ? '2px 2px 4px rgba(0, 0, 0, 0.5)' : 'none' }" class="register-button" @click="toRegisterForm">                    
                    <div class="register-button-text">
                        Зареєструватися
                    </div>
                </Button>
            </div>
            <div >
                <div class="google-component" v-if="login">
                    <!-- <GoogleLogin class="google"  :callback="callback" style="color: "/> -->
                    <Button class="google" @click="loginer">
  <img src="/img/icons/icons8-google-48.png" alt="Google Icon" width="24" height="24">
  <div class="google-button-text">
    Увійти за допомогою Google
  </div>
</Button>
<!-- <div class="divider-line-left"></div> -->
<div class="label-email">Увійдіть за допомогою електронної пошти</div>
<!-- <div class="divider-line-right"></div> -->


                </div>
                <div class="google-component" v-if="register">
                      <!-- <GoogleLogin class="google"  :callback="callback" style="color: "/> -->
                      <Button class="google" @click="loginer">
  <img src="/img/icons/icons8-google-48.png" alt="Google Icon" width="24" height="24">
  <div class="google-button-text-reg">
    Зареєструватися через Google
  </div>
</Button>
<!-- <div class="divider-line-left"></div> -->
<div class="label-email-register">Зареєструватися звичайним шляхом</div>
<!-- <div class="divider-line-right"></div> -->
<div class="reg-input-email">
    <InputText class="register-input" v-model="mail" placeholder="Email" />
</div>   
<div class="reg-input-password">
    <InputText class="register-input" v-model="password" placeholder="Password." />
</div>
<div class="reg-input-password-repeat">
    <InputText class="register-input" v-model="confirm" placeholder="Confirm passord" />
</div>

                </div>
            </div>  
        </div>       
    </div>
</template>
<script setup>
import { googleTokenLogin } from "vue3-google-login"
import axios from 'axios';
import { useRouter } from "vue-router";
axios.defaults.withCredentials = true; // Include cookies in the request
const loginer = () => {
  const $router = useRouter();
    console.log("loginer")
  googleTokenLogin().then((response) => {
    console.log("Handle the response", response.access_token)
    axios.post('https://diploma-lya6.onrender.com/google/registration', {
      token: response.access_token
    }).then((response) => {
      console.log(response)
      const store = localStorage;

    // Store token and email in local storage
    store.setItem('token', response.data.token);
    store.setItem('email', response.data.email);
    window.location.reload();
    $router.push('/');

    }).catch((error) => {
      console.log(error)
    })
  }).catch((error) => {
    console.log("Handle the error", error)
  })
}

</script>
  <script>
  
  export default {
      name: 'About',
        data() {
            return {
                login:  false,
                register: true,
                mail: '',
                password: '',
                confirm: ''
            }
        },
        methods: {
            redirectToHomePage() {
                this.$router.push('/');
            },
            toLoginForm() {
                this.login = true;
                this.register = false;
            },
            toRegisterForm() {
                this.login = false;
                this.register = true;
            }

        },
      
  }
  </script>
  <style scoped>
 body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Add this line to prevent horizontal scrolling */
}

.header {
    position: absolute ;
    top: 0 ;
    left: 0 ;
    margin-left: -8px;
    margin-top: -8px;
    right: 0 ;
    width: 100vw ;
    height: 45px ;
    background-color: #f9f6a5;
    font-size: 20px ;
    font-weight: 500 ;
    color: #000000 ;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); /* Adjust values as needed */
}
.back-button {
    position: absolute ;
    top: 0 ;
    left: 0 ;
    margin-left: 0px;
    margin-top: 2px; 
    width: 40px ;
    height: 40px ;
    background-color: transparent ;
    border: none;
    outline: none ;
    font-size: 20px ;
    font-weight: 500 ;
    color: #000000 ;
}
.header-text {
    position: absolute ;
    top: 0 ;
    left: 0 ;
    margin-left: 45px;
    margin-top: 8px;    
    height: 40px ;
    background-color: transparent ;
    border: none ;
    outline: none ;
    font-size: 20px t;
    font-weight: 500 ;
    color: #000000 ;
    font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.auth-form {
    display: flex;
    justify-content: center;
}
.login-button {
   
    top: 60px ;    
    margin: 0;  
    width: 160px ;
    height: 40px ;
    background-color: rgba(249, 246, 165, 0.3);
    border: 1px solid black; /* Add 'solid' and specify the color */    
    outline: none ;
    border-radius: 0;
    font-size: 20px ;
    font-weight: 500 t;
    color: #000000 ;
    padding: 10px 50px ;
    font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
    
}
.login-button:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.register-button {
    
    top: 60px ;
    margin: 0;
    margin-left: -1px;
    margin-top: 0px;
    width: 160px ;
    height: 40px ;
    background-color: rgba(249, 246, 165, 0.3);
    border: 1px solid black; /* Add 'solid' and specify the color */    
    outline: none ;
    border-radius: 0;
    font-size: 20px ;
    font-weight: 500 t;
    color: #000000 ;
    padding: 10px 50px ;
    font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */    
    
}
.register-button:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.register-button-text{
    margin-left: -35px;
}
.google-component{
    display: flex;
    justify-content: center;
}
.google{
    position: absolute;
    top: 130px ;
    margin: 0;  
    background: rgba(249, 246, 165, 0.3);
  border: none;
  color: black;    
  border-radius: 50px;
  padding: 10px 40px;
  width: 300px;
  font-family: "Neucha";
}
.google:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.google-button-text{
  margin-left: 18px;
}
.divider-line-left {
  height: 1px;
  background-color: #747070;
  position: absolute;
  top: 200px;
  left: 0;
  margin-left: -16px;
  width: 25%;
}



.label-email{
    position: absolute;
    top: 193px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 20px;
    background-color: white;
    font-size: 12px;
    font-weight: 500;
    color: #000000;
    font-family: "Neucha";

}
.label-email-register{
    position: absolute;
    top: 193px;
    left: 50%;
    transform: translateX(-50%);
    width: 168px;
    height: 20px;
    background-color: white;
    font-size: 12px;
    font-weight: 500;
    color: #000000;
    font-family: "Neucha";
}
.divider-line-right {
    height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  top: 200px;
  right: 0;
  margin-right: -16px;
  width: 25%;
}
.google-button-text-reg{
  margin-left: 8px;
}
.reg-input-email{
    position: absolute;
  top: 220px;
  left: 50%;
  transform: translateX(-40%);
  width: 300px;
  height: 40px;
  background-color: white;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
    
}
.reg-input-password{
    position: absolute;
  top: 270px;
  left: 50%;
  transform: translateX(-40%);
  width: 300px;
  height: 40px;
  background-color: white;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
    
}
.reg-input-password-repeat{
    position: absolute;
  top: 320px;
  left: 50%;
  transform: translateX(-40%);
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
  font-size: small;
} 
.register-input:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}


</style>