const api = require('./core/RestApiSender.js');
const Stopwatch = require('statman-stopwatch');
var baseUrl = "http://162.253.16.28:5010/api/send";

/* TODO: change according to your own data
 * for username & password. If you set 'dlrMask' to 1,
 * please specify the 'dlrUrl'
 */
var req = require('./models/MtRequest.js');
req.username = "YOUR_USERNAME";
req.password = "YOUR_PASSWORD";
req.from = "NodeJs Sample";
req.to = "60123456789";
req.text = "NodeJs sample using HTTP POST & GET";
req.coding = "1";
req.dlrMask = "0";
req.dlrUrl = "YOUR_DLR_URL"
req.responseType = "json";

/* TODO: change this between 1 - 2 to switch result
 * 1 = Send using POST
 * 2 = Send using GET
 */

var type = 1;
switch (type) {
    case 1: sendSmsUsingPost(); break;
    case 2: sendSmsUsingGet(); break;
    default: break;
}


// ================== METHODS =======================

async function sendSmsUsingPost() {
    console.log("Executing POST request..");

    var sw = new Stopwatch();
    sw.start();

    var resp = await api.sendPostUsingAxiosAsync(req, baseUrl);
    var elapsed = Math.round(sw.stop());

    console.log(resp);
    console.log(`Time taken: ${elapsed} ms`);
}

async function sendSmsUsingGet() {
    console.log("Executing GET request..");

    var sw = new Stopwatch();
    sw.start();

    var url = baseUrl
        + "?gw-username=" + req.username
        + "&gw-password=" + req.password
        + "&gw-from=" + encodeURIComponent(req.from)
        + "&gw-to=" + encodeURIComponent(req.to)
        + "&gw-text=" + encodeURIComponent(req.text)
        + "&gw-dlr-mask=" + req.dlrMask
        + "&gw-dlr-url=" + req.dlrUrl
        + "&gw-resp-type=" + req.responseType;

    // Uncomment for Axios GET
    var resp = await api.sendGetUsingAxiosAsync(url);

    // Uncomment for Node-Fetch GET
    //var resp = await api.sendGetUsingNodeFetchAsync(url);

    var elapsed = Math.round(sw.stop());

    console.log(resp);
    console.log(`Time taken: ${elapsed} ms`);

}