<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="8">
        <h1>Categories</h1>
      </v-col>
      <v-col
        cols="4"
        class="text-right"
      >
        <CategoryAddModal />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <CategoriesTable
          :loading="loading"
          :categories="categories"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  import categoriesService from '@/services/CategoriesService';

  import CategoriesTable from '@/components/categories/CategoriesTable.vue';
  import CategoryAddModal from '@/components/categories/CategoryAddModal.vue';

  export default {
    components: {
      CategoryAddModal,
      CategoriesTable,
    },

    data() {
      return {
        loading: {
          getCategories: true,
        },
      };
    },

    computed: {
      ...mapState('categories', ['categories']),
    },

    async created() {
      await categoriesService.getCategories();
      this.loading.getCategories = false;
    },
  };
</script>
