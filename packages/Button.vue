<template>
    <button class="fl-button"
        :class="[type ? 'fl-button--' + type : '', buttonSize ? 'fl-button--' + buttonSize : '', { 'is-plain': plain, 'is-round': round, 'is-circle': circle, 'is-disabled': buttonDisabled, 'is-loading': loading }]"
        :disabled="buttonDisabled || loading" :autofocus="autofocus" :type="nativeType" @click="handleClick">
        <i class="fl-icon-loading" v-if="loading"></i>
        <i :class="icon" v-if="icon && !loading"></i>
        <!-- 如果没传入任何的内容  -->
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </button>
</template>

<script>
export default {
    name: 'FlButton',
    inject: {
        elForm: {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },
    // 封装通用组件会对props进行校验
    props: {
        type: {
            type: String,
            default: 'default'
        },
        size: String,
        icon: {
            type: String,
            default: ''
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        autofocus: Boolean,
        round: Boolean,
        circle: Boolean
    },
    methods: {
        handleClick(e) {
            this.$emit('click', e)
        }
    },
    computed: {
        _flFormItemSize() {
            return (this.flFormItem || {}).flFormItemSize;
        },
        buttonSize() {
            return this.size || this._flFormItemSize || (this.$flEMENT || {}).size;
        },
        buttonDisabled() {
            return this.$options.propsData.hasOwnProperty('disabled') ? this.disabled : (this.flForm || {}).disabled;
        }
    },
    created() {
        console.log(this.type);
    },
}
</script>

<style >
.fl-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    -moz-user-sflect: none;
    -webkit-user-sflect: none;
    -ms-user-sflect: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px
}

/* .fl-button+.fl-button {
    margin-left: 10px
} */

.fl-button:focus,
.fl-button:hover {
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff
}

.fl-button:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0
}

.fl-button::-moz-focus-inner {
    border: 0
}

.fl-button [class*=fl-icon-]+span {
    margin-left: 5px
}

.fl-button.is-plain:focus,
.fl-button.is-plain:hover {
    background: #FFF;
    border-color: #409EFF;
    color: #409EFF
}

.fl-button.is-active,
.fl-button.is-plain:active {
    color: #3a8ee6;
    border-color: #3a8ee6
}

.fl-button.is-plain:active {
    background: #FFF;
    outline: 0
}

.fl-button.is-disabled,
.fl-button.is-disabled:focus,
.fl-button.is-disabled:hover {
    color: #C0C4CC;
    cursor: not-allowed;
    background-image: none;
    background-color: #FFF;
    border-color: #EBEEF5
}

.fl-button.is-disabled.fl-button--text {
    background-color: transparent
}

.fl-button.is-disabled.is-plain,
.fl-button.is-disabled.is-plain:focus,
.fl-button.is-disabled.is-plain:hover {
    background-color: #FFF;
    border-color: #EBEEF5;
    color: #C0C4CC
}

.fl-button.is-loading {
    position: relative;
    pointer-events: none
}

.fl-button.is-loading:before {
    pointer-events: none;
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    background-color: rgba(255, 255, 255, .35)
}

.fl-button.is-round {
    border-radius: 20px;
    padding: 12px 23px
}

.fl-button.is-circle {
    border-radius: 50%;
    padding: 12px
}

.fl-button--primary {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF
}

.fl-button--primary:focus,
.fl-button--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #FFF
}

.fl-button--primary:active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #FFF;
    outline: 0
}

.fl-button--primary.is-active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #FFF
}

.fl-button--primary.is-disabled,
.fl-button--primary.is-disabled:active,
.fl-button--primary.is-disabled:focus,
.fl-button--primary.is-disabled:hover {
    color: #FFF;
    background-color: #a0cfff;
    border-color: #a0cfff
}

.fl-button--primary.is-plain {
    color: #409EFF;
    background: #ecf5ff;
    border-color: #b3d8ff
}

.fl-button--primary.is-plain:focus,
.fl-button--primary.is-plain:hover {
    background: #409EFF;
    border-color: #409EFF;
    color: #FFF
}

.fl-button--primary.is-plain:active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #FFF;
    outline: 0
}

.fl-button--primary.is-plain.is-disabled,
.fl-button--primary.is-plain.is-disabled:active,
.fl-button--primary.is-plain.is-disabled:focus,
.fl-button--primary.is-plain.is-disabled:hover {
    color: #8cc5ff;
    background-color: #ecf5ff;
    border-color: #d9ecff
}

.fl-button--flow {
    position: absolute;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    font-family: sans-serif;
    box-sizing: border-box;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    z-index: 1;
}

.fl-button--flow:hover {
    animation: animate 8s linear infinite;
}

.fl-button--flow:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    border-radius: 40px;
    opacity: 0;
    transition: 0.5s;
}

.fl-button--flow:hover::before {
    filter: blur(20px);
    opacity: 1;
    animation: animate 8s linear infinite;
}

