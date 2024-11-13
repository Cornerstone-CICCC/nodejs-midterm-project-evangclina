"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class DreamModel {
    constructor() {
        this.dreams = [];
    }
    getAll() {
        return this.dreams;
    }
    findById(id) {
        const dream = this.dreams.find(d => d.id === id);
        if (!dream)
            return undefined;
        return dream;
    }
    create(data) {
        const newDream = Object.assign({ id: (0, uuid_1.v4)() }, data);
        this.dreams.push(newDream);
        return newDream;
    }
    edit(id, newData) {
        const index = this.dreams.findIndex(d => d.id === id);
        if (index === -1)
            return undefined;
        if (this.dreams[index].userId !== newData.userId)
            return undefined;
        const updatedDream = Object.assign(Object.assign({}, this.dreams[index]), newData);
        this.dreams[index] = updatedDream;
        return updatedDream;
    }
    delete(id, userId) {
        const index = this.dreams.findIndex(d => d.id === id);
        if (index === -1)
            return false;
        this.dreams.splice(index, 1);
        return true;
    }
}
exports.default = new DreamModel;
