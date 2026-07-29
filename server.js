// ✅ 2. Main Server File (server.js)
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const authUser = require("./routes/auth");
const crudUser = require("./routes/users");

const authCustomer = require("./routes/customerAuth");
const crudCustomer = require("./routes/customers");

const protectedProfile = require("./routes/protectedProfile");

dotenv.config();
const app = express();
// app.use(cors());// only for test
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.ADMIN_FRONTEND_URL],
    credentials: true,
  }),
);

app.use(express.json());

connectDB();

app.use("/api/auth", authUser);
app.use("/api/users", crudUser);

app.use("/api/customerAuth", authCustomer);
app.use("/api/customers", crudCustomer);

app.use("/api/protected", protectedProfile); // for protected profile page - route

// // Test route from previuos at the first  post testing practice
app.get("/", (req, res) => {
  return res.send("Hello, World!"); // it shows this in the Server running on http://localhost:3000 if you open in teh browser
});

app.get("/hello", (req, res) => {
  res.send("Hello from the backend!"); // it can show this in the Server running on http://localhost:3000/hello if you open in teh browser
});

// ////////////

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`),
);
