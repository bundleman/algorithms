var frm;
var canvas;
var startSearchPath;
var ok_btn;
var reset_btn;
var mapG;
window.onload = function() {
    frm = document.getElementById('frmMazeSize');
    canvas = document.getElementById('canvas');
    startSearchPath = document.getElementById('startSearchPath');
    ok_btn = document.getElementById('ok_btn');
    reset_btn = document.getElementById('reset_btn');
    mapG = new MapGen(canvas, +frm.elements.widthMaze.value, +frm.elements.heightMaze.value, 0, 0);
    init();
};
function init() {
    ok_btn.onclick = function (event) {
        event.preventDefault();
        mapG = new MapGen(canvas, +frm.elements.widthMaze.value, +frm.elements.heightMaze.value, 0, 0);

    };
    reset_btn.onclick = function (event) {
        event.preventDefault();
        frm.reset();
        mapG = new MapGen(canvas, +frm.elements.widthMaze.value, +frm.elements.heightMaze.value, 0, 0);

    };
    startSearchPath.onclick = function(event){
        event.preventDefault();
        if(+frm.elements.widthMaze.value!=0 && +frm.elements.heightMaze.value!=0) {
            setTimeout(function () {
                canvas.style.background = "#696969 center no-repeat";
            },10);
            setTimeout(function () {
                canvas.style.background = "";
                mapG.findPath(frm.elements.heightMaze.value - 1, 0, frm.elements.widthMaze.value - 1, 0, true);
            },20);
        }

    };

}


