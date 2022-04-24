<template>
  <div class="d-inline-flex">
    <v-dialog
      v-model="isDialogOpened"
      max-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="primary"
          small
          v-on="on"
        >
          Edit category
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Edit category <i class="text-decoration-underline">{{ category.name }}</i>
        </v-card-title>
        <v-card-text>
          <form
            id="editCategoryForm"
            @submit.prevent="editCategory"
          >
            <v-container class="pa-0">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="form.name"
                    label="Name"
                    placeholder="Enter at least two characters ..."
                  />
                </v-col>
              </v-row>
            </v-container>
          </form>
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
            type="submit"
            color="primary"
            form="editCategoryForm"
            small
            :loading="loading.editCategory"
            :disabled="!anyCategoryFieldChanged || (anyCategoryFieldChanged && isFormInvalid)"
          >
            Save
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
    name: 'CategoryEditModal',

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
          editCategory: false,
        },
        form: {
          name: this.category?.name,
        },
      };
    },

    computed: {
      anyCategoryFieldChanged() {
        return Object.entries(this.form).some(([key, value]) => this.category[key] !== value);
      },
      isFormInvalid() {
        return false;
      },
    },

    methods: {
      async editCategory() {
        const { category: { id: categoryId }, form } = this;
        try {
          this.loading.editCategory = true;
          await categoriesService.editCategory(categoryId, form);
          alertService.addSuccessAlert(successCodes.EDIT_CATEGORY);
          this.isDialogOpened = false;
        } catch (e) {
          alertService.addErrorAlert(errorCodes.EDIT_CATEGORY);
        } finally {
          this.loading.editCategory = false;
        }
      },
    },
  };
</script>
