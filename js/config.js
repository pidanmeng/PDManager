/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-09-09 14:39:02
 * @version $Id$
 */
var CSLibrary = new CSInterface();
var rootPath = CSLibrary.getSystemPath(SystemPath.EXTENSION);
var userdata = CSLibrary.getSystemPath(SystemPath.USER_DATA);
var configJson = window.cep.fs.readFile(userdata + '/PDManager/config.json').data;
var configObj = JSON.parse(configJson);

// var result = window.cep.fs.showOpenDialogEx(false,true,"choose your projects' forlder",rootPath);

$("#projectsPathChooser").click(function(){
   var result = window.cep.fs.showOpenDialogEx(false,true,"choose your projects' forlder",rootPath+'/AEProjects');
   try{
      configObj.projects.root = result.data[0].split('/').join('\\');
      $("#projectsPath")[0].innerText = result.data[0];
   }catch(e){}
})
$("#scriptsPathChooser").click(function(){
   var result = window.cep.fs.showOpenDialogEx(false,true,"choose your projects' forlder",rootPath+'/AEScripts');
   try{
      configObj.scripts.root = result.data[0].split('/').join('\\');
      $("#scriptsPath")[0].innerText = result.data[0];
   }catch(e){}
})
$("#save").click(function(){
   var jsonStr = JSON.stringify(configObj);
   var fileName = userdata + '/PDManager/config.json';
   var result = {};
   try{
      result = window.cep.fs.writeFile(fileName, jsonStr);
      $(".seccess").removeClass("common");
      setTimeout(function(){$(".seccess").addClass("common");},1600)
   }catch(e){
      $(".seccess").innerText = "failed";
      $(".seccess").css("color","#af7777")
      $(".seccess").removeClass("common");
      setTimeout(function(){$(".seccess").addClass("common");},1600)
   }
})

var des = window.cep.fs.readFile(rootPath + '/description.md').data;
$("#description")[0].innerText = des;

markdown("description");