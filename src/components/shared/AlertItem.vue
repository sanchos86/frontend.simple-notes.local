<template>
  <v-alert
    class="alert-item"
    :type="alert.type"
    :icon="false"
    dismissible
    @input="removeAlert"
  >
    <span
      v-test="{ id: 'alert-item__title'}"
      class="alert-item__title"
    >
      {{ alert.title }}
    </span>
    <template v-if="alert.details">
      <br>
      <span
        v-test="{ id: 'alert-item__details' }"
        class="alert-item__details"
      >
        {{ alert.details }}
      </span>
    </template>
  </v-alert>
</template>

<script>
  export default {
    props: {
      alert: {
        type: Object,
        required: true,
      },
    },

    methods: {
      removeAlert() {
        this.$emit('remove-alert', this.alert);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .alert-item__details {
    white-space: pre;
  }
</style>
