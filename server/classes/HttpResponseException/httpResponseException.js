class HttpResponseException {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

module.exports = HttpResponseException;