# Supabase Products 表整合指南

## 概述

本項目已成功集成 Supabase 的 `products` 表，用於管理商品信息。
系統參考了現有的 `users` 表連接方式。

## 表格結構

### products 表

| 欄位 | 類型 | 說明 |
|------|------|------|
| `id` | int | 主鍵，自動遞增 |
| `series` | varchar | 系列（dream/nature/character） |
| `title` | varchar | 商品名稱（原 description） |
| `description` | text | 商品描述（原 image） |
| `storage` | int | 庫存數量 |
| `image` | varchar | 圖片位址（相對或完整 URL） |
| `create_at` | timestamp | 建立時間（自動） |

## 快速開始

### 1️⃣ 初始化商品數據

```
1. 訪問：http://localhost/196u0466/initializeProducts.html
2. 點擊「初始化商品到 Supabase」按鈕
3. 等待提示成功信息
```

### 2️⃣ 查看商品（在藝術作品頁面）

```
1. 進入「作品集」→「圖畫創作」
2. 點擊右側「商品類別」中的系列按鈕
3. 商品將從 Supabase 動態加載顯示
```

### 3️⃣ 添加圖片

```
1. 將圖片放入：images/products/ 資料夾
2. 使用指定的文件名：
   - dream-1.jpg, dream-2.jpg
   - nature-1.jpg, nature-2.jpg
   - character-1.jpg, character-2.jpg
3. 支持格式：JPG, PNG, WebP, GIF
```

## 核心代碼參考

### Supabase 連接（在 index.html）

```javascript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
    'https://nhiliodwwijziauogpws.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
)
window.supabase = supabase;
```

### 1. 初始化商品（第一次使用）

```javascript
async function initializeProducts() {
    const products = [
        { 
            series: "dream", 
            title: "星空追憶", 
            description: "純淨的夜色與閃爍星光...", 
            storage: 5, 
            image: "images/products/dream-1.jpg" 
        },
        // ... 更多商品
    ];

    const { data, error } = await window.supabase
        .from("products")
        .insert(products);

    if (error) {
        alert("錯誤: " + error.message);
    } else {
        alert("成功！");
    }
}
```

### 2. 讀取所有商品

```javascript
async function loadProductsFromSupabase() {
    const { data, error } = await window.supabase
        .from("products")
        .select("*");

    if (error) {
        console.error("錯誤:", error.message);
        return null;
    }
    return data;
}
```

### 3. 按系列分組

```javascript
async function getProductsBySeriesFromSupabase() {
    const products = await loadProductsFromSupabase();
    const grouped = {};
    
    products.forEach(product => {
        if (!grouped[product.series]) {
            grouped[product.series] = [];
        }
        grouped[product.series].push(product);
    });
    
    return grouped;
}
```

### 4. 顯示商品列表

```javascript
async function showProductCategoryFromSupabase(categoryId) {
    const allProducts = await getProductsBySeriesFromSupabase();
    const items = allProducts[categoryId];
    
    let html = '';
    items.forEach(product => {
        html += `
            <div class="mb-3" onclick="showProductDetailsFromSupabase(${product.id})">
                <div class="art-product-card">
                    <img src="${product.image}" alt="${product.title}" />
                    <div class="meta">
                        <h5>${product.title}</h5>
                        <p>${product.description}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    setArtDisplay(`${title} - 商品一覽`, '點擊查看詳細...', html, null);
}
```

### 5. 顯示商品詳情

```javascript
async function showProductDetailsFromSupabase(productId) {
    const products = await loadProductsFromSupabase();
    const product = products.find(item => item.id === productId);
    
    const detailHtml = `
        <div class="row">
            <div class="col-md-5">
                <img src="${product.image}" alt="${product.title}" />
            </div>
            <div class="col-md-7">
                <h4>${product.title}</h4>
                <p>${product.description}</p>
                <p><strong>庫存：</strong>${product.storage} 件</p>
                <p><strong>時間：</strong>${new Date(product.create_at).toLocaleDateString()}</p>
            </div>
        </div>
    `;
    
    setArtDisplay('產品詳細', '', detailHtml, null);
}
```

## 文件位置參考

```
196u0466/
├── index.html                 ← Supabase 配置在此
├── script.js                  ← 所有函數都在此
├── art/
│   └── art.html              ← 商品展示頁面（已修改）
├── images/
│   ├── README.md             ← 圖片管理指南
│   └── products/             ← 圖片存放位置
│       ├── dream-1.jpg
│       ├── dream-2.jpg
│       ├── nature-1.jpg
│       ├── nature-2.jpg
│       ├── character-1.jpg
│       └── character-2.jpg
├── initializeProducts.html    ← 商品初始化面板（新增）
└── login&signin/
    └── logInPage.html        ← 登錄頁面（users 表參考）
