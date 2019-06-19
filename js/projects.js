/**
 * 
 * @authors pidanmeng (1092333914@qq.com)
 * @date    2018-09-07 09:55:00
 * @version $0.1$
 */

/*定义全局变量*/
//是啥
var CSLibrary = new CSInterface();
var rootPath = CSLibrary.getSystemPath(SystemPath.EXTENSION);
var userdata = CSLibrary.getSystemPath(SystemPath.USER_DATA);
var configJson = window.cep.fs.readFile(userdata + '/PDManager/config.json').data;
var configObj = JSON.parse(configJson);
CSLibrary.evalScript('$.evalFile("' + rootPath + '/jsx/main.jsx'+ '");');
CSLibrary.evalScript('$.evalFile("' + rootPath + '/jsx/renderFolderPreview.jsx'+ '");');
CSLibrary.evalScript('$.evalFile("' + rootPath + '/jsx/renderProjectPreview.jsx'+ '");');
CSLibrary.evalScript('$.evalFile("' + rootPath + '/jsx/save.jsx'+ '");');
CSLibrary.evalScript('$.evalFile("' + rootPath + '/jsx/saveAsLayer.jsx'+ '");');

/*初始化localStorage*/
if(!localStorage.counter) {localStorage.counter = 2;}
localStorage.path = configObj.projects.root;
localStorage.format = configObj.projects.format;
localStorage.previewFormat = configObj.projects.previewFormat;
/*定义函数*/

var readDir = function(path){
   var result = window.cep.fs.readdir(path);
   return result.data;
};
var dir = readDir(configObj.projects.root);
var classify = function(file){//找出指定类型的文件
   var res = file.split('.');
   return res;
};
// console.log(classify("folder_preview.png"));
var isfolder = function(file){//找出文件夹
   var result = window.cep.fs.stat(file);
   return result.data.isDirectory();
};
var isfile = function(file){//找出文件夹
   var result = window.cep.fs.stat(file);
   return result.data.isFile();
};
//console.log(isfolder("Presets 3D"));
/*设置监听*/
document.oncontextmenu = function(){
    return false;
} ;

window.onresize = function(){
   changeWidth();
};

window.onmessage = function(){
   changeWidth();
};

CSLibrary.addEventListener("toGif", function(evt) {
   var path = evt.data;
   path = path.split('\\').join('\\\\').split('.');
   path.pop();
   path = path.join('.');
   var createProcessResult = window.cep.process.createProcess(rootPath + '/process/ffmpeg.exe', "-i", path + '.mov',"-vf","scale=300:-1:sws_dither=ed","-y",path + ".gif");
   
   if (0 == createProcessResult.err) {
      gPID = createProcessResult.data;
      var waitforResult = window.cep.process.waitfor(gPID);
      if (0 == waitforResult.err) {
         console.log(path+'.mov');
         window.cep.fs.deleteFile(path+'.mov');
         reLoad();
      }
   }
});

/*初始化*/

var changeWidth = function(){
   var maxW = $(".main").width();
   var W = ( maxW - 5 ) / localStorage.counter - 2 - 6 ;


   $(".folderPreview").css("width",W*.85);
   $(".folderPreview").css("margin-top",W*.18);
   $(".projectsPreview").css("width",W*.90);
   $(".projectsPreview").css("margin-top",W*.18);
   $(".item").css("width",W);
   $(".itemName").css("opacity",1);
   W<=80 && $(".itemName").hide() && $(".item").css("height",W*.7) && $(".projectsPreview").css("margin-top",W*.1);
   W>80 && $(".itemName").show() && $(".item").css("height",W*.9);

};

var appendFiles = function(){
   var path = localStorage.path;
   var dir = readDir(path+'\\');
   var file;
   for (var i = 0; i <= dir.length - 1; i++) {
      // $("#main").append("<section class='"+file[1]+" item panel' name='"+projects[i]+"'><img class='projectsPreview' src='"+localStorage.path+'/'+projects[i].replace(".aep","")+localStorage.previewFormat+"'><p class='itemName'>"+folders[i]+"</p></section>")
      if(isfolder(localStorage.path+'\\'+dir[i]+'\\')){
         var src = (readDir(localStorage.path+'\\'+dir[i]+'\\').toString().indexOf('folder_preview.png')+1)?"<img class='folderPreview' src='"+localStorage.path+'\\'+dir[i]+'\\folder_preview.png'+"'>": "";
         $("#main").append("<section class='folder item panel' name='"+dir[i]+"'>"+src+"<p class='itemName'>"+dir[i]+"</p></section>");
         continue;
      }else if(isfile(localStorage.path+'\\'+dir[i]+'\\')){
         var file = classify(dir[i]);
         if (file.length-1 && localStorage.format.toString().toLowerCase().indexOf(file[file.length-1].toLowerCase())+1) {
            var src = (readDir(localStorage.path).toString().indexOf(dir[i].replace(file[file.length-1],"")+localStorage.previewFormat)+1)?"<img class='projectsPreview' src='"+localStorage.path+'\\'+dir[i].replace(file[file.length-1],"")+localStorage.previewFormat+"'>": "";
            $("#main").append("<section path='"+localStorage.path.split('\\').join('\\\\')+'\\\\'+dir[i]+"' class='"+file[file.length-1]+" item notfolder panel' name='"+dir[i]+"'>"+src+"<p class='itemName'>"+dir[i]+"</p></section>");
         }
      }
   }
};

