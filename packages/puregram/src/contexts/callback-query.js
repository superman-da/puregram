let { inspect } = require('util');

let Context = require('./context');
let MessageContext = require('./message');

let User = require('../structures/user');

let { filterPayload } = require('../utils');

class CallbackQuery extends Context {
  constructor(telegram, update) {
    super(telegram, 'callback_query');

    this.update = update;
  }

  get id() {
    return this.update.id;
  }

  get from() {
    return new User(this.update.from);
  }

  get senderId() {
    return this.from.id;
  }

  get message() {
    return this.update.message ? new MessageContext(
      this.telegram,
      this.update.message,
    ) : null;
  }

  get inlineMessageId() {
    return this.update.inline_message_id || null;
  }

  get chatInstance() {
    return this.update.chat_instance || null;
  }

  get payload() {
    let { data } = this.update;

    try {
      return JSON.parse(data);
    } catch (e) {
      return data || null;
    }
  }

  get gameShortName() {
    return this.update.game_short_name || null;
  }

  answerCallbackQuery(text, params = {}) {
    return this.telegram.api.answerCallbackQuery({
      callback_query_id: this.id,
      text,
      ...params,
    });
  }

  async send(text = '',params = {}) {
    let response = await this.telegram.api.sendMessage({
      chat_id: this.message.chatId || this.senderId,
      text,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  async reply(text, params = {}) {
    return this.send(text, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendPhoto(photo, params = {}) {
    let response = await this.telegram.api.sendPhoto({
      chat_id: this.message.chatId,
      photo,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithPhoto(photo, params = {}) {
    return this.sendPhoto(photo, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendAudio(audio, params = {}) {
    let response = await this.telegram.api.sendAudio({
      chat_id: this.message.chatId,
      audio,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithAudio(audio, params = {}) {
    return this.sendAudio(audio, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendVideo(video, params = {}) {
    let response = await this.telegram.api.sendVideo({
      chat_id: this.message.chatId,
      video,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithVideo(video, params = {}) {
    return this.sendVideo(video, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendAnimation(animation, params = {}) {
    let response = await this.telegram.api.sendAnimation({
      chat_id: this.message.chatId,
      animation,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithAnimation(animation, params = {}) {
    return this.sendAnimation(animation, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendVideoNote(videoNote, params = {}) {
    let response = await this.telegram.api.sendVideoNote({
      chat_id: this.message.chatId,
      video_note: videoNote,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithVideoNote(videoNote, params = {}) {
    return this.sendVideoNote(videoNote, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendVoice(voice, params = {}) {
    let response = await this.telegram.api.sendVoice({
      chat_id: this.message.chatId,
      voice,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithVoice(voice, params = {}) {
    return this.sendVoice(voice, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendMediaGroup(mediaGroup, params = {}) {
    let response = await this.telegram.api.sendMediaGroup({
      chat_id: this.message.chatId,
      media_group: mediaGroup,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithMediaGroup(mediaGroup, params = {}) {
    return this.sendMediaGroup(mediaGroup, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendLocation(location, params = {}) {
    let response = await this.telegram.api.sendLocation({
      chat_id: this.message.chatId,
      location,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithLocation(location, params = {}) {
    return this.sendLocation(location, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async editMessageLiveLocation(params = {}) {
    let response = await this.telegram.api.editMessageLiveLocation({
      chat_id: this.message.chatId,
      message_id: this.message.id,
      ...params,
    });

    return response !== true
      ? new MessageContext(this.telegram, response)
      : true;
  }

  async stopMessageLiveLocation(params = {}) {
    let response = await this.telegram.api.stopMessageLiveLocation({
      chat_id: this.chatId,
      message_id: this.id,
      ...params,
    });

    return response === true
      ? true
      : new MessageContext(this.telegram, response);
  }

  async sendVenue(venue, params = {}) {
    let response = await this.telegram.api.sendVenue({
      chat_id: this.message.chatId,
      venue,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithVenue(venue, params = {}) {
    return this.sendVenue(venue, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendContact(contact, params = {}) {
    let response = await this.telegram.api.sendContact({
      chat_id: this.message.chatId,
      contact,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithContact(contact, params = {}) {
    return this.sendContact(contact, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendPoll(poll, params = {}) {
    let response = await this.telegram.api.sendPoll({
      chat_id: this.message.chatId,
      poll,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  replyWithPoll(poll, params = {}) {
    return this.sendPoll(poll, {
      reply_to_message_id: this.id,
      ...params,
    });
  }

  async stopPoll(id, params = {}) {
    let response = await this.telegram.api.stopPoll({
      chat_id: this.message.chatId,
      message_id: id,
      ...params,
    });

    return new Poll(response);
  }

  replyWithContact(poll, params = {}) {
    return this.sendPoll(poll, {
      reply_to_message_id: this.message.id,
      ...params,
    });
  }

  async sendChatAction(action, params = {}) {
    return this.telegram.api.sendChatAction({
      chat_id: this.message.chatId,
      action,
      ...params,
    });
  }

  async editMessageText(text, params = {}) {
    let response = await this.telegram.api.editMessageText({
      chat_id: this.message.chatId,
      message_id: this.message.id,
      text,
      ...params,
    });

    return response !== true
      ? new MessageContext(this.telegram, response)
      : true;
  }

  async editMessageCaption(caption, params = {}) {
    let response = await this.telegram.api.editMessageCaption({
      chat_id: this.message.chatId,
      message_id: this.message.id,
      caption,
      ...params,
    });

    return response !== true
      ? new MessageContext(this.telegram, response)
      : true;
  }

  async editMessageMedia(media, params = {}) {
    let response = await this.telegram.api.editMessageMedia({
      chat_id: this.message.chatId,
      message_id: this.message.id,
      media,
      ...params,
    });

    return response !== true
      ? new MessageContext(this.telegram, response)
      : true;
  }

  async editMessageReplyMarkup(replyMarkup, params = {}) {
    let response = await this.telegram.api.editMessageReplyMarkup({
      chat_id: this.message.chatId,
      message_id: this.message.id,
      reply_markup: replyMarkup,
      ...params,
    });

    return response !== true
      ? new MessageContext(this.telegram, response)
      : true;
  }

  deleteMessage(params = {}) {
    return this.telegram.api.deleteMessage({
      chat_id: this.message.chatId,
      message_id: this.message.id,
      ...params,
    });
  }

  async sendSticker(sticker, params = {}) {
    let response = await this.telegram.api.sendSticker({
      chat_id: this.message.chatId,
      sticker,
      ...params,
    });

    return new MessageContext(this.telegram, response);
  }

  async sendDice(chatId = this.chatId) {
    let response = await this.telegram.api.sendDice({
      chat_id: chatId
    });

    return new MessageContext(this.telegram, response);
  }

  getMyCommands() {
    return this.telegram.api.getMyCommands();
  }

  setMyCommands() {
    return this.telegram.api.setMyCommands();
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      id: this.id,
      from: this.from,
      senderId: this.senderId,
      message: this.message,
      inlineMessageId: this.inlineMessageId,
      chatInstance: this.chatInstance,
      payload: this.payload,
      gameShortName: this.gameShortName,
    };

    let filtered = filterPayload(payloadToInspect);

    let payload = inspect(filtered, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = CallbackQuery;
