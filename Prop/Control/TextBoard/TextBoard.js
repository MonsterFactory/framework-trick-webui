/********************
    @Describe: TextBoard structure
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlTextBoard(params) {
    this.ModuleId = {
      }

    this.initialize = function(){
        try {

        } catch (e) {
            var param = {
                "class":"log",       //log,message
                "kind":"error",        //error,warn,success,record
                "message":"TextBoard exception."      //output message
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
var TextBoard;
var ControlInit = function(){
    var TextBoardInfo = {};
    TextBoard = new ControlTextBoard(TextBoardInfo);
    TextBoard.initialize();
}
