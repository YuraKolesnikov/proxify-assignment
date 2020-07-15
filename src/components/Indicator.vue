<template>
	<div class="typing-indicator">
		<span></span>
		<span></span>
		<span></span>
	</div>
</template>

<style lang="scss" scoped>
/* 3rd party animated icon.
	https://codepen.io/fusco/pen/XbpaYv */
$ti-color-bg: #E6E7ED;

.typing-indicator {
  background-color: $ti-color-bg;
  will-change: transform;
  width: auto;
  border-radius: 50px;
  padding: 15px;
  display: table;
  margin: 0 auto;
  position: relative;
  animation: 2s bulge infinite ease-out;
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: -2px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: $ti-color-bg;
  }
  &::after {
    height: 10px;
    width: 10px;
    left: -10px;
    bottom: -10px;
  }
  span {
    height: 10px;
    width: 10px;
    float: left;
    margin: 0 1px;
    background-color: #9E9EA1;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        animation: 1s blink infinite ($i * .3333s);
      }
    }
  }
}

@keyframes blink {
  50% {
    opacity: 1;
  }
}

@keyframes bulge {
  50% {
    transform: scale(1.05);
  }
}
</style>