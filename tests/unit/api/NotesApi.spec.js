import { NotesApi } from '@/api/NotesApi';
import mainHttpClient from '@/http/main/MainHttpClient';

describe('NotesApi.js', () => {
  let notesApi;

  beforeEach(() => {
    notesApi = new NotesApi(mainHttpClient);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('if getNotes method is called, then httpClient get method should be called with expected url and params', async () => {
    const url = '/api/notes';
    const params = { page: 1, 'per-page': 20 };
    const spy = jest.spyOn(mainHttpClient, 'get').mockImplementation(() => Promise.resolve());
    await notesApi.getNotes(params);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url, params);
  });

  it('if getNote method is called, then httpClient get method should be called with expected url', async () => {
    const noteId = 1;
    const url = `/api/notes/${noteId}`;
    const spy = jest.spyOn(mainHttpClient, 'get').mockImplementation(() => Promise.resolve());
    await notesApi.getNote(noteId);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url);
  });

  it('if addNote method is called, then httpClient get method should be called with expected url and payload', async () => {
    const url = '/api/notes';
    const payload = { description: 'Need some placeholder text in your code?' };
    const spy = jest.spyOn(mainHttpClient, 'post').mockImplementation(() => Promise.resolve());
    await notesApi.addNote(payload);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url, payload);
  });

  it('if updateNote method is called, then httpClient get method should be called with expected url and payload', async () => {
    const noteId = 1;
    const url = `/api/notes/${noteId}`;
    const payload = { description: 'Need some placeholder text in your code?' };
    const spy = jest.spyOn(mainHttpClient, 'put').mockImplementation(() => Promise.resolve());
    await notesApi.updateNote(noteId, payload);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url, payload);
  });

  it('if deleteNote method is called, then httpClient get method should be called with expected url', async () => {
    const noteId = 1;
    const url = `/api/notes/${noteId}`;
    const spy = jest.spyOn(mainHttpClient, 'delete').mockImplementation(() => Promise.resolve());
    await notesApi.deleteNote(noteId);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url);
  });
});
