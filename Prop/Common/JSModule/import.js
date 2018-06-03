var Lib_ModuletList = [
    "LogReport",
    "CreateInnerHtml",
    "HttpPost",
    "FileUpload",
    "IFrameCommunication"
]

var moduleList = {}
function moduleInit(){
/*@@@@@@ModuleConfig-start@@@@@@*/
    moduleList = {
        "LogReport":LogReport,
        "CreateInnerHtml":CreateInnerHtml,
        "HttpPost":HttpPost,
        "FileUpload":FileUpload,
        "IFrameCommunication":IFrameCommunication
    }
/*@@@@@@ModuleConfig-end@@@@@@*/
}

/*@@@@@@ModuleConfig-start@@@@@@*/
function moduleStart(module,param,returnFunction){
    var returnParam = moduleList[module](param);
    if(returnFunction !=null ){
        returnFunction(returnParam);
    }
    return returnParam;
}
/*@@@@@@ModuleConfig-end@@@@@@*/