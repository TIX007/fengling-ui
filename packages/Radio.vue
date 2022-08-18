<template>
    <label class="fl-radio"
        :class="[border && radioSize ? 'fl-radio--' + radioSize : '', { 'is-disabled': isDisabled }, { 'is-bordered': border }, { 'is-checked': label == model }]">
        <span :class="{ 'is-disabled': isDisabled, }" class="fl-radio_input">
            <span class="fl-radio_inner"></span>
            <input type="radio" class="fl-radio_original" :value="label" v-model="model" :disabled="isDisabled" />
        </span>
        <span class="fl-radio_label">
            <slot></slot>
            <!-- 如果没有传值，就把label作为文本显示 -->
            <template v-if="!$slots.default">{{ label }}</template>
        </span>
    </label>
</template>

<script>
export default {
    name: "FlRadio",
    props: {
        label: {
            type: [String, Number, Boolean],
            defualt: ''
        },
        value: null,
        name: {
            type: String,
            defualt: ''
        },
        disabled: Boolean,
        border: Boolean,
        size: String
    },
    inject: {
        RadioGroup: {
            default: ''
        }
    },
    componentName: 'FlRadio',
    computed: {
        model: {
            get() {
                return this.isGroup ? this.RadioGroup.value : this.value
            },
            set(value) {
                // 触发父组件的input事件
                this.isGroup ? this.RadioGroup.$emit('input', value) : this.$emit('input', value)
            }
        },
        isDisabled() {
            // return this.$options.propsData.hasOwnProperty('disabled') ? this.disabled : (this.flForm || {}).disabled;
            return this.isGroup
                ? this.RadioGroup.disabled || this.disabled || (this.flForm || {}).disabled
                : this.disabled || (this.flForm || {}).disabled;
        },
        // 用于判断radio是否被radioGroup包裹
        isGroup() {
            // 返回布尔值
            return !!this.RadioGroup
        },
        radioSize() {
            const temRadioSize = this.size || this._flFormItemSize || (this.$FLEMENT || {}).size;
            return this.isGroup
                ? this.RadioGroup.radioGroupSize || temRadioSize
                : temRadioSize;
        },
    },
}
</script>

<style lang="scss" scoped>
@import "common/var.scss";
@import "mixins/mixins";
@import "mixins/utils";

// $--radio-bordered-height: 40px !default;
// $--radio-bordered-padding: 12px 20px 0 10px !default;
// $--radio-bordered-medium-padding: 10px 20px 0 10px !default;
// $--radio-bordered-small-padding: 8px 15px 0 10px !default;
// $--radio-bordered-mini-padding: 6px 15px 0 10px !default;
// $--button-medium-border-radius: 4px !default;
// $--radio-bordered-medium-height: 36px !default;
// $--radio-bordered-medium-height: 36px !default;
// $--font-size-base: 14px !default;
// $--button-medium-font-size: $--font-size-base  !default;
// $--radio-bordered-medium-input-height: 14px !default;
// $--radio-bordered-medium-input-width: 14px !default;

.fl-radio {
    color: #606266;
    font-weight: 500;
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    margin-right: 30px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;

    &:hover {
        .fl-radio_input {
            .fl-radio_inner {
                border-color: $--checkbox-input-border-color-hover;
                transition: border-color .2s linear;
            }
        }

    }

    .fl-radio_input {
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        display: inline-block;
        line-height: 1;
        position: relative;
        vertical-align: middle;

        .fl-radio_inner {
            border: 1px solid #dcdfe6;
            border-radius: 100%;
            width: 14px;
            height: 14px;
            background-color: #fff;
            position: relative;
            cursor: pointer;
            display: inline-block;
            box-sizing: border-box;

            &:after {
                width: 4px;
                height: 4px;
                border-radius: 100%;
                background-color: #fff;
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0.15s ease-in;
            }
        }

        .fl-radio_original {
            opacity: 0;
            outline: none;
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0px;
            right: 0;
            bottom: 0;
            margin: 0;
        }
    }

    .fl-radio_label {
        font-size: 14px;
        padding-left: 10px;
    }
}

// .is-disabled {
//     color: #C0C4CC;
//     cursor: not-allowed;
//     background-image: none;
//     background-color: #FFF;
//     border-color: #EBEEF5;

