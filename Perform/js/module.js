String.prototype.replaceAll = function(s1,s2){ 
    return this.replace(new RegExp(s1,"gm"),s2); 
}

var CreateInnerHtml = function(param) {
    var success = true;
    try {
        var lastId = '';
        var box;
        var startStr = '<!--##';
        var endStr = '##-->';
        var regx =new RegExp(eval('/'+startStr+'(.+?)'+endStr+'/g'));
        //Step1 judge templ
        for (var i = 0; i < param.length; i++) {
            var isNotTemplInOther = true;
            (param['isClean']==null)?param['isClean']=true:param['isClean']=false;
            param[i].primaryTempl = "";
            //console.log(param[i].id);
            if(param[i].id != lastId){
                lastId = param[i].id;
                box = document.getElementById(param[i].id);
            }
            var serial = 0;
            if(!param[i].templ || param[i].templ == null || param[i].templ == "" || param[i].templ == " "){
                serial = 0;
            } else if (!isNaN(param[i].templ)){
                serial = Number(param[i].templ);
            } else if((param[i].templ).indexOf("id_") == 0){
                var array = (param[i].templ).split("/");
                var tempBox = document.getElementById(array[0]);
                var temppStr = tempBox.innerHTML.replaceAll('[\r\n]', "");
                var temppArr = temppStr.match(regx);
                if(temppArr.length>1){
                    serial = Number(array[1]);
                } else {
                    serial = 0;
                }
                if(serial>=temppArr.length){
                    success = false
                    return success;
                }
                param[i].templ = (temppArr[serial].replace(startStr, "")).replace(endStr, "");
                isNotTemplInOther = false;
            } else {
                param[i].templ = (param[i].templ.replace(startStr, "")).replace(endStr, "");
                continue;
            }
            //console.log(box);
            var tempStr = box.innerHTML.replaceAll('[\r\n]', "");
            var tempArr = tempStr.match(regx);
            //console.log(tempArr);
            if(isNotTemplInOther){
                if(serial>=tempArr.length){
                    success = false
                    return success;
                }
                param[i].templ = (tempArr[serial].replace(startStr, "")).replace(endStr, "");
            }

            //save primary template
            if(tempArr && param[i].isClean == true){
                for(var k = 0; k<tempArr.length; k++){
                    param[i].primaryTempl +=  tempArr[k];
                }
            }
        }
        //clear html
        for (var i = 0; i < param.length; i++) {
            if(param[i].isClean == false){
                continue;
            }
            if(param[i].id != lastId){
                lastId = param[i].id;
                box = document.getElementById(param[i].id);
            }
            box.innerHTML = "";
        }
        //Step2 filling html
        for (var i = 0; i < param.length; i++) {
            if(param[i].id != lastId){
                lastId = param[i].id;
                box = document.getElementById(param[i].id);
            }
            var insertHtml = param[i].templ;
            if((param[i].param).constructor == Array){
                for (var j = 0, paramList = param[i].param; j < paramList.length; j++) {
                    insertHtml = insertHtml.replaceAll("@@", paramList[j]);
                }
            } else if((param[i].param).constructor == Object){
                for(var key in param[i].param){  
                    insertHtml = insertHtml.replaceAll("@"+key+"@", (param[i].param)[key]);   
                }
            } else if(typeof param[i].param == 'object'){   //for IFrameCommunication. constructor judge fail when param like [{},{}]
                for(var key in param[i].param){  
                    insertHtml = insertHtml.replaceAll("@"+key+"@", (param[i].param)[key]);   
                }
            } else {
                console.log("CreateInnerHtml param error.reason: param must be Array or object.")
            }
            box.innerHTML = box.innerHTML + insertHtml + param[i].primaryTempl;
        }
    } catch (e) {
        console.log("CreateInnerHtml param error.reason:"+e);
        success = false;
    }
    return success;
}

var FileUpload_xhr=null; 
var FileUpload_Config={}
var FileUpload = function(param) {
    FileUpload_Config['progress'] = param['progress'];
    FileUpload_Config['return'] = param['return'];
    FileUpload_Config['url'] = param['url'];
    FileUpload_Config['data'] = param['data'];
    FileUpload_Config['id'] = param['id']?param['id']:"";

    try {
        var formData = new FormData();
		formData.append("file", FileUpload_Config['data']);
        if(window.XMLHttpRequest){  //要是支持XMLHttpRequest的则采用XMLHttpRequest生成对象  
            FileUpload_xhr=new XMLHttpRequest();  
        }else if(window.ActiveXobiect){//要是支持win的ActiveXobiect则采用ActiveXobiect生成对象。  
            FileUpload_xhr=new ActiveXobiect('Microsoft.XMLHTTP');  
        }

        FileUpload_xhr.upload.addEventListener("progress", function(e) {FileUpload_uploadProgress(e, FileUpload_Config['id'])}, false);
        FileUpload_xhr.onreadystatechange=FileUpload_state_Change; 
        FileUpload_xhr.open("POST", FileUpload_Config['url'], true);
        //xmlHttp.setRequestHeader("Content-Type", "multipart/form-data; boundary=AaB03x");
		FileUpload_xhr.send(formData);
    } catch (e) {
        console.log("FileUpload param error.reason:"+e);
    }
}

