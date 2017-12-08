function alignCenter(element) {
    $(element).css({
        'position': 'absolute',
        'left': '50%',
        'top': '50%',
        'margin-left': -$(element).width() / 2,
        'margin-top': -$(element).height() / 2
    });
}

function promptFullScreen() {
    if (!window.fullScreen) {
        //show make fullscreen msg
        $('#loadingOverlay').show();
    } else {
        //hide make fullscreen msg
        $('#loadingOverlay').hide();
    }

    window.onresize = function (event) {
        console.log(window.fullScreen);

        if (!window.fullScreen) {
            //show make fullscreen msg
            $('#loadingOverlay').show();
        } else {
            //hide make fullscreen msg
            $('#loadingOverlay').hide();
        }
        alignCenter($('#wrapper.container'));
    };
}
$(document).ready(function () {

    alignCenter($('#wrapper.container'));

    promptFullScreen();

    $('#apiselectmodal').modal();

    $('#config-form').submit(function (e) {
        e.preventDefault();
        return false;
    });

    //alignCenter($('#wrapper.container'));

    //$(function() {
    //    $('#main .container').css({
    //        'position' : 'absolute',
    //        'left' : '50%',
    //        'top' : '50%',
    //        'margin-left' : -$('#main .container').outerWidth()/2,
    //        'margin-top' : -$('#main .container').outerHeight()/2
    //    });
    //});
    //if ($('#main.wrapper .container').height() > $('#main.wrapper').height()) {
    //    $('.wizard-inner').hide();
    //}

    //this occurs every time a tab is changed
    $('.nav-tabs li a').on('shown.bs.tab', function (event) {
        switch ($(event.target).attr('id')) {
            case '1':
                loadTabOne();
                break;
            case '2':
                loadTabTwo();
                break;
            case '3':
                loadTabThree();
                break;
        }
    });

    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        if (checkRequirements(this)) {
            clearAlert();
            var $active = $('.wizard .wizard-inner .nav-tabs li.active');
            $('.current').removeClass($active.attr('id'));
            $active.addClass('finished');
            $active.next().removeClass('disabled');
            $('.current').addClass($active.next().attr('id'));
            nextTab($active);
            $active.addClass('disabled');
        }

    });
    $(".prev-step").click(function (e) {
        clearAlert();
        var $active = $('.wizard .nav-tabs li.active');
        $active.prev().removeClass('disabled');
        prevTab($active);
        $active.addClass('disabled');

    });

    $('#config-shipname').change(function () {
        if (!validateName($('#config-shipname').val())) {
            $('#config-shipname').parent().addClass('has-error');
            alertMessage('[data-tag="error-shipname"]');
        } else {
            $('#config-shipname').parent().removeClass('has-error');
        }
    })

    $('#config-shippackage').change(function () {
        if (!validateName($('#config-shippackage').val())) {
            $('#config-shippackage').parent().addClass('has-error');
            alertMessage('[data-tag="error-shippackage"]');
        } else {
            $('#config-shippackage').parent().removeClass('has-error');
        }
    })

});

function checkRequirements(e) {
    switch (e.id) {
        case "sone":
            //alert(checkShipRequirements($('.ship-item.selected').attr('id')));
            return checkShipRequirements($('.ship-item.selected').attr('id'));
            break;
        case "stwo":
            //alert(checkComponentRequirements($('.ship-item.selected').attr('id')));
            return checkComponentRequirements($('.ship-item.selected').attr('id'));
            break;
        case "sthree":
            //alert(checkValueRequirements());
            return checkValueRequirements();
            break;
    }
}

function checkValueRequirements() {
    var valid = true;

    if (!$('#config-shipname').val() || !validateName($('#config-shipname').val())) {
        $('#config-shipname').parent().addClass('has-error');
        valid = false;
    } else {
        $('#config-shipname').parent().removeClass('has-error');
    }

    if (!$('#config-shippackage').val() || !validateName($('#config-shippackage').val())) {
        $('#config-shippackage').parent().addClass('has-error');
        valid = false;
    } else {
        $('#config-shippackage').parent().removeClass('has-error');
    }

    if (!valid) {
        alertMessage('[data-tag="error-fields"]');
    } else {
        clearAlert();
    }

    return valid;
}

