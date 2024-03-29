<template>
  <div
    class="fl-select"
    :class="[selectSize ? 'fl-select--' + selectSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div
      class="fl-select__tags"
      v-if="multiple"
      ref="tags"
      :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }"
    >
      <span v-if="collapseTags && selected.length">
        <fl-tag
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="selected[0].hitState"
          type="info"
          @close="deleteTag($event, selected[0])"
          disable-transitions
        >
          <span class="fl-select__tags-text">{{
            selected[0].currentLabel
          }}</span>
        </fl-tag>
        <fl-tag
          v-if="selected.length > 1"
          :closable="false"
          :size="collapseTagSize"
          type="info"
          disable-transitions
        >
          <span class="fl-select__tags-text">+ {{ selected.length - 1 }}</span>
        </fl-tag>
      </span>
      <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
        <fl-tag
          v-for="item in selected"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="item.hitState"
          type="info"
          @close="deleteTag($event, item)"
          disable-transitions
        >
          <span class="fl-select__tags-text">{{ item.currentLabel }}</span>
        </fl-tag>
      </transition-group>

      <input
        type="text"
        class="fl-select__input"
        :class="[selectSize ? `is-${selectSize}` : '']"
        :disabled="selectDisabled"
        :autocomplete="autoComplete || autocomplete"
        @focus="handleFocus"
        @blur="softFocus = false"
        @keyup="managePlaceholder"
        @keydown="resetInputState"
        @keydown.down.prevent="handleNavigate('next')"
        @keydown.up.prevent="handleNavigate('prev')"
        @keydown.enter.prevent="selectOption"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.delete="deletePrevTag"
        @keydown.tab="visible = false"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        v-model="query"
        @input="debouncedQueryChange"
        v-if="filterable"
        :style="{
          'flex-grow': '1',
          width: inputLength / (inputWidth - 32) + '%',
          'max-width': inputWidth - 42 + 'px',
        }"
        ref="input"
      />
    </div>
    <fl-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :autocomplete="autoComplete || autocomplete"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      :tabindex="multiple && filterable ? '-1' : null"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="debouncedOnInputChange"
      @keydown.native.down.stop.prevent="handleNavigate('next')"
      @keydown.native.up.stop.prevent="handleNavigate('prev')"
      @keydown.native.enter.prevent="selectOption"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
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
      @after-leave="doDestroy"
    >
      <fl-select-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false"
      >
        <fl-scrollbar
          tag="ul"
          wrap-class="fl-select-dropdown__wrap"
          view-class="fl-select-dropdown__list"
          ref="scrollbar"
          :class="{
            'is-empty': !allowCreate && query && filteredOptionsCount === 0,
          }"
          v-show="options.length > 0 && !loading"
        >
          <fl-option :value="query" created v-if="showNewOption"> </fl-option>
          <slot></slot>
        </fl-scrollbar>
        <template
          v-if="
            emptyText &&
            (!allowCreate || loading || (allowCreate && options.length === 0))
          "
        >
          <slot name="empty" v-if="$slots.empty"></slot>
          <p class="fl-select-dropdown__empty" v-else>
            {{ emptyText }}
          </p>
        </template>
      </fl-select-menu>
    </transition>
  </div>
</template>

