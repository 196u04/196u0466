function checkInput() {
    const userInput = document.getElementById("userInput").value;
    const correctPassword = "1234";  // 這裡可以改成你要的密碼

    if (userInput === correctPassword) {
        window.location.href = "page2.html";  // 輸入正確時跳轉
    } else {
        document.getElementById("message").innerText = "密碼錯誤，請再試一次！";
    }
}

function checkInput2() {
    const userInput = document.getElementById("userInput").value.trim();  // 去掉頭尾空格
    const correctAnswer = `cout>>Pokemongo;
return 0;
請正確輸入`;  // 正確答案（可換行）

    if (userInput === correctAnswer) {
        window.location.href = "page3.html";  // 跳轉到下一頁   //必須調整
    } else {
        document.getElementById("message").innerText = "答案錯誤，請再試一次！";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("wireCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 300;

    let wires = [
        { startX: 50, startY: 50, endX: 550, endY: 50, color: "blue" },
        { startX: 50, startY: 100, endX: 550, endY: 100, color: "black" },
        { startX: 50, startY: 150, endX: 550, endY: 150, color: "red" },
        { startX: 50, startY: 200, endX: 550, endY: 250, color: "red" }, // 交叉
        { startX: 50, startY: 250, endX: 550, endY: 200, color: "blue" }  // 交叉
    ];

    let correctWire = 2; // 設定第三條 (紅色) 為正確電線
    let selectedWire = null;

    function drawWires() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        wires.forEach((wire, index) => {
            ctx.beginPath();
            ctx.moveTo(wire.startX, wire.startY);
            ctx.bezierCurveTo(
                300, wire.startY - 50,  // 控制點 1
                300, wire.endY + 50,  // 控制點 2
                wire.endX, wire.endY   // 終點
            );
            ctx.strokeStyle = selectedWire === index ? "yellow" : wire.color;
            ctx.lineWidth = 5;
            ctx.stroke();
        });
    }

    canvas.addEventListener("click", function (event) {
        let clickX = event.offsetX;
        let clickY = event.offsetY;
        
        wires.forEach((wire, index) => {
            if (Math.abs(clickY - wire.startY) < 20) {
                selectedWire = index;
                drawWires();
            }
        });
    });

    function checkWireAndPassword() {
        let input = document.getElementById("password").value;
        if (selectedWire === correctWire && input === "5678") {
            alert("成功通過挑戰！");
            location.href = "page3.html";
        } else {
            document.getElementById("message").innerText = "電線或密碼錯誤！";
        }
    }

    window.checkWireAndPassword = checkWireAndPassword;

    drawWires();
});
