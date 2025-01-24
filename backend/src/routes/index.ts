import { Router } from "express";
import { responseRoutes } from "../services/monitor/route";


const router: Router = Router();

const v1: Array<Router> = [responseRoutes];

router.use("/api/", v1);

export default router;