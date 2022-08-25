<template>
  
</template>

<script>
export default {
  name: 'FlCol',

  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  computed: {
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== 'FlRow') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render(h) {
    let classList = [];
    let style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `fl-col-${prop}-${this[prop]}`
            : `fl-col-${this[prop]}`
        );
      }
    });

    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`fl-col-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        let props = this[size];
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `fl-col-${size}-${prop}-${props[prop]}`
              : `fl-col-${size}-${props[prop]}`
          );
        });
      }
    });

    return h(this.tag, {
      class: ['fl-col', classList],
      style
    }, this.$slots.default);
  }
};

</script>

<style lang="scss" scoped>
@import "common/var.scss";
@import "mixins/mixins.scss";

[class*="fl-col-"] {
  float: left;
  box-sizing: border-box;
}

.fl-col-0 {
  display: none;
}

@for $i from 0 through 24 {
  .fl-col-#{$i} {
    width: (1 / 24 * $i * 100) * 1%;
  }

  .fl-col-offset-#{$i} {
    margin-left: (1 / 24 * $i * 100) * 1%;
  }

  .fl-col-pull-#{$i} {
    position: relative;
    right: (1 / 24 * $i * 100) * 1%;
  }

  .fl-col-push-#{$i} {
    position: relative;
    left: (1 / 24 * $i * 100) * 1%;
  }
}

@include res(xs) {
  .fl-col-xs-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .fl-col-xs-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-xs-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-xs-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-xs-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}

@include res(sm) {
  .fl-col-sm-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .fl-col-sm-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-sm-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-sm-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-sm-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}

@include res(md) {
  .fl-col-md-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .fl-col-md-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-md-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-md-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-md-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}

@include res(lg) {
  .fl-col-lg-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .fl-col-lg-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-lg-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-lg-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-lg-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}

@include res(xl) {
  .fl-col-xl-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .fl-col-xl-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-xl-offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-xl-pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }

    .fl-col-xl-push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
</style>