<template>
  <div class="chat">
    <div class="row">
      <div class="col-sm-4">
        <div v-if="!username">Que apodo Quieres usar?
          <br>
          <input type="text" placeholder="Name" v-on:keyup.enter="updateUsername">
        </div>
        <div v-else>
          Apodo : {{username}}
          <br>-Mensaje-
          <br>
          <textarea
          class="textoFiguras"
            name
            id
            cols="40"
            rows="4"
            placeholder="New Message"
            v-on:keyup.enter="sendMessage"
          ></textarea>
        </div>
      </div>
      <br>
      <div class="col-sm-4">
        <div class="messages">
          <div class="card">
            <div class="card-header">
              <h3>Mensajes</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="message" v-for="message in messages" :key="message.username">
              <li>
                <strong>{{message.username}}</strong>
                : {{message.text}}
              </li>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header">
            <h3>Chat Privado</h3>
          </div>
        </div>
        <div class="card-body">
          <div class="message" v-for="usuario in usuarios" :key="usuario.username">
            <li>
            <router-link :to="{ name: 'chatprivado', params: {nameprivate: usuario.username} }"
            >Con : {{usuario.username}} </router-link>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { database, auth } from "@/fire.js";
export default {
  name: "app",
  data() {
    return {
      username: "",
      messages: [],
      usuarios: null
    };
  },
  methods: {
    updateUsername(e) {
      e.preventDefault();
      if (e.target.value) {
        this.username = e.target.value;
      }
    },
    sendMessage(e) {
      e.preventDefault();
      if (e.target.value) {
        const message = {
          username: this.username,
          text: e.target.value
        };
        //Push message to firebase reference
        database.ref("messages").push(message);
        // To-Do: Push message to firebase
        e.target.value = "";
      }
    }
  },
  mounted() {
    let vm = this;
    const itemsRef = database.ref("messages");
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text
        });
      });
      this.messages = messages;
    });
    let vmm = this;
    const itemsRef1 = database.ref("users");
    itemsRef1.on("value", snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => {
        messages.push({
          username: data[key].username
        });
      });
      this.usuarios = messages;
    });
  }
};
</script>