<template>
  <div
    :class="[
      type === 'textarea' ? 'fl-textarea' : 'fl-input',
      {
        'fl-input--suffix': $slots.suffix || showSuffix || suffixIcon,
        'fl-input--prefix': $slots.prefix || prefixIcon,
      },
    ]"
  >
    <template v-if="type !== 'textarea'">
      <input
        class="fl-radio__inner"
        :class="{ 'is-disabled': disabled }"
        :placeholder="placeholder"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :name="name"
        :value="value"
        @input="handleInput"
        :disabled="disabled"
      />
      <!-- 前置内容 -->
      <span class="fl-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="fl-input__icon" v-if="prefixIcon" :class="prefixIcon"> </i>
      </span>
      <!-- 后置内容 -->
      <span class="fl-input__suffix">
        <template v-if="!clearable || !showPassword">
          <slot name="suffix"></slot>
          <i class="fl-input__icon" v-if="suffixIcon" :class="suffixIcon"> </i>
        </template>
        <i
          class="fl-input__icon fl-icon-circle-close"
          v-if="clearable && value"
          @click="clear"
        ></i>
        <i
          class="fl-input__icon fl-icon-view fl-input__clear"
          v-if="showPassword && type"
          @click="handlePassword"
        ></i>
      </span>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="fl-textarea__inner"
      ref="textarea"
      v-bind="$attrs"
      :disabled="disabled"
      :readonly="readonly"
      :style="textareaStyle"
      :placeholder="placeholder"
      :aria-label="label"
    >
    </textarea>
    <span
      v-if="isWordLimitVisible && type === 'textarea'"
      class="fl-input__count"
      >{{ textLength }}/{{ upperLimit }}</span
    >
  </div>
</template>

<script>
import calcTextareaHeight from "./calcTextareaHeight";
import merge from "../src/utils/merge";
export default {
  name: "FlInput",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: Boolean,
    value: {
      type: String,
      default: "",
    },
    label: String,
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    autosize: {
      type: [Boolean, Object],
      default: false,
    },
    size: String,
    resize: String,
    form: String,
    prefixIcon: String,
    suffixIcon: String,
    tabindex: String,
  },
  watch: {
    value(val) {
      this.$nextTick(this.resizeTextarea);
      if (this.validateEvent) {
        this.dispatch("FlFormItem", "fl.form.change", [val]);
      }
    },
    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    nativeInputValue() {
      this.setNativeInputValue();
    },
    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue();
        this.resizeTextarea();
        this.updateIconOffset();
      });
    },
  },
  computed: {
    nativeInputValue() {
      return this.value === null || this.value === undefined
        ? ""
        : String(this.value);
    },
    showSuffix() {
      return this.clearable || this.showPassword;
    },
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, { resize: this.resize });
    },
    isWordLimitVisible() {
      return (
        this.showWordLimit &&
        this.$attrs.maxlength &&
        (this.type === "text" || this.type === "textarea") &&
        !this.disabled &&
        !this.readonly &&
        !this.showPassword
      );
    },
  },
  data() {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      // 显示是否显示密码框
      passwordVisible: false,
    };
  },
  methods: {
    handleBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
      if (this.validateEvent) {
        this.dispatch("FlFormItem", "fl.form.blur", [this.value]);
      }
    },
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    clear() {
      this.$emit("input", "");
    },
    handlePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    resizeTextarea() {
      if (this.$isServer) return;
      const { autosize, type } = this;
      if (type !== "textarea") return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight,
        };
        return;
      }
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaCalcStyle = calcTextareaHeight(
        this.$refs.textarea,
        minRows,
        maxRows
      );
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    calcIconOffset(place) {
      let elList = [].slice.call(
        this.$el.querySelectorAll(`.fl-input__${place}`) || []
      );
      if (!elList.length) return;
      let el = null;
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i];
          break;
        }
      }
      if (!el) return;
      const pendantMap = {
        suffix: "append",
        prefix: "prepend",
      };

      const pendant = pendantMap[place];
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === "suffix" ? "-" : ""}${
          this.$el.querySelector(`.fl-input-group__${pendant}`).offsetWidth
        }px)`;
      } else {
        el.removeAttribute("style");
      }
    },
    updateIconOffset() {
      this.calcIconOffset("prefix");
      this.calcIconOffset("suffix");
    },
  },
  mounted() {
    this.setNativeInputValue();
    this.resizeTextarea();
    this.updateIconOffset();
  },
};
</script>

<style lang="scss" scoped>
@import "common/var.scss";
@import "mixins/mixins";

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
    transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
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
    transition: all 0.3s;
    z-index: 900;

    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

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
    transition: all 0.3s;

    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

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

@include b(textarea) {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: $--font-size-base;

  @include e(inner) {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: $--input-font-color;
    background-color: $--input-background-color;
    background-image: none;
    border: $--input-border;
    border-radius: $--input-border-radius;
    transition: $--border-transition-base;

    &::placeholder {
      color: $--input-placeholder-color;
    }

    &:hover {
      border-color: $--input-hover-border;
    }

    &:focus {
      outline: none;
      border-color: $--input-focus-border;
    }
  }

  & .fl-input__count {
    color: $--color-info;
    background: $--color-white;
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    right: 10px;
  }

  @include when(disabled) {
    .fl-textarea__inner {
      background-color: $--input-disabled-fill;
      border-color: $--input-disabled-border;
      color: $--input-disabled-color;
      cursor: not-allowed;

      &::placeholder {
        color: $--input-disabled-placeholder-color;
      }
    }
  }

  @include when(exceed) {
    .fl-textarea__inner {
      border-color: $--color-danger;
    }

    .fl-input__count {
      color: $--color-danger;
    }
  }
}
</style>
