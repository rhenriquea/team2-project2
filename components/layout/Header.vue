<template>
  <header ref="header">
    <nav :class="{ 'fixed-nav': showFixed }">
      <NuxtLink to="/">
        <img
          class="mx-7 logo"
          :height="logoSize"
          :width="logoSize"
          src="/moov.png"
          alt="Moov Logo"
        />
      </NuxtLink>
      <ul class="nav-links">
        <li
          v-for="(link, index) in links"
          :key="link.name"
          class="mr"
          :class="{ 'mr-0': index === links.length - 1 }"
        >
          <NuxtLink :to="link.to">{{ link.name }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data: () => ({
    links: [{ name: 'Login', to: '/auth' }],
    logoSize: 80,
    showFixed: false,
  }),
  mounted() {
    this.addListener()
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollListener)
  },
  methods: {
    addListener() {
      window.addEventListener('scroll', this.scrollListener)
    },
    scrollListener(e) {
      const el = e.srcElement.body
      const top = el.getBoundingClientRect().top * -1

      this.showFixed = top > 40

      this.logoSize = this.showFixed ? this.logoSize - 1 : 80

      if (this.logoSize < 51) this.logoSize = 50
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  background-color: #0b0b0b;
  box-shadow: 1px 3px 0 -1px #0000001a;
  nav {
    align-items: center;
    background-color: #0b0b0b;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 120px;
    z-index: 10;

    @include mq($breakpoint-sm) {
      flex-direction: row;
    }

    .logo {
      display: none;

      @include mq($breakpoint-sm) {
        display: block;
      }

      &.animate {
        animation: grow 0.2s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: linear;
        margin-left: -54px;
      }
    }

    &.fixed-nav {
      box-shadow: 1px 3px 0 -1px #0000001a;
      margin-top: 0;
      position: fixed;
      top: 0;
      width: 100%;

      ul {
        margin-top: $spacing-m;
        li {
          margin-bottom: $spacing-s;
        }
      }
    }
    ul {
      display: flex;
      li {
        margin-right: $spacing-m;
        a {
          color: $white;
          font-weight: 500;
          text-decoration: none;

          &:hover {
            color: $orange;
          }
        }
      }
    }
  }
}

@keyframes grow {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}
</style>
