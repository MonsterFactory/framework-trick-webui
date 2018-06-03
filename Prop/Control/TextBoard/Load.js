var Load_CommonLib = function(){
    lib_Load('../../Common/Lib/', ControlInit);
}
if(top == self){
    moduleLoad('TextBoard.js', '../../Common/JSModule/', Load_CommonLib);
}
