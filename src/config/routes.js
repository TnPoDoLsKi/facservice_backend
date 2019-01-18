import express from "express";
const router = express.Router();

import majorRoute from "../components/major/majorRoutes";
import formationRoute from "../components/formation/formationRoutes";
import levelRoute from "../components/level/levelRoutes";
import sectionRoute from "../components/section/sectionRoutes";
import subjectRoute from "../components/subject/subjectRoutes";
import userRoute from "../components/user/userRoutes";
import authRoute from "../components/auth/authRoutes";
import documentRoute from "../components/document/documentRoutes";
import correctionRoute from "../components/correction/correctionRoutes";

majorRoute(router);
formationRoute(router);
levelRoute(router);
sectionRoute(router);
subjectRoute(router);
userRoute(router);
authRoute(router);
documentRoute(router);
correctionRoute(router);

export default router;
