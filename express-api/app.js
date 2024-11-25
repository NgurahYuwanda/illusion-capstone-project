const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");
const historyRoutes = require("./routes/historyRoutes");
const detectionRoutes = require("./routes/detectionRoutes");

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/detection", detectionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
