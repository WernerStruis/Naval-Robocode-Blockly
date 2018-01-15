function getRobotList() {
    var url = "/robocode/robots";

    $('#selectOpponents').empty();
    $('#selectedOpponents').empty();

    $.ajax({
        type: "GET",
        url: url,
        statusCode: {

            200: function (data) {
                // Only if your server returns a 403 status code can it come in this block. :-)
                console.log(data);
                data = data.substring(1, data.length - 1);
                data.split(",").map(function (item) {
                    $('#selectOpponents').append("<option value='" + item.trim() + "'>" + item.trim() + "</option>")
                });
            },
            500: function (data) {
                console.log(data);
            }
        }
    });
}

function getOwnRobotFullName() {
    var shipConfig = JSON.parse(localStorage.getItem('SHIPCONFIG'));

    if (shipConfig) {
        return `${shipConfig.package}.${shipConfig.name}*`;

    } else {
        Console.log("ERROR: No config for testing (newBattle.js:33)");
    }
}

function getOwnRobot() {
    var shipConfig = JSON.parse(localStorage.getItem('SHIPCONFIG'));

    if (shipConfig) {
        var shipName = shipConfig.name;
        var shipPackage = shipConfig.package;
        var shipString = shipPackage + "." + shipName;

        return shipString;
    } else {
        Console.log("ERROR: No config for testing (newBattle.js:33)");
    }
}

function startBattle() {
    closeWebSocket();
    resetHandler();
    $('#startNewBattleModal').modal('hide');


    var url = "/robocode/start";
    var opponents = [];

    $('#selectedOpponents').find('option').each(function () {
        opponents.push($(this).val());
    });

    opponents.push(getOwnRobot());

    var opponentString = JSON.stringify(opponents).replace(/ /g, '');
    console.log("OPPONENTSTRING " + opponentString);
    var shipConfig = JSON.parse(localStorage.getItem('SHIPCONFIG'));
    if (shipConfig) {
        var json = {
            opponents: opponentString,
            code: shipConfig.code
        };

        console.log("JSON");
        console.log(json);
        //alert(JSON.stringify(json));

        $.ajax({
            type: "POST",
            url: url,
            contentType: "text/json;",
            data: JSON.stringify(json),
            statusCode: {

                200: function (data) {
                    // Only if your server returns a 403 status code can it come in this block. :-)
                    console.log(data);
                    createWebSocket();
                },
                500: function (data) {
                    console.log(data);
                }
            }
        });
    }
}


function addOpponents() {
    var opponents = $('#selectOpponents').val();
    console.log(opponents);

    if (opponents.length > 0) {

        opponents.forEach(function (opponent) {
            var shipString = opponent;
            var optionString = shipString;
            var amount = 0;

            $('#selectedOpponents').find('option').each(function () {
                if (this.value == shipString) {
                    amount++;
                }
            });

            if (amount > 0) {
                shipString += '(' + amount + ')';
            }
            $('#selectedOpponents').append("<option value='" + optionString + "'>" + shipString + "</option>")
        })
    }
}

function removeOpponents() {
    var opponents = $('#selectedOpponents').val();

    if (opponents.length > 0) {
        opponents.forEach(function (opponent) {
            $('#selectedOpponents').find('option[value="' + opponent + '"]').remove();
        })
    }
}

function stopGame(){
    //TODO stop current game
    var url = "/robocode/stop";

    $.ajax({
        type: "GET",
        url: url,
        contentType: "text/json;",
        statusCode: {

            200: function (data) {
                // Only if your server returns a 403 status code can it come in this block. :-)
                console.log(data);
            },
            500: function (data) {
                console.log(data);
            }
        }
    });
}

function newGame() {

    stopGame();

    $('#startNewBattleModal').modal('show');
    getRobotList();
}

function returnToBlockly() {
    window.location.replace('/web/workspace.html');
}