.fl-button--flow.is-plain {
    color: #03a9f4;
    background: linear-gradient(90deg, #b3d8ff, #fbc4c4, #f5dab1, #b3d8ff);
    background-size: 400%;
}

@keyframes animate {
    0% {
        background-position: 0%;
    }

    100% {
        background-position: 400%;
    }
}

.fl-button--success {
    color: #FFF;
    background-color: #67C23A;
    border-color: #67C23A
}

.fl-button--success:focus,
.fl-button--success:hover {
    background: #85ce61;
    border-color: #85ce61;
    color: #FFF
}

.fl-button--success.is-active,
.fl-button--success:active {
    background: #5daf34;
    border-color: #5daf34;
    color: #FFF
}

.fl-button--success:active {
    outline: 0
}

.fl-button--success.is-disabled,
.fl-button--success.is-disabled:active,
.fl-button--success.is-disabled:focus,
.fl-button--success.is-disabled:hover {
    color: #FFF;
    background-color: #b3e19d;
    border-color: #b3e19d
}

.fl-button--success.is-plain {
    color: #67C23A;
    background: #f0f9eb;
    border-color: #c2e7b0
}

.fl-button--success.is-plain:focus,
.fl-button--success.is-plain:hover {
    background: #67C23A;
    border-color: #67C23A;
    color: #FFF
}

.fl-button--success.is-plain:active {
    background: #5daf34;
    border-color: #5daf34;
    color: #FFF;
    outline: 0
}

.fl-button--success.is-plain.is-disabled,
.fl-button--success.is-plain.is-disabled:active,
.fl-button--success.is-plain.is-disabled:focus,
.fl-button--success.is-plain.is-disabled:hover {
    color: #a4da89;
    background-color: #f0f9eb;
    border-color: #e1f3d8
}

.fl-button--warning {
    color: #FFF;
    background-color: #E6A23C;
    border-color: #E6A23C
}

.fl-button--warning:focus,
.fl-button--warning:hover {
    background: #ebb563;
    border-color: #ebb563;
    color: #FFF
}

.fl-button--warning.is-active,
.fl-button--warning:active {
    background: #cf9236;
    border-color: #cf9236;
    color: #FFF
}

.fl-button--warning:active {
    outline: 0
}

.fl-button--warning.is-disabled,
.fl-button--warning.is-disabled:active,
.fl-button--warning.is-disabled:focus,
.fl-button--warning.is-disabled:hover {
    color: #FFF;
    background-color: #f3d19e;
    border-color: #f3d19e
}

.fl-button--warning.is-plain {
    color: #E6A23C;
    background: #fdf6ec;
    border-color: #f5dab1
}

.fl-button--warning.is-plain:focus,
.fl-button--warning.is-plain:hover {
    background: #E6A23C;
    border-color: #E6A23C;
    color: #FFF
}

.fl-button--warning.is-plain:active {
    background: #cf9236;
    border-color: #cf9236;
    color: #FFF;
    outline: 0
}

.fl-button--warning.is-plain.is-disabled,
.fl-button--warning.is-plain.is-disabled:active,
.fl-button--warning.is-plain.is-disabled:focus,
.fl-button--warning.is-plain.is-disabled:hover {
    color: #f0c78a;
    background-color: #fdf6ec;
    border-color: #faecd8
}

.fl-button--danger {
    color: #FFF;
    background-color: #F56C6C;
    border-color: #F56C6C
}

.fl-button--danger:focus,
.fl-button--danger:hover {
    background: #f78989;
    border-color: #f78989;
    color: #FFF
}

.fl-button--danger.is-active,
.fl-button--danger:active {
    background: #dd6161;
    border-color: #dd6161;
    color: #FFF
}

.fl-button--danger:active {
    outline: 0
}

.fl-button--danger.is-disabled,
.fl-button--danger.is-disabled:active,
.fl-button--danger.is-disabled:focus,
.fl-button--danger.is-disabled:hover {
    color: #FFF;
    background-color: #fab6b6;
    border-color: #fab6b6
}

.fl-button--danger.is-plain {
    color: #F56C6C;
    background: #fef0f0;
    border-color: #fbc4c4
}

.fl-button--danger.is-plain:focus,
.fl-button--danger.is-plain:hover {
    background: #F56C6C;
    border-color: #F56C6C;
    color: #FFF
}

.fl-button--danger.is-plain:active {
    background: #dd6161;
    border-color: #dd6161;
    color: #FFF;
    outline: 0
}

.fl-button--danger.is-plain.is-disabled,
.fl-button--danger.is-plain.is-disabled:active,
.fl-button--danger.is-plain.is-disabled:focus,
.fl-button--danger.is-plain.is-disabled:hover {
    color: #f9a7a7;
    background-color: #fef0f0;
    border-color: #fde2e2
}

.fl-button--info {
    color: #FFF;
    background-color: #909399;
    border-color: #909399
}

.fl-button--info:focus,
.fl-button--info:hover {
    background: #a6a9ad;
    border-color: #a6a9ad;
    color: #FFF
}

.fl-button--info.is-active,
.fl-button--info:active {
    background: #82848a;
    border-color: #82848a;
    color: #FFF
}

.fl-button--info:active {
    outline: 0
}

.fl-button--info.is-disabled,
.fl-button--info.is-disabled:active,
.fl-button--info.is-disabled:focus,
.fl-button--info.is-disabled:hover {
    color: #FFF;
    background-color: #c8c9cc;
    border-color: #c8c9cc
}

.fl-button--info.is-plain {
    color: #909399;
    background: #f4f4f5;
    border-color: #d3d4d6
}

.fl-button--info.is-plain:focus,
.fl-button--info.is-plain:hover {
    background: #909399;
    border-color: #909399;
    color: #FFF
}

.fl-button--info.is-plain:active {
    background: #82848a;
    border-color: #82848a;
    color: #FFF;
    outline: 0
}

.fl-button--info.is-plain.is-disabled,
.fl-button--info.is-plain.is-disabled:active,
.fl-button--info.is-plain.is-disabled:focus,
.fl-button--info.is-plain.is-disabled:hover {
    color: #bcbec2;
    background-color: #f4f4f5;
    border-color: #e9e9eb
}

.fl-button--medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px
}

