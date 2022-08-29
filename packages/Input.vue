<template>
  <div
    :class="[
      type === 'textarea' ? 'fl-textarea' : 'fl-input',
      inputSize ? 'fl-input--' + inputSize : '',
      {
        'fl-input--suffix': $slots.suffix || showSuffix || suffixIcon,
        'fl-input--prefix': $slots.prefix || prefixIcon,
        'fl-input-group': $slots.prepend || $slots.append,
        'fl-input-group--append': $slots.append,
        'fl-input-group--prepend': $slots.prepend,
      },
    ]"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="fl-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        class="fl-input__inner"
        :class="{ 'is-disabled': disabled }"
        :placeholder="placeholder"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :name="name"
        :value="value"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :disabled="disabled"
        :readonly="readonly"
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
      <!-- 后置元素 -->
      <div class="fl-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
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
    _flFormItemSize() {
      return (this.flFormItem || {}).flFormItemSize;
    },
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
    inputSize() {
      return this.size || this._flFormItemSize || (this.$ELEMENT || {}).size;
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
    handleFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
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

  .fl-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    // border: 1px solid #dcdfe6;
    border: $--input-border;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: $--border-transition-base;
    // transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
    width: 100%;

    &:hover {
      border-color: $--input-hover-border;
    }

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
  .fl-input__inner {
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

      &:hover {
        color: $--input-clear-hover-color;
      }

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
  .fl-input__inner {
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

@include b(input) {
  @include m(medium) {
    font-size: $--input-medium-font-size;

    @include e(inner) {
      height: $--input-medium-height;
      line-height: $--input-medium-height;
    }

    .fl-input__suffix {
      line-height: $--input-medium-height;

      .fl-input__icon {
        line-height: $--input-medium-height;
      }
    }
  }

  @include m(small) {
    font-size: $--input-small-font-size;

    @include e(inner) {
      height: $--input-small-height;
      line-height: $--input-small-height;
    }

    .fl-input__suffix {
      line-height: $--input-small-height;

      .fl-input__icon {
        line-height: $--input-small-height;
      }
    }
  }

  @include m(mini) {
    font-size: $--input-mini-font-size;

    @include e(inner) {
      height: $--input-mini-height;
      line-height: $--input-mini-height;
    }

    .fl-input__suffix {
      line-height: $--input-mini-height;

      .fl-input__icon {
        line-height: $--input-mini-height;
      }
    }
  }
}

@include b(input-group) {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  > .fl-input__inner {
    vertical-align: middle;
    display: table-cell;
  }

  @include e((append, prepend)) {
    background-color: $--background-color-base;
    color: $--color-info;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: $--border-base;
    border-radius: $--input-border-radius;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;

    &:focus {
      outline: none;
    }

    .fl-select,
    .fl-button {
      display: inline-block;
      margin: -10px -20px;
    }

    button.fl-button,
    div.fl-select .fl-input__inner,
    div.fl-select:hover .fl-input__inner {
      border-color: transparent;
      background-color: transparent;
      color: inherit;
      border-top: 0;
      border-bottom: 0;
    }

    .fl-button,
    .fl-input {
      font-size: inherit;
    }
  }

  @include e(prepend) {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  @include e(append) {
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  @include m(prepend) {
    .fl-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .fl-select .fl-input.is-focus .fl-input__inner {
      border-color: transparent;
    }
  }

  @include m(append) {
    .fl-input__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .fl-select .fl-input.is-focus .fl-input__inner {
      border-color: transparent;
    }
  }
}
</style>
