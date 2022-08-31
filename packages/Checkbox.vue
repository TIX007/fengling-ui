<template>
  <label class="fl-checkbox"
    :class="[{ 'is-disabled': isDisabled }, { 'is-indeterminate': indeterminate }, { ' is-checked': isChecked }]"
    :id="id">
    <!-- <span class="fl-checkbox__input" :class="{ 'is-disabled': isDisabled }">
      <span class="fl-checkbox__inner"></span>
      <input type="checkbox" class="fl-checkbox__original" :disabled="isDisabled" :name="name" v-model="model"
        :value="label">
    </span> -->
    <input v-if="trueLabel || falseLabel" type="checkbox" :aria-hidden="indeterminate ? 'true' : 'false'"
      :disabled="isDisabled" class="fl-checkbox__original" :name="name" v-model="model" :value="label"
      :true-value="trueLabel" :false-value="falseLabel" @change="handleChange" @focus="focus = true"
      @blur="focus = false">
    <input v-else class="fl-checkbox__original" type="checkbox" :aria-hidden="indeterminate ? 'true' : 'false'"
      :disabled="isDisabled" :value="label" :name="name" v-model="model" @change="handleChange" @focus="focus = true"
      @blur="focus = false">
    <span class="fl-checkbox__inner" :class="{
      'is-disabled': isDisabled,
      'is-checked': isChecked,
      'is-indeterminate': indeterminate,
      'is-focus': focus
    }" :tabindex="indeterminate ? 0 : false" :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"></span>
    <span class="fl-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">
        {{ label }}
      </template>
    </span>
  </label>
</template>

<script>
import Emitter from '../src/mixins/emitter';
export default {
  name: "FlCheckbox",
  mixins: [Emitter],
  componentName: 'FlCheckbox',
  // inject: {
  //   CheckboxGroup: {
  //     default: ''
  //   }
  // },
  inject: {
    flForm: {
      default: ''
    },
    flFormItem: {
      default: ''
    }
  },
  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },
  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    border: Boolean,
    size: String
  },

  computed: {
    model: {
      get() {
        // return this.isGroup ? this.CheckboxGroup.value : this.value
        return this.isGroup
          ? this.store : this.value !== undefined
            ? this.value : this.selfModel;
      },
      set(val) {
        // this.isGroup ? this.CheckboxGroup.$emit('input', value) : this.$emit('input', value)
        // console.log(val)
        if (this.isGroup) {
          this.isLimitExceeded = false;
          (this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (this.isLimitExceeded = true));

          (this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (this.isLimitExceeded = true));

          this.isLimitExceeded === false &&
            this.dispatch('FlCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },
    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled || this.disabled || (this.flForm || {}).disabled || this.isLimitDisabled
        : this.disabled || (this.flForm || {}).disabled;
    },
    isGroup() {
      // return !!this.CheckboxGroup
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'FlCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    isChecked() {
      // 如果十group包裹，判断label是否在model中
      // 如果没有group包裹,直接使用model
      // return this.isGroup ? this.model.includes(this.label) : this.model
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },

    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled() {
      const { max, min } = this._checkboxGroup;
      return !!(max || min) &&
        (this.model.length >= max && !this.isChecked) ||
        (this.model.length <= min && this.isChecked);
    },
    _flFormItemSize() {
      return (this.flFormItem || {}).flFormItemSize;
    },

    checkboxSize() {
      const temCheckboxSize = this.size || this._flFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup
        ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
        : temCheckboxSize;
    }
  },
  methods: {
    addToStore() {
      if (
        Array.isArray(this.model) &&
        this.model.indexOf(this.label) === -1
      ) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      if (this.isLimitExceeded) return;
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch('FlCheckboxGroup', 'change', [this._checkboxGroup.value]);
        }
      });
    }
  },
  created() {
    this.checked && this.addToStore();
  },
  mounted() { // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls);
    }
  },
  watch: {
    value(value) {
      this.dispatch('FlFormItem', 'fl.form.change', value);
    }
  }
}
</script>

<style lang="scss" scoped>

@import "common/var.scss";
@import "mixins/mixins";
@import "mixins/utils";

