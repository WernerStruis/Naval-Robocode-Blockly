goog.provide('Blockly.Java.Arrays');
goog.provide('Blockly.Constants.Arrays');

Blockly.Constants.Arrays.appendErrorToData = function appendErrorToData(block, error){
    var curData = block.data;
    var JSONData = JSON.parse(curData);

    if(!JSONData){
        JSONData = {};
    }
    if(!JSONData.error){
        JSONData.error = [];
    }
    if(!goog.array.contains(JSONData.error, error)) {
        JSONData.error.push(error);
    }

    block.data = JSON.stringify(JSONData);
};
Blockly.Constants.Arrays.removeErrorFromData = function removeErrorFromData(block, error){
    var curData = block.data;
    var JSONData;
    if(curData && curData != ''){
        JSONData = JSON.parse(curData);
    }else{
        JSONData = {};
    }

    if(!JSONData.error){
        JSONData.error = [];
    }
    if(goog.array.contains(JSONData.error, error)) {
        goog.array.remove(JSONData.error, error);
    }

    block.data = JSON.stringify(JSONData);
};
Blockly.Constants.Arrays.getNextError = function getNextError(block){
    var curData = block.data;
    var JSONData;

    if(curData && curData != ''){
        JSONData = JSON.parse(curData);
    }else{
        JSONData = {};
    }

    if(!JSONData.error || JSONData.error.length == 0){
        return null;
    }else{
        return JSONData.error[0];
    }
};