//     .fl-radio_input {
//         cursor: not-allowed;

//         .fl-radio_inner {
//             background-color: #FFF;
//             cursor: not-allowed;
//         }

//     }
// }

// .fl-radio.is-checked.is-disabled {
//     .fl-radio_input {
//         .fl-radio_inner {
//             border-color: #c0c4cc;
//             background-color: #c0c4cc;

//             &:after {
//                 transform: translate(-50%, -50%) scale(1);
//             }
//         }
//     }

//     .fl-radio_label {
//         color: #c0c4cc;
//     }
// }

// 选中的样式
// .fl-radio.is-checked {
//     .fl-radio_input {
//         .fl-radio_inner {
//             border-color: #409eff;
//             background-color: #409eff;

//             &:after {
//                 transform: translate(-50%, -50%) scale(1);
//             }
//         }
//     }

//     .fl-radio_label {
//         color: #409eff;
//     }
// }

@include b(radio) {
    @include when(bordered) {
        padding: $--radio-bordered-padding;
        border-radius: $--border-radius-base;
        border: $--border-base;
        box-sizing: border-box;
        height: $--radio-bordered-height;

        &.is-checked {
            border-color: $--color-primary;
        }

        &.is-disabled {
            cursor: not-allowed;
            border-color: $--border-color-lighter;
        }

        &+.fl-radio.is-bordered {
            margin-left: 10px;
        }
    }

    @include m(medium) {
        &.is-bordered {
            padding: $--radio-bordered-medium-padding;
            border-radius: $--button-medium-border-radius;
            height: $--radio-bordered-medium-height;

            .fl-radio_label {
                font-size: $--button-medium-font-size;
            }

            .fl-radio_inner {
                height: $--radio-bordered-medium-input-height;
                width: $--radio-bordered-medium-input-width;
            }
        }
    }

    @include m(small) {
        &.is-bordered {
            padding: $--radio-bordered-small-padding;
            border-radius: $--button-small-border-radius;
            height: $--radio-bordered-small-height;

            .fl-radio_label {
                font-size: $--button-small-font-size;
            }

            .fl-radio_inner {
                height: $--radio-bordered-small-input-height;
                width: $--radio-bordered-small-input-width;
            }
        }
    }

    @include m(mini) {
        &.is-bordered {
            padding: $--radio-bordered-mini-padding;
            border-radius: $--button-mini-border-radius;
            height: $--radio-bordered-mini-height;

            .fl-radio_label {
                font-size: $--button-mini-font-size;
            }

            .fl-radio_inner {
                height: $--radio-bordered-mini-input-height;
                width: $--radio-bordered-mini-input-width;
            }
        }
    }



    @include when(disabled) {
        cursor: not-allowed;

        &:hover {
            .fl-radio_input {
                .fl-radio_inner {
                    border-color: $--radio-disabled-input-border-color;
                }
            }

        }

        .fl-radio_input {
            cursor: not-allowed;

            .fl-radio_inner {
                background-color: $--radio-disabled-input-fill;
                border-color: $--radio-disabled-input-border-color;
                cursor: not-allowed;

                &::after {
                    cursor: not-allowed;
                    background-color: $--radio-disabled-icon-color;
                }

                &+.fl-radio_label {
                    cursor: not-allowed;
                }
            }
        }

        &.is-checked {
            .fl-radio_input {
                cursor: not-allowed;

                .fl-radio_inner {
                    background-color: $--radio-disabled-checked-input-fill;
                    border-color: $--radio-disabled-checked-input-border-color;

                    &::after {
                        background-color: $--radio-disabled-checked-icon-color;
                    }
                }
            }

        }

        &+span.fl-radio_label {
            color: $--color-text-placeholder;
            cursor: not-allowed;
        }


    }

    @include when(checked) {
        .fl-radio_input {
            .fl-radio_inner {
                border-color: $--radio-checked-input-border-color;
                background: $--radio-checked-icon-color;

                &::after {
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        }


        &+.fl-radio_label {
            color: $--radio-checked-font-color;
        }
    }

    @include when(focus) {
        .fl-radio_inner {
            border-color: $--radio-input-border-color-hover;
        }
    }

}
</style>