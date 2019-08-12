const express = require('express');

class TestRouter extends express.Router {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.router = super.Router;
    }
    route

}