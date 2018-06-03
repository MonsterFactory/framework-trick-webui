/********************
    @Describe: 插入模板
    @Param: param = [{
                "id":"*",        //要插入标签内
                "templ":"",      //模板，
                "isClean":"",      //是否清除old html，true(default) or false
                "param":[*]or{*}     //往模板添加的参数[]格式为顺序替换@@,{}格式为
            }]
    @Return: success             //是否成功
    @BeCareful:模板为可选项，如果为空，则默认选择第一个<!--@@  @@-->内的东西；如果为数字，则为以第几个<!--@@  @@-->为模板(从0开始)
********************/ 
/*@@@@@@module-start@@@@@@*/
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
/*@@@@@@module-end@@@@@@*/

/*@@@@@@@@sample  
sample();
function sample(){
    var templ = '<p>这@@是p标@@签</p>';
    var paramForReplace = ['1','2'];
    var param = [];
    //case 1
    param.push( {'id':'id_sample','param':paramForReplace});
    param.push( {'id':'id_sample','templ':'1','param':paramForReplace});
    param.push( {'id':'id_sample','templ':templ,'param':paramForReplace});
    CreateInnerHtml(param);
}
@@@@@@@@@@@@@@@@@@@@@@@*/