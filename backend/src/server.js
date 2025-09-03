import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import XLSX from "xlsx";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;

const allowedOrigins =
  process.env.ORIGIN?.split(",").map((o) => o.trim()) || [];
console.log("Allowed Origins:", allowedOrigins);
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());

// MongoDB connection
const dbURL = process.env.MONGO_URL;

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Schema to store file data
const FileSchema = new mongoose.Schema(
  {
    filename: String,
    columns: [String],
    rows: [{}], // Array of objects (key: column, value: data)
  },
  { timestamps: true }
);
const FileModel = mongoose.model("File", FileSchema);

const upload = multer({ dest: "uploads/" });
// Upload Route
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    let rows = [];
    let columns = [];

    if (req.file.mimetype === "text/csv") {
      // Parse CSV
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("headers", (headers) => {
          columns = headers;
        })
        .on("data", (data) => rows.push(data))
        .on("end", async () => {
          const fileDoc = new FileModel({
            filename: req.file.originalname,
            columns,
            rows,
          });
          await fileDoc.save();
          fs.unlinkSync(filePath); // remove temp file
          res.json({ message: "CSV uploaded successfully", file: fileDoc });
        });
    } else {
      // Parse Excel
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      columns = Object.keys(sheetData[0]);
      rows = sheetData;

      const fileDoc = new FileModel({
        filename: req.file.originalname,
        createdAt: req.file.createdAt,
        columns,
        rows,
      });
      await fileDoc.save();
      fs.unlinkSync(filePath);
      res.json({ message: "Excel uploaded successfully", file: fileDoc });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File upload failed" });
  }
});

// Get files list
app.get("/files", async (req, res) => {
  const files = await FileModel.find();
  res.json(files);
});

// Get single file columns + data
app.get("/file/:id", async (req, res) => {
  const file = await FileModel.findById(req.params.id);
  res.json(file);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Update file rows
app.put("/file/:id", async (req, res) => {
  try {
    const { rows } = req.body;
    const file = await FileModel.findByIdAndUpdate(
      req.params.id,
      { rows },
      { new: true }
    );
    res.json(file);
  } catch (err) {
    res.status(500).json({ error: "Failed to update file" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