.fl-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: 30px;

  &:hover {
    .fl-checkbox__inner {
      border-color: $--checkbox-input-border-color-hover;
      transition: border-color .2s linear;
    }
  }

  .fl-checkbox__original {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    outline: 0;
    appearance: none;
  }

  // .fl-checkbox__input {
  //   white-space: nowrap;
  //   cursor: pointer;
  //   outline: none;
  //   display: inline-block;
  //   line-height: 1;
  //   position: relative;
  //   vertical-align: middle;

  //   .fl-checkbox__inner {
  //     display: inline-block;
  //     position: relative;
  //     border: 1px solid #dcdfe6;
  //     border-radius: 2px;
  //     box-sizing: border-box;
  //     width: 14px;
  //     height: 14px;
  //     background-color: #fff;
  //     z-index: 1;
  //     transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s, cubic-bezier(.71, -.46, .29, 1.46);

  //     &:after {
  //       box-sizing: content-box;
  //       content: '';
  //       border: 1px solid #ffffff;
  //       border-left: 0;
  //       border-top: 0;
  //       height: 7px;
  //       left: 4px;
  //       position: absolute;
  //       top: 1px;
  //       transform: rotate(45deg) scaleY(0);
  //       width: 3px;
  //       transition: transform .15s ease-in .05s;
  //       transform-origin: center;
  //     }
  //   }

  //   .fl-checkbox__original {
  //     opacity: 0;
  //     outline: none;
  //     position: absolute;
  //     left: 10px;
  //     margin: 0;
  //     width: 0;
  //     height: 0;
  //     z-index: -1;
  //   }
  // }

  .fl-checkbox__inner {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    background-color: #fff;
    box-sizing: border-box;

    &:after {
      content: "";
      position: absolute;
      opacity: 0;
      box-sizing: border-box;
    }
  }

  .fl-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
  }
}

// 选中的样式
@include when(checked) {
  .fl-checkbox__inner {
    background-color: $--checkbox-checked-background-color;
    border-color: $--checkbox-checked-input-border-color;

    &::after {
      opacity: 1;
      top: 6px;
      left: 3px;
      width: 5px;
      height: 9px;
      border: 2px solid #fff;
      border-radius: 0 0 1px;
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) scale(1) translate(-50%, -50%);
      background: transparent;
    }
  }

  &+.fl-checkbox__label {
    color: $--checkbox-checked-font-color;
  }
}

@include when(focus) {

  /*focus时 视觉上区分*/
  .fl-checkbox__inner {
    border-color: $--checkbox-input-border-color-hover;
  }
}

@include when(indeterminate) {
  .fl-checkbox__inner {
    background-color: $--checkbox-checked-background-color;
    border-color: $--checkbox-checked-input-border-color;

    &::after {
      opacity: 1;
      width: 16px;
      height: 4px;
      left: -1px;
      right: 0;
      top: 5px;
      border: unset;
      transform: scale(.5);
      background-color: $--checkbox-checked-icon-color;

    }
  }
}

// 禁用样式
@include when(disabled) {
  cursor: not-allowed;

  .fl-checkbox__inner {
    background-color: $--checkbox-disabled-input-fill;
    border-color: $--checkbox-disabled-border-color;
    cursor: not-allowed;

    &::after {
      cursor: not-allowed;
      border-color: $--checkbox-disabled-icon-color;
    }

    &+.fl-checkbox__label {
      cursor: not-allowed;
    }
  }
    &:hover {
      .fl-checkbox__inner {
        border-color: $--checkbox-disabled-border-color;
      }
    }

  &.is-checked {
    .fl-checkbox__inner {
      background-color: $--checkbox-disabled-checked-input-fill;
      border-color: $--checkbox-disabled-checked-input-border-color;

      &::after {
        border-color: $--checkbox-disabled-checked-icon-color;
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
      }
    }
  }

  &.is-indeterminate {
    .fl-checkbox__inner {
      background-color: $--checkbox-disabled-checked-input-fill;
      border-color: $--checkbox-disabled-checked-input-border-color;

      &::after {
        background-color: $--checkbox-disabled-checked-icon-color;
        border-color: $--checkbox-disabled-checked-icon-color;
      }
    }
  }

  &+span.fl-checkbox__label {
    color: $--disabled-color-base;
    cursor: not-allowed;
  }
}
</style>