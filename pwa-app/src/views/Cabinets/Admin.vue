<template>
  <div>
    <div class="header">
      <Button class="back-button" @click="redirectToHomePage">
        <i class="pi pi-chevron-left"></i>
      </Button>
      <div class="header-text">Робочий кабінет</div>
      <div>
        <Button class="edit-menu" @click="redirectToEditMenu">
           Меню
        </Button>
      </div>
      <div class="table">
        <div class="main-divider-line"></div>
        <div v-for="user in demoUsers" :key="user._id">
          <div class="item-name">
            {{ user.workerFirstName }} {{ user.workerLastName }}
          </div>
          <div class="item-email">{{ user.email }}</div>
          <div>
            <Button
              class="accept"
              @click="
                OpenDialog(
                  user.workerFirstName,
                  user.workerLastName,
                  user.email
                )
              "
            >
              Accept
            </Button>
            <Button class="decline" @click="deleteDemo(user.email)"> Decline </Button>
          </div>
          <div class="divider-line1"></div>
        </div>
      </div>
    </div>
    <Dialog
      v-model:visible="dialog"
      modal
      :style="{
        width: '50rem',
        borderRadius: '50px',
        background: '#f9f6a5',
        marginTop: '20px',
      }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :showHeader="false"
      :showCloseIcon="false"
    >
      <div class="item-name2">{{ dialogUserName }}</div>
      <div class="item-email2">{{ dialogUserEmail }}</div>
      <Dropdown
        v-model="selectedRole"
        :options="roles"
        optionLabel="name"
        placeholder="Виберіть роль"
        :style="{ width: '100%' }"
      />
      <div>
        <Button class="decline2" @click="decline"> Decline </Button>
        <Button class="accept2" @click="acceptUserToRestuarant">
          Accept
        </Button>
      </div>
    </Dialog>
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const demoUsers = ref([]);
const dialog = ref(false);
const dialogUserName = ref("");
const dialogUserEmail = ref("");
const selectedRole = ref(null);
const roles = [{ name: "Адмін" }, { name: "Офіціант" }, { name: "Кухар" }, { name: "Шеф-кухар" }];
const router = useRouter();
onMounted(() => {
  getDemoUsers();
});
const redirectToHomePage = () => {
  router.push("/");
};
const acceptUserToRestuarant = () => {
  let temp;
  console.log(selectedRole.value.name);
  if (selectedRole.value.name == "Адмін") {
    temp = "admin";
  } else if (selectedRole.value.name == "Офіціант") {
    temp = "waiter";
  } else if (selectedRole.value.name == "Кухар") {
    temp = "cook";
  } else if (selectedRole.value.name == "Шеф-кухар"){
    temp = "chef"; 
  } else {
    toast.error("Виберіть роль");
    return;
  }
  axios
    .post("https://diploma-lya6.onrender.com/role/editing", {
      adminEmail: localStorage.getItem("email"),
      workerEmail: dialogUserEmail.value,
      newRole: temp,
    })
    .then((response) => {
      console.log(response.data);
      getDemoUsers();
      selectedRole.value = null;
      dialog.value = false;
    })
    .catch((error) => {
      console.log(error);     
      selectedRole.value = null;
      dialog.value = false;
      toast.error("Щось пішло не так");
    });
};
const decline = () => {
  selectedRole.value = null;
  dialog.value = false;
};
const getDemoUsers = () => {
  axios
    .get(
      `https://diploma-lya6.onrender.com/get/demo/workers/data/${localStorage.getItem(
        "email"
      )}`
    )
    .then((response) => {
      console.log(response.data);
      demoUsers.value = response.data.data;
      console.log(response.data.data);
      console.log(demoUsers.value);
    })
    .catch((error) => {
      console.log(error);
    });
};
const OpenDialog = (first, last, email) => {
  dialog.value = true;
  dialogUserName.value = first + " " + last;
  dialogUserEmail.value = email;
};
const deleteDemo = (email) => {
    axios
        .post("https://diploma-lya6.onrender.com/delete/demo/worker", {
        adminEmail: localStorage.getItem("email"),
        workerEmail: email,
        })
        .then((response) => {
        console.log(response.data);
        toast.success("Юзера видалено");
        getDemoUsers();
        dialog.value = false;
        })
        .catch((error) => {
        console.log(error);
        dialog.value = false;
        toast.error("Щось пішло не так");
        });
    };
const redirectToEditMenu = () => {
  router.push("/workerSpace/editMenu");
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
.main-divider-line {
  /* Styles for the divider line */
  height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  margin-left: 0px;
  width: 100vw;
  top: 30px;
}
.table {
  position: absolute;
  top: 110px;
  left: 0; /* Adjust as needed */
  right: 0; /* Adjust as needed */
  width: 100%; /* Set width to 100% to cover the whole page */
  /* Add other styling properties as needed */
}

.divider-line1 {
  /* Styles for the divider line */
  height: 1px; /* Same as the line height */
  background-color: #747070;
  position: absolute;
  margin-left: 0px;
  margin-top: 30px;
  width: 100vw;
}
.item-name {
  /* Styles for the item name */
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-left: 30px;
  margin-top: 50px;

  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.item-email {
  /* Styles for the item name */
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-left: 30px;
  margin-top: 0px;

  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.accept {
  background: #f9f6a5;
  border: none;
  color: black;
  position: absolute;

  width: 100px;
  border-radius: 50px;
  right: 25px;
  margin-top: 20px;
  padding: 10px 30px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.accept:focus {
  outline: none;
  box-shadow: none;
}
.decline {
  background: #f9f6a5;
  border: none;
  color: black;  
  width: 100px;
  border-radius: 50px;
  margin-left: 20px;
  margin-top: 20px;
  padding: 10px 30px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.decline:focus {
  outline: none;
  box-shadow: none;
}
.item-name2 {
  /* Styles for the item name */
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-left: 30px;
  margin-top: 0px;

  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.item-email2 {
  /* Styles for the item name */
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-left: 30px;
  margin-top: 0px;

  font-family: "Neucha"; /*/* Use 'Neucha' font and fall back to cursive if not available */
}
.accept2 {
  background: white;
  border: none;
  color: black;
  position: absolute;

  width: 100px;
  border-radius: 50px;
  right: 25px;
  margin-top: 20px;
  padding: 10px 30px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.accept2:focus {
  outline: none;
  box-shadow: none;
}
.decline2 {
  background: white;
  border: none;
  color: black;  
  width: 100px;
  border-radius: 50px;

  margin-top: 20px;
  padding: 10px 30px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.decline2:focus {
  outline: none;
  box-shadow: none;
}
.edit-menu {
  background: #f9f6a5;
  border: none;
  color: black;
  position: absolute;
  top: 60px;
  border-radius: 20px;
  margin-right: 10px;
  width: 290px;
  height: 70px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 110px;
  font-size: 30px;
  font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
.edit-menu:focus {
  outline: none;
  box-shadow: none;
}
</style>
