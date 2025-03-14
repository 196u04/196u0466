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

let correctPassword2 = "5678";  // 第二題的正確密碼
let correctWire = 2;  // 正確的電線編號
let selectedWire = null;

// **選擇電線**
function selectWire(wireNumber) {
    selectedWire = wireNumber;
    document.querySelectorAll(".wire").forEach(w => w.classList.remove("selected"));
    document.getElementById("wire" + wireNumber).classList.add("selected");
}

// **檢查電線與密碼**
function checkWireAndPassword() {
    let input = document.getElementById("password2").value;
    if (selectedWire === correctWire && input === correctPassword2) {
        window.location.href = "page3.html";  // 跳轉到下一頁
    } else if(selectedWire != correctWire){
        document.getElementById("message2").innerText = "電線錯誤！";
    } else {
        document.getElementById("message2").innerText = "密碼錯誤！";
    }
}
