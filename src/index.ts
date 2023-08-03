import express, { Request, Response } from 'express';
import service from './service';
const app = express();
const port = 9000;
const cors = require('cors');

app.use(cors("*"))
app.use('/api/v1', service);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
