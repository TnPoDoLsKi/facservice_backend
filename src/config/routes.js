import express from "express";

import majorRoute from "../components/major/majorRoutes";
import formationRoute from "../components/formation/formationRoutes";
import levelRoute from "../components/level/levelRoutes";
import subjectRoute from "../components/subject/subjectRoutes";
import userRoute from "../components/user/userRoutes";
import authRoute from "../components/auth/authRoutes";
import documentRoute from "../components/document/documentRoutes";
import correctionRoute from "../components/correction/correctionRoutes";

const router = express.Router();

majorRoute(router);
formationRoute(router);
levelRoute(router);
subjectRoute(router);
userRoute(router);
authRoute(router);
documentRoute(router);
correctionRoute(router);

export default router;
