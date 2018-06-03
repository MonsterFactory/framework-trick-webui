var PageLoad = function(){
    moduleLoad(null, '../../Common/JSModule/', PageLoad_Lib)
}

var PageLoad_Lib = function(){
    lib_Load('../../Common/Lib/', PageLoad_Service)
}

var PageLoad_Service = function(){
    serviceLoad('../../Service/', PageLoad_Control)
}

var PageLoad_Control = function(){
    DebuggingTools_InsertControl(PageInitialize)
}

/*@@@@@@page-start@@@@@@*/
var Header;     //control object list
var Footer;
var DrawingBoard;
var TextBoard;
var PageInitialize = function(){
    /*write your code*/
    console.log("\n**Your page code start!");

    //Header
    var HeaderInfo = {
        "title":all_SubjectInfo['name'],
        "link":[
            {"active":false,"title":all_SubjectInfo['version'],"url":"#"}
        ]
    };
    Header = new ControlHeader(HeaderInfo);
    Header.initialize();

    //Footer
    var FooterInfo = {
        "infoLeft":"",
        "infoRight":all_SubjectInfo['signed']+"&nbsp;&nbsp;"
    };
    Footer = new ControlFooter(FooterInfo);
    Footer.initialize();

    //DrawingBoard
    var DrawingBoardInfo = {};
    DrawingBoard = new ControlDrawingBoard(DrawingBoardInfo);
    DrawingBoard.initialize();

    //TextBoard
    var TextBoardInfo = {};
    TextBoard = new ControlTextBoard(TextBoardInfo);
    TextBoard.initialize();

    PageLoadFinish();
}

var PageLoadFinish = function(){
    //end loading img
    Common_loadingEnd();

    /*write your code*/
}

var LoadData = function(){
    /*write your code*/
}

/****Notes****/
/****Notes****/

/*@@@@@@page-end@@@@@@*/
