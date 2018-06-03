/********************
    @Describe: output Log or output message
    @Param: param = {
                "class":"*",       //log,message
                "kind":"*",        //error,warn,success,record
                "message":"*"      //output message
            }
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@module-start@@@@@@*/
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
/*@@@@@@module-end@@@@@@*/
