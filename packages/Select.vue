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
export default {

  name: 'FlSelect',

  componentName: 'FlSelect',

  components: {
    FlInput
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

    deleteSelected(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : '';
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
      this.$emit('clear');
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