/********************
    @Describe: iframe communication
    @Param: param = {
                "event":"register|notifyRegister|@custom@",       
                "param":"*",        
            }
    @Return: null
    @BeCareful:when call custom event,it will call register event at first.If register event is null, it will call notify register event.
********************/ 
/*@@@@@@module-start@@@@@@*/
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
/*@@@@@@module-end@@@@@@*/