<template>
    <div>
        <div class="header">
      <Button class="back-button" @click="redirectToHomePage">
        <i class="pi pi-chevron-left"></i>
      </Button>
      <div class="header-text">Робочий кабінет</div>
     
      <div v-if="!inRoom" class="chosen-text" >
        Оберіть столик:
        <div class="divider-line1"></div>
        <div style="margin-left: 40px; margin-top: 20px;" v-for="table in tableList" :key="table.table">         
          <div>Столик: № {{table.table}}  <Button v-if="!table.waiter" class="select-button" @click="waiterJoin(table.table)" >Виберіть</Button> </div>     
          <div>Мейл: {{ table.users  }}</div>  
          <div>Замовлення: 
            <div v-for="order in table.orders" :key="order.name">
              <div style="margin-left: 40px;">{{order.name}}</div>           
            </div>
          </div> 
         
          <div class="divider-line2"></div>
        </div>
      </div>
      <div v-if="inRoom" class="chosen-text" >
        Столик №{{ OrderList.table }}
        <div v-for="order in OrderList.orders" :key="order.name">
          <div>{{order.name}}</div>
          
        </div>
       
      </div>
    </div>
    <div v-if="cooking && inRoom" class="status">Готується</div>   
    <Button v-if="ready && inRoom" class="moveToKitchen" @click="paidOrder">
        Сплачено
      </Button>
    <Button v-if="ordered && inRoom" class="moveToKitchen" @click="moveToKitchen">
        Передати на кухню
      </Button>
    </div>
</template>
<script setup>
// import axios from "axios";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import io from 'socket.io-client';
const socket = io("ws://localhost:4000",
{ transports: ['websocket', 'polling', 'flashsocket'] } 
);

const router = useRouter();

const OrderList = ref([]);
const tableList = ref([]);
const inRoom = ref(false);
const cooking = ref(false);
const ordered = ref(false);
const ready = ref(false);
const table = ref("");

socket.on('orderCreated', () => {
    console.log('order created');
    getOrdered();    
  });

onMounted(() => {
  //toast.info('Вітаємо у робочому кабінеті!');
  isInRoom();
  getOrdered()
  getRoomInfo();
});

socket.on('connect', () => {
  console.log('connected');
  isInRoom();
  getOrdered()
  getRoomInfo();  
  // offline.value = false;
});
socket.on('disconnect', () => {
  console.log('disconnected');
  isInRoom();
  getOrdered()
  getRoomInfo();
  // offline.value = true;
});

// const chooseTable = (table) => {
  // socket.emit('chooseTable', table);
  // socket.on('tableChosen', (data) => {
  //   console.log('INFORMATIOn',data);
  //   OrderList.value = data;
  //   inRoom.value = true;
  // });
// };

const isInRoom = () => {
  const data = {
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
  }
  socket.emit('isInRoom', data);
  socket.on('return', (data) => {
    inRoom.value = data;
    console.log('IN ROOM',data);
  });
};

const waiterJoin = (table) => {
  let data = {
    email: localStorage.getItem("email"),
    table: table,
  }
  socket.emit('waiterJoin', data);
  socket.on('waiterJoined', () => {
    isInRoom();
    getOrdered();
    getRoomInfo();
  });
};
socket.on('markedAsReady', () => {
  console.log('markedAsReady');
  isInRoom();
  getOrdered();
  getRoomInfo();
});
socket.on('orderPaid', () => {
    console.log('order paid');
    isInRoom();
  getOrdered();
  getRoomInfo();
  });
  const paidOrder = () => {
  const data = {
    table: table.value,
  };
  console.log('data', data);
  socket.emit('paidOrder', data);
  socket.on('returnPaid', () => {
    console.log('returnPaid');
    toast.success("Замовлення оплачено");
    
    
  });
  socket.on('orderPaid', () => {
    console.log('order paid');
   
  });
}
const getRoomInfo = () => {
  let data = {
    email: localStorage.getItem("email"),    
  }
  socket.emit('getRoomInfo', data);
  socket.on('roomInfo', (data) => {
    console.log('roomInfo',data);
    OrderList.value = data;
    table.value = data.table;
    if(data.status === 'cooking') {
      cooking.value = true;
      ordered.value = false;
      ready.value = false;
    } else if(data.status === 'ordered') {
      ordered.value = true;
      cooking.value = false;
      ready.value = false;
    }else if (data.status === 'ready') {
      ready.value = true;
      cooking.value = false;
      ordered.value = false;
    }
  });
};

const moveToKitchen = () => {
  let data = {
    table: OrderList.value.table,   
  }
  socket.emit('moveToKitchen', data);
  socket.on('movedToKitchen', () => {
    isInRoom();
    getOrdered();
    getRoomInfo();
  });
};

const getOrdered = () => {
  socket.emit('getOrdered', (data) => {
    console.log(data);
  });
  socket.on('orderedOrders', (data) => {
    console.log('INFORMATIOn',data);    
    tableList.value = data;
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
  margin-left: -56px;
  width: 100vw;
}
.select-button {
    position: relative;  
   
   
    
    background-color: #f9f6a5;
    border: none;
    outline: none;
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
.delete-item {
    position: relative;  
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
    color: red
}
.delete-item:focus {
    outline: none; /* Optional: Remove focus outline */
    box-shadow: none;
}
.add-new-food {
    position: relative;  
    top: 0;
    left: 0;
    margin-left: 0px;
    margin-top: 20px;
    
    height: 40px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 30px;
    font-weight: 500;
    color: green;
    font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.add-new-food:focus {
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
  
  text-align: center;
  padding: 10px 20px;
  font-family: "Neucha";
}
</style>