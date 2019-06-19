//渲染png预览图
var renderFolderPreview = function(path){
   try{
      var myComp = app.project.activeItem;
      myComp.saveFrameToPng(app.project.activeItem.time,File(path));
   }catch(e){alert(e);}
}