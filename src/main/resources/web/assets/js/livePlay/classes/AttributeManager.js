
class AttributeManager{
    constructor(snapshot){
        this.myShipName = getOwnRobotFullName();
        this.snapshot = snapshot;
    }

    update(snapshot){
        this.snapshot = snapshot;
        setTime();
        this.setPlayerList();

        var myShip = this.snapshot.turn.robots.ship.filter((ship) => {
            return ship.name == this.myShipName;
        })[0];

        if(myShip){
            this.setOwnValues(myShip);
            if(myShip.score){
                this.setScoreValues(myShip.score);
            }
        }

        if(this.selected){
            var selectedShip = this.snapshot.turn.robots.ship.filter((ship) => {
                return ship.name == this.selected;
            })[0];

            if(selectedShip){
                this.setViewerValues(selectedShip);
            }
        }
    }

    setViewerValues(selectedShip){

        if(selectedShip.score){
            //todo set score values
        }
    }

    setScoreValues(score){
        $('#score_total').text(score.totalScore);
        $('#score_current').text(score.currentScore);
        $('#score_damage').text(score.currentBulletDamageScore);
        $('#score_kill').text(score.currentBulletKillBonus);
        $('#score_survival').text(score.currentSurvivalScore);
    }

    setOwnValues(myShip){
        $("#my_energy").text(myShip.energy);
        $("#my_x").text(myShip.x);
        $("#my_y").text(myShip.y);
        $("#my_state").text(myShip.state);
        $("#my_velocity").text(myShip.velocity);
        $("#my_type").text(myShip.type);

        $("#bodyheadingrad").text(myShip.bodyHeading);
        $("#bodyheadingdeg").text(toDegrees(myShip.bodyHeading));

        //<td id="my_bodyheading"> rad: 5.3682731013567295 <br>deg: 307.5793919813458</td>

    }

    setPlayerList(){
        $('#playerList').empty();
        this.snapshot.turn.robots.ship.forEach((ship) => {
            var onclickFn = `'selectViewer("${ship.name}")'`;
            $('#playerList').append(` <tr><td>${ship.name}</td></tr>`)

        })
    }

}

function selectViewer(selected){
    alert("Selected: " + selected);
    AttributeManager.selected = selected;
}
function toDegrees(radians) {
    return (radians * 57.2957795);
}
function setTime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var h = (today.getHours() < 10)? `0${today.getHours()}` : today.getHours();
    var m = (today.getMinutes() < 10)? `0${today.getMinutes()}` : today.getMinutes();
    if(dd<10) {dd = '0'+dd}
    if(mm<10) {mm = '0'+mm}

    $('#info_date').text(`${dd}-${mm}-${yyyy}`);
    $('#info_time').text(`${h}:${m}`);
}
$(window).ready(() => {
   setTime();
});