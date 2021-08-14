<template>
  <div class="alert-manager">
    <AlertItem
      v-for="(alert, index) in alerts"
      :key="index"
      :alert="alert"
      @remove-alert="removeAlert"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import alertService from '@/services/AlertService';

  import AlertItem from '@/components/shared/AlertItem.vue';

  export default {
    components: {
      AlertItem,
    },

    computed: {
      ...mapState('alerts', [
        'alerts',
      ]),
    },

    methods: {
      removeAlert(alert) {
        alertService.removeAlert(alert);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .alert-manager {
    position: fixed;
    top: 1rem;
    min-width: 320px;
    max-width: 100%;
    z-index: map_get($z-indices, 25);
    left: 50%;
    transform: translate(-50%, 0);
    box-sizing: border-box;

    &__details {
      white-space: pre;
    }
  }
</style>
