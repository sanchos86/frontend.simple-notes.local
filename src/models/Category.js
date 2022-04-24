export default class Category {
  /**
   * @typedef {Object} CategoryData
   * @property {number} id
   * @property {string} name
   *
   * @param {CategoryData} category
   */
  constructor(category = {}) {
    this.id = category.id;
    this.name = category.name;
  }

  static getPayloadToAddCategory({ name }) {
    return { name };
  }

  static getPayloadToEditCategory({ name }) {
    return { name };
  }
}
