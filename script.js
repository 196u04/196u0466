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
    if (!canvas) return;  // 確保 script 只在 page2 運行

    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 200;

    let wires = [
        { startX: 50, endX: 550, color: "red" },
        { startX: 100, endX: 500, color: "blue" },
        { startX: 150, endX: 450, color: "green" },
        { startX: 200, endX: 400, color: "yellow" },
        { startX: 250, endX: 350, color: "black" }
    ];

    let correctWire = 2; // 第三條電線 (綠色) 是正確的
    let selectedWire = null;

    function drawWires() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        wires.forEach((wire, index) => {
            ctx.beginPath();
            ctx.moveTo(wire.startX, 20);
            ctx.lineTo(wire.endX, 180);
            ctx.strokeStyle = selectedWire === index ? "yellow" : wire.color;
            ctx.lineWidth = 5;
            ctx.stroke();
        });
    }

    canvas.addEventListener("click", function (event) {
        let clickX = event.offsetX;
        let clickY = event.offsetY;
        
        wires.forEach((wire, index) => {
            let wireYStart = 20;
            let wireYEnd = 180;
            let wireXStart = wire.startX;
            let wireXEnd = wire.endX;

            if (clickX >= wireXStart - 10 && clickX <= wireXEnd + 10 && clickY >= wireYStart && clickY <= wireYEnd) {
                selectedWire = index;
                drawWires();
            }
        });
    });

    function checkWireAndPassword() {
        let input = document.getElementById("password").value;
        if (selectedWire === correctWire && input === "5678") {
            alert("成功通過挑戰！");
            location.href = "page3.html"; // 跳轉到下一關
        } else {
            document.getElementById("message").innerText = "電線或密碼錯誤！";
        }
    }

    window.checkWireAndPassword = checkWireAndPassword; // 讓按鈕可以調用這個函數

    drawWires();
});
