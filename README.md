Trick
===========================
一套上层前端架构

****

|Author|Daniel.Leung|
|---|---
|微信|littleAsteroid
|e-mail|monsterFactory@126.com

****
## 目录
* [一、概述](#概述)
    * 1.1 目录结构
    * 1.2 设计思想
    * 1.3 环境依赖
* [二、Prop(开发环境代码)](#二、Prop(开发环境代码))
    * 2.1 目录结构
    * 2.2 模块(Control)开发
        * 2.2.1 生成模块基础模型
        * 2.2.2 模块运行
        * 2.2.3 html开发
        * 2.2.4 css开发
        * 2.2.5 js开发
        * 2.2.6 其他
    * 2.3 页面(Page)开发
        * 2.3.1 生成模块基础模型
        * 2.3.2 运行
        * 2.3.3 html（Layout.html）开发
        * 2.3.4 css（Layout.css）开发
        * 2.3.5 js（dispose.js）开发
        * 2.3.6 其他
* [三、Perform（生产环境代码）](#三、Perform（生产环境代码）)
    * 3.1 目录结构
    * 3.2 生成

-----------
# 一、概述
这个工程主要分成三部分：①代码生成器；②生产环境运行代码；③开发环境工程代码。

这是一套上层框架，只是为了改变工程代码形式，与vue，angularjs等前端框架不一样，且Trick可以包容vuejs和angularjs在里面。

### 1.1 目录结构
> * `Christmas` 代码生成器，①把开发环境工程代码生成生产环境运行代码；②生成开发环境工程的部分代码
> * `Perform` 生产环境运行代码，这部分代码无需编写，原则上不允许手动修改。这部分代码在Apache或者Tomcat服务目录上即可使用。
> * `Prop` 开发环境工程代码，这部分代码需要编写，且要按照一定规则编写。这部分代码在Apache或者Tomcat服务目录上也可以使用，但是加载速度会很慢。

### 1.2 设计思想
生产环境运行代码应该是很`轻巧` 的，而开发环境工程代码应该有比生产环境代码`笨重` 。一般情况下，生产环境代码应该为开发环境代码的子集。<br>
>-	`代码层次`  开发环境代码是需要开发人员理解和编写的，因此开发环境代码需要层次清晰。层次清晰自然需要分层，而分层的最直观感受就是多文件，嵌套文件夹，让代码块分门别类。而生产环境的运行代码主要是给机器运行的，不需要分层和易懂。
>- `模拟环境` 开发环境代码的每一块功能模块最好都应该有可供模拟测试的代码，一方面便于调试，另一方面便于主开发人员以外的人可以通过模拟测试加速对代码的理解。而生产环境的代码不需要这么多的测试代码，机器仅需要完成产品功能的代码即可。
>- `调试代码` 开发环境代码需要一些调试代码方便发现问题或者调试。而这一部分代码对于生产环境代码来说是多余的。

以上，为了解决上面的问题，工程把生产环境代码和开发环境代码分离。并引入了代码生成器，把笨重的开发环境代码转换成轻巧的生产环境代码。

### 1.3 环境依赖
`Christmas` 代码生成器需要依赖Ruby运行环境，所以需要搭建ruby运行环境，以下手顺为window环境
`http://www.runoob.com/ruby/ruby-installation-windows.html`，安装版本需要是2.2以上。

### 1.4 初始化Christmas菜单
1.3的ruby环境配置结束后
初始化Christmas菜单，在终端进入Christmas文件夹并输入以下指令（windows，linux路劲自行调整）
ruby .\Christmas.rb .\Menu\MakeMenu\

-----------
# 二、Prop(开发环境代码)
Prop为开发环境工程代码，这部分代码需要编写，其中，Page和Control的模板可以通过代码生成器`Christmas`生成。
### 2.1 目录结构
├── Common                  // 工程通用部分<br>
│   ├── Config                //公用配置js，原则上可以任意新建，但是要在对应页面(Page)的.html文件引用，文件夹所有内容会无条件复制到生产环境工程中<br>
│   │   └── Config.js       //默认配置文件，Christmas生成页面(Page)代码时，会在.html文件中默认引用<br>
│   ├── BasicDependence		//基础依赖，这里是bootstrap和jquery，开发者只能替换里面内容，添加文件夹是不会起作用的<br>
│   ├── DebuggingTools		//运行page代码时，会拼接模块(Control)到页面(Page)；加载lib模块等<br>
│   ├── Img							//图片文件，文件夹所有内容会无条件复制到生产环境工程中<br>
│   ├── JSModule					//一些通用的js功能模块，比如httppost，log等，其中都有sample.html供测试使用<br>
│   ├── Lib							//插件，开发者可自由在Lib文件夹自由添加文件夹<br>
│   │   └── import.js      //配置Lib中哪些文件需要加载<br>
│   └── Theme						//UI主题相关，工程内每个.html文件默认引用<br>
│   │   └── font.css       //字体相关<br>
│   │   └── theme.css       //其他<br>
│<br>
├── Control                        //UI模块(Control)，模块基础模型可由Christmas生成<br>
│   ├── Control名				
│   │   ├── Control名.css      //模块(Control)独有css<br>
│   │   ├── Control名.html       //模块(Control)独有html，运行页面(Page)时，会自动拼接到页面(Page)<br>
│   │   └── Control名.js       //模块(Control)独有js<br>
│<br>
├── Page                      // 页面(Page)，页面基础模型可由Christmas生成<br>
│   ├── Page名	<br>
│   │   ├── dispose.js      //页面(Page)独有js，主要完成`模块间通信`，`前后端通信`，`业务控制`<br>
│   │   ├── Layout.css       //页面(Page)独有css<br>
│   │   └── Layout.html       //页面(Page)独有html，主要排版模块(Control)位置布局<br>
│<br>
├── Service                  //后端API Wrapper<br>
│   ├── Config.js							//配置<br>
│   ├── DummyData.js					//假数据，截断请求后端，直接返回固有数据<br>
│   └── Service.js						//页面(Page)调用后端API入口<br>

### 2.2 模块(Control)开发
这里的模块是页面的模块，比如播放器模块，资源list模块。原则上，应该做到多页面复用。

#### 2.2.1 生成模块基础模型
以下示例是以window系统为前提的，运行powerShell，并cd到Christmas对应的目录
```bash
 .\Christmas.rb .\Menu\MakeCodeNormal\Trick-Control\Control名
```
#### 2.2.2 模块运行
启动服务（Apache或Tomcat）后，浏览器打开html即可，/Prop/Control/Control名/Control名.html。注意，运行时加载较慢，为正常现象。
#### 2.2.3 html开发
1. 正常写Html代码，此段代码会自动拼接到页面。
2. html文件中，有一对`<!--######Control名######-->`，其中`Control名`会根据模块名字不同而不同，在这一对标识一种的代码视为模块有效代码，会主动拼接到页面；在这一对标识以外的代码视为测试代码，不会拼接到页面。
3. html文件中，支持代码模板化，需要把模板嵌套在`<!--##  ##-->`中，注意，模板不能相互嵌套。虽然本身模板功能支持互相嵌套，但是html文件会在加载的时候报错。
4. 模板中可以用`@key@`等待js填充，其中key是对应js 参数object的key
5. 模板代码需要在一个div里。<br>
模板代码示例如下

```bash
    <div id="id_EditArea_clips_Templ" class="Theme_TemplDisaplay" >
        <!--## <div id="id_EditArea_realClips@clipId@" class="EditArea_ControlBody_ResourceClips Theme_ClipsColor EditArea_ControlBodyBorder Theme_CursorMove" draggable="true" ondragstart="EditArea.DragResourceClip(event,this, '@type@','@clipId@')" ondragend="EditArea.DragEnd()"  onclick="EditArea.SelectClip(this,'@clipId@')" oncontextmenu="EditArea.MenuShow(event,'@clipId@')" >
        </div> ##-->
    </div>
```
其中，`class="Theme_TemplDisaplay"`是theme.css中固定样式，可以隐藏模板div；`<!--##` 为模板开始，`##-->`为模板结束

#### 2.2.4 css开发
1. 正常css写法
2. class名字最好以`Control名_`开头，避免与其他Control样式重复
3. 尽量不要最某个标签定义样式，这样可能会影响其他Control的样式

#### 2.2.5 js开发
1. 每个Control的必要逻辑都务必写在`/*@@@@@@control-start@@@@@@*/`和`/*@@@@@@control-end@@@@@@*/`之间，如果写在此之外的，在生产环境代码是不会存在的。当然，也可以在js中人为添加`/*@@@@@@control-start@@@@@@*/`和`/*@@@@@@control-end@@@@@@*/`决定哪些代码生成到生产环境代码。注意，此标识不能嵌套。<br>
如：
```bash 
1
/*@@@@@@control-start@@@@@@*/
2
/*@@@@@@control-end@@@@@@*/
3
/*@@@@@@control-start@@@@@@*/
4
/*@@@@@@control-end@@@@@@*/
```
那么最后在生产环境中只有2，4位置的代码。
2. 原则上，每个Control只会有一个Object，页面中的dispose.js通过控制这个Object达到控制控件的目的
3. 填充html模板，`moduleStart("CreateInnerHtml", param);`以这样的函数调用开启模板填充，其中只有`param`需要定义变量和赋值。<br>
4. 具体规则请参考<br>
`/Prop/Common/JSModule/CreateInnerHtml/sample.html`,`moduleStart("CreateInnerHtml", param);`中的param与<br>`var CreateInnerHtml = function(param)`的parm意义相同。

#### 2.2.6 其他
1. 使用`/Prop/Common/Img`中的资源时，请以`../../Common/Img`为src开端，生成生产环境代码时会自动替换路径。
2. 如果是control自己要依赖某些插件，如初始代码DrawingBoard中，创建lib文件夹，并把需要加载的文件放到其中。
html中引用lib文件
```bash
	<!--self Lib css start (please put your lib in ./lib) -->
		<link href="./lib/xx.css" rel="stylesheet">
    <!--self Lib css end-->
    ...
	<!--self Lib js start (please put your lib in ./lib) -->
      <script src="./lib/three.min.js"></script>
    <!--self Lib js end-->
```
`./lib/xx.css`为lib的css文件，`./lib/xx.js`为lib的js文件，`注意`：文件路劲请一定要以./lib开头


### 2.3 页面(Page)开发
页面是控制模块布局和负责后端通信的，原则上，页面的dispose.js不应该直接控制UI，应该通过控制模块达到改变UI的目的。

#### 2.3.1 生成模块基础模型
以下示例是以window系统为前提的，运行powerShell，并cd到Christmas对应的目录。
```bash
 .\Christmas.rb .\Menu\MakeCodeNormal\Trick-Page\Page名
```
上面的指令中`Page名`指具体的页面名字，在生产环境中，`Page名.html`为最终生成HTML页
#### 2.3.2 运行
启动服务（Apache或Tomcat）后，浏览器打开html即可，/Prop/Page/Page名/Layout.html，注意，运行时加载较慢，因为模块加载是线性进行的，但是在生产环境中不会出现加载慢。
#### 2.3.3 html（Layout.html）开发
1. 此页面的css和js引用请不要随意删改。
2. 此文件推荐只作为布局控制，且请写在一对`<!--######Layout######-->`之间，布局尽量使用`bootstrap的布局系统`
3. 模块引入，在想要的div中填入`<!--@@模块名@@-->`，其中，`模块名`为对应模块名字。如：
```bash 
<div id="id_PageFullScreen" class="Fade container-fluid Page_mainBody">
        <div class="row Page_mainBody">
          <div class="col-sm-5 Page_upDiv Page_player Theme_ResourceColor">
            <!--@@Player@@-->
          </div>
          <div class="col-sm-7 Page_upDiv Theme_ResourceColor">
            <!--@@ResourceLibrary@@-->
          </div>
          <div class="col-sm-12 Page_downDiv Theme_bodyColor">
            <!--@@EditArea@@-->
          </div>
        </div>
      </div>
```
`<!--@@Player@@-->`，`<!--@@ResourceLibrary@@-->`，`<!--@@EditArea@@-->`为插入模块。

#### 2.3.4 css（Layout.css）开发
1. 正常css写法
2. class名字最好以`Page_`开头，避免与其他Control样式重复
3. 尽量不要最某个标签定义样式，这样可能会影响其他Control的样式

#### 2.3.5 js（dispose.js）开发
这个文件主要是使用模块和与后端通信，原则上不能直接操作UI。
1. `/*@@@@@@page-start@@@@@@*/`和`/*@@@@@@page-end@@@@@@*/`为代码有效段，在此之外的无效。当然，可以用多对`/*@@@@@@page-start@@@@@@*/`和`/*@@@@@@page-end@@@@@@*/`决定代码有效段，注意，不能嵌套使用<br>
如：
```bash 
1
/*@@@@@@page-start@@@@@@*/
2
/*@@@@@@page-end@@@@@@*/
3
/*@@@@@@page-start@@@@@@*/
4
/*@@@@@@page-end@@@@@@*/
```
那么最后在生产环境中只有2，4位置的代码。
2. `PageInitialize`函数为页面加载完毕调用函数。
3. `PageUnLoad`函数为页面销毁调用函数。
4. 调用后端服务，调用`serviceStart(API名称, 参数, 请求方式, 回调函数);`
如：
```bash 
serviceStart("/neucut/compound", postData, "POST", returnCompose)
```
其中，"/neucut/compound"为API名称，postData为参数，"POST"为请求方式，returnCompose为回调函数
5. 模块定义和使用
 ```bash
    var ComposeDialogInfo = {
        "select":[
            {"value":"1920*1080","option":"1080P 1920*1080"},
            {"value":"1280*720","option":"720P 1280*720"},
            {"value":"720*480","option":"480P 720*480"},
            {"value":"480*360","option":"360P 480*360"}
        ],
        "commitCallBackFunction":Compose
    };
    ComposeDialog = new ControlComposeDialog(ComposeDialogInfo);
    ComposeDialog.initialize();
 ```
其中，ControlComposeDialog为控件Object，ComposeDialog.initialize();为调用控件函数，具体使用需要依照具体控件设计。
6. 函数名最好以Page_为开头

#### 2.3.6 其他
1. 使用`/Prop/Common/Img`中的资源时，请以`../../Common/Img`为src开端，生成生产环境代码时会自动替换路径。

### 2.4 全局lib加载
有时候，比如滚动条这种lib是需要全局加载的，我们需要把lib文件放到/Prop/Common/Lib中，之后，我们还需要在import.js中配置引用：
```bash 
    var Lib_ImportList = [
        "common/common.js",
        "aaa/bbb.js",
    ]
```
其中，`"aaa/bbb.js",`为要加载的文件，路劲请以Lib为相对路径开始填写，不要填写绝对路劲，也不要以./开头。
这样配置完后，无论是Control还是Page都会自动加载这些文件，生产环境代码会自动生成引用文件的代码，`注意`：不需要的引用文件不要以`//"aaa/bbb.js"，`注释掉，这样在生产环境还是会引用的，所以不需要引用的文件请删除这一行代码。

另外，框架默认引用`common/common.js`文件，此文件为共通的一些函数，开发者可自行改动或者引用里面的方法，添加方法时，请以Common_开头。

vuejs和angularjs的依赖文件可以在此处添加，添加后即可支持vuejs或者angularjs

### 2.5 设置主题
/Prop/Common/Theme中有font.css（字体）和theme.css（颜色等）文件，这两个文件是主题的配置,Control和Page中都可以引用。开发者可自行修改或者添加，请以Theme_或者Font_开头

-----------
# 三、Perform（生产环境代码）
Perform为生产环境工程，这部分代码不需要编写，由`Christmas`根据Prop（开发环境代码）生成。
### 3.1 目录结构
├── config                  // 对应`Prop/Common/Config`文件夹<br>
├── css                       //每个页面对应一个css，这个css包括页面所有模块的css和Layout.css<br>
├── img                       //对应`Prop/Common/Img`文件夹<br>
├── css                       //每个页面对应一个js，这个css包括页面所有模块的js和dispose.js<br>
├── lib                       //对应`Prop/Common/Lib`文件夹<br>
├── theme                       //对应`Prop/Common/Theme`文件夹<br>
└── 页面名.html						//html页面<br>
### 3.2 生成
以下示例是以window系统为前提的，运行powerShell，并cd到Christmas对应的目录
```bash
 .\Christmas.rb .\Menu\MakeEngineeringNormal\Trick-Generate\
```
以上指令直接输入即可，如果想要改变代码生成位置，打开`Christmas/Input/MakeEngineeringNormal/Trick-Generate/Trick-Generate.json`文件，
把`"generatePath":"../Perform",`中的`../Perform`改成你想输出的位置。
