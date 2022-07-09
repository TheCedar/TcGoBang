var boardNow = new Array();
var boardSize = 15;
var maxPieces = 5;  /* 尚未使用 */

/*
0 : empty
1 : black
2 : white
*/

var next = 1;
var end = false;
var count = 0; /* 已下棋子数 */
var record  = [
    {
        "x" : 0 ,
        "y" : 0 ,
    }
];