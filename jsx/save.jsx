//获取当前文件路径

var extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';

$.evalFile(extensionPath + "/renderProjectPreview.jsx");

//保存当前选中的合成
var save = function(path){
	//渲染预览图
	previewPath = path.split('.');
    previewPath.pop();
    previewPath = previewPath.join('.');
    renderProjectPreview(previewPath + '.mov',comp);

   	app.project.activeItem.comment = "main";
   	app.project.reduceProject(app.project.activeItem);
	app.project.save(File(path));

}