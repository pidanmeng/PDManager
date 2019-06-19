var win;
var mainStr;
var mainBtn;
var clrBtn;
var shapeBtn;
function buildUI(this_obj_) {
win= (this_obj_ instanceof Panel)    ? this_obj_    : new Window("palette","Recomment 1.1 author:皮蛋萌",[0,0,250,150],{resizeable:true,resizeable:false,});
mainBtn=win.add("button",[20,10,80,30],"main");
clrBtn=win.add("button",[90,10,150,30],"clear");
shapeBtn=win.add("button",[160,10,220,30],"shape");
cancBtn=win.add("button",[15,120,85,140],"Close");
okBtn=win.add("button",[160,120,230,140],"Apply");
mainStr=win.add("edittext",[20,40,220,60] ,"main",{readonly:0,noecho:0,borderless:0,multiline:0,enterKeySignalsOnChange:0});
image_1Image="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00 \x00\x00\x00 \b\x06\x00\x00\x00szz\u00F4\x00\x00\x05\u00C9IDATXG\u009DWkl\x14e\x14=g\u00B6\x0F\u00A0\u00B4\u00CC,\x12H\u00D4\u00F02\u00FCPb| \u00A2H\x02\u009A\u0088\u00F8\u00A8t\u0096U\u00C1@g\x00\u00AB\x12\u008C?LDT\u00B0\u008A\u00C1G\u00FC%(Z\u00A1\u00B3\x14\x11\u00B0\u00EE\u00AE\u0088\nF\u00A3h\x14$*\u00C6\x10\u00F1\u0087\"4FH\x04v\u00A6\u00A5<\u00ECv\u00E7\u009A\u0099\u00E9\u00AE\u00B5t\u00BB#\u00F3k2s\u00EE\u00B9\u00E7\u00BB\u00DF\u00FD\u00EEw/\x11\u00F2\u0091x\u00BC\u00C2\x19\u0092\u00BBM\u0088\u00B9$&\u0088\u00F0\"RF\u008A\u00D0\x05p\u009C\u0094\x13\x00\x0F\u00C2\u0095V\u00B5\u00B2m'\u009B~\u00C8\u0086\u00A1f)\u00903\u00EF\x0EM*\x06=#\u00C4\"\x02CK\u00E1\u00BD\u00FF\"\u00E8 `\u00A9\u00D93+\u00B9yg\u00C7@6E\x05H#\x14\u00A7\u00ADn\u00A9\u0088\u00B2\u008ADM\u009ED g(\u00F8\x16\u00E4Q\x11\u00FC\t\"B\u0091\u0091\x00/\x15`\n\u0089A\x05\u0087\"\u008E\b\u009F\u00D66&_' \u00FD\t\u00E9W\u0080\u00DC?\u00AB\u00C6)\x1F\u009C\x06ys/\u00C7\u00DB\"\u00C2\u0096\u009A\u00D3\u00CAglm\u00ED\u00EA\u008FL\u008C\u00E9\u0083:0\u00FC\u00E6\x1Ce\x01\u00C1{\x0B\u00B6\u0082\u008F\u00B5\u00EC\u0099\u00B9\u00FDE\u00E3<\x01\u00ED\u008Bj/sse\u00BB@\u008E\u00F7\u00C3\t\u00ECS\u0088\u00A5js\u00F2\u00FB0\u00E1\u00CFc\u009C\u0085\u00B1I\u00AE`-\u0081\u00EB{\u00BE\u00FDFb\u00A6\u00DA\u009C\u00FC\u00BD7\u00CF\x7F\x04\x04\u00FB]\u00B9\x1F\u00E4\u0098\x00$\u0096z8\u00D3\u00C0\u00DD\u00BB\u00BB\u00FB:\u00CF\u0098\u00B1\u00A5\u0084\u00CC\tDr[\u00D4J\u00AE\u00EB\u008B\u0091x<bW\u00B9\u00EBH<\x10\u00D0\u00E10\u00BB\u00CE]\u00AB\u00BE\u00F3\u0091\u009D\u00C7\x16\x04H\u00C3\u00B5\u00E5vv\u00F4\u0097\x04o\u00E8q\u00BEB\u00B3R\u00CF\x17[u\u00C6\u00D4_\"\u00F8\u00B8\u00F7\u009F\"\u00AB\u00D5D\u00EA\u00A9\x01\u00B0\u00CB\t\u00AE\x0E\x12T\u00BE\u00D1*\u00DAf\u00E4OIA\u0080c\u00D4-\x13*/\u00E6W\u00AEY\u00A9\u0085\x03\u0085\u00DC6\u00F4\u00E7@\u00AE\bV&+\u00B5Dj\u00D5\u0080xS\x7F\x0B\u00E0b_0d\u0099j\u00A5^\x0E\u00DE\x01\u009C2\u00E3#\u00B2\u00C8\x1D!8D {\u00B5\u00CE\u00C84\u00B6\u00B6\u00E6\x06\"\u00CC\u00D4\u00C7\u009E\u00A2\x02?B\u00BD\t\u008B\u00D9x\u00DB\u00E1\f\u00CD}\np\u0086wL#\x11e\u00EC\u00B0\r\u00AD\x19_@\u00C6\u00885\u00F5\u00EC\u0093\x0BE\u00C6i\x1BRm\u00A5\x12\u00CE\u00AE\u00D7\x1F\u0083\u00C2W\x02\u009C\u00FB\u00A8f\u00A5_-ic\u00CC\x1E\x03*\u00BF\x02,\x13\u00C8\u00BA\u00A8\u0095ZBi\u00B8k\u0088\u00D3Ua\u0083\u00A8\x00\u00F0\u00B6f%\u00E7\u0097\"\u00F2E\u00FBI\u00885~\x04\u0088\x07\u00D5\u00E6dS\x18;\u00DB\u00D0[@\u00CE\x07\u00E4o\u00B5\u00BBs8m#6\x1BD:\b\u00A5{\u008Bj\u00A5?\x0FC\u00E4\u0098\u00FAb\x01\u00DF\u00EA\u00C1\x1A\u009A\u0095\u00DC\x18\u00C6\u00CE6\u00E6L\x07\u00E5\u008B uPK\u00DB\u00D0\u00D7\u0083\\\u00E4U8\u00AD3RSj\u00EF\u00F3NlC\u009F\x0F\u00B2\u00A5'\x07\u00EES\u00AD\u00D4\u00B60\x02z\u008Ef;\u0089*\x11\u00BC\u00E1\t\u00D8\x07r\u00B2\x00{\u00A2Vrj\x18\x12\x0F\u00E3\u00D4\u00C7\u00EE\x11\x05\u0081SA\u009D\u0096H\u00BE\x1F\u00D6\u00D66b_\u0081\u0098\u00E6\x159\u00DA\u00A6~\x04\u00E0h\x11\u00D9\x1AM\u00A4\u00E6\u0086&\u00A9\u00D7k\u00A1p\u00BB\u0087W\u00C4\u009D5,\u0091\u00DE\x15\u00D66c\u00E8\u009BI\u00CE\u00F3\x0B\u0093m\u00C6\u00BC\u00BA^.\u0082\u0097\u00A2\u0089\u00E4\x13aI\u00DA\u00CD\u00D8L\x17\b\u009C\ngh\u0089\u00F7v\u0087\u00B5\u00CD\x18\u00B1\x17H<!@'3F\u00AC\u00D3\u00DB\x0FB^P\u00AD\u00D4\u0093aIz'S$\u00E7\u00DEX\u00D3\u0092\u00DE\x1B\u00DA\u00D6\u008C=\x0B`\u00A5\bN{\u00A7\u00E0w\x10c!\u00B2AK\u00A4\u00FCJ\x15\u00E6i7\u00F4).\x198\u00CD\u00E1\x1A\u00AD%\u00F9c\x18;\x0F\u00931\u00F57\t6@\u00E4\x103\u0086\u00BE\u0097\u00E4\x14\bvh\u0089dmX\x12{A\u00ECjD\u00B0\u00DF\u00C3\u0097\u00A1\u00FB\u008Ajk\u00FB\u00C1\u00D0\u00B6\u00A6\u00BE\x1D`\u00ADw/\u00D01\u00F4\u00D7\u0084\\\x02\u0091\u0093j\"5\u00A2X\u00E3\u00D0\u0097\u00FC\u0094y\u00F7\u00E5\u00DD(\u00FB\u00D9?\u0086\u00C4\u00F8\u00BE\u00D7l11\x02\u00D01\u00F5c\x00G\x02\u00B2\u0096\x19\u00B3\u00EENB\u00D9\x11\u00E4\u0092;-\u00DA\u009C\u00FE:\u00CCJ\u009C\u0085\u00B1q\"8\u00E4a+\u0098\u00BD\u00B8\u00AA\u00F9\u0083\u00A3a\u00EC:\u00EA\u00F5\u00A99\u0085\u00BE\x0F\u0085\u00B9\u00DB)\u00F3o\u00ADr\u00CA\u0086\u009E\x04X\t\u00C8{\u009A\u0095\u008A\u0087!\u00BAPL\u00C6\u00D4\u00B7\u00FA\u00DD\u0092\u00A0K=\u00ADT\u00F7\u00BD\u008C\x00\u00BAWi\u00CD\u00E9\u009F.\u00D4\u00C1@v\u00A7\x16\u00D5M\u00ECv\u0095\x03~\u00B4E\u00DE\u008C&R\x0F\u00F9\x02:\u008D\u00F8\u00A8,\u00DC6\u00EFB\x12\u00C1\x01\u00AD\u00FA\u00CCu\\\u00B3\u00F3\u00EFR\"\x1C\u00A3.\x0ER\tS\u0086\u00E5\u0091Y\u0095v\u00E7\u00E0\u00EF\tN\x14\u00C1\u00B9\u00F2\u009C;\u00BAzS\u00FA\u00AFBCb\u009B\u00FA+\x00\x1F\u00F3\u00D5\x01[\u00A2Vr\u00DE@\x02\x1CS_-\u00E0r?\tC\u00D4\u0090B\u00E8\u0083K\u00A8P\u00F4\u00FEm\u00C9\u00BC\\\u0088T\u00EF\x01q\u00A5\u00EFX\u00E4Y-\u0091j,&\"_\u00C2\x03,\x0Ek\u0089\u00E4\u00B8\u00A2XC_\x01\u00F2\u00B9\u00E0\u00BF\u00ECW;#7\u00B1\u00B5\u00F5l \u00BE\u00D7\u00E3mE\x17s\u00DF\x11\u00BC\u00A4\x07\u00DC\u00A2\u0096\u00B7-\u00EEo\u00CA)\x14\u0093`EoD\x13\u00C9\u0087\u00FB\n\u0090\u00E9\u00D3\u00CB\u009C\u00B1\u00D1&\u0080f\x0F_[\u00E4\\vR\u00CD\u0096\x1D'\u00F2\u00D8\u00F3\u00DA\u00F2\u008E\x05u\x13r\n?\u00C9w\u00C6\u00C5\u00DA\u00F2\u0080\\[\x02\u00A1\u00A8G2\u00EB\u00FAv\u00CE\x17\u00D4\u0096\u00E7Uy\u00ED\u00B9[9\u00E8C\x027\u00E6\u00BF\td\x1B\\l\u00D2j\u00CE~V,A\u00FD\u00C1DQg\u00E4D\u00A9\u00EF=\u0098\x00\u00F2\u00A5\u00DAu\u00B66\u00D4`Rp\x18\u008FG\u00DA\u00AB\u00DC\x07\u0084\u00B2\n\u00E0E\u0085\u00EF\u0082s\u0084\u00EC\x01pL\u00C0?\x00D\b\x19\u00E5\u008Ff\u0094\u00C9^c\u00DBk+\u008ES\u00B0r\u00D8\u0098d\x13\x1B\u00E1\r\u00B1\u00E7=%\u0087SYX[\u00ED\u00B8\u00E5\u008DB4\u00FC\u00CF\u00E1t\u00BD\u00AAd\x1B\u00D9\u00FC\u00C1\u00A9\u0081NSI\x01\u0085\u0095?2\u00AB\u00D2\u00E9\x18<\u00F3\u00BC\u00F1\u00DC\u00BB\x0B\u0085'\u00FC\u00F1\\\u00F0\x0B\x04\u00EF\u00FE\u009F\u00F1\u00FC\x1F\u00FD`\u009C\u00D7\u00FD/\x15\u00F1\x00\x00\x00\x00IEND\u00AEB`\u0082";
image_1=win.add("image",[30,70,62,102] ,ScriptUI.newImage (createResourceFile ("image_1Image.png", image_1Image, getUserDataFolder())) );
statictext_2=win.add("statictext",[65,81,265,101] ,"DON'T SORT BY COMMENT !",{multiline:true});
okBtn.onClick = function () { namingComment(this.parent); };
cancBtn.onClick = function () {this.parent.close(1)};
mainBtn.onClick = function(){mainStr.text = "main";};
clrBtn.onClick = function(){mainStr.text = "";};
shapeBtn.onClick = function(){mainStr.text = "shape"}
return win;
}
function getUserDataFolder () {
		var userDataFolder = Folder.userData;
		var aescriptsFolder = Folder(userDataFolder.toString() + "/Aescripts/new_project/yourImg"); 
		if (!aescriptsFolder.exists) {
			var checkFolder = aescriptsFolder.create();
					if (!checkFolder) {
						alert ("Error creating ");
						aescriptsFolder  = Folder.temp;
						} }
		return aescriptsFolder.toString();
		}

