//var opponents = '["SimpleShips.SitAndFire","NewShips.Cruiser.TestCruiser , navalsample.NavalCrazy"]';
//
//
//function startBattle() {
//    var url = "http://localhost:8080/robocode/start";
//
//    var opponentString = opponents;
//    console.log("OPPONENTSTRING " + opponentString);
//    var shipConfig = JSON.parse(localStorage.getItem('SHIPCONFIG'));
//
//    if (shipConfig) {
//        var json = {
//            opponents: opponentString,
//            code: shipConfig.code
//        };
//
//        console.log("JSON");
//        console.log(json);
//        //alert(JSON.stringify(json));
//        //            data: '{"opponents": "[ NewShips.Cruiser.TestCruiser , SimpleShips.SitAndFire , navalsample.NavalCrazy , navalsample.NavalCrazy ]"}',
//
//        $.ajax({
//            type: "POST",
//            url: url,
//            contentType: "text/json;",
//            data: '{"opponents": "[ NewShips.Cruiser.TestCruiser , navalsample.NavalCrazy ]"}',
//            statusCode: {
//
//                200: function (data) {
//                    // Only if your server returns a 403 status code can it come in this block. :-)
//                    console.log(data);
//                    createWebSocket();
//                },
//                500: function (data) {
//                    console.log(data);
//                }
//            }
//        });
//    }
//}
//
///**
// "["ComponentCombinationShips.DB_LR_DB","ComponentCombinationShips.DB_LR_DB"]"
// ["undefined.Test","ComponentCombinationShips.DB_LR_DB","ComponentCombinationShips.DB_LR_DB"]
// ["ComponentCombinationShips.DB_LR_DB","ComponentCombinationShips.DB_LR_DB"]
// */