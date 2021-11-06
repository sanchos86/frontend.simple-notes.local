import Category from '@/models/Category';

export default class Note {
  constructor(note = {}) {
    this.id = note.id;
    this.description = note.description;
    this.priority = note.priority;
    this.date = note.date;
    this.completed = note.completed;
    this.category = new Category(note.category);
  }

  static getPayloadToAddNote(noteForm) {
    return {
      description: noteForm.description,
      priority: noteForm.priority?.value,
      date: noteForm.date, // TODO format
      category_id: noteForm.category?.value,
    };
  }

  static getPayloadToUpdateNote(noteForm) {
    return {
      description: noteForm.description,
      priority: noteForm.priority?.value,
      date: noteForm.date, // TODO format
      category_id: noteForm.category?.value,
      completed: noteForm.completed,
    };
  }
}
