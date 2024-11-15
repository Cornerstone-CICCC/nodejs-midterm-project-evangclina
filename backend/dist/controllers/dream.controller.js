"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dream_model_1 = __importDefault(require("../models/dream.model"));
const getDreams = (req, res) => {
    const { userId } = req.session;
    const dreams = dream_model_1.default.getAll();
    res.json(dreams);
};
const getDreamById = (req, res) => {
    const { id } = req.params;
    const dream = dream_model_1.default.findById(id);
    if (!dream) {
        res.status(404).json({ message: "Dream not found" });
        return;
    }
    res.json(dream);
};
const addDream = (req, res) => {
    const { userId } = req.session;
    const { title, content, date } = req.body;
    if (!title || !content) {
        res.status(400).json({ message: "Missing title or user id" });
        return;
    }
    const dream = dream_model_1.default.create({ title, content, date, userId });
    res.status(201).json(dream);
};
const updateDreamById = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    const { title, content, date } = req.body;
    const dream = dream_model_1.default.edit(id, { title, content, date, userId });
    if (!dream) {
        res.status(404).json({ message: "Dream not found" });
        return;
    }
    res.json(dream);
};
const deleteDreamById = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    const response = dream_model_1.default.delete(id, userId);
    if (!response) {
        res.status(404).json({ message: "Dream not found" });
        return;
    }
    res.status(204).send();
};
exports.default = {
    getDreams,
    getDreamById,
    addDream,
    updateDreamById,
    deleteDreamById
};
