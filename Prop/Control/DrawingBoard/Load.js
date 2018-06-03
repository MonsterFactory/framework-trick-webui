var Load_CommonLib = function(){
    lib_Load('../../Common/Lib/', ControlInit);
}
if(top == self){
    moduleLoad('DrawingBoard.js', '../../Common/JSModule/', Load_CommonLib);
}
