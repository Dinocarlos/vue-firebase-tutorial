<template>
  <div class="chat">
    <div v-if="!username">Que apodo Quieres usar?
      <br>
      <input type="text" placeholder="Name" v-on:keyup.enter="updateUsername">
    </div>
    <div v-else>
      Apodo : {{username}}
      <br> -Mensaje-
      <br>
    <textarea name id cols="40" rows="4" placeholder="New Message" v-on:keyup.enter="sendMessage"></textarea>
    </div>
    <br>
    <div class="messages">
    <div class="card" >
      <div class="card-header">
        <h3>
            Mensajes 
        </h3>
        </div>
        <div class="card-body">
          <div class="message" v-for="message in messages" :key="message.username">
            <li>
            <strong >{{message.username}}</strong>
            : {{message.text}}
            </li>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { database } from "@/fire.js";
export default {
  name: "app",
  data() {
    return {
      username: "",
      messages: []
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
      vm.messages = messages;
    });

  }
};
</script>