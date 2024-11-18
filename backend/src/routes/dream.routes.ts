import { Router } from "express";
import dreamController from "../controllers/dream.controller";
import { checkAuth } from "../middleware/auth";

const dreamRouter = Router()

dreamRouter.post("/add", checkAuth, dreamController.addDream)
dreamRouter.put("/update/:id", checkAuth, dreamController.updateDreamById)
dreamRouter.delete("/delete/:id", checkAuth, dreamController.deleteDreamById)
dreamRouter.get("/:id", checkAuth, dreamController.getDreamById)
dreamRouter.get("/", checkAuth, dreamController.getDreams)

export default dreamRouter