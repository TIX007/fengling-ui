<template>
  <div class="fl-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div class="fl-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="fl-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FlCard',
    props: {
      header: {},
      bodyStyle: {},
      shadow: {
        type: String
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "mixins/mixins";
@import "common/var";

@include b(card) {
  border-radius: $--card-border-radius;
  border: 1px solid $--card-border-color;
  background-color: $--color-white;
  overflow: hidden;
  color: $--color-text-primary;
  transition: 0.3s;

  @include when(always-shadow) {
    box-shadow: $--box-shadow-light;
  }

  @include when(hover-shadow) {
    &:hover,
    &:focus {
      box-shadow: $--box-shadow-light;
    }
  }

  @include e(header) {
    padding: #{$--card-padding - 2 $--card-padding};
    border-bottom: 1px solid $--card-border-color;
    box-sizing: border-box;
  }

  @include e(body) {
    padding: $--card-padding;
  }
}

</style>