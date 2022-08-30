<template>
  <ul class="fl-select-group__wrap" v-show="visible">
    <li class="fl-select-group__title">{{ label }}</li>
    <li>
      <ul class="fl-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from '../src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'FlOptionGroup',

    componentName: 'FlOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('FlOption', 'handleGroupDisabled', val);
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('FlOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "mixins/mixins";
@import "common/var";

@include b(select-group) {
  $gap: 20px;

  margin: 0;
  padding: 0;

  @include e(wrap) {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;

    &:not(:last-of-type) {
      padding-bottom: 24px;

      &::after {
        content: '';
        position: absolute;
        display: block;
        left: $gap;
        right: $gap;
        bottom: 12px;
        height: 1px;
        background: $--border-color-light;
      }
    }
  }

  @include e(title) {
    padding-left: $gap;
    font-size: $--select-group-font-size;
    color: $--select-group-color;
    line-height: $--select-group-height;
  }

  & .fl-select-dropdown__item {
    padding-left: $gap;
  }
}
</style>
