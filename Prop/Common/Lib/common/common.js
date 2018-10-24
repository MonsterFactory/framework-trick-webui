//format second to 00:00:00
function Common_formatSeconds(value) { 
    var theTime = parseInt(value);// 秒 
    var theTime1 = 0;// 分 
    var theTime2 = 0;// 小时 
    // alert(theTime); 
    if(theTime > 60) { 
        theTime1 = parseInt(theTime/60); 
        theTime = parseInt(theTime%60); 
        // alert(theTime1+"-"+theTime); 
        if(theTime1 > 60) { 
            theTime2 = parseInt(theTime1/60); 
            theTime1 = parseInt(theTime1%60); 
        } 
    }
    var result = theTime <= 9? "0"+parseInt(theTime) : ""+parseInt(theTime); 
    if(theTime1 > 0) { 
        //result = ""+parseInt(theTime1)+":"+result; 
        result = theTime1 <= 9? "0"+parseInt(theTime1)+":"+result : ""+parseInt(theTime1)+":"+result;  
    } else {
        result = "00:"+result;
    }
    if(theTime2 > 0) { 
        result = theTime2 <= 9? "0"+parseInt(theTime2)+":"+result : ""+parseInt(theTime2)+":"+result;  
    } else {
        result = "00:"+result;
    }
    return result; 
} 

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

//获取文件名后缀名
String.prototype.extension = function(){
    var ext = null;
    var name = this.toLowerCase();
    var i = name.lastIndexOf(".");
    if(i > -1){
    var ext = name.substring(i);
    }
    return ext;
}

//判断Array中是否包含某个值
Array.prototype.contain = function(obj){
    for(var i=0; i<this.length; i++){
        if(this[i] === obj)
            return true;
    }
    return false;
};

String.prototype.extMatch = function(extType){
    if(extType.contain(this.extension()))
        return true;
    else
        return false;
}

//换算文件大小
function Common_bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
 
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

//判断文件类型
var Common_fileTypes = {
    "photo":[".png",".jpg",".jpeg",".bmp",".gif",".ico"],
    "video":[".mp4",".wmv",".avi",".3gp",".ra",".ram",".mkv",".flv",".f4v",".rmvb",".mpg"],
    "audio":[".mp3",".wav",".wav",".midi",".wma",".ogg",".ape",".flac",".aac"]
}
function Common_fileType(fileType){
    try {
        for (var key in Common_fileTypes) {
            if (fileType.extMatch(Common_fileTypes[key])) {
                return key;
            }
        }
        return "unknown";
    }catch (e) {
        return "unknown";
    }
}

