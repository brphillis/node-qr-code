"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _qrcode = _interopRequireDefault(require("qrcode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var port = 5000;
app.set("view engine", "ejs");
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, "/views")));
app.use(_express["default"].json());
app.get("/", function (req, res) {
  res.render("index");
});
app.post("/scan", function (req, res, next) {
  var url = req.body.url;

  // If the input is null, return "Empty Data" error
  if (url.length === 0) res.send("Empty Data!");

  // Convert the input stored in the URL and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
  // It will be returned as a PNG image format
  // In case of an error, save the error inside the "err" variable and display it

  _qrcode["default"].toDataURL(url, function (err, src) {
    if (err) return next(err);

    // Return the QR code image as the response and set it to be the source used in the webpage
    res.render("scan", {
      src: src
    });
  });
});
app.listen(port, function () {
  return console.log("Server at Port:".concat(port));
});
