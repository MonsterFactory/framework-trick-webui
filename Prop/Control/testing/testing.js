/********************
    @Describe: testing structure
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function Controltesting(params) {
    this.ModuleId = {
      }

    this.initialize = function(){
        try {

        } catch (e) {
            var param = {
                "class":"log",       //log,message
                "kind":"error",        //error,warn,success,record
                "message":"testing exception."      //output message
            }
            moduleStart("LogReport", param, this.returns);
            console.log(e);
        }
    };
    
    this.returns = function(){
        
    }


}

/*@@@@@@control-end@@@@@@*/

/**Test Code**/
var testing;
var ControlInit = function(){
    var testingInfo = {};
    testing = new Controltesting(testingInfo);
    testing.initialize();
}
