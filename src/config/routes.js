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
import searchRoute from "../components/search/searchRoutes";

majorRoute(router);
formationRoute(router);
levelRoute(router);
sectionRoute(router);
subjectRoute(router);
userRoute(router);
authRoute(router);
documentRoute(router);
searchRoute(router);

export default router;
