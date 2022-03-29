<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path)}"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      @click="toAbout"
      class="user">
      <img 
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/    // '/movie'로 시작하는 경로
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ])
  },
  methods: {
    isMatch(path) {
      /*
      // computed에서 mapState로 가져온 데이터들을 여기서도 사용 가능
      this.image
      this.message
      */
      if(!path) return false
      console.log(this.$route)    
      return path.test(this.$route.fullPath) // route객체에서 제공하는 경로를 이용
    },
    toAbout() {
      console.log('!!!')
      this.$router.push('/about')
      // 이런식으로 RouterLink 사용안하고 $router.push로 경로 지정 가능
    }
  }
}
</script>

<style lang="scss" scoped>

header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
      margin-right: 40px;
    }
    .user {
      width: 40px;
      height: 40px;
      padding: 6px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      margin: auto;
      transition: 0.4s;
      &:hover {
        background-color: darken($gray-200, 10%);
      }
      img {
        width: 100%;
      }
    }
    @include media-breakpoint-down(sm) {
      .nav {
        display: none;
      }
    }
  }
</style>