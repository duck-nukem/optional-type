export class InvalidValueException extends Error {
  constructor() {
    super('Optional received an invalid value');
  }
}