import faker from 'faker';

import Category from '@/models/Category';

describe('Category.js', () => {
  it('getPayloadToAddCategory method should return an object with expected properties', () => {
    const categoryForm = { name: faker.lorem.word() };
    const expected = { name: expect.anything() };
    const payload = Category.getPayloadToAddCategory(categoryForm);
    expect(payload).toEqual(expected);
  });
});
