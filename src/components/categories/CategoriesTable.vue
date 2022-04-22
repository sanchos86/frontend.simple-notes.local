<template>
  <v-data-table
    :items="categories"
    :headers="headers"
    :loading="loading.getCategories"
  >
    <template #item.actions="{ item }">
      <div class="d-inline-flex">
        <CategoryViewModal
          class="mr-2"
          :category="item"
        />
        <CategoryEditModal
          class="mr-2"
          :category="item"
        />
        <CategoryDeleteModal
          :category="item"
        />
      </div>
    </template>
  </v-data-table>
</template>

<script>
  import CategoryViewModal from '@/components/categories/CategoryViewModal.vue';
  import CategoryDeleteModal from '@/components/categories/CategoryDeleteModal.vue';
  import CategoryEditModal from '@/components/categories/CategoryEditModal.vue';

  export default {
    name: 'CategoriesTable',

    components: {
      CategoryViewModal,
      CategoryDeleteModal,
      CategoryEditModal,
    },

    props: {
      categories: {
        type: Array,
        required: true,
      },
      loading: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        headers: [
          { value: 'id', text: 'Id', align: 'start' },
          { value: 'name', text: 'Name' },
          { value: 'actions', text: 'Actions', sortable: false },
        ],
      };
    },
  };
</script>
