<template>
  <div class="chat">
    <div class="row">
      <div class="col-sm-4">
        <div v-if="!username">Que apodo Quieres usar?
          <br>
          <input type="text" placeholder="Name" v-on:keyup.enter="updateUsername">
        </div>
        <div v-else>
          Usuario : {{username}}
          <br>-Mensaje-
          <br>
          <textarea
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
            <h3>Chateando con </h3>
          </div>
        </div>
        <div class="card-body">
            <li>
              {{ide}}   
            </li>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import {database, auth} from "@/fire.js";
export default {
  name: 'app',
  data() {
    return {
      username: '',
      messages: [],
      ide: null
    }
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      if(e.target.value){
        
        const message = {
          username: this.username,
          username2: this.$route.params.nameprivate,
          text: e.target.value
        };
        database.ref('messagesprivates').push(message);
        e.target.value = "";
      }
    }
  },
  mounted(){
    let vm = this;
    this.username = auth.currentUser.email
    this.ide = this.$route.params.nameprivate //taking the param from tag route-link
    const itemsRef = database.ref('messagesprivates');
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => {
      // Making "if" to ask wich username is wich username
       if ((this.username == data[key].username &&  this.ide == data[key].username2)
       || (this.username == data[key].username2 &&  this.ide == data[key].username))
         { 
          messages.push({
            id: key,
            username: data[key].username,
            username2: data[key].username2,
            text: data[key].text
          });
        }
      });
      vm.messages = messages;
      
    })
  }
}
</script>
