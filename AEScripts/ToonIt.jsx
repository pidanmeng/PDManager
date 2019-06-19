try{//myComp储存当前激活的合成
var myComp = app.project.activeItem;
//当前合成的层收集对象
/*常用方法：
**add(item, float duration)
**addNull(float duration)
**addSolid(float color[R,G,B](0,1), string name, int width, int height, float pixelAspect, float duration)
**addText(string text)
**addBoxText(string text)
**addCamera(string name, float centerPoint[x,y])
**addLight(string name, float centerPoint)
**addShape()
**precompose(int layerIndex[ ], string name, bool moveAllAttributes)
*/
var allLayers = myComp.layers;
//layers储存当前选中的层数组
var layers = myComp.selectedLayers;
//thisLayer储存当前选中的第一个层
/*常用属性：
**index
**name
**inPoint
**outPoint
**parent
**shy
**locked
**comment
*/
/*常用方法：
**remove()
**duplicate()
**moveAfter(layer)
**moveBefore(layer)
*/
/*AV层常用属性：
**blendingMode{
        BlendingMode.ADD
        BlendingMode.ALPHA_ADD
        BlendingMode.CLASSIC_COLOR_BURN
        BlendingMode.CLASSIC_COLOR_DODGE
        BlendingMode.CLASSIC_DIFFERENCE
        BlendingMode.COLOR
        BlendingMode.COLOR_BURN
        BlendingMode.COLOR_DODGE
        BlendingMode.DANCING_DISSOLVE
        BlendingMode.DARKEN
        BlendingMode.DARKER_COLOR
        BlendingMode.DIFFERENCE
        BlendingMode.DISSOLVE
        BlendingMode.EXCLUSION
        BlendingMode.HARD_LIGHT
        BlendingMode.HARD_MIX
        BlendingMode.HUE
        BlendingMode.LIGHTEN
        BlendingMode.LIGHTER_COLOR
        BlendingMode.LINEAR_BURN
        BlendingMode.LINEAR_DODGE
        BlendingMode.LINEAR_LIGHT
        BlendingMode.LUMINESCENT_PREMUL
        BlendingMode.LUMINOSITY
        BlendingMode.MULTIPLY
        BlendingMode.NORMAL
        BlendingMode.OVERLAY
        BlendingMode.PIN_LIGHT
        BlendingMode.SATURATION
        BlendingMode.SCREEN
        BlendingMode.SILHOUETE_ALPHA
        BlendingMode.SILHOUETTE_LUMA
        BlendingMode.SOFT_LIGHT
        BlendingMode.STENCIL_ALPHA
        BlendingMode.STENCIL_LUMA
        BlendingMode.VIVID_LIGHT 
    }
**trackMatteType{
        TrackMatteType.ALPHA
        TrackMatteType.ALPHA_INVERTED
        TrackMatteType.LUMA
        TrackMatteType.LUMA_INVERTED
        TrackMatteType.NO_TRACK_MATTE
    }
**motionBlur
*/

var thisLayer = layers[0];

{
    app.beginUndoGroup("toonIt");

    //code here
    var num = parseInt (prompt ("层数越多细节就越多：", 3, "请设置层数"))
    var name = thisLayer.name;
    
    var toonGroup=[];
    function push(layer){
        toonGroup.push(layer);
    };
    push (thisLayer);
    
    //创建n层轨道蒙版
    thisLayer.effect.addProperty("提取");
    for(var i = 1;i<num;i++){
        var newLayer = thisLayer.duplicate()
        push(newLayer);
        newLayer.name = name+" level "+(1+i);
    }
    thisLayer.name+=" level 1";
    
    //创建n层网点
    thisLayer = allLayers.addSolid([0,0,0], "net level ",myComp.width,myComp.height,1);
    push(thisLayer);
    
    for(i = 1;i<num;i++){
        var newLayer = thisLayer.duplicate();
        push(newLayer);
        newLayer.name+=i+1;
        var fx = newLayer.effect.addProperty("P_Halftone");
        fx.property("PSOFT HALFTONE-0002").setValue([0,0,0]);//颜色设置为黑色
        fx.property("PSOFT HALFTONE-0017").setValue(1);//去除背景色
        fx.property("PSOFT HALFTONE-0003").expression = "thisComp.layer('controller').effect('网点大小"+i+"')('滑块')";
        fx.property("PSOFT HALFTONE-0009").expression = "thisComp.layer('controller').effect('网点间距"+i+"')('滑块')";
        fx.property("PSOFT HALFTONE-0010").expression = "effect('P_Halftone')('网点X轴 间距  ')";
    }
    thisLayer.name+=1;
    
    //创建空对象，作为控制层
    thisLayer = allLayers.addNull();
    push(thisLayer);
    thisLayer.name = "controller";
    
    for(i = 0;i<3*num-2;i++){
        var fx = thisLayer.effect.addProperty("滑块控制");
        if(i<num){fx.name = "阈值范围"+(i+1);fx.property("ADBE Slider Control-0001").setValue(255*(i+1)/(num+1));};
        else if(i<2*num-1){fx.name = "网点间距"+(i-num+1);fx.property("ADBE Slider Control-0001").setValue(i-num+1);};
        else if(i<3*num-2){fx.name = "网点大小"+(i-2*num+2);fx.property("ADBE Slider Control-0001").setValue(2-(i+1-2*num)*0.5);};
    }
    
    //设置蒙版层
    for(i = 1;i<=num;i++){
        thisLayer = allLayers.byName(name+" level "+i);
        var fx = thisLayer.effect.property("提取");
        fx.property("ADBE Extract-0004").expression = "thisComp.layer('controller').effect('阈值范围"+i+"')('滑块')";
        if(allLayers.byName(name+" level "+(i-1)))
            fx.property("ADBE Extract-0003").expression = "thisComp.layer('"+name+" level "+(i-1)+"').effect('提取')('白场')";
        thisLayer.shy=true;
    }
    
    //设置网点层
    for(i = 1;i<=num;i++){
        thisLayer = allLayers.byName("net level "+i);
        thisLayer.moveAfter(allLayers.byName(name+" level "+i));
        thisLayer.trackMatteType=TrackMatteType.ALPHA;
        thisLayer.shy=true;
    }
    
    //预合成
    var groupIndex=[];
    for(i = 0;i<toonGroup.length;i++)
        groupIndex.push (toonGroup[i].index);
    allLayers.precompose(groupIndex, name+" toon");
    
    app.endUndoGroup();
}

}catch(e){alert("An unknown error;")}
