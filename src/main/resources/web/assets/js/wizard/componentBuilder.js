$(document).ready(function () {

    //make items draggable
    $('.draggable').draggable({
        containment: 'window',refreshPositions: true,
        helper: 'clone',
        revert: "invalid",
        scroll: false,
        snap: '.slot',
        snapMode: 'inner',
        grid: [5, 10],
        snapTolerance: 10
    });

    //make slots droppable
    $('.slot').droppable({
        tolerance:"touch",
        accept: function( draggable ){
            //if no component placed
            if ($(this).children().length == 0){
                return true;
            }
            return false;
        },
        drop: function (event, ui) {

            //add dropped class so that others can not be placed here
            $(this).addClass('dropped');

            //if not already a clone
            if (ui.helper.hasClass("draggable")) {

                //create duplicate so that it can be moved
                var new_signature = $(ui.helper).clone().addClass('clone').addClass('dropped').removeAttr('style');
                new_signature.draggable({
                    containment: 'window',
                    revert: "invalid",
                    scroll: false,
                    snap: '.slot',
                    snapMode: 'inner',
                    snapTolerance: 30,
                    zIndex: 999
                });

                //add clone to slot
                //$(this).append(new_signature);
                $(this).append($(ui.helper).clone().addClass('clone').removeAttr('style'));
            }
        },
        out: function( event, ui ){
            //remove dropped class so that slot is avalible again
            $(ui.helper).remove();
            $(this).removeClass('dropped');
            ui.draggable.removeClass('dropped');
        },
        over: function( event, ui ) {
            if($(this).children().length == 0){
                $(this).removeClass('dropped');
            }
        }
    });

    $('.trash').droppable({
        hoverClass: "hover",
        drop: function (event, ui) {
            $(ui.helper).remove()
        }
    });

    $( "body" ).on( "dblclick", ".clone", function() {
        $(this).parent().removeClass("dropped");
        $(this).remove();
    } );
});