class HttpResponseException {
  constructor(state, details) {
    this.state = state;
    this.details = details;
  }
}

module.exports = HttpResponseException;