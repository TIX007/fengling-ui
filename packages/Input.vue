<template>
  <div class="fl-input" :class="{ 'fl-input--suffix':  $slots.suffix || showSuffix || suffixIcon, 'fl-input--prefix': $slots.prefix || prefixIcon, }">
    <input class="fl-radio__inner" :class="{ 'is-disabled': disabled }" :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :name="name" :value="value"
      @input="handleInput" :disabled=disabled>
    <!-- 前置内容 -->
    <span class="fl-input__prefix" v-if="$slots.prefix || prefixIcon">
      <slot name="prefix"></slot>
      <i class="fl-input__icon" v-if="prefixIcon" :class="prefixIcon">
      </i>
    </span>
    <!-- 后置内容 -->
    <span class="fl-input__suffix">
      <template v-if="!clearable || !showPassword">
        <slot name="suffix"></slot>
        <i class="fl-input__icon" v-if="suffixIcon" :class="suffixIcon">
        </i>
      </template>
      <i class="fl-input__icon fl-icon-circle-close" v-if="clearable && value" @click="clear"></i>
      <i class="fl-input__icon fl-icon-view el-input__clear" v-if="showPassword && type" @click="handlePassword"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "FlInput",
  components: {
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,
    suffixIcon: String,
  },
  watch: {},
  computed: {
    showSuffix() {
      return this.clearable || this.showPassword
    }
  },
  data() {
    return {
      // 显示是否显示密码框
      passwordVisible: false
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    clear() {
      this.$emit('input', '')
    },
    handlePassword() {
      this.passwordVisible = !this.passwordVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.fl-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;

  .fl-radio__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, 045, .355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }

    // input禁用样式
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}

// 后面加suffix的意思是后面如果有后缀的话，触发该样式
.fl-input--suffix {
  .fl-radio__inner {
    padding-right: 30px;
  }

  .fl-input__suffix {
    position: absolute;
    right: 10px;
    height: 100%;
    width: 25px;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    z-index: 900;

    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color .2s cubic-bezier(.645, .045, .355, 1);

      &::after {
        content: "";
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}

.fl-input--prefix {
  .fl-radio__inner {
    padding-left: 30px;
  }

  .fl-input__prefix {
    position: absolute;
    left: 5px;
    height: 100%;
    width: 25px;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;

    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color .2s cubic-bezier(.645, .045, .355, 1);

      &::after {
        content: "";
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>