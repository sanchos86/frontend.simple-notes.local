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
        <v-card-actions class="px-6 pb-4">
          <v-spacer />
          <v-btn
            outlined
            small
            @click="isDialogOpened = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
      };
    },
  };
</script>
