<template>
  <div class="user">
    <img :src="require('@/assets/user.png')" alt="user profile image" srcset="" />
    <p>Gauthier Drewitt</p>
  </div>
</template>
<style lang="scss">
.user {
  display: flex;
  align-items: center;
  img {
    margin-right: 2.2rem;
  }
  p {
    color: $gray-black;
    letter-spacing: 0.035em;
    line-height: 19px;
    @include font-regular;
  }
}
</style>
