$(document).ready(function () {

    $('li.dropdown-submenu a[tabindex="-1"]').on('click', function (event) {
        // The event won't be propagated up to the document NODE and
        // therefore delegated events won't be fired
        //console.log("BINGO");
        event.stopPropagation();
    });
});
