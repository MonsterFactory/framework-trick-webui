/********************
    @Describe: Footer structure
    @Param: param = [*]             //photo list
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlFooter(params) {
    this.ModuleId = {
        "leftInfo":"id_footerLeftInfo_Insert",
        "rightInfo":"id_footerRightInof_Insert",
    }

    this.initialize = function(){
        try {
            var param = []
            param.push( {'id':this.ModuleId['leftInfo'],'templ':null,'param':[params['infoLeft']]});

            param.push( {'id':this.ModuleId['rightInfo'],'templ':null,'param':[params['infoRight']]});
            moduleStart("CreateInnerHtml", param, this.returns);
        } catch (e) {
            var param = {
                "class":"log",       //log,message
                "kind":"error",        //error,warn,success,record
                "message":"Footer exception."      //output message
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
var Footer;
var ControlInit = function(){
    var FooterInfo = {
        "infoLeft":"Trick framework v1.0",
        "infoRight":"Designed by Daniel.Leung"
    };
    Footer = new ControlFooter(FooterInfo);
    Footer.initialize();
}
