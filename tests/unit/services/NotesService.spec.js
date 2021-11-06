import notesApi from '@/api/NotesApi';
import Note from '@/models/Note';
import { NotesService } from '@/services/NotesService';

describe('NotesService.js', () => {
  let notesService;

  beforeEach(() => {
    notesService = new NotesService(notesApi);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('if getNotes is called and underlying api call is succeed, then resolved value is an array of Note instances', async () => {
    const data = Array.from({ length: 5 }).map((_, index) => index);
    const models = data.map((el) => new Note(el));
    jest.spyOn(notesApi, 'getNotes').mockImplementation(() => Promise.resolve({ data }));
    const result = await notesService.getNotes();

    expect(result).toEqual(models);
  });

  it('if getNotes is called and underlying api call is failed, then resolved value is an empty array', async () => {
    const error = new Error('notesApi.getNotes error');
    jest.spyOn(notesApi, 'getNotes').mockImplementation(() => Promise.reject(error));
    const spy = jest.spyOn(notesService, 'getNotes');
    const result = await notesService.getNotes();

    expect(spy).not.toThrow();
    expect(result).toEqual([]);
  });

  it('if getNote is called and no errors thrown, then resolved value is an instance of Note', async () => {
    const noteId = 1;
    const noteForm = { id: noteId };
    const note = new Note(noteForm);
    jest.spyOn(notesApi, 'getNote').mockImplementation(() => Promise.resolve(note));
    const result = await notesService.getNote(noteId);

    expect(result).toEqual(note);
  });

  it('if getNote is called and an error is thrown, then rejected value is thrown error', async () => {
    const noteId = 1;
    const error = new Error('notesApi.getNote error');
    jest.spyOn(notesApi, 'getNote').mockImplementation(() => Promise.reject(error));

    await expect(notesService.getNote(noteId)).rejects.toThrow(error);
  });
});
