/********************
    @Describe: Http post
    @Param: param = {
                "data":{*},        //参数
                "url":"*",      //post url，
                "return":*      //返回参数
            }
    @Return: success             //是否成功
    @BeCareful:依赖JQuery库
********************/ 
/*@@@@@@module-start@@@@@@*/
var FileUpload_xhr=null; 
var FileUpload_Config={}
var FileUpload = function(param) {
    FileUpload_Config['progress'] = param['progress'];
    FileUpload_Config['return'] = param['return'];
    FileUpload_Config['url'] = param['url'];
    FileUpload_Config['data'] = param['data'];

    try {
        var formData = new FormData();
		formData.append("myfile", FileUpload_Config['data']); 
        if(window.XMLHttpRequest){  //要是支持XMLHttpRequest的则采用XMLHttpRequest生成对象  
            FileUpload_xhr=new XMLHttpRequest();  
        }else if(window.ActiveXobiect){//要是支持win的ActiveXobiect则采用ActiveXobiect生成对象。  
            FileUpload_xhr=new ActiveXobiect('Microsoft.XMLHTTP');  
        }

        FileUpload_xhr.upload.addEventListener("progress", FileUpload_uploadProgress, false);
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


var FileUpload_uploadProgress = function(evt) {
	if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        (FileUpload_Config['progress'])(percentComplete);
	}
	else {
        // document.getElementById('progressNumber').innerHTML = '无法上传！';
        //(FileUpload_Config['progress'])(-1);
        alert("无法上传！");
	}

}
/*@@@@@@module-end@@@@@@*/

/*@@@@@@@@sample  
*/

// sample();

function returns(data){
    console.log("returns");
    console.log(data);
}

function progress(data){
    console.log("progress");
    console.log(data);
}

function sample(){
    var param = {
                "url":"http://10.1.31.135:8081/neumedia/ws/neucut/file",    //post url，
                "data":document.getElementById('fileToUpload').files[0],
                "return":returns,      //返回参数
                "progress":progress
     }
     FileUpload(param);
}

/*
@@@@@@@@@@@@@@@@@@@@@@@*/