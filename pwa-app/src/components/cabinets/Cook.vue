<template>
    <div>
        <div class="header">
      <Button class="back-button" @click="redirectToHomePage">
        <i class="pi pi-chevron-left"></i>
      </Button>
      <div class="header-text">Робочий кабінет</div>
     
      
    </div>
    <div v-if="!inRoom" class="chosen-text" >
        Оберіть столик:
        <div class="divider-line1"></div>
        <div style="margin-left: 40px; margin-top: 20px;" v-for="table in cookings" :key="table.table">         
          <div class="border">    
          <div>Столик: № {{table.table}}  </div>                 
          <div>Замовлення: 
            <div v-for="order in table.orders" :key="order.name">
              <div style="margin-left: 40px;">{{order.name}}</div>     
                  
            </div>
            
          </div>
          <Button v-if="!table.chef" class="select-button" @click="chefJoin(table.table)" >Виберіть</Button>  
         
         </div> 
        </div>
        <div class="divider-line2"></div>
      </div>
      <div v-if="inRoom" class="chosen-text" >
        <div class="border2">
        Столик №{{ order.table }}
        <div>Замовлення:</div>
        <div v-for="order in order.orders" style="margin-left: 40px;" :key="order.name">
          <div>{{order.name}} </div>          
        </div>
       </div>
       
      </div>
    <div v-if="ready && inRoom" class="status">Готово</div>
    <Button v-if="cooking && inRoom" class="moveToKitchen" @click="markAsReady">
        Позначити як готове
      </Button>
    </div>
</template>
<script setup>
// import axios from "axios";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
// import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import io from 'socket.io-client';
const socket = io("wss://diploma-lya6.onrender.com",{
  transports: ['websocket'],
  upgrade: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: Infinity
});

const cookings = ref([]);
const router = useRouter();
const inRoom = ref(false);
const order = ref([]);
const cooking = ref(false);
const ready = ref(false);

onMounted(() => {
  getCookingOrders();
  isChefInRoom();
  getChefInfo();
});

socket.on('connect', () => {
  console.log('connected');
  getCookingOrders();
  isChefInRoom();
  getChefInfo();
  // offline.value = false;
});
socket.on('disconnect', () => {
  console.log('disconnected');
  getCookingOrders();
  isChefInRoom();
  getChefInfo();
  // offline.value = true;
});

socket.on('movedToKitchen', () => {
  console.log('movedToKitchen');
  getCookingOrders();
  isChefInRoom();
  getChefInfo();
});

const getCookingOrders = () => {
  socket.emit('getCooking');
  socket.on('cookingOrders', (data) => {
    console.log(data);
    console.log(cookings)
    cookings.value = data;
  });
};
const markAsReady = () => {
  let info = {    
    table: order.value.table,
  }
  console.log(info);
  socket.emit('markAsReady', info);
  socket.on('markedAsReady', () => {
    ready.value = true;
    cooking.value = false;
    getCookingOrders();
  isChefInRoom();
  getChefInfo();
  });
};

const getChefInfo = () => {
  let info = {
    email: localStorage.getItem("email"),
  }
  socket.emit('getChefInfo', info);
  socket.on('roomInfo', (data) => {
    console.log(data);
    order.value = data;
    if(data.status === 'cooking') {
      cooking.value = true;
      ready.value = false;
    }
    if(data.status === 'ready') {
      ready.value = true;
      cooking.value = false;
    }
  });
};

const chefJoin = (table) => {
  let info = {
    table: table,
    email: localStorage.getItem("email"),
  }
  socket.emit('chefJoin', info);
  socket.on('chefJoined', () => {
    isChefInRoom();
    getCookingOrders();
    getChefInfo();
  });
};

const isChefInRoom = () => {
  let info = {
    email: localStorage.getItem("email"),
  }
  socket.emit('isChefInRoom', info);
  socket.on('return', (data) => {
    console.log(data);
    inRoom.value = data;
  });
};

const redirectToHomePage = () => {
  router.push("/");
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
.select-button {
 
  position: relative;

  background-color: white;
  border: none;
  outline: none;
  margin-top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50px;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}

.select-button:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.moveToKitchen {
    position: fixed;
    bottom: 0;
    left:50%;
    transform: translate(-50%, -50%);
   
    
    height: 40px;
    background-color: #f9f6a5;
    border: none;
    border-radius: 50px;
    outline: none;
    font-size: 20px;
    font-weight: 500;
    color: #000000;
    z-index: 3;
    font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.moveToKitchen:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.status {
  background: #dac2c2;
  border: none;
  color: black;
  position: fixed;

  bottom: 0;
  left:50%;
    transform: translate(-50%, -50%);
  width: 100px;
  border-radius: 50px;
  
  
  padding: 10px 32px;
  font-family: "Neucha";
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
</style>