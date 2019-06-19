//在工程中寻找Pdm manager文件夹
var mainFolder;
for (var i = 1; i <= app.project.numItems; i++) {
   if(app.project.item(i).name=="Pdm manager"){ mainFolder = app.project.item(i);}
}

//导入工程
var importComp = function(folder){
      for (var i = 0; i < folder.numItems; i++) {
         if( 
            folder.item(i+1).comment=="main" && 
            !(folder.item(i+1) instanceof FolderItem) && 
            app.project.activeItem.layers
         ){
            app.project.activeItem.layers.add(folder.item(i+1));
            app.project.activeItem.selectedLayers[0].startTime = app.project.activeItem.time;
         }
         else if(  
            folder.item(i+1).comment=="layers" && 
            !(folder.item(i+1) instanceof FolderItem) && 
            app.project.activeItem.layers
         ){
            for (var j = 1 ; j <= folder.item(i+1).layers.length ; j++) {
                (function(j){
                    folder.item(i+1).layer(j).copyToComp(app.project.activeItem);
                    app.project.activeItem.layer(1).startTime = app.project.activeItem.time;
                })(j);
            }
         }
         else if(
            folder.item(i+1) instanceof FolderItem){
            //若item为folder，则递归
            importComp (folder.item(i+1));
         }
    }
}

//导入预设、启动脚本或导入媒体文件
var applyProject = function(file,rootPath){
   var a = file.split('.');
   if(a[a.length-1].toLowerCase()=="ffx"){
      try{ 
         var myComp = app.project.activeItem;
         var allLayers = myComp.layers;
         var layers = myComp.selectedLayers;
         var thisLayer = layers[0];
         thisLayer = app.project.activeItem.selectedLayers[0] ;
         thisLayer.applyPreset(File(file));
      }catch(err){ alert("Please at least select a layer !","error"); }
   }else if(a[a.length-1].toLowerCase()=="jsx"){
      $.evalFile(file);
   }else{
      try{
         var io = new ImportOptions(File(file)); 
         if(io.canImportAs(ImportAsType.FOOTAGE)){io.importAs = ImportAsType.FOOTAGE;}
         else if(io.canImportAs(ImportAsType.PROJECT)){io.importAs = ImportAsType.PROJECT;}
         else if(io.canImportAs(ImportAsType.COMP)){io.importAs = ImportAsType.COMP;}
         else if(io.canImportAs(ImportAsType.COMP_CROPPED_LAYERS)){io.importAs = ImportAsType.COMP_CROPPED_LAYERS;}
         
         var relativePath = file.slice(rootPath.length+1).split('\\');//brige/brige.aep
         var parent;
         var thisFolder;
         //try{mainFolder.numItems}catch(e){mainFolder = 0;};
         if(!isValid(mainFolder)){mainFolder = app.project.items.addFolder("Pdm manager");parent = mainFolder;}
         else if(mainFolder){parent = mainFolder} 

         for (var i = 0; i < relativePath.length-1; i++) {
            var flag = 0;
            for (var j = 1; j <= parent.numItems; j++) {
               if(parent.item(j).name==relativePath[i]){
                  parent = parent.item(j);
                  flag = 1;
                  
                  break;
               }
            }
            if(flag) continue;
            thisFolder = app.project.items.addFolder(relativePath[i]);
            thisFolder.parentFolder = parent;
            parent=thisFolder;
         }
         var project = app.project.importFile(io);
         
         if(parent) {project.parentFolder = parent;}

         try{
            if(io.importAs == ImportAsType.PROJECT){
               importComp (project);    
            }else{
               if(app.project.activeItem.layers){
                  app.project.activeItem.layers.add(project);
                  app.project.activeItem.selectedLayers[0].startTime = app.project.activeItem.time;
               }
            }
         }catch(err){alert(err)}
         
         
      } catch(err){alert(err,"error")}
   }
   
}