function createResourceFile (filename, binaryString, resourceFolder) {
    var myFile = new File(resourceFolder+"/"+filename);
    if (!File(myFile).exists)
    {
        if (!(isSecurityPrefSet())) 
        {
            alert ("This script requires access to write files. Go to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked.");	
             try{
            app.executeCommand(2359);
            }
            catch (e) {
                alert(e);
                }
            if (!isSecurityPrefSet()) return null; 
        }
        myFile.encoding = "BINARY";
        myFile.open( "w" );
        myFile.write( binaryString );
        myFile.close();
    }
    return myFile;
}
function isSecurityPrefSet(){
    try{
			var securitySetting = app.preferences.getPrefAsLong("Main Pref Section",
							"Pref_SCRIPTING_FILE_NETWORK_SECURITY");
			return (securitySetting == 1);
            }catch(e){return (securitySetting = 1);}
		}

var w = buildUI(this);
if (w.toString() == "[object Panel]") {
    w;
} else {
    w.center();
    w.show();
}

function namingComment(theDialog){
    var allItem = app.project.items;
    var count = 0;
    var text=mainStr.text;
    app.beginUndoGroup("naming comments");
    for (var i = 1; i <= app.project.numItems ; i++) {
        if(app.project.item(i).selected){
            var str=text;
            app.project.item(i).comment=str;
            count++;
        }
        // alert(1);
    }
    if(count==0)
        alert('please select at least one item!');
    app.endUndoGroup();
}