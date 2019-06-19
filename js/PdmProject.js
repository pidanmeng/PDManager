/*定义全局变量*/

var CSLibrary = new CSInterface();
var rootPath = CSLibrary.getSystemPath(SystemPath.EXTENSION);
var libPath = window.cep.fs.readFile(rootPath + '/path.txt').data.split(/\n/);
var userdata = CSLibrary.getSystemPath(SystemPath.USER_DATA);
var configJson = window.cep.fs.readFile(userdata + '/PDManager/config.json').data;
if(!configJson){window.cep.fs.makedir(userdata+'/PDManager/');window.cep.fs.writeFile(userdata + '/PDManager/config.json', '{"projects":{"root":"","format":["aep","jsx","jsxbin","ffx","mp4","mov","avi"],"previewFormat":"gif"},"scripts":{"root":"C:\\\\Program Files (x86)\\\\Common Files\\\\Adobe\\\\CEP\\\\extensions\\\\PdmProject\\\\AEScripts"}}');}
var configObj = JSON.parse(configJson);

/*定义函数*/

var readDir = function(path){
   var result = window.cep.fs.readdir(path);
   return result.data;
}

/*监听*/
document.oncontextmenu = function(){
    return false;
} 

$("#config").click(function(){
   $("#mainPanel").attr("src","./html/config.html");
   $("#projects").css("transform","translateX(-65px)");
   $(".scl").css("opacity","0");
   $("#iconList").css("bottom",-15);
})

$("#gradient").click(function(){
   $("#mainPanel").attr("src","https://uigradients.com");
   $("#projects").css("transform","translateX(-65px)");
   $(".scl").css("opacity","0");
   $("#iconList").css("bottom",-15);
})

$("#scripts").click(function(){
   $("#mainPanel").attr("src","./html/scripts.html");
   $("#projects").css("transform","translateX(-65px)");
   $(".scl").css("opacity","0");
   $("#iconList").css("bottom",-15);
})

$("#projects").click(function(){
   $("#mainPanel").attr("src","./html/projects.html");
   $("#projects").css("transform","translateX(-100px)");
   $(".scl").css("opacity","1");
   $("#iconList").css("bottom",5);
})

$("#mns").click(function(){
   localStorage.counter<5 && localStorage.counter++;
   window.frames[0].postMessage(1,'*');
})

$("#pls").click(function(){
   localStorage.counter>1 && localStorage.counter--;
   window.frames[0].postMessage(1,'*');
})