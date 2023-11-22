<template> 
  <div id="app">
    <!-- Your existing content -->
    <div v-if="isMobileDevice">
     <div>
      <Button class="transparent-button" @click="visible = true">
        <i class="pi pi-bars"></i>
      </Button>
      <Button class="user" >
        <i class="pi pi-search"></i>
      </Button>
      <Button class="search" >
        <i class="pi pi-user"></i>
      </Button>
      <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible" class="custom-sidebar" >
        <Button class="cross-button" @click="visible = false">
          <i class="pi pi-times-circle"></i>
        </Button>
        <div>
          <Button class="client-auth-button" >   
            Авторизуватися як клієнт  
      </Button>         
        </div>
        <div class="client-auth-button-text">
          Авторизація як клієнта надасть вам додаткові переваги, доступ до додаткових функцій та спростить процес замовлення та оплати
        </div>
        <div  style="margin-top: 10px;">
          <Button class="staff-auth-button" >   
            Авторизуватися як робітник   
      </Button> 
        
        </div>
        <div class="staff-auth-button-text">
          Авторизуючись як робітник ви автоматично подаєта заяву на співбесіду за нашим керівництвом та створювєте собі тимчасовий кабінет працівника
        </div>
    </Sidebar>
    
</div>
    
  </div>
    </div>
    <div v-else>
      <!-- Content for non-mobile devices -->
    </div>
  </div>
</template>

<script>



export default {
  name: 'App',
  
  data() {
    return {
      isMobileDevice: false,
      visible: false,
    };
  },
  created() {
    this.checkDevice();
  },
  methods: {
    checkDevice() {
      this.isMobileDevice = /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);
      if (!this.isMobileDevice) {
        // Handle non-phone devices
        alert('This application is only available on mobile devices.');
      }
    }

  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Neucha&display=swap');
#app {
  position: relative;
}

.transparent-button {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 0;
  right: 0;
}
.user {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 0;
  right: 50px;
}
.user:focus{
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.search {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 0;
  right: 100px;
}
.search:focus{
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.cross-button {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 10px;
  right: -45px;
}
.cross-button:focus{
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.transparent-button:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none; /* Remove the button shadow on focus */
}
.client-auth-button {
  background: #F9F6A5;
  border: none;
  color: black;
  position: absolute;
  top: 5px;
  border-radius: 50px; 
  padding: 10px 50px;
  font-family: 'Neucha'; /* Use 'Neucha' font and fall back to cursive if not available */
}

.client-auth-button:focus{
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.client-auth-button-text {
  background: rgba(249, 246, 165, 0.3);;
  border: none;
  color: black;
  position: absolute;
  font-size: small;
  top: 50px;
  border-radius: 5px; 
  padding: 10px 40px;
  margin-right: 20px;
  margin-left: 5px;
  font-family: 'Neucha';
}
.staff-auth-button {
  background: #F9F6A5;
  border: none;
  color: black;
  position: absolute;
  top: 159px;
  border-radius: 50px; 
  padding: 10px 40px;
  font-family: 'Neucha';
}
.staff-auth-button:focus{
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none;
}
.staff-auth-button-text {
  background: rgba(249, 246, 165, 0.3);;
  border: none;
  margin-right: 20px;
  margin-left: 5px;
  color: black;
  position: absolute;
  top: 206px;
  font-size: small;
  border-radius: 5px; 
  padding: 10px 40px;
  font-family: 'Neucha';
}
</style>