//预览本地图片
function Common_LocalPhoto(fileDom,imgId){
    //判断是否支持FileReader
    if (window.FileReader) {
        var reader = new FileReader();
    } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
    }

    //获取文件
    var file = fileDom.files[0];
    var imageType = /^image\//;
    //是否是图片
    if (!imageType.test(file.type)) {
        return;
    }
    //读取完成
    reader.onload = function(e) {
        //获取图片dom
        var img = document.getElementById(imgId);
        //图片路径设置为读取的图片
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

//预览本地视频/音频
function Common_LocalVideoAudio(fileDom,targetId){
    //获取文件
    var file = fileDom.files[0];
    var url = URL.createObjectURL(file);  
    document.getElementById(targetId).src = url; 

}

//将Json变成Url
function Common_JsonToUrl(data){
    var result = "";
    for(var key in data){
        result += (key+"="+data[key]+"&");
    }

    if(result != ""){
        result = result.substring(0,result.length - 1)
    }
    return result;
}

//获取url参数
function Common_GetUrlParam(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//JQuery扩展   class状态转换
//status:Add(添加class) Remove(删除class) else
//changeAll:extra will delete or add
$.fn.statusClass = function(classTemp, status, changeAll) {    
    var classStr = $(this).attr('class');
    var classArr = classStr.split(" ");
    var configStatusKey = "-status-";
    var normalKey = "normal";
    var addKey = "add";
    var removeKey = "remove";
    var extrakey = {
        "extra":"extra",
        "changeAll":"all"
    }
    var newClass = "";
    changeAll=changeAll||false;

    //when Add
    if(status.toLowerCase() == addKey.toLowerCase()){
        $(this).addClass(status)
        return;
    } else if(status.toLowerCase() == removeKey.toLowerCase()){
        $(this).removeClass(status)
        return;
    } 
    
    //replace new class
    if(status.toLowerCase() == normalKey.toLowerCase()){
        status = "";
    } else {
        status = configStatusKey+status;
    }

    //when extra
    if(Boolean!=changeAll.constructor && changeAll.toLowerCase() == extrakey["extra"].toLowerCase()){
        (status!="")?status = classTemp+status:"";
        var isAdd=false
        for(var i=0;i<classArr.length;i++){
            if((classArr[i]).indexOf(classTemp+configStatusKey)!=-1){
                classArr[i] = status;
                isAdd = true;
            }
            newClass += classArr[i]+" ";
        }
        if(!isAdd){
            newClass += status
        }
        $(this).attr('class', newClass);
        return;
    }

    //when changeApll
    if(Boolean!=changeAll.constructor && changeAll.toLowerCase() == extrakey["changeAll"].toLowerCase()){
        var selfDiv = $(this);
        var startStr = 'class="';
        var endStr = '"';
        var regx =new RegExp(eval('/'+startStr+'(.+?)'+endStr+'/g'));
        var orginolStr = selfDiv.html();
        var temppStr = orginolStr.replaceAll(/[\r\n]/g, "");
        var temppArr = temppStr.match(regx);
        for(var i=0;i<temppArr.length;i++){
            var str = temppArr[i];
            if(str.indexOf(classTemp)!=-1){
                var strArr = (str.replaceAll(startStr,"")).replaceAll(endStr,"");
                strArr = strArr.split(" ");
                for(var j=0;j<strArr.length;j++){
                    if(strArr[j]==classTemp){
                        str = str.replace(strArr[j],classTemp+status)
                    }else if((strArr[j]).indexOf(classTemp+configStatusKey)!=-1){
                        str = str.replace(strArr[j],classTemp+status)
                    }
                }
                orginolStr = orginolStr.replace(temppArr[i],str);
            }
        }
        selfDiv.html(orginolStr)
        return;
    }

    //when normal
    for(var i=0;i<classArr.length;i++){
        if(classArr[i] == classTemp){
            classArr[i] = classArr[i]+status;
        } else if((classArr[i]).indexOf(classTemp+configStatusKey)!=-1){
            var tempArr = classArr[i].split(configStatusKey)
            classArr[i] = tempArr[0]+status
        } else if(changeAll == true) {
            if((classArr[i]).indexOf(classTemp)!=-1){
                var tempArr = classArr[i].split(configStatusKey)
                classArr[i] = tempArr[0]+status
            }
        }
        newClass += classArr[i]+" ";
    }
    $(this).attr('class', newClass);
}; 

//全屏
Common_FullScreen=function(id,element){
    var elem; 
    if(element == null){
        if(id == null || id == ""){
            elem=document.body;
        } else {
            elem=document.getElementById(id);
        }
    } else {
        elem = element
    }
    if(elem.webkitRequestFullScreen){  
        elem.webkitRequestFullScreen();     
    }else if(elem.mozRequestFullScreen){  
        elem.mozRequestFullScreen();  
    }else if(elem.requestFullScreen){  
        elem.requestFullscreen();  
    }else{  
        var param = {
            "class":"message",       //log,message
            "kind":"warn",        //error,warn,success,record
            "message":"浏览器不支持全屏API或已被禁用."      //output message
        }
        moduleStart("LogReport", param, this.returns);
        return;
    }  
}

//退出全屏
Common_exitFullscreen=function(){  
    var elem=document;  
    if(elem.webkitCancelFullScreen){  
        elem.webkitCancelFullScreen();      
    }else if(elem.mozCancelFullScreen){  
        elem.mozCancelFullScreen();  
    }else if(elem.cancelFullScreen){  
        elem.cancelFullScreen();  
    }else if(elem.exitFullscreen){  
        elem.exitFullscreen();  
    }else{  
        var param = {
            "class":"message",       //log,message
            "kind":"warn",        //error,warn,success,record
            "message":"浏览器不支持全屏API或已被禁用."      //output message
        }
        moduleStart("LogReport", param, this.returns);
        return; 
    }  
}

function Common_loadingEnd(){
    //$('.Theme_Loading').remove();
    $(".Theme_Loading").fadeOut(1500);
}
