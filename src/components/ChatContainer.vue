<template>
	<ul ref="chatContainer">
    <li v-for="(message, index) in messages" v-bind:key="index" :class="message.owner">{{message.text}}</li>
  </ul>
</template>
<script>
export default {
	props: {
		messages: Array
	}
}
</script>