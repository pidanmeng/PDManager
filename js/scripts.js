/**
 * 
 * @authors pidanmeng (1092333914@qq.com)
 * @date    2018-09-07 09:55:00
 * @version $0.1$
 */

/*定义全局变量*/

var CSLibrary = new CSInterface();
var rootPath = CSLibrary.getSystemPath(SystemPath.EXTENSION);
var userdata = CSLibrary.getSystemPath(SystemPath.USER_DATA);
var configJson = window.cep.fs.readFile(userdata + '/PDManager/config.json').data;
var configObj = JSON.parse(configJson);
var format = ["jsx","jsxbin"];
/*定义函数*/
var classify = function(file){//找出指定类型的文件
   var res = file.split('.');
   var format = res.pop();
   res = res.concat(format);
   return res;
}

var readDir = function(path){
   var result = window.cep.fs.readdir(path);
   return result.data;
}
var dir = readDir(configObj.scripts.root);

/*设置监听*/
document.oncontextmenu = function(){
   return false;
} 

/*初始化*/
var appendFiles = function(){
   var file;
   for (var i = 0; i <= dir.length - 1; i++) {
      var file = classify(dir[i]);
      $("body").append("<label file='"+dir[i]+"'>"+dir[i]+"</label>")
   }
}

var reLoad = function(){
   appendFiles();

   $("label").bind("dblclick",function(){
      var JSX =  configObj.scripts.root+'\\'+this.innerHTML;
      var script = '$.evalFile("' + JSX.split("\\").join('\\\\') + '");';
      CSLibrary.evalScript(script);
   })
}

reLoad();