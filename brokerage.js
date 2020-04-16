const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
      var buy = Number(req.body.buy);
      var sell = Number(req.body.sell);
      var net = buy + sell;
      var mtm = sell - buy;
      var brok = (0.05 / 100) * net;
      var igst = .18 * brok;
      var stt = (.025 / 100) * sell;
      var total = brok + igst + stt + 5;
      //total=total.toPrecision(5);
      var amt = mtm - total;
      res.write("<h1>Net traded value (Buy+Sell) : " + net);
      if (mtm < 0)
        res.write("<h1>Your Loss : " + (-mtm));
      else
        res.write("<h1>Your Profit : " + mtm);
      //amt=amt.toPrecision(5);

      res.write("<h1>Aprox Brokerage : " + total);
      if (amt < 0)
        res.write("<h1>Amount Debited : " + (-amt));
        else
          res.write("<h1>Amount Credited : " + amt);
        res.send();
      }); app.listen(3000, function() {
      console.log("Server Hosted at 3000");
    });
