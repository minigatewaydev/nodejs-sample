var api = require('./core/WebApiSender.js').methods;
var baseUrl = "http://162.253.16.28:5010/api/send";

/* TODO: change according to your own data
 * for username & password. If you set 'dlrMask' to 1,
 * please specify the 'dlrUrl'
 */

var req = require('./models/MtRequest.js').prop;
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

var type = 1;
switch (type) {
    case 1: sendSmsUsingPost(req); break;
    case 2: sendSmsUsingGet(req); break;
    default: break;
}


// ================== METHODS =======================

async function sendSmsUsingPost(req) {
    console.log("Executing POST request..");

    var resp = await api.sendUsingPostAxiosAsync(req, baseUrl);
    console.log(resp);
}

async function sendSmsUsingGet(req) {
    console.log("Executing GET request..");

    var url = baseUrl
        + "?gw-username=" + req.username
        + "&gw-password=" + req.password
        + "&gw-from=" + req.from
        + "&gw-to=" + req.to
        + "&gwno-text=" + req.text
        + "&gw-dlr-mask=" + req.dlrMask
        + "&gw-dlr-url=" + req.dlrUrl
        + "&gw-resp-type=" + req.responseType;

    var resp = await api.sendUsingGetNodeFetchAsync(url);
    console.log(resp);
}