import 'reflect-metadata';
import express from "express";
import {Request, Response} from "express";
import bodyParser from  "body-parser";

// create and setup express app
const app = express();
app.use(bodyParser.json());

app.get("/test", function(req: Request, res: Response) {
    console.log('Test');
});

// start express server
app.listen(3000);