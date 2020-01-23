let { inspect } = require('util');

let Context = require('./context');
let MessageContext = require('./message');

class Poll extends Context {
  constructor(telegram, update) {
    super(telegram, 'poll');

    this.update = update;
  }

  get id() {
    return this.update.id;
  }

  get question() {
    return this.update.question;
  }

  get options() {
    return this.update.options;
  }

  get isClosed() {
    return this.update.is_closed;
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      id: this.id,
      question: this.question,
      options: this.options,
      isClosed: this.isClosed,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = Poll;
