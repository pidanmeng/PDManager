//渲染gif预览图
var renderProjectPreview = function(path, comp){
   try{
      if(!comp){
            var myComp = app.project.activeItem;
      }else{var myComp = comp;}
      var thisRender = app.project.renderQueue.items.add(myComp);
      thisRender.outputModule(1).file = File(path);
      thisRender.outputModule(1).applyTemplate("renderPreview");
      var flag = 0;
      var myObject = new CSXSEvent();
      myObject.type="toGif"; 
      thisRender.onStatusChanged = function(){
         myObject.data = path;
         if (flag)
            myObject.dispatch();
         flag++;
      }
      app.project.renderQueue.render();
      
   }catch(e){alert(e);}
}