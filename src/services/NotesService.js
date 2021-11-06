import notesApi from '@/api/NotesApi';
import Note from '@/models/Note';

export class NotesService {
  // eslint-disable-next-line no-shadow
  constructor(notesApi) {
    this.notesApi = notesApi;
  }

  async getNotes(params) {
    try {
      const { data } = await this.notesApi.getNotes(params);
      return data.map((el) => new Note(el));
    } catch (e) {
      return [];
    }
  }

  async getNote(noteId) {
    const note = await this.notesApi.getNote(noteId);
    return new Note(note);
  }

  addNote(noteForm) {
    const payload = Note.getPayloadToAddNote(noteForm);
    return this.notesApi.addNote(payload);
  }

  updateNote(noteId, noteForm) {
    const payload = Note.getPayloadToUpdateNote(noteForm);
    return this.notesApi.updateNote(noteId, payload);
  }

  deleteNote(noteId) {
    return this.notesApi.deleteNote(noteId);
  }
}

export default new NotesService(notesApi);
