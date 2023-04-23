function back() {
    if (x21.length-1 != 1) {
        x21.pop();
        x21[x21.length-1].cont = "";
        console.log("ページnow:" + x21[x21.length-2].cont);
    }
    main();
}

function makeX21Array() {
    let v = x21.length;
    x21[v] = [];
    x21[v].cont = "";
    return x21[x21.length-1];
}

function downloadVariableAsFile(variable, filename) {
    const blob = new Blob([variable], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function main() {
    switch (x21.length-1){
        case 0:
            if (x21[0].cont != "") {
                makeX21Array();
                document.getElementById("mokuji").innerText = "ホーム>";
                document.getElementById("content").innerHTML = `
                <div class="cont-1">選択肢</div>
                <button class="cont-but" onclick="x21[1].cont='group'; clicked();">グループ検索式</button><br>
                <button class="cont-but" onclick="x21[1].cont='offset'; clicked();">オフセット式</button>
                `;
            }
            break;

        case 1:
            if (x21[1].cont != "") {
                if (x21[1].cont == "group") {
                    document.getElementById("mokuji").innerText = "ホーム>グループ>";
                } else {
                    document.getElementById("mokuji").innerText = "ホーム>オフセット>";
                }
                makeX21Array();
                document.getElementById("content").innerHTML = `
                <div class="cont-1">選択肢</div>
                <button class="cont-but" onclick="x21[2].cont='normal'; clicked();">ノーマル型</button><br>
                <button class="cont-but" onclick="x21[2].cont='prompt'; clicked();">プロンプト型</button><br>
                <small>※prompt型なら以下の情報も選択</small><br>
                <div class="pro-1">- 形式<small>(1つのみ)</small></div>
                <ul>
                    <input type="radio" name="ns" value="number">Number形式<br>
                    <input type="radio" name="ns" value="seekbar">SeekBar形式<br>
                </ul>
                <br>
                <div class="pro-1">- 使用場所<small>(1つ以上)</small></div>
                <ul>
                    <input type="checkbox" id="search" value="search">検索<br>
                    <input type="checkbox" id="refine" value="refine">再検索<br>
                    <input type="checkbox" id="edit" value="edit">書き換え
                </ul>
                `;
            } else {
                x21.pop();
                main();
            }
            break;
            
        case 2:
            if (x21[2].cont != "") {
                makeX21Array();
                if (x21[1].cont == "group") {
                    if (x21[2].cont == "normal") {
                        document.getElementById("mokuji").innerText = "ホーム>グループ>標準>";
                        document.getElementById("content").innerHTML = `
                        <form id="group-normal" action="#" method="GET">
                            <div class="cont-1">情報を入力</div>
                            <ul>
                                <li>範囲を選択<div id="daizi">*</div>:</li>
                                <select id="ranges" multiple>
                                    <option value=2>Jh</option>
                                    <option value=1>Ch</option>
                                    <option value=4>Ca</option>
                                    <option value=8>Cd</option>
                                    <option value=16>Cb</option>
                                    <option value=262144>PS</option>
                                    <option value=32>A</option>
                                    <option value=65536>J</option>
                                    <option value=64>S</option>
                                    <option value=524288>As</option>
                                    <option value=1048576>V</option>
                                    <option value=-2080896>O</option>
                                    <option value=131072>B</option>
                                    <option value=163884>Xa</option>
                                    <option value=32768>Xs</option>
                                </select>
                                <br>
                                <li>種類を選択<div id="daizi">*</div>:</li>
                                <select id="type">
                                    <option value=127>Auto</option>
                                    <option value=4>Dword</option>
                                    <option value=16>Float</option>
                                    <option value=64>Double</option>
                                    <option value=2>Word</option>
                                    <option value=1>Byte</option>
                                    <option value=32>Qword</option>
                                    <option value=8>Xor</option>
                                </select>
                                <li>検索値<div id="daizi">*</div>:</li>
                                <input type="text" id="searchNumber" placeholder="0~~0;32400::255">
                                <li>リファイン値:</li>
                                <input type="text" id="refineNumber" placeholder="0~~0">
                                <li>表示する数値の数:</li>
                                <input type="text" id="seeing" placeholder="500">
                                <br>
                                <li>書き換え値<div id="daizi">*</div>:</li>
                                <input type="text" id="editValue" placeholder="9999">
                                <button id="submit" onclick="clickBut();">コード作成</button>
                            </ul>
                        </form>
                        `;

                    } else {
                        document.getElementById("mokuji").innerText = "ホーム>グループ>特殊>";

                    }
                } else {
                    if (x21[1].cont == "normal") {
                        document.getElementById("mokuji").innerText = "ホーム>オフセット>標準>";

                    } else {
                        document.getElementById("mokuji").innerText = "ホーム>オフセット>特殊>";

                    }
                }
            } else {
                x21.pop();
                main();
            }
            break;
    }
} 

function clicked() {
    console.log("clicked id:" + x21[x21.length-1].cont);
    if (x21[x21.length-1].cont == "prompt" && !(document.getElementsByName("ns")[0].checked || document.getElementsByName("ns")[1].checked)) {
        console.log("error:形式にチェックがされていません。");
        alert("形式にチェックを入れてください。");
        return false;
    }

    if (x21[x21.length-1].cont == "prompt" && !(document.getElementById("search").checked || document.getElementById("refine").checked || document.getElementById("edit").checked)) {
        console.log("error:使用場所にチェックがありません。");
        alert("使用場所にチェックを入れてください。");
        return false;
    }

    document.getElementById("content").innerHTML = "<div class='cont-1'>読み込み中...</div><small>(これが表示されてるならエラーかも。)</small>";
    main();
}

function clickBut() {
    let a = document.getElementById("ranges");
    let b = 0;
    for (let i=0; i < a.length; i++) {
        if (a[i].selected) {
            b = b + Number(a[i].value);
        }
    }

    let c = document.getElementById("searchNumber").value;
    let d = document.getElementById("refineNumber").value;
    let e = document.getElementById("seeing").value;
    let f = document.getElementById("editValue").value;
    let g = document.getElementById("type").value;
    if (b == 0) {
        alert("メモリ範囲を選択してください。");
        console.log("error:メモリ範囲が選択されていません。");
        return false;
    }

    if (g == "") {
        alert("種類を選択してください。");
        console.log("error:種類が選択されていません。");
        return false;
    }

    if (c == "") {
        alert("検索値を入力してください。");
        console.log("error:検索値が入力されていません。");
        return false;
    }

    if (f == "") {
        alert("変更値を入力してください。");
        console.log("error:変更値が入力されていません。");
        return false;
    }

    if (d == "" || e == "") {
        if (d == "") {
            d = "0~~0";
        }
        
        if (e == "") {
            e = "500";
        }
    }
    console.log(b, c, d, e, f, g);
    
    let code = `gg.setRanges(` + b + `)
gg.clearResults()
gg.searchNumber("` + c + `", ` + g + `)
gg.refineNumber("` + d + `", ` + g + `)
gg.getResults(` + e + `)
gg.editAll("` + f + `", ` + g + `)
gg.toast("成功")
`;
    downloadVariableAsFile(code, "あるむすScript.lua");
}



var x21 = [];
x21[0] = []
x21[0].cont = "home";
main();