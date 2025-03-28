let attempt1=5;

function checkInput() {
    const userInput = document.getElementById("userInput").value;
    const correctPassword = "98456109645610";  // 這裡可以改成你要的密碼

    if (userInput === correctPassword) {
        window.location.href = "page2.html";  // 輸入正確時跳轉
    } else {
        //document.getElementById("message").innerText = "密碼錯誤，請再試一次！";

        attempt1--;
        if (attempt1 > 0) {
            message.innerText = `密碼錯誤！剩餘 ${attempt1} 次機會`;
        } else {
            document.body.innerHTML = "<h1 style='font-size: 100px; text-align: center; color: black;'>鎖死</h1>";
        }
        
    }
}

/*function checkInput2() {
    const userInput = document.getElementById("userInput").value.trim();  // 去掉頭尾空格
    const correctAnswer = `cout>>Pokemongo;
return 0;
請正確輸入`;  // 正確答案（可換行）

    if (userInput === correctAnswer) {
        window.location.href = "page3.html";  // 跳轉到下一頁   //必須調整
    } else {
        document.getElementById("message").innerText = "答案錯誤，請再試一次！";
    }
}*/

let attempt2=3;

function checkInput3() {
    const userInput = document.getElementById("userInput").value;
    const correctPassword = "皮卡丘";  // 這裡可以改成你要的密碼

    if (userInput === correctPassword) {
        window.location.href = "Page4.html";  // 輸入正確時跳轉
    } else {
        //document.getElementById("message").innerText = "密碼錯誤，請再試一次！";
        attempt2--;
        if (attempt2 > 0) {
            message.innerText = `密碼錯誤！剩餘 ${attempt2} 次機會`;
        } else {
            document.body.innerHTML = "<h1 style='font-size: 100px; text-align: center; color: white;'>鎖死</h1>";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("wireCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 400;//300
    //canvas.width = window.innerWidth * 0.6; // 只佔 60% 畫面
    //canvas.height = 400;

    const wires = [
        { startX: 50, startY: 50, endX: 550, endY: 50, color: "blue" ,originalColor: "blue"},
        { startX: 50, startY: 120, endX: 550, endY: 120, color: "black",originalColor: "black" },
        { startX: 50, startY: 190, endX: 550, endY: 190, color: "red" ,originalColor: "red"},
        { startX: 50, startY: 260, endX: 550, endY: 320, color: "red" ,originalColor: "red"}, // 交叉線
        { startX: 50, startY: 320, endX: 550, endY: 260, color: "blue",originalColor: "blue" }  // 交叉線
    ];


    function drawWires() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 8; // 加粗電線
    
        wires.forEach((wire) => {
            ctx.beginPath();
            ctx.strokeStyle = wire.color;
            ctx.moveTo(wire.startX, wire.startY);
            ctx.lineTo(wire.endX, wire.endY);
            ctx.stroke();
    
            // 🔵 起點圓圈
            ctx.beginPath();
            ctx.arc(wire.startX, wire.startY, 10, 0, Math.PI * 2);
            ctx.fillStyle = wire.color;
            ctx.fill();
    
            // 🔴 終點圓圈
            ctx.beginPath();
            ctx.arc(wire.endX, wire.endY, 10, 0, Math.PI * 2);
            ctx.fillStyle = wire.color;
            ctx.fill();
        });
    }

    let correctWire = 2; // 設定第三條 (紅色) 為正確電線
    var selectedWire = null;

    // 計算點到線段的最短距離
    function distanceToLine(x, y, x1, y1, x2, y2) {
        const A = x - x1;
        const B = y - y1;
        const C = x2 - x1;
        const D = y2 - y1;
    
        const dot = A * C + B * D;
        const len_sq = C * C + D * D;
        const param = len_sq !== 0 ? dot / len_sq : -1;
    
        let xx, yy;
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
    
        const dx = x - xx;
        const dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // 點擊事件監聽器
    canvas.addEventListener("click", function (event) {
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
    
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;
    
        //var selectedWire = null;
        let minDistance = 20; // 設定一個點擊判定範圍
    
        wires.forEach((wire, index) => {
            const distance = distanceToLine(mouseX, mouseY, wire.startX, wire.startY, wire.endX, wire.endY);
           // console.log(`電線 ${index} 的距離: ${distance}`);//除錯函示
            
            if (distance < minDistance  && distance < 20) {
                minDistance = distance;
                selectedWire = index;
            }
        });
    
        if (selectedWire !== null) {
            // 將所有電線恢復原色
            wires.forEach(wire => wire.color = wire.originalColor);
    
            // 選中的電線變綠色
            wires[selectedWire].color = "green";
            
            drawWires(); // 重新繪製電線
        }
    });

let attempts = 3; // 密碼輸入機會

function checkWireAndPassword() {
    let input = document.getElementById("password").value;
    let message = document.getElementById("message");

    if (selectedWire === correctWire && input === "ypagwxq") {
        alert("成功通過挑戰！");
        location.href = "page3.html";
    } else if (selectedWire !== correctWire) {
        document.body.innerHTML = "<h1 style='font-size: 100px; text-align: center; color: red;'>爆炸</h1>";
    } else if (input !== "ypagwxq") {
        attempts--;
        if (attempts > 0) {
            message.innerText = `密碼錯誤！剩餘 ${attempts} 次機會`;
        } else {
            document.body.innerHTML = "<h1 style='font-size: 100px; text-align: center; color: red;'>爆炸</h1>";
        }
    }
}
    
    window.checkWireAndPassword = checkWireAndPassword;

    drawWires();
});
