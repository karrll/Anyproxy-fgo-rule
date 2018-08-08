import System;
import System.Windows.Forms;
import Fiddler;

class Handlers {

    public static RulesOption("Hide 304s") BindPref("fiddlerscript.rules.Hide304s") var m_Hide304s: boolean = false;

    public static RulesOption("Request &Japanese Content") var m_Japanese: boolean = false;

    public static RulesOption("&Automatically Authenticate") BindPref("fiddlerscript.rules.AutoAuth") var m_AutoAuth: boolean = false;

    RulesString("&User-Agents", true) BindPref("fiddlerscript.ephemeral.UserAgentString") RulesStringValue(0, "Netscape &3", "Mozilla/3.0 (Win95; I)") RulesStringValue(1, "WinPhone8.1", "Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 520) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537") RulesStringValue(2, "&Safari5 (Win7)", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1") RulesStringValue(3, "Safari9 (Mac)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56") RulesStringValue(4, "iPad", "Mozilla/5.0 (iPad; CPU OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F5027d Safari/600.1.4") RulesStringValue(5, "iPhone6", "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4") RulesStringValue(6, "IE &6 (XPSP2)", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)") RulesStringValue(7, "IE &7 (Vista)", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1)") RulesStringValue(8, "IE 8 (Win2k3 x64)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; WOW64; Trident/4.0)") RulesStringValue(9, "IE &8 (Win7)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)") RulesStringValue(10, "IE 9 (Win7)", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)") RulesStringValue(11, "IE 10 (Win8)", "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)") RulesStringValue(12, "IE 11 (Surface2)", "Mozilla/5.0 (Windows NT 6.3; ARM; Trident/7.0; Touch; rv:11.0) like Gecko") RulesStringValue(13, "IE 11 (Win8.1)", "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko") RulesStringValue(14, "Edge (Win10)", "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.11082") RulesStringValue(15, "&Opera", "Opera/9.80 (Windows NT 6.2; WOW64) Presto/2.12.388 Version/12.17") RulesStringValue(16, "&Firefox 3.6", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.7) Gecko/20100625 Firefox/3.6.7") RulesStringValue(17, "&Firefox 43", "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0") RulesStringValue(18, "&Firefox Phone", "Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0") RulesStringValue(19, "&Firefox (Mac)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0") RulesStringValue(20, "Chrome (Win)", "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.48 Safari/537.36") RulesStringValue(21, "Chrome (Android)", "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36") RulesStringValue(22, "ChromeBook", "Mozilla/5.0 (X11; CrOS x86_64 6680.52.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.74 Safari/537.36") RulesStringValue(23, "GoogleBot Crawler", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)") RulesStringValue(24, "Kindle Fire (Silk)", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.22.79_10013310) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true") RulesStringValue(25, "&Custom...", "%CUSTOM%") 
    public static var sUA: String = null;

    public static RulesOption("Simulate &Modem Speeds", "Per&formance") var m_SimulateModem: boolean = false;

    public static RulesOption("&Disable Caching", "Per&formance") var m_DisableCaching: boolean = false;

    public static RulesOption("Cache Always &Fresh", "Per&formance") var m_AlwaysFresh: boolean = false;

    public static ToolsAction("Reset Script") function DoManualReload() {
        FiddlerObject.ReloadScript();
    }

    public static ContextAction("Decode Selected Sessions") function DoRemoveEncoding(oSessions: Session[]) {
        for (var x: int = 0; x < oSessions.Length; x++) {
            oSessions[x].utilDecodeRequest();
            oSessions[x].utilDecodeResponse();
        }
        UI.actUpdateInspector(true, true);
    }

    static function OnBeforeRequest(oSession: Session) {
        if ((null != gs_OverridenHost) && (oSession.host.toLowerCase() == gs_OverridenHost)) {
            oSession["x-overridehost"] = gs_OverrideHostWith;
        }

        if ((null != bpRequestURI) && oSession.uriContains(bpRequestURI)) {
            oSession["x-breakrequest"] = "uri";
        }

        if ((null != bpMethod) && (oSession.HTTPMethodIs(bpMethod))) {
            oSession["x-breakrequest"] = "method";
        }

        if ((null != uiBoldURI) && oSession.uriContains(uiBoldURI)) {
            oSession["ui-bold"] = "QuickExec";
        }

        if (m_SimulateModem) {
            // Delay sends by 300ms per KB uploaded.
            oSession["request-trickle-delay"] = "300";
            // Delay receives by 150ms per KB downloaded.
            oSession["response-trickle-delay"] = "150";
        }

        if (m_DisableCaching) {
            oSession.oRequest.headers.Remove("If-None-Match");
            oSession.oRequest.headers.Remove("If-Modified-Since");
            oSession.oRequest["Pragma"] = "no-cache";
        }

        // User-Agent Overrides
        if (null != sUA) {
            oSession.oRequest["User-Agent"] = sUA;
        }

        if (m_Japanese) {
            oSession.oRequest["Accept-Language"] = "ja";
        }

        if (m_AutoAuth) {
            // Automatically respond to any authentication challenges using the 
            // current Fiddler user's credentials. You can change (default)
            // to a domain\\username:password string if preferred.
            //
            // WARNING: This setting poses a security risk if remote 
            // connections are permitted!
            oSession["X-AutoAuth"] = "(default)";
        }

        if (m_AlwaysFresh && (oSession.oRequest.headers.Exists("If-Modified-Since") || oSession.oRequest.headers.Exists("If-None-Match"))) {
            oSession.utilCreateResponseAndBypassServer();
            oSession.responseCode = 304;
            oSession["ui-backcolor"] = "Lavender";
        }
    }

    static function OnPeekAtResponseHeaders(oSession: Session) {
        //FiddlerApplication.Log.LogFormat("Session {0}: Response header peek shows status is {1}", oSession.id, oSession.responseCode);
        if (m_DisableCaching) {
            oSession.oResponse.headers.Remove("Expires");
            oSession.oResponse["Cache-Control"] = "no-cache";
        }

        if ((bpStatus > 0) && (oSession.responseCode == bpStatus)) {
            oSession["x-breakresponse"] = "status";
            oSession.bBufferResponse = true;
        }

        if ((null != bpResponseURI) && oSession.uriContains(bpResponseURI)) {
            oSession["x-breakresponse"] = "uri";
            oSession.bBufferResponse = true;
        }

    }

    static function OnBeforeResponse(oSession: Session) {
        if (m_Hide304s && oSession.responseCode == 304) {
            oSession["ui-hide"] = "true";
        }
        if (oSession.url.Contains("ac.php") && oSession.GetRequestBodyAsString().Contains("battlesetup")) {
            
            var useridreg = /(?<=userid=)\d\d\d\d\d\d\d\d\d?\d?\d?\d?\d+/gi;
            var userid = oSession.url.match(useridreg);

            var paid = false;
            for (var i = 0; i < paidlist.length; i++) {
                if (userid == paidlist[i]) {
                    paid = true;
                    break;
                }
            }
            var premiumpaid = false;
            for (var i = 0; i < premiumpaidlist.length; i++) {
                if (userid == premiumpaidlist[i]) {
                    premiumpaid = true;
                    break;
                }
            }
            if (paid) {
                FiddlerObject.log("有权限的"+userid+"开启了一场战斗");
                var responseStr: String = oSession.GetResponseBodyAsString();
                responseStr = responseStr.Replace("%3D", "=");
                var plainResStr: String = System.Text.Encoding.ASCII.GetString(System.Convert.FromBase64String(responseStr));
                var json = Fiddler.WebFormats.JSON.JsonDecode(plainResStr);
                if (json.JSONObject["cache"]["replaced"]["battle"] != undefined) {
                    var svts = json.JSONObject["cache"]["replaced"]["battle"][0]["battleInfo"]["userSvt"];
                    for (var sv in svts) {
                        if (sv["hpGaugeType"] != undefined) {
                        	if(userid==100103715225){
                            if (typeof sv['hp'] == typeof "") {
                                sv['hp'] = Convert.ToString((int)(Convert.ToInt32(sv['hp']) / 1));
                            } else {
                                sv['hp'] = (int)(sv['hp'] / 1);
                            }
                          }
                            sv['maxActNum'] = 0;
                            sv['chargeTurn'] = 6;
                        }
                        var num = 1;						
                        if (sv["status"] != undefined && sv["userId"] != undefined && sv["userId"] != "0" && sv["userId"] != 0) {
                            sv['limitCount'] = Convert.ToString(4);
                            sv['dispLimitCount'] = Convert.ToString(4);
                            sv['commandCardLimitCount'] = Convert.ToString(3);
                            sv['iconLimitCount'] = Convert.ToString(4);
                            
                            sv["skillLv1"] = "10";
                            sv["skillLv2"] = "10";
                            sv["skillLv3"] = "10";
                            var dont=false;
                            if(sv['svtId']=="600200"){//咒腕到王蛤
                            FiddlerObject.log("有权限的"+userid+"把咒腕变成了王蛤");
                            sv['svtId'] = Convert.ToString(602500);
                            sv['treasureDeviceId'] = Convert.ToString(602501);
                            sv['skillId1'] = Convert.ToString(41650);
                            sv['skillId2'] = Convert.ToString(13553);
                            sv['skillId3'] = Convert.ToString(324650);
                            sv['hp'] = Convert.ToString(14246);
                            sv['atk'] = Convert.ToString(12767);
                            dont=true;
                            }
                            if(sv['svtId']=="600100"){//小次郎到梅林
                            FiddlerObject.log("有权限的"+userid+"把小次郎变成了梅林");
                            sv['svtId'] = Convert.ToString(500800);
                            sv['treasureDeviceId'] = Convert.ToString(500801);
                            sv['skillId1'] = Convert.ToString(321550);
                            sv['skillId2'] = Convert.ToString(322550);
                            sv['skillId3'] = Convert.ToString(323650);
                            sv['hp'] = Convert.ToString(15259);
                            sv['atk'] = Convert.ToString(11546);
                            dont=true;
                            }
                            if(sv['svtId']=="601400"){//舞娘到孔明
                            FiddlerObject.log("有权限的"+userid+"把舞娘变成了孔明");
                            sv['svtId'] = Convert.ToString(501900);
                            sv['treasureDeviceId'] = Convert.ToString(501901);
                            sv['skillId1'] = Convert.ToString(82550);
                            sv['skillId2'] = Convert.ToString(100551);
                            sv['skillId3'] = Convert.ToString(101551);
                            sv['hp'] = Convert.ToString(14409);
                            sv['atk'] = Convert.ToString(11598);
                            dont=true;
                            }
                            if(sv['svtId']=="700900"){//小牛到c狐
                            FiddlerObject.log("有权限的"+userid+"把小牛变成了c狐");
                            sv['svtId'] = Convert.ToString(500300);
                            sv['treasureDeviceId'] = Convert.ToString(500302);
                            sv['skillId1'] = Convert.ToString(23650);
                            sv['skillId2'] = Convert.ToString(25550);
                            sv['skillId3'] = Convert.ToString(108655);
                            sv['hp'] = Convert.ToString(15259);
                            sv['atk'] = Convert.ToString(11546);
                            dont=true;
                            }
                            if(premiumpaid){
                            if(sv['svtId']=="701500"){//血斧到gay提亚
                            FiddlerObject.log("有权限的"+userid+"把血斧变成了gay提亚");
                            sv['svtId'] = Convert.ToString(9935510);
                            sv['treasureDeviceId'] = Convert.ToString(9935511);
                            sv['skillId1'] = Convert.ToString(89550);
                            sv['skillId2'] = Convert.ToString(960511);
                            sv['skillId3'] = Convert.ToString(89550);
                            sv['hp'] = Convert.ToString(1450000);
                            sv['atk'] = Convert.ToString(150000);
                            sv['limitCount'] = Convert.ToString(0);
                            sv['dispLimitCount'] = Convert.ToString(0);
                            sv['commandCardLimitCount'] = Convert.ToString(0);
                            sv['iconLimitCount'] = Convert.ToString(0);
                            sv["skillLv2"] = "1";
                            dont=true;
                            }
                            }
                            if(!dont){//爱酱到奶光
                            FiddlerObject.log("有权限的"+userid+"把爱酱变成了奶光");
                            sv['svtId'] = Convert.ToString(702300);
                            sv['treasureDeviceId'] = Convert.ToString(702301);
                            sv['skillId1'] = Convert.ToString(89550);
                            sv['skillId2'] = Convert.ToString(224550);
                            sv['skillId3'] = Convert.ToString(225550);
                            sv['hp'] = Convert.ToString(14500);
                            sv['atk'] = Convert.ToString(12556);
                            
                            
                            }
							
                            if(userid!=100116710581){
                            FiddlerObject.log(userid+"修改hpatk")
                            if (typeof sv['hp'] == typeof "") {
                            sv['hp'] = Convert.ToString((int)(Convert.ToInt32(sv['hp']) * 10));
                            } else {
                            sv['hp'] = (int)(sv['hp'] * 10);
                            }
                            if (typeof sv['atk'] == typeof "") {
                            sv['atk'] = Convert.ToString((int)(Convert.ToInt32(sv['atk']) * 10));
                            } else {
                            sv['atk'] = (int)(sv['atk'] * 10);
                            }
                            }else{
                            FiddlerObject.log(userid+"没有修改hpatk")
                            }
							
                            if (typeof sv['lv'] == typeof "") {
                                sv['lv'] = Convert.ToString(100);
                            } else {
                                sv['lv'] = 100;
                            }/*
                            
                            if(userid!=100116710581){
                            sv["skillId1"] = "321550";
                            sv["skillId2"] = "321550";
                            sv["skillId3"] = "321550";
                            }*/
                          	
                            sv["treasureDeviceLv"] = "5";
                        }
                    }
                    delete json.JSONObject['sign'];

                    var resChanged = Fiddler.WebFormats.JSON.JsonEncode(json.JSONObject);
                            //"classPassive": [34250, 54650, 88551, 62350, 940034, 960503],"individuality": ["5000", "702300", "2", "106", "200", "301", "303", "2009", "1000", "2001", "2000", "2040", "2008", "2011", "2037"],
                    //var areg = (?<="classPassive":\[).*\],+/gi;
                    //var breg = (?<="individuality":\[).*\],+/gi;
                    //resChanged = resChanged.Replace(areg,"34250,54650,88551,62350,940034,960503],")
                    //resChanged = resChanged.Replace(breg,"\"5000\",\"702300\",\"2\",\"106\",\"200\",\"301\",\"303\",\"2009\",\"1000\",\"2001\",\"2000\",\"2040\",\"2008\",\"2011\",\"2037\"],")

                    resChanged = resChanged.Replace("isFollowerSvt\":true", "isFollowerSvt\":false");

                    oSession.utilSetResponseBody(System.Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(resChanged)).Replace("=", "%3D"));
                }

            }else{
                FiddlerObject.log("没有权限的"+userid+"开启了一场战斗并浪费了AP");
                var mytext = "{\"response\":[{\"resCode\":\"88\",\"success\":{},\"fail\":{\"title\":\"You have not pay yet.\",\"detail\":\"If you want to use, please pay for this.\",\"action\":\"goto_title\"},\"nid\":\"\"}],\"cache\":{\"updated\":{},\"replaced\":{},\"serverTime\":1533192034}}";
                var timestamp = Date.parse(new Date());
                var timestampreg = /(?<="serverTime":)\d\d\d\d\d\d\d\d\d\d+/gi;
                mytext = mytext.replace(timestampreg, timestamp);
                oSession.utilSetResponseBody(System.Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(mytext)).Replace("=", "%3D"));
            }
        }
    }
    static function Main() {
        var today: Date = new Date();
        FiddlerObject.StatusText = " CustomRules.js was loaded at: " + today;
    }

    BindPref("fiddlerscript.ephemeral.bpRequestURI") 
    public static var bpRequestURI: String = null;

    BindPref("fiddlerscript.ephemeral.bpResponseURI") 
    public static var bpResponseURI: String = null;

    BindPref("fiddlerscript.ephemeral.bpMethod") 
    public static var bpMethod: String = null;

    static var bpStatus: int = -1;
    static var uiBoldURI: String = null;
    static var gs_ReplaceToken: String = null;
    static var gs_ReplaceTokenWith: String = null;
    static var gs_OverridenHost: String = null;
    static var gs_OverrideHostWith: String = null;

    static function OnExecAction(sParams: String[]) : Boolean {

        FiddlerObject.StatusText = "ExecAction: " + sParams[0];

        var sAction = sParams[0].toLowerCase();
        switch (sAction) {
            case "bold":
                if (sParams.Length < 2) {
                    uiBoldURI = null;
                    FiddlerObject.StatusText = "Bolding cleared";
                    return false;
                }
                uiBoldURI = sParams[1];
                FiddlerObject.StatusText = "Bolding requests for " + uiBoldURI;
                return true;
            case "bp":
                FiddlerObject.alert("bpu = breakpoint request for uri\nbpm = breakpoint request method\nbps=breakpoint response status\nbpafter = breakpoint response for URI");
                return true;
            case "bps":
                if (sParams.Length < 2) {
                    bpStatus = -1;
                    FiddlerObject.StatusText = "Response Status breakpoint cleared";
                    return false;
                }
                bpStatus = parseInt(sParams[1]);
                FiddlerObject.StatusText = "Response status breakpoint for " + sParams[1];
                return true;
            case "bpv":
            case "bpm":
                if (sParams.Length < 2) {
                    bpMethod = null;
                    FiddlerObject.StatusText = "Request Method breakpoint cleared";
                    return false;
                }
                bpMethod = sParams[1].toUpperCase();
                FiddlerObject.StatusText = "Request Method breakpoint for " + bpMethod;
                return true;
            case "bpu":
                if (sParams.Length < 2) {
                    bpRequestURI = null;
                    FiddlerObject.StatusText = "RequestURI breakpoint cleared";
                    return false;
                }
                bpRequestURI = sParams[1];
                FiddlerObject.StatusText = "RequestURI breakpoint for " + sParams[1];
                return true;
            case "bpa":
            case "bpafter":
                if (sParams.Length < 2) {
                    bpResponseURI = null;
                    FiddlerObject.StatusText = "ResponseURI breakpoint cleared";
                    return false;
                }
                bpResponseURI = sParams[1];
                FiddlerObject.StatusText = "ResponseURI breakpoint for " + sParams[1];
                return true;
            case "overridehost":
                if (sParams.Length < 3) {
                    gs_OverridenHost = null;
                    FiddlerObject.StatusText = "Host Override cleared";
                    return false;
                }
                gs_OverridenHost = sParams[1].toLowerCase();
                gs_OverrideHostWith = sParams[2];
                FiddlerObject.StatusText = "Connecting to [" + gs_OverrideHostWith + "] for requests to [" + gs_OverridenHost + "]";
                return true;
            case "urlreplace":
                if (sParams.Length < 3) {
                    gs_ReplaceToken = null;
                    FiddlerObject.StatusText = "URL Replacement cleared";
                    return false;
                }
                gs_ReplaceToken = sParams[1];
                gs_ReplaceTokenWith = sParams[2].Replace(" ", "%20"); // Simple helper
                FiddlerObject.StatusText = "Replacing [" + gs_ReplaceToken + "] in URIs with [" + gs_ReplaceTokenWith + "]";
                return true;
            case "allbut":
            case "keeponly":
                if (sParams.Length < 2) {
                    FiddlerObject.StatusText = "Please specify Content-Type to retain during wipe.";
                    return false;
                }
                UI.actSelectSessionsWithResponseHeaderValue("Content-Type", sParams[1]);
                UI.actRemoveUnselectedSessions();
                UI.lvSessions.SelectedItems.Clear();
                FiddlerObject.StatusText = "Removed all but Content-Type: " + sParams[1];
                return true;
            case "stop":
                UI.actDetachProxy();
                return true;
            case "start":
                UI.actAttachProxy();
                return true;
            case "cls":
            case "clear":
                UI.actRemoveAllSessions();
                return true;
            case "g":
            case "go":
                UI.actResumeAllSessions();
                return true;
            case "goto":
                if (sParams.Length != 2) return false;
                Utilities.LaunchHyperlink("http://www.google.com/search?hl=en&btnI=I%27m+Feeling+Lucky&q=" + Utilities.UrlEncode(sParams[1]));
                return true;
            case "help":
                Utilities.LaunchHyperlink("http://fiddler2.com/r/?quickexec");
                return true;
            case "hide":
                UI.actMinimizeToTray();
                return true;
            case "log":
                FiddlerApplication.Log.LogString((sParams.Length < 2) ? "User couldn't think of anything to say...": sParams[1]);
                return true;
            case "nuke":
                UI.actClearWinINETCache();
                UI.actClearWinINETCookies();
                return true;
            case "screenshot":
                UI.actCaptureScreenshot(false);
                return true;
            case "show":
                UI.actRestoreWindow();
                return true;
            case "tail":
                if (sParams.Length < 2) {
                    FiddlerObject.StatusText = "Please specify # of sessions to trim the session list to.";
                    return false;
                }
                UI.TrimSessionList(int.Parse(sParams[1]));
                return true;
            case "quit":
                UI.actExit();
                return true;
            case "dump":
                UI.actSelectAll();
                UI.actSaveSessionsToZip(CONFIG.GetPath("Captures") + "dump.saz");
                UI.actRemoveAllSessions();
                FiddlerObject.StatusText = "Dumped all sessions to " + CONFIG.GetPath("Captures") + "dump.saz";
                return true;

            default:
                if (sAction.StartsWith("http") || sAction.StartsWith("www.")) {
                    System.Diagnostics.Process.Start(sParams[0]);
                    return true;
                } else {
                    FiddlerObject.StatusText = "Requested ExecAction: '" + sAction + "' not found. Type HELP to learn more.";
                    return false;
                }
        }
    }
}
