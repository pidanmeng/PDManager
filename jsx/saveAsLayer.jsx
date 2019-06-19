//获取当前文件路径

var extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';

$.evalFile(extensionPath + "/renderProjectPreview.jsx");

//保存当前选中的所有图层
var saveAsLayer = function(path){
    var layers = app.project.activeItem.selectedLayers;
    var comp = app.project.activeItem;

    //渲染预览图
    previewPath = path.split('.');
    previewPath.pop();
    previewPath = previewPath.join('.');
    renderProjectPreview(previewPath + '.mov',comp);

    app.beginUndoGroup("saveAsLayer");
    thisFile = app.project.file;
    if(thisFile){app.project.save();}
    newComp = app.project.items.addComp('layers',comp.width,comp.height,comp.pixelAspect,comp.duration,comp.frameRate);

    for(var i = layers.length-1;i >=0;i--){
            layers[i].copyToComp(newComp);
    }
    app.project.reduceProject(newComp);
    newComp.comment = 'layers';
    
    app.project.save(File(path));
    app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
    if(thisFile){app.open(thisFile);}

    app.endUndoGroup();
}