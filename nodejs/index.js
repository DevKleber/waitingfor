const express = require("express");

const { routes } = require("./routes");
const cors = require("cors");

const port = 3331;
const app = express();

app.use(express.json());

app.use(cors()).use(routes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