var FileUpload_state_Change = function(){
	if (FileUpload_xhr.readyState==4&&FileUpload_xhr.status==200)
	{
        var response = $.parseJSON(FileUpload_xhr.responseText); 
        (FileUpload_Config['return'])(response);
	}else if(FileUpload_xhr.readyState==4){
		alert("xml数据读取失败！");
	}
}


var FileUpload_uploadProgress = function(evt, id) {
	if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        var param = {
            "progress":percentComplete,
            "id":id
        }
        var notify = FileUpload_Config['progress']
        notify(param);
	}
	else {
        // document.getElementById('progressNumber').innerHTML = '无法上传！';
        //(FileUpload_Config['progress'])(-1);
        alert("无法上传！");
	}

}

var HttpPost = function(param) {
    try {
         if(param['submitWay'] != "GET") {
             $.ajax({
                 //提交数据的类型 POST GET
                 type: param['submitWay'],
                 url: param['url'],
                 contentType: "application/json",
                 datatype: "json",
                 data: JSON.stringify(param['data']),
                 success: function (data) {
                     param['return'](data);
                 },
                 complete: function (XMLHttpRequest, textStatus) {

                 },
                 error: function () {
                     alert('服务请求失败，请稍后再试');
                 }
             });
         } else {
             $.ajax({
                 //提交数据的类型 POST GET
                 type: param['submitWay'],
                 url: param['url'],
                 success: function (data) {
                     param['return'](data);
                 },
                 complete: function (XMLHttpRequest, textStatus) {

                 },
                 error: function () {
                     alert('服务请求失败，请稍后再试');
                 }
             });
         }
    } catch (e) {
        console.log("HttpPost param error.reason:"+e);
    }
}

var IFrameCommunication_EventMapping = {}
var IFrameCommunication_CallBackMapping = {}
var IFrameCommunication = function(param) {
    try {
        var event = param['event'];
        var callParam = param['param'];

        switch(event){
            case "register":
                for(var key in callParam){
                    IFrameCommunication_EventMapping[key] = callParam[key];
                }
                break;
            case "notifyRegister":
                for(var key in callParam){
                    if(callParam[key] ==""||callParam[key] == null){
                        return;
                    }
                    IFrameCommunication_CallBackMapping[key] = callParam[key];
                }
                IFrameCommunication_CallBackMapping['idendity'] = param['idendity'];
                break;
            default:
                var notify = IFrameCommunication_EventMapping[event];
                if(notify != null){
                    var passData = JSON.stringify(callParam)
                    return notify(JSON.parse(passData));
                } else{
                    var data = {
                        "idendity":IFrameCommunication_CallBackMapping['idendity'],
                        "data":callParam
                    }

                    var notify = IFrameCommunication_CallBackMapping[event];
                    notify(data)
                }
        }
    } catch (e) {
        console.log("IFrameCommunication param error.");
    }
}

var LogReport = function(param) {
    try {
        var message = "";
        switch(param['kind']){
            case 'error': message= "**Error: "; break;
            case 'warn': message= "**Warn: "; break;
            case 'success':  message= "**Success: "; break;
            case 'record':  message= "**Record: "; break;
            default: console.log("LogReport param error.");
        }
        message = message + param['message'];
        switch(param['class']){
            case 'log': console.log(message);break;
            case 'message': alert(message);break;
            default: console.log("LogReport param error.");
        }
        
    } catch (e) {
        console.log("LogReport param error.");
    }
}

    moduleList = {
        "LogReport":LogReport,
        "CreateInnerHtml":CreateInnerHtml,
        "HttpPost":HttpPost,
        "FileUpload":FileUpload,
        "IFrameCommunication":IFrameCommunication
    }
function moduleStart(module,param,returnFunction){
    var returnParam = moduleList[module](param);
    if(returnFunction !=null ){
        returnFunction(returnParam);
    }
    return returnParam;
}


