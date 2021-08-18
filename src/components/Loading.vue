<template>
  <div class="loading-container">
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  flex: 1;
  width: 100%;
  height: 100%;

  span {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background: lightgray;
    animation-name: dotsAnimation;
    animation-duration: 0.8s;

    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;

    &:nth-child(2) {
      animation-delay: 0.2667s;
    }

    &:nth-child(3) {
      animation-delay: 0.5334s;
    }
  }
}

@keyframes dotsAnimation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(0.625rem);
    background: #aa8cc9;
  }

  100% {
    transform: translateY(0);
    background: lightgray;
  }
}
</style>
