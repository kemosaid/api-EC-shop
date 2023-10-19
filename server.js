const path = require("path");
require("dotenv").config();
const express = require("express"),
  app = express(),
  ApiError = require("./utils/Apierror"),
  morgan = require("morgan"),
  dbconnection = require("./config/dbconnection"),
  categoryRouter = require("./routes/catigoryRoute"),
  subCategoryRouter = require("./routes/subCatigoryRoute.js"),
  brandRouter = require("./routes/brandRoute"),
  productRouter = require("./routes/productRoute"),
  port = process.env.PORT || 5500,
  globelError = require("./middleware/middleware");

dbconnection();
//middle ware
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`node : ${process.env.NODE_ENV}`);
} else {
  console.log(process.env.NODE_ENV);
}
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/products", productRouter);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
app.use(globelError);

const server = app.listen(port, () => {
  console.log(`server runing on ${port}`);
});
// Handle rejection outside express

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection : ${err.name} : ${err.message}`);
  server.close(() => {
    console.error("server shutdown ....");
    process.exit(1);
  });
});
