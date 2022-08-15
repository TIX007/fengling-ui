<template>
    <label class="fl-radio-button" :class="[
        size ? 'fl-radio-button--' + size : '',
        { 'is-active': value === label },
        { 'is-disabled': isDisabled },
        { 'is-focus': focus }
    ]" role="radio" :aria-checked="value === label" :aria-disabled="isDisabled" :tabindex="tabIndex"
        @keydown.space.stop.prevent="value = isDisabled ? value : label">
        <input class="fl-radio-button__orig-radio" :value="label" type="radio" v-model="value" :name="name"
            @change="handleChange" :disabled="isDisabled" tabindex="-1" @focus="focus = true" @blur="focus = false"
            autocomplete="off">
        <span class="fl-radio-button__inner" :style="value === label ? activeStyle : null" @keydown.stop>
            <slot></slot>
            <template v-if="!$slots.default">{{ label }}</template>
        </span>
    </label>
</template>
<script>
import Emitter from '../src/mixins/emitter';

export default {
    name: 'FlRadioButton',

    mixins: [Emitter],

    inject: {
        flForm: {
            default: ''
        },
        flFormItem: {
            default: ''
        }
    },

    props: {
        label: {},
        disabled: Boolean,
        name: String
    },
    componentName: 'FlRadioButton',
    data() {
        return {
            focus: false
        };
    },
    computed: {
        value: {
            get() {
                // return this.RadioGroup.label;
                return this.isGroup ? this.RadioGroup.value : this.value
            },
            set(value) {
                // this.RadioGroup.$emit('input', value);
                this.isGroup ? this.RadioGroup.$emit('input', value) : this.$emit('input', value)
            }
        },
        isGroup() {
            // 返回布尔值
            return !!this.RadioGroup
        },
        RadioGroup() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== 'FlRadioGroup') {
                    parent = parent.$parent;
                } else {
                    return parent;
                }
            }
            return false;
        },
        activeStyle() {
            return {
                backgroundColor: this.RadioGroup.fill || '',
                borderColor: this.RadioGroup.fill || '',
                boxShadow: this.RadioGroup.fill ? `-1px 0 0 0 ${this.RadioGroup.fill}` : '',
                color: this.RadioGroup.textColor || ''
            };
        },
        _flFormItemSize() {
            return (this.flFormItem || {}).flFormItemSize;
        },
        size() {
            return this.RadioGroup.radioGroupSize || this._flFormItemSize || (this.$ELEMENT || {}).size;
        },
        isDisabled() {
            return this.disabled || this.RadioGroup.disabled || (this.flForm || {}).disabled;
        },
        tabIndex() {
            return (this.isDisabled || (this.RadioGroup && this.value !== this.label)) ? -1 : 0;
        }
    },

    methods: {
        handleChange() {
            this.$nextTick(() => {
                this.dispatch('FlRadioGroup', 'handleChange', this.value);
            });
        }
    }
};
</script>

<style scoped>
.fl-radio-button,
.fl-radio-button__inner {
    display: inline-block;
    position: relative;
    outline: 0
}

.fl-radio-button__inner {
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    background: #FFF;
    border: 1px solid #DCDFE6;
    font-weight: 500;
    border-left: 0;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    cursor: pointer;
    -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 0
}

.fl-radio-button__inner.is-round {
    padding: 12px 20px
}

.fl-radio-button__inner:hover {
    color: #409EFF
}

.fl-radio-button__inner [class*=fl-icon-] {
    line-height: .9
}

.fl-radio-button__inner [class*=fl-icon-]+span {
    margin-left: 5px
}

.fl-radio-button:first-child .fl-radio-button__inner {
    border-left: 1px solid #DCDFE6;
    border-radius: 4px 0 0 4px;
    -webkit-box-shadow: none !important;
    box-shadow: none !important
}

.fl-radio-button__orig-radio {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1
}

.fl-radio-button__orig-radio:checked+.fl-radio-button__inner {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    -webkit-box-shadow: -1px 0 0 0 #409EFF;
    box-shadow: -1px 0 0 0 #409EFF
}

.fl-radio-button__orig-radio:disabled+.fl-radio-button__inner {
    color: #C0C4CC;
    cursor: not-allowed;
    background-image: none;
    background-color: #FFF;
    border-color: #EBEEF5;
    -webkit-box-shadow: none;
    box-shadow: none
}

.fl-radio-button__orig-radio:disabled:checked+.fl-radio-button__inner {
    background-color: #F2F6FC
}

.fl-radio-button:last-child .fl-radio-button__inner {
    border-radius: 0 4px 4px 0
}

.fl-radio-button:first-child:last-child .fl-radio-button__inner {
    border-radius: 4px
}

.fl-radio-button--medium .fl-radio-button__inner {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 0
}

.fl-radio-button--medium .fl-radio-button__inner.is-round {
    padding: 10px 20px
}

.fl-radio-button--small .fl-radio-button__inner {
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 0
}

.fl-radio-button--small .fl-radio-button__inner.is-round {
    padding: 9px 15px
}

.fl-radio-button--mini .fl-radio-button__inner {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 0
}

.fl-radio-button--mini .fl-radio-button__inner.is-round {
    padding: 7px 15px
}

.fl-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    -webkit-box-shadow: 0 0 2px 2px #409EFF;
    box-shadow: 0 0 2px 2px #409EFF
}
</style>
