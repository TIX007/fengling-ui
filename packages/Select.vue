<template>
  <div
    class="fl-select"
    :class="[selectSize ? 'fl-select--' + selectSize : '']"
  >
    <fl-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      placeholder="请输入内容"
      :name="name"
      :id="id"
      :size="selectSize"
      :disabled="disabled"
      :readonly="readonly"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template slot="suffix">
        <i
          v-show="!showClose"
          :class="[
            'fl-select__caret',
            'fl-input__icon',
            'fl-icon-' + iconClass,
          ]"
        ></i>
        <i
          v-if="showClose"
          class="fl-select__caret fl-input__icon fl-icon-circle-close"
          @click="handleClearClick"
        ></i>
      </template>
    </fl-input>
    <transition
    name="fl-zoom-in-top"
    @before-enter="handleMenuEnter"
    @after-leave="doDestroy">
      <fl-select-menu
      ref="popper"
      :append-to-body="popperAppendToBody"
      v-show="visible && emptyText !== false">

      </fl-select-menu>
    </transition>
  </div>
</template>

<script>
import Emitter from '../src/mixins/emitter';
import Focus from '../src/mixins/focus';
import Locale from '../src/mixins/locale';
import NavigationMixin from './navigation-mixin';
import FlScrollbar from '../packages/scrollbar/src/main.vue';
import FlInput from "./Input.vue";
import FlOption from "./Option.vue";
import FlSelectMenu from "./Select-dropdown.vue";
import { getValueByPath, valueEquals, isIE, isEdge } from "../src/utils/util";
export default {
  mixins: [Emitter, Locale, Focus('reference'), NavigationMixin],

  name: "FlSelect",

  componentName: "FlSelect",

  components: {
    FlInput,
    FlOption,
    FlScrollbar,
    FlSelectMenu,
  },

  props: {
    name: String,
    id: String,
    value: {
      required: true,
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
      default: 0,
    },
    placeholder: {
      type: String,
      required: false,
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: "value",
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
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
      cachedPlaceHolder: "",
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: "",
      hoverIndex: -1,
      query: "",
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: "",
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false,
    };
  },

  inject: {
    flForm: {
      default: "",
    },

    flFormItem: {
      default: "",
    },
  },

  provide() {
    return {
      select: this,
    };
  },

  watch: {
    propPlaceholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },

    visible(val) {
      if (!val) {
        this.broadcast("FlSelectDropdown", "destroyPopper");
        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.query = "";
        this.previousQuery = null;
        this.selectedLabel = "";
        this.inputLength = 20;
        this.menuVisibleOnFocus = false;
        this.resetHoverIndex();
        this.$nextTick(() => {
          if (
            this.$refs.input &&
            this.$refs.input.value === "" &&
            this.selected.length === 0
          ) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            if (
              this.filterable &&
              this.allowCreate &&
              this.createdSelected &&
              this.createdLabel
            ) {
              this.selectedLabel = this.createdLabel;
            } else {
              this.selectedLabel = this.selected.currentLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }

          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        }
      } else {
        this.broadcast("FlSelectDropdown", "updatePopper");
        if (this.filterable) {
          this.query = this.remote ? "" : this.selectedLabel;
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (!this.remote) {
              this.broadcast("FlOption", "queryChange", "");
              this.broadcast("FlOptionGroup", "queryChange");
            }

            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel;
              this.selectedLabel = "";
            }
          }
        }
      }
      this.$emit("visible-change", val);
    },

    options() {
        if (this.$isServer) return;
        this.$nextTick(() => {
          this.broadcast('ElSelectDropdown', 'updatePopper');
        });
        if (this.multiple) {
          this.resetInputHeight();
        }
        let inputs = this.$el.querySelectorAll('input');
        if ([].indexOf.call(inputs, document.activeElement) === -1) {
          this.setSelected();
        }
        if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
          this.checkDefaultFirstOption();
        }
      }
  },

  computed: {
    _flFormItemSize() {
      return (this.flFormItem || {}).flFormItemSize;
    },

    readonly() {
      return (
        !this.filterable ||
        this.multiple ||
        (!isIE() && !isEdge() && !this.visible)
      );
    },

    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== "";
      let criteria =
        this.clearable &&
        !this.selectDisabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    },

    iconClass() {
      return this.remote && this.filterable
        ? ""
        : this.visible
        ? "arrow-up is-reverse"
        : "arrow-up";
    },

    selectSize() {
      return this.size || this._flFormItemSize || (this.$ELEMENT || {}).size;
    },

    showNewOption() {
        let hasExistingOption = this.options.filter(option => !option.created)
          .some(option => option.currentLabel === this.query);
        return this.filterable && this.allowCreate && this.query !== '' && !hasExistingOption;
      },
  },
  methods: {
    handleClearClick(event) {
      this.deleteSelected(event);
    },

    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit("change", val);
      }
    },

    scrollToOption(option) {
        const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
        if (this.$refs.popper && target) {
          const menu = this.$refs.popper.$el.querySelector('.el-select-dropdown__wrap');
          scrollIntoView(menu, target);
        }
        this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
      },

    handleMenuEnter() {
        this.$nextTick(() => this.scrollToOption(this.selected));
      },

      doDestroy() {
        this.$refs.popper && this.$refs.popper.doDestroy();
      },

    deleteSelected(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : "";
      this.$emit("input", value);
      this.emitChange(value);
      this.visible = false;
      this.$emit("clear");
    },

    handleQueryChange(val) {
        if (this.previousQuery === val || this.isOnComposition) return;
        if (
          this.previousQuery === null &&
          (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')
        ) {
          this.previousQuery = val;
          return;
        }
        this.previousQuery = val;
        this.$nextTick(() => {
          if (this.visible) this.broadcast('ElSelectDropdown', 'updatePopper');
        });
        this.hoverIndex = -1;
        if (this.multiple && this.filterable) {
          this.$nextTick(() => {
            const length = this.$refs.input.value.length * 15 + 20;
            this.inputLength = this.collapseTags ? Math.min(50, length) : length;
            this.managePlaceholder();
            this.resetInputHeight();
          });
        }
        if (this.remote && typeof this.remoteMethod === 'function') {
          this.hoverIndex = -1;
          this.remoteMethod(val);
        } else if (typeof this.filterMethod === 'function') {
          this.filterMethod(val);
          this.broadcast('ElOptionGroup', 'queryChange');
        } else {
          this.filteredOptionsCount = this.optionsCount;
          this.broadcast('ElOption', 'queryChange', val);
          this.broadcast('ElOptionGroup', 'queryChange');
        }
        if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
          this.checkDefaultFirstOption();
        }
      },

      resetHoverIndex() {
        setTimeout(() => {
          if (!this.multiple) {
            this.hoverIndex = this.options.indexOf(this.selected);
          } else {
            if (this.selected.length > 0) {
              this.hoverIndex = Math.min.apply(null, this.selected.map(item => this.options.indexOf(item)));
            } else {
              this.hoverIndex = -1;
            }
          }
        }, 300);
      },

    getOption(value) {
      let option;
      const isObject =
        Object.prototype.toString.call(value).toLowerCase() ===
        "[object object]";
      const isNull =
        Object.prototype.toString.call(value).toLowerCase() === "[object null]";
      const isUndefined =
        Object.prototype.toString.call(value).toLowerCase() ===
        "[object undefined]";

      for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
        const cachedOption = this.cachedOptions[i];
        const isEqual = isObject
          ? getValueByPath(cachedOption.value, this.valueKey) ===
            getValueByPath(value, this.valueKey)
          : cachedOption.value === value;
        if (isEqual) {
          option = cachedOption;
          break;
        }
      }
      if (option) return option;
      const label = !isObject && !isNull && !isUndefined ? String(value) : "";
      let newOption = {
        value: value,
        currentLabel: label,
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
        this.value.forEach((value) => {
          result.push(this.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },

    handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown || this.filterable) {
          if (this.filterable && !this.visible) {
            this.menuVisibleOnFocus = true;
          }
          this.visible = true;
        }
        this.$emit("focus", event);
        console.log('2222',this.visible);
        console.log('111',this);
      } else {
        this.softFocus = false;
      }
    },

    handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('FlFormItem', 'el.form.blur', [this.value]);
        }
      },

    blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "common/var.scss";
@import "mixins/mixins";

.fl-select__caret {
  color: $--select-input-color;
  font-size: $--select-input-font-size;
  transition: transform 0.3s;
  transform: rotateZ(180deg);

  .is-reverse {
    transform: rotateZ(0deg);
  }

  &:hover {
    color: $--select-close-hover-color;
  }
}
</style>