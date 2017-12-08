
$(document).ready(function () {

    $('#config-shipname').change(function(){
        if(!validateName($('#config-shipname').val())){
            $('#config-shipname').parent().addClass('has-error');
        }else{
            $('#config-shipname').parent().removeClass('has-error');
        }
    })

    $('#config-shippackage').change(function(){
        if(!validateName($('#config-shippackage').val())){
            $('#config-shippackage').parent().addClass('has-error');
        }else{
            $('#config-shippackage').parent().removeClass('has-error');
        }
    })
    

});

function validateName(text){
    var regEx = new RegExp('[A-Za-z]+');
    return text == regEx.exec(text);
}