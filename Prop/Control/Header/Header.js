/********************
    @Describe: Header structure
    @Param: param = [*]           
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlHeader(params) {
    this.ModuleId = {
        "titleId":"id_headerTitleInsert",
        "linkListId":"id_headerLinkInsert"
    }

    this.initialize = function(){
        try {
            var param = [];
            param.push({'id':this.ModuleId['titleId'],'templ':null,'param':{"title":params.title},'isClean':false});

            var links = params.link;
            for(var i=0;i<links.length;i++){
                var templ = 1;
                if(links[i].active){
                    templ = 0;
                }
                param.push({'id':this.ModuleId['linkListId'],'templ':templ,'param':links[i]})
            }
            moduleStart("CreateInnerHtml", param);

        } catch (e) {
            var param = {
                "class":"log",       //log,message
                "kind":"error",        //error,warn,success,record
                "message":"Header exception."      //output message
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
var Header;
var ControlInit = function(){
    var HeaderInfo = {
        "title":"Trick",
        "link":[
            {"active":true,"title":"framework","url":"#"},
            {"active":false,"title":"v1.0","url":"#"}
        ]
    };
    Header = new ControlHeader(HeaderInfo);
    Header.initialize();
}
