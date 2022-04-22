<template>
  <div class="d-inline-flex">
    <v-dialog
      v-model="isDialogOpened"
      max-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="red white--text"
          small
          v-on="on"
        >
          Delete
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Delete category</v-card-title>
        <v-card-text>
          <v-container class="pa-0">
            <v-row>
              <v-col>
                Please, confirm that you want delete category
                <i class="text-decoration-underline">{{ category.name }}</i>.
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="px-6 pb-4">
          <v-spacer />
          <v-btn
            outlined
            small
            @click="isDialogOpened = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red white--text"
            small
            :loading="loading.deleteCategory"
            @click="deleteCategory"
          >
            Delete category
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import categoriesService from '@/services/CategoriesService';
  import alertService from '@/services/AlertService';
  import errorCodes from '@/constants/errorCodes';
  import successCodes from '@/constants/successCodes';

  export default {
    name: 'CategoryDeleteModal',

    props: {
      category: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        isDialogOpened: false,
        loading: {
          deleteCategory: false,
        },
      };
    },

    methods: {
      async deleteCategory() {
        try {
          this.loading.deleteCategory = true;
          await categoriesService.deleteCategory(this.category.id);
          alertService.addSuccessAlert(successCodes.DELETE_CATEGORY);
        } catch (e) {
          alertService.addErrorAlert(errorCodes.DELETE_CATEGORY);
        } finally {
          this.loading.deleteCategory = false;
        }
      },
    },
  };
</script>