```

## 與 Users 表的對比

### Users 表（參考實現）

```javascript
// script.js - 第 179-190 行
const {data,error} = await window.supabase
    .from("users")
    .insert([
        { username, email, password}
    ]);
```

### Products 表（新實現）

```javascript
// script.js - 第 335-360 行（新增）
const {data,error} = await window.supabase
    .from("products")
    .insert(products);
```

**相同模式：**
- 都使用 `window.supabase` 全局對象
- 都使用 `.from(tableName).insert()` 方法
- 都處理 error 和成功響應

## 常見操作

### 添加新商品

在 Supabase 控制面板或通過代碼：

```javascript
const { data, error } = await window.supabase
    .from("products")
    .insert([{
        series: "dream",
        title: "新商品",
        description: "描述",
        storage: 10,
        image: "images/products/new-product.jpg"
    }]);
```

### 更新商品

```javascript
const { data, error } = await window.supabase
    .from("products")
    .update({ storage: 5 })
    .eq('id', 1);
```

### 刪除商品

```javascript
const { data, error } = await window.supabase
    .from("products")
    .delete()
    .eq('id', 1);
```

### 按系列查詢

```javascript
const { data, error } = await window.supabase
    .from("products")
    .select("*")
    .eq('series', 'dream');
```

## 故障排除

### 問題：圖片無法顯示

**原因：**
- 文件不存在於 `images/products/` 
- 路徑錯誤
- 相對路徑不正確

**解決：**
```javascript
// 添加錯誤處理和備用圖片
<img src="${product.image}" 
     alt="${product.title}" 
     onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'"/>
```

### 問題：Supabase 連接失敗

**檢查清單：**
- ✅ 網絡連接正常
- ✅ Supabase URL 和 API Key 正確
- ✅ products 表存在於 Supabase
- ✅ 瀏覽器控制台無錯誤

### 問題：數據未保存

**檢查：**
- products 表是否已在 Supabase 中建立
- 是否調用了 `initializeProducts()` 函數
- Supabase 是否返回 error

## 性能優化建議

1. **緩存商品數據**
   ```javascript
   let cachedProducts = null;
   
   async function getProducts() {
       if (cachedProducts) return cachedProducts;
       cachedProducts = await loadProductsFromSupabase();
       return cachedProducts;
   }
   ```

2. **分頁加載**
   ```javascript
   const { data } = await window.supabase
       .from("products")
       .select("*")
       .range(0, 9);  // 每次加載 10 條
   ```

3. **延遲加載圖片**
   ```html
   <img src="${product.image}" loading="lazy" />
   ```

## 安全性說明

⚠️ **注意：** 當前 API Key 是公開的（匿名密鑰）。

### 生產環境建議：
- 使用 Row Level Security (RLS) 保護數據
- 限制誰可以查看/修改商品
- 定期更換 API Key
- 在服務端驗證重要操作

## 下一步

1. ✅ 添加圖片到 `images/products/` 資料夾
2. ✅ 訪問 `initializeProducts.html` 初始化商品
3. ✅ 在藝術作品頁面測試商品顯示
4. 🔄 可選：添加購物車功能
5. 🔄 可選：添加訂單管理
6. 🔄 可選：添加用戶評論

## 技術棧

- **數據庫：** Supabase (PostgreSQL)
- **前端框架：** Bootstrap 5
- **API：** Supabase JavaScript SDK v2
- **圖片存儲：** 本地 (images/products/)

## 聯繫與支持

如有問題，請參考：
- Supabase 文檔：https://supabase.com/docs
- 項目 README：../README.md
- 圖片管理：./images/README.md
