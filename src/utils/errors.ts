export class NotInVoice extends Error {
  constructor(message: string = "NotInVoice") {
    super(message);

    Object.setPrototypeOf(this, NotInVoice.prototype);
  }
}
