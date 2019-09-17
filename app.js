var api = require('./core/RestApiSender.js');
var baseUrl = "http://162.253.16.28:5010/api/send";

/* TODO: change according to your own data
 * for username & password. If you set 'dlrMask' to 1,
 * please specify the 'dlrUrl'
 */

var req = require('./models/MtRequest.js');
req.username = "httpprepaid";
req.password = "123456";
req.from = "NodeJs Sample";
req.to = "60123456789";
req.text = "NodeJs sample using HTTP POST & GET";
req.coding = "1";
req.dlrMask = "1";
req.dlrUrl = "http://127.0.0.1:5002/api/dlr/save-json"
req.responseType = "json";

/* TODO: change this between 1 - 2 to switch result
 * 1 = Send using POST
 * 2 = Send using GET
 */

var type = 2;
switch (type) {
    case 1: sendSmsUsingPost(); break;
    case 2: sendSmsUsingGet(); break;
    default: break;
}


// ================== METHODS =======================

async function sendSmsUsingPost() {
    console.log("Executing POST request..");

    var resp = await api.sendPostUsingAxiosAsync(req, baseUrl);
    console.log(resp);
}

async function sendSmsUsingGet() {
    console.log("Executing GET request..");

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

    console.log(resp);
}