<script>
import Emitter from "../src/mixins/emitter";
import Focus from "../src/mixins/focus";
import Locale from "../src/mixins/locale";
import NavigationMixin from "./navigation-mixin";
import FlScrollbar from "../packages/scrollbar/src/main.vue";
import FlInput from "./Input.vue";
import FlOption from "./Option.vue";
import FlSelectMenu from "./Select-dropdown.vue";
import { debounce } from "throttle-debounce";
import Clickoutside from "../src/utils/clickoutside";
import {
  addResizeListener,
  removeResizeListener,
} from "../src/utils/resize-event";
import scrollIntoView from "../src/utils/scroll-into-view";
import { getValueByPath, valueEquals, isIE, isEdge } from "../src/utils/util";
import { isKorean } from "../src/utils/shared";
export default {
  mixins: [Emitter, Locale, Focus("reference"), NavigationMixin],

  name: "FlSelect",

  componentName: "FlSelect",

  components: {
    FlInput,
    FlOption,
    FlScrollbar,
    FlSelectMenu,
  },

  inject: {
    elForm: {
      default: "",
    },

    elFormItem: {
      default: "",
    },
  },

  provide() {
    return {
      select: this,
    };
  },

  directives: { Clickoutside },

  props: {
    name: String,
    id: String,
    value: {
      required: true,
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== "production" &&
          console.warn(
            "[Element Warn][Select]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
          );
        return true;
      },
    },
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

  watch: {
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },

    propPlaceholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },

    value(val, oldVal) {
      if (this.multiple) {
        this.resetInputHeight();
        if (
          (val && val.length > 0) ||
          (this.$refs.input && this.query !== "")
        ) {
          this.currentPlaceholder = "";
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = "";
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      if (!valueEquals(val, oldVal)) {
        this.dispatch("FlFormItem", "fl.form.change", val);
      }
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
        this.broadcast("FlSelectDropdown", "updatePopper");
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      let inputs = this.$el.querySelectorAll("input");
      console.log(inputs,'inputs----------------------');
      console.log(document.activeElement,'document.activeElement');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
        console.log('121212');
      }
      if (
        this.defaultFirstOption &&
        (this.filterable || this.remote) &&
        this.filteredOptionsCount
      ) {
        this.checkDefaultFirstOption();
      }
    },
  },

  computed: {
    _elFormItemSize() {
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

    debounce() {
      return this.remote ? 300 : 0;
    },

    emptyText() {
      if (this.loading) {
        return this.loadingText || this.t("fl.select.loading");
      } else {
        if (this.remote && this.query === "" && this.options.length === 0)
          return false;
        if (
          this.filterable &&
          this.query &&
          this.options.length > 0 &&
          this.filteredOptionsCount === 0
        ) {
          return this.noMatchText || this.t("fl.select.noMatch");
        }
        if (this.options.length === 0) {
          return this.noDataText || this.t("fl.select.noData");
        }
      }
      return null;
    },

    showNewOption() {
      let hasExistingOption = this.options
        .filter((option) => !option.created)
        .some((option) => option.currentLabel === this.query);
      return (
        this.filterable &&
        this.allowCreate &&
        this.query !== "" &&
        !hasExistingOption
      );
    },

    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },

    selectDisabled() {
      return this.disabled || (this.flForm || {}).disabled;
    },

    collapseTagSize() {
      return ["small", "mini"].indexOf(this.selectSize) > -1 ? "mini" : "small";
    },
    propPlaceholder() {
      return typeof this.placeholder !== "undefined"
        ? this.placeholder
        : this.t("fl.select.placeholder");
    },
  },

  methods: {
    handleNavigate(direction) {
      if (this.isOnComposition) return;

      this.navigateOptions(direction);
    },
    handleComposition(event) {
      const text = event.target.value;
      if (event.type === "compositionend") {
        this.isOnComposition = false;
        this.$nextTick((_) => this.handleQueryChange(text));
      } else {
        const lastCharacter = text[text.length - 1] || "";
        this.isOnComposition = !isKorean(lastCharacter);
      }
    },
    handleQueryChange(val) {
      if (this.previousQuery === val || this.isOnComposition) return;
      if (
        this.previousQuery === null &&
        (typeof this.filterMethod === "function" ||
          typeof this.remoteMethod === "function")
      ) {
        this.previousQuery = val;
        return;
      }
      this.previousQuery = val;
      this.$nextTick(() => {
        if (this.visible) this.broadcast("FlSelectDropdown", "updatePopper");
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
      if (this.remote && typeof this.remoteMethod === "function") {
        this.hoverIndex = -1;
        this.remoteMethod(val);
      } else if (typeof this.filterMethod === "function") {
        this.filterMethod(val);
        this.broadcast("FlOptionGroup", "queryChange");
      } else {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast("FlOption", "queryChange", val);
        this.broadcast("FlOptionGroup", "queryChange");
      }
      if (
        this.defaultFirstOption &&
        (this.filterable || this.remote) &&
        this.filteredOptionsCount
      ) {
        this.checkDefaultFirstOption();
      }
    },

    scrollToOption(option) {
      const target =
        Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        const menu = this.$refs.popper.$el.querySelector(
          ".fl-select-dropdown__wrap"
        );
        scrollIntoView(menu, target);
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },

    handleMenuEnter() {
      this.$nextTick(() => this.scrollToOption(this.selected));
    },

    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit("change", val);
      }
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
      } else {
        this.softFocus = false;
      }
    },

    blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },

    handleBlur(event) {
      setTimeout(() => {
        if (this.isSilentBlur) {
          this.isSilentBlur = false;
        } else {
          this.$emit("blur", event);
        }
      }, 50);
      this.softFocus = false;
    },

    handleClearClick(event) {
      this.deleteSelected(event);
    },

    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },

    handleClose() {
      this.visible = false;
    },

    toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      const option = this.selected[this.selected.length - 1];
      if (!option) return;

      if (hit === true || hit === false) {
        option.hitState = hit;
        return hit;
      }

      option.hitState = !option.hitState;
      return option.hitState;
    },

    deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        const value = this.value.slice();
        value.pop();
        this.$emit("input", value);
        this.emitChange(value);
      }
    },

    managePlaceholder() {
      if (this.currentPlaceholder !== "") {
        this.currentPlaceholder = this.$refs.input.value
          ? ""
          : this.cachedPlaceHolder;
      }
    },

    resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
      this.inputLength = this.$refs.input.value.length * 15 + 20;
      this.resetInputHeight();
    },

    resetInputHeight() {
      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference.$el.childNodes;
        let input = [].filter.call(
          inputChildNodes,
          (item) => item.tagName === "INPUT"
        )[0];
        const tags = this.$refs.tags;
        const tagsHeight = tags
          ? Math.round(tags.getBoundingClientRect().height)
          : 0;
        const sizeInMap = this.initialInputHeight || 40;
        input.style.height =
          this.selected.length === 0
            ? sizeInMap + "px"
            : Math.max(
                tags ? tagsHeight + (tagsHeight > sizeInMap ? 6 : 0) : 0,
                sizeInMap
              ) + "px";
        if (this.visible && this.emptyText !== false) {
          this.broadcast("FlSelectDropdown", "updatePopper");
        }
      });
    },

    resetHoverIndex() {
      setTimeout(() => {
        if (!this.multiple) {
          this.hoverIndex = this.options.indexOf(this.selected);
        } else {
          if (this.selected.length > 0) {
            this.hoverIndex = Math.min.apply(
              null,
              this.selected.map((item) => this.options.indexOf(item))
            );
          } else {
            this.hoverIndex = -1;
          }
        }
      }, 300);
    },

    handleOptionSelect(option, byClick) {
      if (this.multiple) {
        const value = (this.value || []).slice();
        const optionIndex = this.getValueIndex(value, option.value);
        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (
          this.multipleLimit <= 0 ||
          value.length < this.multipleLimit
        ) {
          value.push(option.value);
        }
        this.$emit("input", value);
        this.emitChange(value);
        if (option.created) {
          this.query = "";
          this.handleQueryChange("");
          this.inputLength = 20;
        }
        if (this.filterable) this.$refs.input.focus();
      } else {
        this.$emit("input", option.value);
        this.emitChange(option.value);
        this.visible = false;
      }
      this.isSilentBlur = byClick;
      this.setSoftFocus();
      if (this.visible) return;
      this.$nextTick(() => {
        this.scrollToOption(option);
      });
    },

    setSoftFocus() {
      this.softFocus = true;
      const input = this.$refs.input || this.$refs.reference;
      if (input) {
        input.focus();
      }
    },

    getValueIndex(arr = [], value) {
      const isObject =
        Object.prototype.toString.call(value).toLowerCase() ===
        "[object object]";
      if (!isObject) {
        return arr.indexOf(value);
      } else {
        const valueKey = this.valueKey;
        let index = -1;
        arr.some((item, i) => {
          if (
            getValueByPath(item, valueKey) === getValueByPath(value, valueKey)
          ) {
            index = i;
            return true;
          }
          return false;
        });
        return index;
      }
    },

    toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        } else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          // debugger
          console.log(this.$refs.reference,'this.$refs.reference');
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },

    selectOption() {
      if (!this.visible) {
        this.toggleMenu();
      } else {
        if (this.options[this.hoverIndex]) {
          this.handleOptionSelect(this.options[this.hoverIndex]);
        }
      }
    },

    deleteSelected(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : "";
      this.$emit("input", value);
      this.emitChange(value);
      this.visible = false;
      this.$emit("clear");
    },

    deleteTag(event, tag) {
      let index = this.selected.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        const value = this.value.slice();
        value.splice(index, 1);
        this.$emit("input", value);
        this.emitChange(value);
        this.$emit("remove-tag", tag.value);
      }
      event.stopPropagation();
    },

    onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },

    onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount--;
        this.filteredOptionsCount--;
        this.options.splice(index, 1);
      }
    },

    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },

    handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },

    checkDefaultFirstOption() {
      this.hoverIndex = -1;
      // highlight the created option
      let hasCreated = false;
      for (let i = this.options.length - 1; i >= 0; i--) {
        if (this.options[i].created) {
          hasCreated = true;
          this.hoverIndex = i;
          break;
        }
      }
      if (hasCreated) return;
      for (let i = 0; i !== this.options.length; ++i) {
        const option = this.options[i];
        if (this.query) {
          // highlight first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = i;
            break;
          }
        } else {
          // highlight currently selected option
          if (option.itemSelected) {
            this.hoverIndex = i;
            break;
          }
        }
      }
    },

    getValueKey(item) {
      if (
        Object.prototype.toString.call(item.value).toLowerCase() !==
        "[object object]"
      ) {
        return item.value;
      } else {
        return getValueByPath(item.value, this.valueKey);
      }
    },
  },

  created() {
    this.cachedPlaceHolder = this.currentPlaceholder = this.propPlaceholder;
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit("input", []);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit("input", "");
    }

    this.debouncedOnInputChange = debounce(this.debounce, () => {
      this.onInputChange();
    });

    this.debouncedQueryChange = debounce(this.debounce, (e) => {
      this.handleQueryChange(e.target.value);
    });

    this.$on("handleOptionClick", this.handleOptionSelect);
    this.$on("setSelected", this.setSelected);
  },

  mounted() {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = "";
    }
    addResizeListener(this.$el, this.handleResize);

    const reference = this.$refs.reference;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28,
      };
      const input = reference.$el.querySelector("input");
      this.initialInputHeight =
        input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },

  beforeDestroy() {
    if (this.$el && this.handleResize)
      removeResizeListener(this.$el, this.handleResize);
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
@include b(select) {
  display: inline-block;
  position: relative;

  .fl-select__tags
    >span {
      display: contents;
    }

  &:hover {
    .fl-input__inner {
      border-color: $--select-border-color-hover;
    }
  }

  .fl-input__inner {
    cursor: pointer;
    padding-right: 35px;

    &:focus {
      border-color: $--select-input-focus-border-color;
    }
  }

  .fl-input {
    & .fl-select__caret {
      color: $--select-input-color;
      font-size: $--select-input-font-size;
      transition: transform .3s;
      transform: rotateZ(180deg);
      cursor: pointer;

      @include when(reverse) {
        transform: rotateZ(0deg);
      }

      @include when(show-close) {
        font-size: $--select-font-size;
        text-align: center;
        transform: rotateZ(180deg);
        border-radius: $--border-radius-circle;
        color: $--select-input-color;
        transition: $--color-transition-base;

        &:hover {
          color: $--select-close-hover-color;
        }
      }
    }

    &.is-disabled {
      & .fl-input__inner {
        cursor: not-allowed;

        &:hover {
          border-color: $--select-disabled-border;
        }
      }
    }

    &.is-focus .fl-input__inner {
      border-color: $--select-input-focus-border-color;
    }
  }

  > .fl-input {
    display: block;
  }

  @include e(input) {
    border: none;
    outline: none;
    padding: 0;
    margin-left: 15px;
    color: $--select-multiple-input-color;
    font-size: $--select-font-size;
    appearance: none;
    height: 28px;
    background-color: transparent;
    @include when(mini) {
      height: 14px;
    }
  }

  @include e(close) {
    cursor: pointer;
    position: absolute;
    top: 8px;
    z-index: $--index-top;
    right: 25px;
    color: $--select-input-color;
    line-height: 18px;
    font-size: $--select-input-font-size;

    &:hover {
      color: $--select-close-hover-color;
    }
  }

  @include e(tags) {
    position: absolute;
    line-height: normal;
    white-space: normal;
    z-index: $--index-normal;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  @include e(tags-text) {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fl-tag {
    box-sizing: border-box;
    border-color: transparent;
    margin: 2px 0 2px 6px;
    background-color: #f0f2f5;
    display: flex;
    max-width: 100%;
    align-items: center;

    &__close.fl-icon-close {
      background-color: $--color-text-placeholder;
      top: 0;
      color: $--color-white;
      flex-shrink: 0;

      &:hover {
        background-color: $--color-text-secondary;
      }

      &::before {
        display: block;
        transform: translate(0, .5px);
      }
    }
  }
}
</style>
