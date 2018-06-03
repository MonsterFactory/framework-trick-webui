var moduleLoadList = Lib_ModuletList;
var moduleConfig = {
                    "path":"",
                    "controlJs":"",
                    "loadAll":false,
                    "callBackFunction":"",
                    "i":0
                }

var Module_Include = function(){
    var loadPath = "";
    if(moduleConfig.i < moduleLoadList.length){
        loadPath = moduleConfig['path'] + moduleLoadList[moduleConfig.i]+ "/" +moduleLoadList[moduleConfig.i] +".js";
        moduleConfig['loadingModule'] = moduleLoadList[moduleConfig.i];
    } else {
        loadPath = moduleConfig['controlJs'];
        if(loadPath == null){
            //for Page load
            moduleInit();
            (moduleConfig['callBackFunction'] != null) ? (moduleConfig['callBackFunction'])() : null;
            return;
        }
        moduleConfig['loadingModule'] = moduleConfig['controlJs'];
        moduleConfig['loadAll'] = true;
    }

    jQuery.getScript(loadPath)
        .done(function() {  
            console.log("module load Success :"+moduleConfig['loadingModule']);

            if(!moduleConfig['loadAll']){
                moduleConfig.i++;
                Module_Include();
            } else {
                //for Control load
                moduleInit();
                (moduleConfig['callBackFunction'] != null) ? (moduleConfig['callBackFunction'])() : ControlInit();
                return;
            }
        })  
        .fail(function() {  
            console.log("module load FailLoad :"+moduleConfig['loadingModule'])
        });
}

function moduleLoad(param, pathUrl, callBackFunction){
    console.log("Trick framework v1.0");
    console.log("gitHub:");
    console.log("               ---Designed by Daniel.Leung.");
    console.log("");
    moduleConfig['controlJs'] = param;
    moduleConfig['path'] = pathUrl;
    moduleConfig['callBackFunction'] = callBackFunction;
    Module_Include();
}