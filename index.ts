import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";
import qr from "qrcode";

const app: Express = express();
const port: number = 5000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.post("/scan", (req: Request, res: Response, next: NextFunction) => {
  const url: string = req.body.url;

  // If the input is null, return "Empty Data" error
  if (url.length === 0) res.send("Empty Data!");

  // Convert the input stored in the URL and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
  // It will be returned as a PNG image format
  // In case of an error, save the error inside the "err" variable and display it

  qr.toDataURL(url, (err: Error, src: string) => {
    if (err) return next(err);

    // Return the QR code image as the response and set it to be the source used in the webpage
    res.render("scan", { src });
  });
});

app.listen(port, () => console.log(`Server at Port:${port}`));