function getBlocklyName(name) {
    switch (name) {
        case "MC":
            return "MineComponent";
        case "MSC":
            return "MissileComponent";
        case "SBC":
            return "SingleBarrelCannon";
        case "DBC":
            return "DoubleBarrelCannon";
        case "LRR":
            return "LongRangeRadar";
        case "SRR":
            return "ShortRangeRadar";
    }
}

function loadWorkspace() {
    var shipConfig = {};
    var API = $('#selectedAPI').text();
    var shipName = $('#config-shipname').val();
    var shipPackage = $('#config-shippackage').val();
    var shipType = $("#config-shiptype").val() + "Ship";
    var componentConfig = [];

    var selector = "#" + shipType;
    $(selector).find('.slots .slot').children().each(function (e) {
        componentConfig.push(getBlocklyName($(this).attr("alt")));
    });

    shipConfig.API = API;
    shipConfig.name = shipName;
    shipConfig.package = shipPackage;
    shipConfig.type = shipType;
    shipConfig.componentConfig = componentConfig;


    localStorage.removeItem('SHIPCONFIG');
    localStorage.setItem('SHIPCONFIG', JSON.stringify(shipConfig));

    window.location.replace('workspace.html?lang=' + getLang());
}

function selectLanguage() {
    if ($('.modal.fade.in')) {
        $($('.modal.fade.in')).modal('hide');
    }
    $('#languagemodal').modal();
}


function validateName(text) {
    var regEx = new RegExp('[A-Za-z]+');
    return text == regEx.exec(text);
}

function clearAlert() {
    $('#error-alert').hide();
}
function alertMessage(datatag) {
    $('#error-message').empty();
    console.log($(datatag));
    $('#error-message').text($(datatag).text());
    $('#error-alert').show();
}

function checkShipRequirements(type) {
    if (typeof (type) == 'undefined') {
        alertMessage("[data-tag='error-shiptype']");
        return false;
    } else {
        return true;
    }
}

function checkComponentRequirements(type) {
    var selector = "#" + type + "Ship";
    var valid = true;
    $("#config-shiptype").val(type);

    $(selector).find('.slots').children().each(function () {
        if ($(this).children().length == 0) {
            valid = false;
            alertMessage('[data-tag="error-components"]');
        }
    });
    return valid;
    //return true;
}

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

function selected(e) {
    $('.ship-item.selected').removeClass('selected');
    $(e).addClass('selected');
    $('#selectedShip').text($(e).attr('id'));
}
function selectedAPI(e) {
    $('.api-item.selected').removeClass('selected');
    $(e).addClass('selected');
    $('#selectedAPI').text($(e).attr('id'));
}
function setAPI() {
    var API = $('#selectedAPI').text();
    if (!API) {
        $('#apiError').show();
    } else {
        $('#apiError').hide();
        $('#apiselectmodal').modal('hide');
    }
    //alert(API)
}
//choose ship type tab
function loadTabOne() {
}

function loadTabTwo() {
    var type = $('.ship-item.selected').attr('id');
    $('span#selected').text(type);
    $('.ship img').parent().removeClass('show');
    $('.ship img[alt="' + type + '"]').parent().addClass('show');
}

function loadTabThree() {
    $('#selected-components').empty();
    var type = $('.ship-item.selected').attr('id');
    var selector = "#" + type + "Ship";
    $("#config-shiptype").val(type);

    var i = 0;
    $(selector).find('.slots .slot').children().each(function (e) {
        i++;
        $('#selected-components').append(append($(this).attr("alt"), i))
    })
}
function getName(name) {
    switch (name) {
        case "MC":
            return "MineComponent";
        case "MSC":
            return "MissileComponent";
        case "SBC":
            return "Single Barrel Cannon";
        case "DBC":
            return "Double Barrel Cannon";
        case "LRR":
            return "Long Range Radar";
        case "SRR":
            return "Short Range Radar";
    }
}
function append(name, i) {
    return '<div class="form-group"> <label for="config-slot' + i + '">Slot ' + i + '</label> <input type="text" disabled class="form-control summary-slot" data-tag="config-slot-' + i + '" value="' + getName(name) + '" id="config-slot' + i + '"> </div>'
}

