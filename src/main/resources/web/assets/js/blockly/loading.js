$('body').on('INIT', function(){
    $('#loadingProgress').width('10%');
});

$('body').on('API', function(){
    $('#loadingProgress').width('50%');
});

$('body').on('READY', function(){
    $('#loadingProgress').width('99%');
});

$(window).on('load', function(){
    setTimeout(function(){
        $('#loadingOverlay').hide();
    },1000);
});