$(".up").click(function(){
   var a = localStorage.path=localStorage.path.split('\\');
   a.pop();
   localStorage.path=a.join('\\');

   localStorage.path.split('\\').toString()==configObj.projects.root.split('\\').toString() && $(".up").attr("disabled","disabled");

   reLoad();
});


   
function applyProject(file,root) {
   var csInterface = new CSInterface();
   csInterface.evalScript("applyProject('"+file+"','"+root+"')");
};

var bindMenu  = function(){
$(".folder").contextMenu({
   width: 110, // width
   itemHeight: 30, // 菜单项height
   bgColor: "#333", // 背景颜色
   color: "#fff", // 字体颜色
   fontSize: 8, // 字体大小
   hoverBgColor: "#99CC66", // hover背景颜色
   menu: [{
         text: "删除",
         callback: function(_this) {
            Dialog.init('你确定要删除吗？',{
              button : {
                  确定 : function(){
                     var createProcessResult = window.cep.process.createProcess(rootPath.split('/').join('\\')+'\\process\\removeDir.exe', localStorage.path+'\\'+_this.getAttribute("name"));
                     Dialog.close(this);
                     if (0 == createProcessResult.err) {
                        gPID = createProcessResult.data;
                        var waitforResult = window.cep.process.waitfor(gPID);
                        if (0 == waitforResult.err) {
                           reLoad();
                        }else{
                           Dialog.init("由于未知的原因删除失败");
                        }
                     }
                  },
                  取消 : function(){Dialog.close(this);}
              }
          });
         }
      },
      {
         text: "重命名",
         callback: function(_this) {
            Dialog.init('<input type="text" placeholder="请输入文件夹名称"  style="margin:8px 0;width:100%;padding:11px 8px;font-size:15px; border:1px solid #999;"/>',{
              button : {
                  确定 : function(){
                     if(this.querySelector('input').value.length > 0){
                        var oldPath = localStorage.path.split('\\').join('/')+'/'+_this.getAttribute("name");
                        var newPath = localStorage.path.split('\\').join('/')+'/'+this.querySelector('input').value;
                        var result = window.cep.fs.rename(oldPath, newPath);
                        if(result.err){Dialog.init("错误代码："+result.err);}
                        Dialog.close(this);
                        reLoad();
                     }else{Dialog.close(this);Dialog.init("非法输入");}
                  },
                  取消 : function(){Dialog.close(this);}
              }
          });
         }
      },
      {
         text: "渲染预览图",
         callback: function(_this) {
            CSLibrary.evalScript("renderFolderPreview('"+localStorage.path.split('\\').join('\\\\') + "\\\\" + _this.getAttribute("name") +"\\\\folder_preview.png')");
            Dialog.init('已渲染完成',{
               button:{
                  确定 : function(){
                     reLoad();
                     Dialog.close(this);
                  }
               }
            });
         }
      }
   ]
});
$(".notfolder").contextMenu({
   th: 110, // width
   itemHeight: 30, // 菜单项height
   bgColor: "#333", // 背景颜色
   color: "#fff", // 字体颜色
   fontSize: 8, // 字体大小
   hoverBgColor: "#99CC66", // hover背景颜色
   menu: [{
         text: "删除",
         callback: function(_this) {
            Dialog.init('你确定要删除吗？',{
              button : {
                  确定 : function(){
                     try{
                        var name = window.cep.fs.deleteFile(localStorage.path.split('\\').join('/')+'/'+_this.getAttribute("name"));
                        try{var prev = _this.getAttribute("name").split('.') ; prev.pop() ; window.cep.fs.deleteFile(localStorage.path.split('\\').join('/')+'/'+prev.join('.')+'.'+configObj.projects.previewFormat);}
                        catch(e){alert(e);}
                        Dialog.close(this);
                        reLoad();}
                     catch(e){Dialog.close(this);Dialog.init(e);}
                  },
                  取消 : function(){Dialog.close(this);}
              }
          });
         }
      },
      {
         text: "渲染预览图",
         callback: function(_this) {
            var name = _this.getAttribute("name").split('.');
            name.pop();
            name = name.join('.');
            CSLibrary.evalScript("renderProjectPreview('"+localStorage.path.split('\\').join('\\\\') + "\\\\" + name +".mov')");
         }
      },
      {
         text: "存储并覆盖",
         callback: function(_this) {
            Dialog.init('您确定要覆盖该项目吗？',{
              button : {
                  确定 : function(){
                     var result = localStorage.path.split('\\').join('/')+'/'+_this.getAttribute("name");
                     CSLibrary.evalScript("save('"+result+"')");
                     Dialog.close(this);
                  },
                  取消 : function(){Dialog.close(this);}
              }
          });
         }
      }
   ]
});
$("body").contextMenu({
   th: 110, // width
   itemHeight: 30, // 菜单项height
   bgColor: "#333", // 背景颜色
   color: "#fff", // 字体颜色
   fontSize: 8, // 字体大小
   hoverBgColor: "#99CC66", // hover背景颜色
   menu: [{
         text: "新建文件夹",
         callback: function(_this) {
            Dialog.init('<input type="text" placeholder="请输入文件夹名称"  style="margin:8px 0;width:100%;padding:11px 8px;font-size:15px; border:1px solid #999;"/>',{
              button : {
                  确定 : function(){
                     if(this.querySelector('input').value.length > 0){
                        var result = window.cep.fs.makedir(localStorage.path.split('\\').join('/')+'/'+this.querySelector('input').value);
                        Dialog.close(this);
                        reLoad();
                     }else{Dialog.close(this);Dialog.init("非法输入");}
                  },
                  取消 : function(){Dialog.close(this);}
               }
            });
         }
      },
      {
         text: "保存当前合成",
         callback: function(_this) {
            Dialog.init('<input type="text" placeholder="请输入工程名称"  style="margin:8px 0;width:100%;padding:11px 8px;font-size:15px; border:1px solid #999;"/>',{
              button : {
                  确定 : function(){
                     if(this.querySelector('input').value.length > 0){
                        var result = localStorage.path.split('\\').join('/')+'/'+this.querySelector('input').value+'.aep';
                        CSLibrary.evalScript("save('"+result+"')");
                        Dialog.close(this);
                        Dialog.init('请等待工程储存完毕后点击刷新',{
                           button : {
                              刷新 : function(){
                                 reLoad();
                                 Dialog.close(this);
                              }
                           }
                        });
                     }else{Dialog.close(this);Dialog.init("非法输入");}
                  },
                  取消 : function(){Dialog.close(this);}
               }
            });

         }
      },
      {
         text: "保存选中图层",
         callback: function(_this) {
            Dialog.init('<input type="text" placeholder="请输入工程名称"  style="margin:8px 0;width:100%;padding:11px 8px;font-size:15px; border:1px solid #999;"/>',{
              button : {
                  确定 : function(){
                     if(this.querySelector('input').value.length > 0){
                        var result = localStorage.path.split('\\').join('/')+'/'+this.querySelector('input').value+'.aep';
                        CSLibrary.evalScript("saveAsLayer('"+result+"')");
                        Dialog.close(this);
                        Dialog.init('请等待工程储存完毕后点击刷新',{
                           button : {
                              刷新 : function(){
                                 reLoad();
                                 Dialog.close(this);
                              }
                           }
                        });
                     }else{Dialog.close(this);Dialog.init("非法输入");}
                  },
                  取消 : function(){Dialog.close(this);}
               }
            });

         }
      },
      {
         text:"渲染<span style='color:#CC6666'>视频</span>预览图",
         callback:function(_this){
            var dir = window.cep.fs.readdir(localStorage.path).data;
            console.log(dir);
            for (var i = 0; i < dir.length; i++) {
               var path = (localStorage.path+'\\'+dir[i]).split('\\').join('\\\\').split('.');
               var format = path.pop();
               path = path.join('.');
               if (format=='avi'||format=='mov'||format=='mp4'){
                  var createProcessResult = window.cep.process.createProcess(rootPath + '/process/ffmpeg.exe', "-i", path + '.' + format, '-ss', '00:00:00', '-t', '00:00:05','-s', '300x168',"-vf","scale=300:-1:sws_dither=ed","-y",path + ".gif");
                  if (0 == createProcessResult.err) {
                     gPID = createProcessResult.data;
                     var waitforResult = window.cep.process.waitfor(gPID);
                     if (0 == waitforResult.err) {
                        console.log(path+'.mov');
                     }
                  }
               }
            }
            reLoad();
         }
      },
      {
         text:"刷新",
         callback:function(_this){
            reLoad();
         }
      }
   ]
});};

var reLoad = function(){
   $("#main").empty();
   appendFiles();
   bindMenu();
   changeWidth();
   $(".folder").bind("click",function(){
      localStorage.path=localStorage.path+'\\'+this.getAttribute("name");
      $(".up").removeAttr("disabled");
      reLoad();
   });
   $(".notfolder").bind("dblclick",function(){
      applyProject(this.attributes["path"].value,configObj.projects.root.split('\\').join('\\\\'));
   });
};

if(localStorage.path.split('\\').toString()==configObj.projects.root.split('\\').toString()){$(".up").attr("disabled","disabled");};
reLoad();
