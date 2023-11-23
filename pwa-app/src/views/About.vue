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
                <div v-if="login">
                    <GoogleLogin  :callback="callback"/>
                </div>
                <div v-if="register">
                    
                </div>
            </div>  
        </div>       
    </div>
</template>
<script setup>
const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}
</script>
  <script>
  
  export default {
      name: 'About',
        data() {
            return {
                login:  true,
                register: false
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
    position: absolute t;
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

</style>