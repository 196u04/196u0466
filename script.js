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
    canvas.height = 350;//300
    //canvas.width = window.innerWidth * 0.6; // 只佔 60% 畫面
    //canvas.height = 400;

    const wires = [
        { startX: 50, startY: 50, endX: 550, endY: 50, color: "blue" },
        { startX: 50, startY: 100, endX: 550, endY: 100, color: "black" },
        { startX: 50, startY: 150, endX: 550, endY: 150, color: "red" },
        { startX: 50, startY: 200, endX: 550, endY: 280, color: "red" }, // 交叉線
        { startX: 50, startY: 280, endX: 550, endY: 200, color: "blue" }  // 交叉線
    ];

    let correctWire = 2; // 設定第三條 (紅色) 為正確電線
    let selectedWire = null;

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

    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width; // 計算縮放比例
        const scaleY = canvas.height / rect.height;
    
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;
    
        // 判斷點擊到哪條電線
        wires.forEach((wire, index) => {
            const minY = Math.min(wire.startY, wire.endY) - 10;
            const maxY = Math.max(wire.startY, wire.endY) + 10;
            if (mouseY >= minY && mouseY <= maxY) {
                alert(`你選擇了第 ${index + 1} 條電線！`);
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
