const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const { getCities } = require("./api/cities/service"); // see 888 server
// const { getContinents, cacheContinents } = require('./services/continent.service.js');
const port = process.env.PORT || 3030;

const app = express();
// const http = require("http").createServer(app);

// Express App Config

// Consider Saving cookie parser
// app.use(cookieParser());
// Consider Saving cookie parser

// app.use(bodyParser.json()); // perhaps this is unnecessary
// app.use(express.static("../my-app/public/index.html")); // perhaps this is unnecessary
// app.use(
//   session({
//     secret: "project1",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// Routes
// const weatherRoutes = require("./api/weather");
// const siteRoutes = require("./api/admin/sites/routes");
// const singleRoutes = require("./api/admin/singles/routes");
// const articleRoutes = require("./api/admin/articles/routes");
// const videoRoutes = require("./api/admin/videos/routes");

// app.use("/api/weather", weatherRoutes);
// app.use("/api/admin/sites", siteRoutes);
// app.use("/api/admin/singles", singleRoutes);
// app.use("/api/admin/articles", articleRoutes);
// app.use("/api/admin/videos", videoRoutes);

// init.init();

// const logger = require("./services/logger.service");
// app.get("/**", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/public", "index.html"));
// });
app.get("api/cities/:q", getCities);
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
// was http.listen
