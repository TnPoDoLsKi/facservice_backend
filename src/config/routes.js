import express from "express";
const router = express.Router();

import formationRoute from "../components/formation/formationRoutes";
import levelRoute from "../components/level/levelRoutes";
import sectionRoute from "../components/section/sectionRoutes";
import subjectRoute from "../components/subject/subjectRoutes";
import userRoute from "../components/user/userRoutes";
import authRoute from "../components/auth/authRoutes";
import documentRoute from "../components/document/documentRoutes";

formationRoute(router);
levelRoute(router);
sectionRoute(router);
subjectRoute(router);
userRoute(router);
authRoute(router);
documentRoute(router);

export default router;
