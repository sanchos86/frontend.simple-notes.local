import mainHttpClient from '@/http/main/MainHttpClient';

export class NotesApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getNotes(params) {
    const url = '/api/notes';
    return this.httpClient.get(url, params);
  }

  getNote(id) {
    const url = `/api/notes/${id}`;
    return this.httpClient.get(url);
  }

  addNote(payload) {
    const url = '/api/notes';
    return this.httpClient.post(url, payload);
  }

  updateNote(id, payload) {
    const url = `/api/notes/${id}`;
    return this.httpClient.put(url, payload);
  }

  deleteNote(id) {
    const url = `/api/notes/${id}`;
    return this.httpClient.delete(url);
  }
}

export default new NotesApi(mainHttpClient);
