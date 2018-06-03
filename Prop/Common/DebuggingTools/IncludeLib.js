var Lib_LoadList = Lib_ImportList;
var Lib_config = {
        "path":"",
        "callBackFunction":""
    }

var Lib_LoadLib = function(id){
    console.log("lib load :" + Lib_config['path']+Lib_LoadList[id]);
    if((Lib_LoadList[id]).indexOf("css") != -1){
        $("<link>")
            .attr({ rel: "stylesheet",
            type: "text/css",
            href: Lib_config['path']+Lib_LoadList[id]
            })
            .appendTo("head");
        Lib_LoadLib_Loop(id);
    } else {
        jQuery.getScript(Lib_config['path']+Lib_LoadList[id])
            .done(function() {  
                Lib_LoadLib_Loop(id);
            })  
            .fail(function() {  
                console.log("lib load FailLoad :"+Lib_config['path']+Lib_LoadList[id])
            });
    }
}

var Lib_LoadLib_Loop = function(id){
    id++;
    if(id < Lib_LoadList.length){
        Lib_LoadLib(id);
    } else {
        (Lib_config['callBackFunction'])();
    }
}

function lib_Load(pathUrl, callBackFunction){
    Lib_config['path']=pathUrl;
    Lib_config['callBackFunction']=callBackFunction;
    Lib_LoadLib(0);
}