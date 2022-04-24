import Category from '@/models/Category';

describe('Category.js', () => {
  it('getPayloadToAddCategory method should return an object with expected properties', () => {
    const name = 'Random name to add category';
    const addCategoryForm = { name };
    const expected = { name };
    const payload = Category.getPayloadToAddCategory(addCategoryForm);
    expect(payload).toEqual(expected);
  });

  it('getPayloadToEditCategory method should return an object with expected properties', () => {
    const name = 'Random name to edit category';
    const editCategoryForm = { name };
    const expected = { name };
    const payload = Category.getPayloadToEditCategory(editCategoryForm);
    expect(payload).toEqual(expected);
  });
});
