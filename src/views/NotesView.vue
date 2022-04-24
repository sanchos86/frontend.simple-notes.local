<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="8">
        <h1>Notes</h1>
      </v-col>
      <v-col
        cols="4"
        class="text-right"
      >
        <v-btn
          color="primary"
          small
        >
          <v-icon>{{ mdiPlus }}</v-icon>Add note
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>Filters</v-col>
    </v-row>
    <v-row>
      <v-col>Notes table goes here</v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mdiPlus } from '@mdi/js';

  import notesService from '@/services/NotesService';

  export default {
    data() {
      return {
        mdiPlus,
        open: false,
        notes: [],
        loading: {
          getNotes: true,
        },
      };
    },

    async created() {
      this.loading.getNotes = true;
      this.notes = await notesService.getNotes();
      this.loading.getNotes = false;
    },
  };
</script>
