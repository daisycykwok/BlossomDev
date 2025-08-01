import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import path from "path";

// Route imports
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Route handlers
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/contact", contactRoutes);

// Error handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app")));

export default app;
