<template>
    <div id="auth">
        <div class="header">
            <Button class="back-button" @click="redirectToHomePage">
                <i class="pi pi-chevron-left"></i>
            </Button>
            <div class="header-text">
            Авторизація робітника
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
              
<div class="log-input-email">
    <InputText class="register-input" v-model="email" placeholder="Email"   />
</div>   
<div class="log-input-password">
    <InputText class="register-input" v-model="password" placeholder="Password" type="password" />
</div>
<div>
              <Button class="logclient-button" @click="loginClient">
                <div class="regclient-button-text">
                  Авторизуватися
                </div>
              </Button>
            </div>
                </div>
                <div class="google-component" v-if="register">
                      
<div class="reg-input-userName">
    <InputText class="register-input" v-model="userName" placeholder="First name"   />
</div>  
<div class="reg-input-userName2">
    <InputText class="register-input" v-model="userName2" placeholder="Second name"   />
</div>
<div class="reg-input-email">
    <InputText class="register-input" v-model="email" placeholder="Email"   />
</div>   
<div class="reg-input-password">
    <InputText class="register-input" v-model="password" placeholder="Password" type="password" />
</div>
<div class="reg-input-password-repeat">
    <InputText class="register-input" v-model="confirm" placeholder="Confirm passord" type="password"  />
</div>
<div>
              <Button class="regclient-button" @click="registerClient">
                <div class="regclient-button-text">
                  Зареєструватися
                </div>
              </Button>
            </div>

                </div>
            </div>  
        </div>       
    </div>
</template>
<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const login = ref(true);
const register = ref(false);
const userName = ref('');
const userName2 = ref('');
const email = ref('');
const password = ref('');
const confirm = ref('');
const router = useRouter();
axios.defaults.withCredentials = true; // Include cookies in the request

const redirectToHomePage = () => {
  router.push('/');
};

const toLoginForm = () => {
  login.value = true;
  register.value = false;
  userName.value = '';
  email.value = '';
  password.value = '';
  confirm.value = '';
};

const toRegisterForm = () => {
  login.value = false;
  register.value = true;
  userName.value = '';
  email.value = '';
  password.value = '';
  confirm.value = '';
};


const registerClient = () => {  
      if (!userName.value || !email.value || !password.value || !confirm.value || !userName2.value) {
        toast.error('Please fill in all fields.');
        return;
      }
      if (password.value !== confirm.value) {
        toast.error('Passwords do not match.');
        return;
      }
      axios.post('https://diploma-lya6.onrender.com/selfRegistrationWorker', {
        workerFirstName: userName.value,
        workerLastName: userName2.value,
        email: email.value,
        password: password.value,
        duplicatePassword: confirm.value,
      }).then((response) => {
        console.log(response)
        const store = localStorage;

        // Store token and email in local storage
        store.setItem('token', response.data.token);
        store.setItem('email', email.value);
        store.setItem('role', 'staff')
        
        router.push('/');
      }).catch((error) => {
         if(error.response.status === 401){
          toast.error('Email already exists');
         }else{
          toast.error('Something went wrong. Please try again.');
         }
      }) 
    }
    const loginClient = () => {  
      if ( !email.value || !password.value ) {
        toast.error('Please fill in all fields.');
        return;
      }     
      axios.post('https://diploma-lya6.onrender.com/login/with/password/worker', {
        email: email.value,
        password: password.value,        
      },{
  withCredentials: true,
}).then((response) => {
        console.log(response)
        const store = localStorage;

        // Store token and email in local storage
        store.setItem('token', response.data.token);
        store.setItem('email', email.value);
        store.setItem('role', 'staff')
        
        router.push('/');
      }).catch((error) => {
        if (error.response.status === 401) {
          toast.error('This email is not registered. Please register first.');
        }else if(error.response.status === 405){
          toast.error('Something went wrong. Please try again.');
        }else if(error.response.status === 402){
          toast.error('Wrong password');
        }else if(error.response.status === 403){
          toast.error('Something went wrong. Please try again.');
        }else{
          toast.error('Something went wrong. Please try again.');
        }
      }) 
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
  transform: translateX(-50%);
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
  transform: translateX(-50%);
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
  transform: translateX(-50%);
  width: 300px;
  height: 40px;
  background-color: white;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha";
    
}
.reg-input-userName{
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
.reg-input-userName2{
  position: absolute;
  top: 170px;
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
  color: #000;
  font-size: small;
} 
.register-input:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.regclient-button{
    position: absolute;
    top: 380px;
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
.regclient-button:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.regclient-button-text{
    margin-left: 40px;
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
  top: 170px;
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
.logclient-button{
    position: absolute;
    top: 230px;
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
.logclient-button:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}

</style>