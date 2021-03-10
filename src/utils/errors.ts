export class NotInVoice extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotInVoice.prototype);
  }
}
