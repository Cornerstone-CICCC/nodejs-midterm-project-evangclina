"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dream_controller_1 = __importDefault(require("../controllers/dream.controller"));
const auth_1 = require("../middleware/auth");
const dreamRouter = (0, express_1.Router)();
dreamRouter.post("/add", auth_1.checkAuth, dream_controller_1.default.addDream);
dreamRouter.put("/update/:id", auth_1.checkAuth, dream_controller_1.default.updateDreamById);
dreamRouter.delete("/delete/:id", auth_1.checkAuth, dream_controller_1.default.deleteDreamById);
dreamRouter.get("/:id", auth_1.checkAuth, dream_controller_1.default.getDreamById);
dreamRouter.get("/", auth_1.checkAuth, dream_controller_1.default.getDreams);
exports.default = dreamRouter;
