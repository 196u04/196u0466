//the sublist 
function portfolioMenu(){
    const menu = document.getElementById("subMenu");

    if (menu.style.display === "none"){
        menu.style.display = "block";
    } else{
        menu.style.display = "none";
    }
}

//the function to add page
function loadPage(page){
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Unable to load ${page}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const content = document.getElementById("content");
            content.innerHTML = data;

            const scripts = Array.from(content.querySelectorAll("script"));
            scripts.forEach(oldScript => {
                const newScript = document.createElement("script");
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                }
                newScript.textContent = oldScript.textContent;
                document.body.appendChild(newScript);
                oldScript.remove();
            });
        })
        .catch(error => {
            console.error("load in failed, reason:", error);
        });
}

function loadArtSection(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Unable to load ${page}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const artContent = document.getElementById('artContent');
            if (artContent) {
                artContent.innerHTML = data;
            }
        })
        .catch(error => {
            console.error("load art section failed:", error);
        });
}

const artSeries = {
    dream: {
        title: "夢境系列",
        subtitle: "從無形的夢想中提煉色彩與構圖",
        description: "夢境系列使用柔和的線條與光影，將想像中的畫面轉化為具象的視覺語言。每一幅作品都希望喚起觀者心中的溫柔回憶與當下的恬靜。",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
    },
    nature: {
        title: "自然系列",
        subtitle: "觀察自然細節，重現生命的節奏",
        description: "自然系列以植物、山水與日常景緻為靈感。透過色彩與材質的對比，將自然界中的細緻美感置於畫布之上。",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80"
    },
    character: {
        title: "角色系列",
        subtitle: "以角色為核心，呈現故事與情緒",
        description: "角色系列刻畫人物內心世界，透過神情與姿態傳遞特定情緒。每一件作品都是一個小故事，邀請觀者加入想像。",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
    }
};

const artProducts = {
    dream: [
        { id: "dream-1", title: "星空追憶", description: "純淨的夜色與閃爍星光，帶出夢裡的柔軟情緒。", stock: 5, image: "https://picsum.photos/seed/dream1/400/250" },
        { id: "dream-2", title: "羽翼之夜", description: "以夢境翅膀象徵心靈的自由與輕盈。", stock: 3, image: "https://picsum.photos/seed/dream2/400/250" }
    ],
    nature: [
        { id: "nature-1", title: "晨霧松林", description: "清晨薄霧中的松林，擁有一種靜謐的力量。", stock: 2, image: "https://picsum.photos/seed/nature1/400/250" },
        { id: "nature-2", title: "綻放光影", description: "以光影節奏呈現花卉生長的瞬間。", stock: 4, image: "https://picsum.photos/seed/nature2/400/250" }
    ],
    character: [
        { id: "character-1", title: "沉思少女", description: "細膩刻畫一位少女內心的柔軟與堅定。", stock: 1, image: "https://picsum.photos/seed/character1/400/250" },
        { id: "character-2", title: "城市旅人", description: "以角色視角記錄都市中短暫的驚喜與孤獨。", stock: 6, image: "https://picsum.photos/seed/character2/400/250" }
    ]
};

function setArtDisplay(title, subtitle, htmlContent, imageUrl) {
    const artContent = document.getElementById('artContent');
    if (!artContent) return;
    artContent.innerHTML = `
        <div class="art-title">
            <h3>${title}</h3>
            <p class="text-muted">${subtitle}</p>
        </div>
        ${imageUrl ? `<div class="mb-3"><img src="${imageUrl}" alt="${title}" class="img-fluid rounded" /></div>` : ''}
        <div>${htmlContent}</div>
    `;
}

function showArtSeries(seriesId) {
    const series = artSeries[seriesId];
    if (!series) return;
    setArtDisplay(series.title, series.subtitle, `<p>${series.description}</p>`, series.image);
    document.querySelectorAll('.art-category-list .list-group-item').forEach(item => {
        item.classList.toggle('active', item.dataset.series === seriesId);
    });
}

function showProductCategory(categoryId) {
    const items = artProducts[categoryId] || [];
    const title = artSeries[categoryId]?.title || '商品系列';
    let html = '';
    items.forEach(product => {
        html += `
            <div class="mb-3" onclick="showProductDetails('${product.id}')">
                <div class="art-product-card">
                    <img src="${product.image}" alt="${product.title}" class="thumb">
                    <div class="meta">
                        <h5>${product.title}</h5>
                        <p>${product.description}</p>
                    </div>
                </div>
            </div>
        `;
    });
    setArtDisplay(`${title} - 商品一覽`, '點擊產品卡片以查看詳細資訊。', html, null);
}

function showProductDetails(productId) {
    const product = Object.values(artProducts).flat().find(item => item.id === productId);
    if (!product) return;
    const detailHtml = `
        <div class="row">
            <div class="col-md-5 mb-3">
                <img src="${product.image}" alt="${product.title}" class="img-fluid rounded" />
            </div>
            <div class="col-md-7">
                <h4>${product.title}</h4>
                <p>${product.description}</p>
                <div class="art-info-box">
                    <p><strong>庫存：</strong>${product.stock} 件</p>
                    <p><strong>系列：</strong>${productId.split('-')[0] === 'dream' ? '夢境系列' : productId.split('-')[0] === 'nature' ? '自然系列' : '角色系列'}</p>
                </div>
            </div>
        </div>
    `;
    setArtDisplay('產品詳細', '感受作品細節與收藏價值。', detailHtml, null);
}

function loadArtInfo(action) {
    const mapping = {
        introductionForProducts: 'art/introductionForProducts.html',
        introductionForBuying: 'art/introductionForBuying.html',
        givingAdvise: 'art/givingAdvise.html',
        connectingWithUs: 'art/connectingWithUs.html'
    };
    loadArtSection(mapping[action]);
}

//the data of SIGNIN send to the supazase
document.addEventListener("submit",async function(e){
    
    if(e.target && e.target.id === "signinForm"){
        e.preventDefault();
        
        const username = document.getElementById("userName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("passWord").value;

        const {data,error} = await window.supabase
            .from("users")
            .insert([
                { username, email, password}
            ]);

        if(error){
            alert("error:" + error.message);
        }else{
            alert("sign in success!");
        }
    }
});

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

    if (selectedWire === correctWire && input === "yragwxo") {
        alert("成功通過挑戰！");
        location.href = "page3.html";
    } else if (selectedWire !== correctWire) {
        document.body.innerHTML = "<h1 style='font-size: 100px; text-align: center; color: red;'>爆炸</h1>";
    } else if (input !== "yragwxo") {
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