.fl-button--mini,
.fl-button--small {
    font-size: 12px;
    border-radius: 3px
}

.fl-button--medium.is-round {
    padding: 10px 20px
}

.fl-button--medium.is-circle {
    padding: 10px
}

.fl-button--small,
.fl-button--small.is-round {
    padding: 9px 15px
}

.fl-button--small.is-circle {
    padding: 9px
}

.fl-button--mini,
.fl-button--mini.is-round {
    padding: 7px 15px
}

.fl-button--mini.is-circle {
    padding: 7px
}

.fl-button--text {
    border-color: transparent;
    color: #409EFF;
    background: 0 0;
    padding-left: 0;
    padding-right: 0
}

.fl-button--text:focus,
.fl-button--text:hover {
    color: #66b1ff;
    border-color: transparent;
    background-color: transparent
}

.fl-button--text:active {
    color: #3a8ee6;
    border-color: transparent;
    background-color: transparent
}

.fl-button--text.is-disabled,
.fl-button--text.is-disabled:focus,
.fl-button--text.is-disabled:hover {
    border-color: transparent
}

.fl-button-group .fl-button--danger:last-child,
.fl-button-group .fl-button--danger:not(:first-child):not(:last-child),
.fl-button-group .fl-button--info:last-child,
.fl-button-group .fl-button--info:not(:first-child):not(:last-child),
.fl-button-group .fl-button--primary:last-child,
.fl-button-group .fl-button--primary:not(:first-child):not(:last-child),
.fl-button-group .fl-button--success:last-child,
.fl-button-group .fl-button--success:not(:first-child):not(:last-child),
.fl-button-group .fl-button--warning:last-child,
.fl-button-group .fl-button--warning:not(:first-child):not(:last-child),
.fl-button-group>.fl-dropdown>.fl-button {
    border-left-color: rgba(255, 255, 255, .5)
}

.fl-button-group .fl-button--danger:first-child,
.fl-button-group .fl-button--danger:not(:first-child):not(:last-child),
.fl-button-group .fl-button--info:first-child,
.fl-button-group .fl-button--info:not(:first-child):not(:last-child),
.fl-button-group .fl-button--primary:first-child,
.fl-button-group .fl-button--primary:not(:first-child):not(:last-child),
.fl-button-group .fl-button--success:first-child,
.fl-button-group .fl-button--success:not(:first-child):not(:last-child),
.fl-button-group .fl-button--warning:first-child,
.fl-button-group .fl-button--warning:not(:first-child):not(:last-child) {
    border-right-color: rgba(255, 255, 255, .5)
}

.fl-button-group {
    display: inline-block;
    vertical-align: middle
}

.fl-button-group::after,
.fl-button-group::before {
    display: table;
    content: ""
}

.fl-button-group::after {
    clear: both
}

.fl-button-group>.fl-button {
    float: left;
    position: rflative
}

.fl-button-group>.fl-button+.fl-button {
    margin-left: 0
}

.fl-button-group>.fl-button.is-disabled {
    z-index: 1
}

.fl-button-group>.fl-button:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0
}

.fl-button-group>.fl-button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0
}

.fl-button-group>.fl-button:first-child:last-child {
    border-radius: 4px
}

.fl-button-group>.fl-button:first-child:last-child.is-round {
    border-radius: 20px
}

.fl-button-group>.fl-button:first-child:last-child.is-circle {
    border-radius: 50%
}

.fl-button-group>.fl-button:not(:first-child):not(:last-child) {
    border-radius: 0
}

.fl-button-group>.fl-button:not(:last-child) {
    margin-right: -1px
}

.fl-button-group>.fl-button.is-active,
.fl-button-group>.fl-button:not(.is-disabled):active,
.fl-button-group>.fl-button:not(.is-disabled):focus,
.fl-button-group>.fl-button:not(.is-disabled):hover {
    z-index: 1
}

.fl-button-group>.fl-dropdown>.fl-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0
}
</style>