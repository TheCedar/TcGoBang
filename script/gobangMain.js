function gobangInit() {
    for(var i = 1; i <= boardSize; i++) {
        var boardLine = new Array();
        for(var j = 1; j <= boardSize; j++) {
            boardLine[j] = 0;
        }
        boardNow[i] = boardLine;
    }
    next = 1;
    count = 0;
    end = false;
}

function putPiece(x, y) {
    if(boardNow[x][y] != 0) {
        window.alert("该位置已有棋子！");
        return ;
    }
    else if(end) {
        var confVal = confirm("游戏已结束，是否要重新开始？\n重新开始则本局全部信息将被清空");
        if(confVal == true) {
            location.reload();
        }
        else {
            ;
        }
        return ;
    }
    else {
        boardNow[x][y] = next;
        document.getElementById("piece" + x.toString() + "_" + y.toString()).src = "./img/" + ((next == 1)?"blackPiece":"whitePiece") + ".png";
        console.log("x: ", x, "y: ", y, "Color: ", next);
        count ++;
        refreshCnt(3 - next);
        if(checkWin(x, y, next)) {
            window.alert("游戏结束，" + ((next == 1)?"黑方":"白方") + "获胜！");
            end = true;
        }
        next = 3 - next;
        return ;
    }
}

function checkWin(x, y, color) {
    /* 横向 */
    for(i = Math.max(y - 4, 1); i <= y && i + 4 <= boardSize; i++) {
        var flag = true;
        for(j = 1; j <= 5; j++) {
            if(boardNow[x][i + j - 1] != color) {
                flag = false;
                break;
            } 
        }
        if(flag) {
            return true;
        }
    }

    /* 纵向 */
    for(i = Math.max(x - 4, 1); i <= x && i + 4 <= boardSize; i++) {
        var flag = true;
        for(j = 1;j <= 5; j++) {
            if(boardNow[i + j - 1][y] != color) {
                flag = false;
                break;
            }
        }
        if(flag) {
            return true;
        }
    }

    /* 左上 - 右下 */
    for (i = 1; i <= Math.min(5, Math.min(x, y)); i++) {
        if (x - i + 5 > boardSize) {
            continue;
        }
        else if (y - i + 5 > boardSize) {
            continue;
        }
        var flag = true;
        for(j = 1; j <= 5; j++) {
            if(boardNow[x - i + j][y - i + j] != color) {
                flag = false;
                break;
            }
        }
        if(flag) {
            return true;
        }
    }

    /* 右上 - 左下 */
    for (i = 1; i <= Math.min(5, Math.min(x, boardSize - y + 1)); i++) {
        if (x - i + 5 > boardSize) {
            continue;
        }
        else if (y + i - 1 > boardSize) {
            continue;
        }
        // console.log("* ", i);
        var flag = true;
        for(j = 1; j <= 5; j++) {
            if(boardNow[x - i + j][y + i - j] != color) {
                flag = false;
                break;
            }
        }
        if(flag) {
            return true;
        }
    }

    return false;
}

function refreshCnt(next) {
    if(count%2 == 0) {
        document.getElementById("blackCnt").innerHTML = (count / 2).toString();
        document.getElementById("whiteCnt").innerHTML = (count / 2).toString();
    }
    else {
        document.getElementById("blackCnt").innerHTML = (count / 2 + 0.5).toString();
        document.getElementById("whiteCnt").innerHTML = (count / 2 - 0.5).toString();
    }
    console.log(next);
    if(next == 1) {
        document.getElementById("next").innerHTML = "黑方";
        document.getElementById("whitePieces").style = "color: #000000;";
        document.getElementById("whiteCnt").style = "color: #000000;";
        document.getElementById("blackPieces").style = "color: #FF0000;";
        document.getElementById("blackCnt").style = "color: #FF0000;";
    }
    else if (next == 2) {
        document.getElementById("next").innerHTML = "白方";
        document.getElementById("whitePieces").style = "color: #FF0000;";
        document.getElementById("whiteCnt").style = "color: #FF0000;";
        document.getElementById("blackPieces").style = "color: #000000;";
        document.getElementById("blackCnt").style = "color: #000000;";
    }
}