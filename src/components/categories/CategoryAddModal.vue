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
          <v-icon>{{ icons.mdiPlus }}</v-icon>Add category
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Add category</v-card-title>
        <v-card-text>
          <form
            id="addCategoryForm"
            @submit.prevent="addCategory"
          >
            <v-container class="pa-0">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="$v.form.name.$model"
                    label="Name"
                    placeholder="Enter at least two characters ..."
                    :error-messages="$getValidationMessage($v.form.name)"
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
            form="addCategoryForm"
            small
            :loading="loading.addCategory"
            :disabled="isFormInvalid"
          >
            Add category
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { required, maxLength } from 'vuelidate/lib/validators';
  import { mdiPlus } from '@mdi/js';

  import ValidationMixin from '@/mixins/ValidationMixin';
  import categoriesService from '@/services/CategoriesService';
  import alertService from '@/services/AlertService';
  import errorCodes from '@/constants/errorCodes';
  import successCodes from '@/constants/successCodes';

  export default {
    name: 'CategoryAddModal',

    mixins: [ValidationMixin],

    data() {
      return {
        isDialogOpened: false,
        loading: {
          addCategory: false,
        },
        form: {
          name: '',
        },
        icons: {
          mdiPlus,
        },
      };
    },

    validations() {
      return {
        form: {
          name: {
            required,
            maxLength: maxLength(255),
          },
        },
      };
    },

    computed: {
      isFormInvalid() {
        return this.$v.form.$invalid;
      },
    },

    methods: {
      async addCategory() {
        const { isFormInvalid, form } = this;
        if (isFormInvalid) {
          this.$v.form.$touch();
        } else {
          try {
            this.loading.addCategory = true;
            await categoriesService.addCategory(form);
            alertService.addSuccessAlert(successCodes.ADD_CATEGORY);
            this.isDialogOpened = false;
          } catch (e) {
            alertService.addErrorAlert(errorCodes.ADD_CATEGORY);
          } finally {
            this.loading.addCategory = false;
          }
        }
      },
    },
  };
</script>
