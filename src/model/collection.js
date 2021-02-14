export default class Collection {
  constructor(name, documentNames) {
    this.name = name;
    this.documentNames = documentNames;
    this.size = this.documentNames.length;
  }

  getName() {
    return this.name;
  }

  getNumDocs() {
    return this.documentNames.length
  }
}
