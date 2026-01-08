const express = require('express');
const userRouter = require("./routes/userRoutes");
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors()); // allow all origins


// Mount router
app.use("/api/v1", userRouter);

app.get("/", (req, res) => res.send("Server is running"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
