import express  from "express";
import router from "./router/router.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(8000, () => {
    console.log("Server listen on http://localhost:8000");
});