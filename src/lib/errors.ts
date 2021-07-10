export class NotInVoice extends Error {
  constructor(message = "NotInVoice") {
    super(message);

    Object.setPrototypeOf(this, NotInVoice.prototype);
  }
}
