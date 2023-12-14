const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const port = process.env.PORT;
app.use(methodOverride("_method"));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

const routeClient = require("./routes/clients/index.route");
routeClient(app);

const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);

const database = require("./config/database");
database.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(port);
});

// __dirname khi up code lên thì nó sẽ k hiểu cách đi vào file nên dùng dirname