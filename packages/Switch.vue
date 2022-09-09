<template>
  <div class="fl-switch" :class="{ 'is-checked': value }" @click="handleClick">
    <!-- <span class="fl-switch_core" ref="core">
      <span class="fl-switch_button"></span>
    </span> -->
    <input type="checkbox" class="fl-switch_input" @change="handleChange" :name="name" ref="input">
    <span
      :class="['fl-switch__label', 'fl-switch__label--left', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText">
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>
    <span class="fl-switch_core" ref="core" :style="{ 'width': coreWidth + 'px' }">
      <span class="fl-switch_button"></span>
    </span>
    <span
      :class="['fl-switch__label', 'fl-switch__label--right', checked ? 'is-active' : '']"
      v-if="activeIconClass || activeText">
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "FlSwitch",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      defualt: ''
    },
    inactiveColor: {
      type: String,
      defualt: ''
    },
    activeIconClass: {
        type: String,
        default: ''
      },
      inactiveIconClass: {
        type: String,
        default: ''
      },
      activeValue: {
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: false
      },
    activeText: String,
    inactiveText: String,
    name: {
      type: String,
      defualt: ''
    }
  },
  data() {
      return {
        coreWidth: this.width
      };
    },
  mounted() {
    // 修改开关颜色
    this.setColor()
    // 控制checkbox的值,input值同步value值
    this.$refs.input.checked = this.value
    /* istanbul ignore if */
      this.coreWidth = this.width || 40;
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      this.$refs.input.checked = this.checked;
  },
  watch: {
    'value'(e) {
      // 修改开关颜色
      this.setColor()
    },
    checked() {
        this.$refs.input.checked = this.checked;
        if (this.activeColor || this.inactiveColor) {
          this.setBackgroundColor();
        }
        if (this.validateEvent) {
          this.dispatch('FlFormItem', 'el.form.change', [this.value]);
        }
      }
  },
  computed: {
      checked() {
        return this.value === this.activeValue;
      },
      switchDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },
  methods: {
    handleChange(event) {
        const val = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', val);
        this.$emit('change', val);
        this.$nextTick(() => {
          // set input's checked property
          // in case parent refuses to change component's value
          if (this.$refs.input) {
            this.$refs.input.checked = this.checked;
          }
        });
      },
    async handleClick() {
      this.$emit('input', !this.value)
      // 点击的时候，还需要修改背景颜色
      // 等待value发生了改变再setColor
      console.log(this.value)
      // 数据修改后，等待DOM更新再修改按钮更新
      await this.$nextTick()
      this.setColor()
      // 控制checkbox的值,input值同步value值
    this.$refs.input.checked = this.value
    },
    setColor() {
      // 修改开关颜色
      if (this.activeColor || this.inactiveColor) {
        var color = !this.value ? this.activeColor : this.inactiveColor
        this.$refs.core.style.borderColor = color
        this.$refs.core.style.backgroundColor = color
      }
    },
    setBackgroundColor() {
        let newColor = this.checked ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },
  },
}
</script>

<style lang="scss" scoped>
  @import "mixins/mixins";
@import "common/var";
.fl-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
  .fl-switch_core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    .fl-switch_button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}
// 选中样式
.is-checked {
  .fl-switch_core {
    border-color: #409eff;
    background-color: #409eff;
    .fl-switch_button {
      transform: translateX(20px);
    }
  }
}
// 隐藏input标签
.fl-switch_input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
}

@include e(label) {
    transition: .2s;
    height: $--switch-height;
    display: inline-block;
    font-size: $--switch-font-size;
    font-weight: 500;
    cursor: pointer;
    vertical-align: middle;
    color: $--color-text-primary;

    @include when(active) {
      color: $--color-primary;
    }

    @include m(left) {
      margin-right: 10px;
    }
    @include m(right) {
      margin-left: 10px;
    }
    & * {
      line-height: 1;
      font-size: $--switch-font-size;
      display: inline-block;
    }
  }

.fl-switch__label--left {
    margin-right: 10px;
}
.fl-switch__label--right {
    margin-left: 10px;
}
</style>