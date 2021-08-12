// //@ts-ignore
// import { APIMessageContentResolvable } from "discord.js";
// import { APIMessage, Structures } from "discord.js";

// class ExtAPIMessage extends APIMessage {
//   resolveData() {
//     if (this.data) return this;
//     super.resolveData();
//     const allowedMentions = this.options.allowedMentions || this.target.client.options.allowedMentions || {};
//     //@ts-ignore
//     if (allowedMentions.repliedUser !== undefined) {
//       //@ts-ignore
//       if (this.data.allowed_mentions === undefined) this.data.allowed_mentions = {};
//       //@ts-ignore
//       Object.assign(this.data.allowed_mentions, { replied_user: allowedMentions.repliedUser });
//     }
//     //@ts-ignore
//     if (this.options.replyTo !== undefined) {
//       //@ts-ignore
//       Object.assign(this.data, { message_reference: { message_id: this.options.replyTo.id } });
//     }
//     return this;
//   }
// }

// class Message extends Structures.get("Message") {
//   //@ts-ignore
//   inlineReply(content: APIMessageContentResolvable, options) {
//     //@ts-ignore
//     return this.channel.send(ExtAPIMessage.create(this, content, options, { replyTo: this }).resolveData());
//   }

//   //@ts-ignore
//   edit(content, options) {
//     //@ts-ignore
//     return super.edit(ExtAPIMessage.create(this, content, options).resolveData());
//   }
// }

// //@ts-ignore
// Structures.extend("Message", () => Message);
