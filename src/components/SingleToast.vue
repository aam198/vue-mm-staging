<template>
  <div class="toast">
    <div class="sidebar" :class="toast.type"></div>
    <div class="content">
      <div class="header">
        <h3> {{ toast.title }} </h3>
        <button @click="dismissToast"><i class="fa-solid fa-rectangle-xmark"></i></button>
      </div>
      <div class="text">
        <p>{{ toast.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleToast',
  props: {
    toast: { required: true, type: Object}
  },
  created () {
    setTimeout(() => {
      this.dismissToast();
    }, 5000);
  },
  methods: {
    dismissToast() {
      this.$store.commit('clearToast', this.toast.title);
    }
  }
}
</script>
