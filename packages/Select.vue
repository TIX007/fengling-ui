<template>
  <div class="fl-select" :class="[selectSize ? 'fl-select--' + selectSize : '']">
    <fl-input ref="reference" v-model="selectedLabel" type="text" placeholder="请输入内容" :name="name" :id="id"
      :size="selectSize" :disabled="disabled" :readonly="readonly">
      <template slot="suffix">
        <i v-show="!showClose" :class="['fl-select__caret', 'fl-input__icon', 'fl-icon-' + iconClass]"></i>
        <i v-if="showClose" class="fl-select__caret fl-input__icon fl-icon-circle-close" @click="handleClearClick"></i>
      </template>
    </fl-input>
    
  </div>
</template>

<script>
import FlInput from './Input.vue'
import FlSelectMenu from './Select-dropdown.vue';
import { getValueByPath, valueEquals, isIE, isEdge } from '../src/utils/util';
export default {

  name: 'FlSelect',

  componentName: 'FlSelect',

  components: {
    FlInput,
    FlSelectMenu
  },

  props: {
    name: String,
    id: String,
    value: {
      required: true
    },
    // autocomplete: {
    //   type: String,
    //   default: 'off'
    // },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      required: false
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    };
  },

  inject: {
    flForm: {
      default: ''
    },

    flFormItem: {
      default: ''
    }
  },

  provide() {
    return {
      'select': this
    };
  },

  watch: {
    propPlaceholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },
  },

  computed: {
    _flFormItemSize() {
      return (this.flFormItem || {}).flFormItemSize;
    },

    readonly() {
      return !this.filterable || this.multiple || (!isIE() && !isEdge() && !this.visible);
    },

    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== '';
      let criteria = this.clearable &&
        !this.selectDisabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    },

    iconClass() {
      return this.remote && this.filterable ? '' : (this.visible ? 'arrow-up is-reverse' : 'arrow-up');
    },

    selectSize() {
      return this.size || this._flFormItemSize || (this.$ELEMENT || {}).size;
    },
  },
  methods: {
    handleClearClick(event) {
      this.deleteSelected(event);
    },
    emitChange(val) {
        if (!valueEquals(this.value, val)) {
          this.$emit('change', val);
        }
      },

    deleteSelected(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : '';
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
      this.$emit('clear');
    },

    getOption(value) {
        let option;
        const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
        const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]';
        const isUndefined = Object.prototype.toString.call(value).toLowerCase() === '[object undefined]';

        for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
          const cachedOption = this.cachedOptions[i];
          const isEqual = isObject
            ? getValueByPath(cachedOption.value, this.valueKey) === getValueByPath(value, this.valueKey)
            : cachedOption.value === value;
          if (isEqual) {
            option = cachedOption;
            break;
          }
        }
        if (option) return option;
        const label = (!isObject && !isNull && !isUndefined)
          ? String(value) : '';
        let newOption = {
          value: value,
          currentLabel: label
        };
        if (this.multiple) {
          newOption.hitState = false;
        }
        return newOption;
      },

      setSelected() {
        if (!this.multiple) {
          let option = this.getOption(this.value);
          if (option.created) {
            this.createdLabel = option.currentLabel;
            this.createdSelected = true;
          } else {
            this.createdSelected = false;
          }
          this.selectedLabel = option.currentLabel;
          this.selected = option;
          if (this.filterable) this.query = this.selectedLabel;
          return;
        }
        let result = [];
        if (Array.isArray(this.value)) {
          this.value.forEach(value => {
            result.push(this.getOption(value));
          });
        }
        this.selected = result;
        this.$nextTick(() => {
          this.resetInputHeight();
        });
      },
  }
}
</script>

<style lang="scss" scoped>
@import "common/var.scss";
@import "mixins/mixins";

.fl-select__caret {
  color: $--select-input-color;
  font-size: $--select-input-font-size;
  transition: transform .3s;
  transform: rotateZ(180deg);

  .is-reverse {
    transform: rotateZ(0deg);
  }

  &:hover {
    color: $--select-close-hover-color;
  }
}
</style>