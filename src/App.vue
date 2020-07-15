<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row>
          <ul>
            <li v-for="(message, index) in messages" v-bind:key="index" :class="message.owner">{{message.text}}</li>
          </ul>
        </v-row>
        <v-row :style="messageContainerStyles">
          <v-col cols="12" md="12">
            <v-textarea
              filled
              name="input-7-1"
              label="Type your message"
              v-model="input"
              :disabled="!chatStarted">
            </v-textarea>
          </v-col>
          <v-col cols="12" md="12">
            <div class="my-2">
              <v-btn 
                :disabled="ableToSubmitAnswer"
                @click="send" 
                x-large 
                :style="buttonStyles"
                color="primary" 
                dark>
                {{ chatStarted ? 'Send Message' : 'Let\'s chat!' }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { messageHandler } from '@/services/messageHandler'

export default {
  name: 'App',

  data: () => ({
    chatData: {
      name: '',
      age: 0,
      location: '',
      feeling: '',
      hobby: ''
    },
    next: 0,
    input: '',
    loading: false,
    chatStarted: false,
    messages: [],
    currentQuestion: '',
    buttonStyles: {
      position: 'absolute', 
      bottom: 0, 
      right: 0, 
      background: '#56c8d8'
    },
    messageContainerStyles: {
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      padding: '10px', 
      zIndex: 100, 
      background: '#ffffff'
    }
  }),

  methods: {
    send() {
      this.loading = true;

      this.validate()

      this.chatData[this.currentQuestion] = this.input

      messageHandler.sendMessage(this.next)
      .then(receivedData => {
        this.next += receivedData.length

        if (receivedData[receivedData.length - 1].ask) {
          this.currentQuestion = receivedData[receivedData.length - 1].ask
        }

        if (this.chatStarted) {
          const populatedData = this.replaceName(receivedData)

          if (this.input) {
            this.messages.push({
              text: this.input,
              owner: 'me'
            })
          }

          this.messages = [ ...this.messages, ...populatedData ]
        } else {
          this.messages = [ ...this.messages, ...receivedData ]
        }

        if (!this.chatStarted) {
          this.chatStarted = true;
        }
      })
      .catch(e => console.log(e))
      .finally(() => {
        this.loading = false;
        this.input = '';
      })
    },

    validate() {
      if (this.chatStarted && !this.input.trim()) {
        alert('Sorry, I don\'t read in Invisibilish')
        return
      }
    },

    replaceName(data) {
      return data.map(q => ({
        ...q,
        text: q.text.replace('%name%', this.chatData.name)
      }))
    }
  },

  computed: {
    ableToSubmitAnswer() {
      return this.chatStarted && !this.input
    }
  }
};
</script>

<style>
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    left: 0;
    right: 0;
    overflow-y: scroll;
    height:600px;
    z-index: 0;
    padding-bottom: 100px;
  }

  ul li{
    display:inline-block;
    clear: both;
    padding: 20px;
    border-radius: 30px;
    margin-bottom: 2px;
    font-family: Helvetica, Arial, sans-serif;
  }

  .him{
    background: #eee;
    float: left;
  }

  .me{
    float: right;
    background: #0084ff;
    color: #fff;
  }

  .him + .me{
    border-bottom-right-radius: 5px;
  }

  .me + .me{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .me:last-of-type {
    border-bottom-right-radius: 30px;
  }
</style>
