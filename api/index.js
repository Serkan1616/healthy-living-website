import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import {db} from "./db.js";

const app= express();
app.use(
    // if use cors() only (empty), that means api can be called from any domain
    cors({
      origin: "http://localhost:5173", // this depend on your local client server, if client running in localhost:5173, just change it to 5173
      credentials: true, // this for exchanging auth e.g. cookies
    })
  );
app.use(cookieParser());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file=req.file
  res.status(200).json(file.filename);
 
});

app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)

app.get("/deneme",(req,res)=>{

  const keys = ["Food", "Grams"]; // Veritabanındaki sütun isimleri
  const search = (data, query) => {
    const sanitizedQuery = query.toLowerCase();
  
    return data
      .filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(sanitizedQuery))
      )
      .slice(0, 10);
  };
 
 const q = "SELECT * FROM foods";

// Veritabanı sorgusu
db.query(q, (err, data) => {
  const food = req.query.food;
const result = food ? search(data, food) : [];
res.json(result);
});
  
})





app.listen(8800, ()=> {
    console.log("connected!")
})