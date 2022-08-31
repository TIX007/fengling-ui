<template>
  <div
    class="fl-select-dropdown fl-popper"
    :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth }">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  import Popper from '../src/utils/vue-popper';

  export default {
    name: 'FlSelectDropdown',

    componentName: 'FlSelectDropdown',

    mixins: [Popper],

    props: {
      placement: {
        default: 'bottom-start'
      },

      boundariesPadding: {
        default: 0
      },

      popperOptions: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },

      visibleArrow: {
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        minWidth: ''
      };
    },

    computed: {
      popperClass() {
        return this.$parent.popperClass;
      }
    },

    watch: {
      '$parent.inputWidth'() {
        this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
      }
    },

    mounted() {
      this.referenceElm = this.$parent.$refs.reference.$el;
      this.$parent.popperElm = this.popperElm = this.$el;
      this.$on('updatePopper', () => {
        if (this.$parent.visible) this.updatePopper();
      });
      this.$on('destroyPopper', this.destroyPopper);
    }
  };
</script>

<style lang="scss" scoped>
@import "mixins/mixins";
@import "common/var";

@include b(select-dropdown) {
  position: absolute;
  z-index: #{$--index-top + 1};
  border: $--select-dropdown-border;
  border-radius: $--border-radius-base;
  background-color: $--select-dropdown-background;
  box-shadow: $--select-dropdown-shadow;
  box-sizing: border-box;
  margin: 5px 0;

  @include when(multiple) {
    & .el-select-dropdown__item {
      padding-right: 40px;
    }
    & .el-select-dropdown__item.selected {
      color: $--select-option-selected-font-color;
      background-color: $--select-dropdown-background;

      &.hover {
        background-color: $--select-option-hover-background;
      }

      &::after {
        position: absolute;
        right: 20px;
        font-family: 'element-icons';
        content: "\e6da";
        font-size: 12px;
        font-weight: bold;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
  }

  .el-scrollbar.is-empty .el-select-dropdown__list{
    padding: 0;
  }
}

@include b(select-dropdown__empty) {
  padding: $--select-dropdown-empty-padding;
  margin: 0;
  text-align: center;
  color: $--select-dropdown-empty-color;
  font-size: $--select-font-size;
}

@include b(select-dropdown__wrap) {
  max-height: $--select-dropdown-max-height;
}

@include b(select-dropdown__list) {
  list-style: none;
  padding: $--select-dropdown-padding;
  margin: 0;
  box-sizing: border-box;
}

@include b(popper) {
  .popper__arrow,
  .popper__arrow::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  .popper__arrow {
    border-width: $--popover-arrow-size;
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03))
  }

  .popper__arrow::after {
    content: " ";
    border-width: $--popover-arrow-size;
  }

  &[x-placement^="top"] {
    margin-bottom: #{$--popover-arrow-size + 6};
  }

  &[x-placement^="top"] .popper__arrow {
    bottom: -$--popover-arrow-size;
    left: 50%;
    margin-right: #{$--tooltip-arrow-size / 2};
    border-top-color: $--popover-border-color;
    border-bottom-width: 0;

    &::after {
      bottom: 1px;
      margin-left: -$--popover-arrow-size;
      border-top-color: $--popover-background-color;
      border-bottom-width: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: #{$--popover-arrow-size + 6};
  }

  &[x-placement^="bottom"] .popper__arrow {
    top: -$--popover-arrow-size;
    left: 50%;
    margin-right: #{$--tooltip-arrow-size / 2};
    border-top-width: 0;
    border-bottom-color: $--popover-border-color;

    &::after {
      top: 1px;
      margin-left: -$--popover-arrow-size;
      border-top-width: 0;
      border-bottom-color: $--popover-background-color;
    }
  }

  &[x-placement^="right"] {
    margin-left: #{$--popover-arrow-size + 6};
  }

  &[x-placement^="right"] .popper__arrow {
    top: 50%;
    left: -$--popover-arrow-size;
    margin-bottom: #{$--tooltip-arrow-size / 2};
    border-right-color: $--popover-border-color;
    border-left-width: 0;

    &::after {
      bottom: -$--popover-arrow-size;
      left: 1px;
      border-right-color: $--popover-background-color;
      border-left-width: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: #{$--popover-arrow-size + 6};
  }

  &[x-placement^="left"] .popper__arrow {
    top: 50%;
    right: -$--popover-arrow-size;
    margin-bottom: #{$--tooltip-arrow-size / 2};
    border-right-width: 0;
    border-left-color: $--popover-border-color;

    &::after {
      right: 1px;
      bottom: -$--popover-arrow-size;
      margin-left: -$--popover-arrow-size;
      border-right-width: 0;
      border-left-color: $--popover-background-color;
    }
  }
}

</style>