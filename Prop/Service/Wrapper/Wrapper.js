/*@@@@@@Service-start@@@@@@*/
var serviceStart = function(url, data, submitWay, returnFunction, progressFunction, id){
    /*@@@@@@Service-end@@@@@@*/
    console.log(url)
    console.log(data)
    console.log(submitWay)

    var compareUrl = url.split("?");
    if(Config_ServiceDummy.contain(compareUrl[0])){
        var returnJson = Service_DummyData[compareUrl[0]][submitWay];
        
        //replace random data
        returnJson = JSON.stringify(returnJson);
        returnJson = returnJson.replace("random",Math.floor(Math.random() * 100000))
        returnJson = JSON.parse(returnJson); 
        
        returnFunction(returnJson);
        return;
    }
    /*@@@@@@Service-start@@@@@@*/

    //Concatenation url
    var tempUrl = url.split("/");
    if(tempUrl[0] == ""){
        url = Config_Service[tempUrl[1]]+url;
    } else {
        url = Config_Service[tempUrl[0]]+"/"+url;
    }
    
    //add replayId
    if(submitWay == "GET") {
        url = url + "?" + Common_JsonToUrl(data)
    }
    url = formUrl(url)

    if(submitWay == "upload"){
        var param = {
                "url":url,    //post url，
                "data":data,
                "return":returnFunction,      //返回参数
                "progress":progressFunction,
                "id":id?id:"",
        }
        FileUpload(param);
    } else { //Http post
        var param = {
                    "data":data,        //参数
                    "url":url,    //post url
                    "submitWay":submitWay,
                    "return":returnFunction      //返回参数
        }
        HttpPost(param);
    }
}

function formUrl(path) {
	if(path.indexOf("?") > -1) {
		var url = path + "&replayId=" + Math.floor(Math.random() * 100000);
	} else {
		var url = path + "?replayId=" + Math.floor(Math.random() * 100000);
	}
	return url;
}
/*@@@@@@Service-end@@@@@@*/
