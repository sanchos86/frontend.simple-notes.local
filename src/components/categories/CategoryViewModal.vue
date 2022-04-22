<template>
  <div class="d-inline-flex">
    <v-dialog
      v-model="isDialogOpened"
      max-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="info"
          small
          v-on="on"
        >
          View more
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Category&nbsp;<i class="text-decoration-underline">{{ category.name }}</i>
        </v-card-title>
        <v-card-text>
          <v-container class="pa-0">
            <v-row>
              <v-col>
                <div class="d-flex mb-2">
                  <span class="font-weight-bold black--text">Category id:&nbsp;</span>
                  <span>{{ category.id }}</span>
                </div>
                <div class="d-flex">
                  <span class="font-weight-bold black--text">Category name:&nbsp;</span>
                  <span>{{ category.name }}</span>
                </div>
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
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'CategoryViewModal',

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
