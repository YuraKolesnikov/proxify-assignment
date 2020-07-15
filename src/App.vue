<template>
  <v-app>
    <navbar />

    <v-content>
      <v-container fluid>
        <v-row>
          <chat-container
            ref="chat"
            :ended="chatEnded"
            :loading="loading"
            :messages="messages" />
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
            <div class="my-2 d-flex justify-end">
              <v-btn 
                :class="{'button-disabled': submitButtonBlocked || chatEnded}"
                @click="send" 
                x-large 
                :style="buttonStyles"
                color="primary" 
                dark>
                {{ buttonTitle }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import ChatContainer from '@/components/ChatContainer'
import { messageHandler } from '@/services/messageHandler'

export default {
  name: 'App',

  components: {
    Navbar,
    ChatContainer
  },

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
    chatEnded: false,
    messages: [],
    currentQuestion: '',
    countdown: null,
    buttonStyles: {
      float: 'right',
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

      if (this.input) {
        this.messages.push({
          text: this.input,
          owner: 'me'
        })
      }

      this.input = ''

      if (!this.chatStarted) {
        this.chatStarted = true
      }

      /* Used just for visual chat simulation */
      setTimeout(() => {
        messageHandler.sendMessage(this.next)
        .then(receivedData => {
          this.next += receivedData.length

          if (receivedData[receivedData.length - 1].ask) {
            this.currentQuestion = receivedData[receivedData.length - 1].ask
          }

          if (this.chatStarted) {
            const populatedData = this.replaceName(receivedData)

            this.messages = [ ...this.messages, ...populatedData ]
          } else {
            this.messages = [ ...this.messages, ...receivedData ]
          }

          if (this.messages[this.messages.length - 1].last) {
            this.chatStarted = false
            this.chatEnded = true
            this.clearCountdown()
          } else {
            this.resetCountdown()
          }
        })
        .catch(e => console.log(e))
        .finally(() => {
          this.loading = false
        })
      }, 2000)
    },

    validate() {
      if (this.chatStarted && !this.input.trim()) {
        alert('Sorry, I don\'t read in Invisibilish');
        return
      }
    },

    replaceName(data) {
      return data.map(q => ({
        ...q,
        text: q.text.replace('%name%', this.chatData.name)
      }))
    },

    resetCountdown() {
      this.clearCountdown()

      this.countdown = setInterval(() => this.sendStillThereAlert(), 15000)
    },

    clearCountdown() {
      if (this.countdown) clearInterval(this.countdown)
    },

    sendStillThereAlert() {
      this.loading = true
      /* Used just for visual chat simulation */
      setTimeout(() => {
        this.loading = false
        this.messages.push({
          text: 'Still here?',
          owner: 'him'
        })
      }, 1500)
    },

    scrollChatToBottom() {
      this.$nextTick(() => {
        this.$refs.chat.$refs.container.scrollTop = this.$refs.chat.$refs.container.scrollHeight
      })
    }
  },

  beforeDestroy() {
    this.clearCountdown()
  },

  computed: {
    submitButtonBlocked() {
      return this.chatStarted && !this.input
    },

    buttonTitle() {
      return this.chatStarted ? 'Send Message' : 'Let\'s chat!'
    }
  },

  watch: {
    messages() {
      const { scrollHeight, clientHeight } = this.$refs.chat.$refs.container
      if (scrollHeight > clientHeight) {
        this.scrollChatToBottom()
      }
    }
  }
};
</script>
<style lang="scss">
.button-disabled {
  pointer-events: none;
  opacity: .5;
  cursor: default;
}
</style>