//渲染gif预览图
try {
    var loadSuccess = new ExternalObject("lib:\PlugPlugExternalObject"); //载入所需对象，loadSuccess 记录是否成功载入
} catch (e) {
    alert(e);// 如果载入失败，输出错误信息
}

var thisObj = new CSXSEvent();
thisObj.type="toGif"; 

var renderProjectPreview = function(path, comp){
   try{
      if(!comp){
            var myComp = app.project.activeItem;
      }else{var myComp = comp;}
      var thisRender = app.project.renderQueue.items.add(myComp);
      thisRender.outputModule(1).file = File(path);
      thisRender.outputModule(1).applyTemplate("renderPreview");
      var flag = 0;
      
      thisRender.onStatusChanged = function(){
         thisObj.data = path;
         if (flag)
            thisObj.dispatch();
         flag++;
      }
      app.project.renderQueue.render();
      
   }catch(e){alert(e);}
}