import express from "express";
import  dotenv from "dotenv";
import { connectDb } from "./config/database.js";
import authRouter from "./routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import mediaRouter from "./routes/mediaRoutes.js";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use(cors());
// app.use(express.urlencoded({ extended: true }));

app.use('/public/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.get('/', (req, res) => {
    res.send("Welcome!!!");
});

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/media', mediaRouter);

app.use('/api/v1/', (req, res) => {
    res.send({ api: "api running..." });
});

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log('server running on port', PORT);
});

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
    } catch (error) {
        console.error('error while initiating database connection', error);
    }
};

start();