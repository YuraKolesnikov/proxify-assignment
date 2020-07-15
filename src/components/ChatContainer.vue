<template>
	<ul ref="container">
    <li v-for="(message, index) in messages" v-bind:key="index" :class="message.owner">{{message.text}}</li>
		<li class="indicator" v-if="loading">
			<typing-indicator />
		</li>
    <li class="indicator" v-if="ended">
      <p class="text-small">Bot felt bored and has left the chat</p>
    </li>
  </ul>
</template>
<script>
import TypingIndicator from '@/components/Indicator'
export default {
	components: {
		TypingIndicator
	},
	props: {
		messages: Array,
		loading: Boolean,
    ended: Boolean
	}
}
</script>
<style lang="scss">
	ul {
    display: flex;
    flex-flow: column;
    width: 100%;
    list-style: none;
    overflow: auto;
    height: 600px;
    z-index: 0;
    padding: {
      left: 24px;
      right: 24px;
      bottom: 100px;
      top: 50px;
    }
  }

  ul li {
    padding: 20px;
    border-radius: 30px;
    margin-bottom: 2px;
    font-family: Helvetica, Arial, sans-serif;
		transition: opacity .5s ease;
  }

  .him,
	.indicator {
    align-self: flex-start;
  }

	.him {
		background: #eee;
	}

  .me {
    align-self: flex-end;
    background: #0084ff;
    color: #fff;
  }

  .him + .me {
    border-bottom-right-radius: 5px;
  }

  .me + .me {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .me:last-of-type {
    border-bottom-right-radius: 30px;
  }

  .text-small {
    color: #999;
    margin: 0;
    padding: 0;
    font-size: 12px;
  }
</style>