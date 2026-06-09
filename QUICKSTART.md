# 🚀 商品系統快速開始

## 3 步快速上手

### 第 1 步：初始化商品數據

1. 在瀏覽器中打開：
   ```
   http://localhost/196u0466/initializeProducts.html
   ```
   或者點擊 art.html 末尾的「管理商品」鏈接

2. 點擊綠色按鈕：**「初始化商品到 Supabase」**

3. 等待提示「✅ 成功！6 件商品已添加到 Supabase」

### 第 2 步：添加商品圖片

1. 準備 6 張圖片（JPG 或 PNG 格式）

2. 將圖片放入資料夾：
   ```
   196u0466/images/products/
   ```

3. 重命名為以下名稱：
   - `dream-1.jpg` - 星空追憶
   - `dream-2.jpg` - 羽翼之夜
   - `nature-1.jpg` - 晨霧松林
   - `nature-2.jpg` - 綻放光影
   - `character-1.jpg` - 沉思少女
   - `character-2.jpg` - 城市旅人

### 第 3 步：查看商品

1. 進入主頁面：
   ```
   http://localhost/196u0466/
   ```

2. 點擊導航欄：**「作品集」→「圖畫創作」**

3. 在右側點擊任何系列：
   - 「夢境系列」
   - 「自然系列」
   - 「角色系列」

4. 商品將自動從 Supabase 加載顯示！

---

## 📋 系統組件

| 組件 | 文件 | 功能 |
|------|------|------|
| 初始化面板 | `initializeProducts.html` | 一鍵初始化商品 |
| 主程式 | `script.js` | 所有 Supabase 操作 |
| 藝術頁面 | `art/art.html` | 商品展示 |
| 圖片存儲 | `images/products/` | 商品圖片 |
| 設置指南 | `SUPABASE_SETUP.md` | 完整技術文檔 |
| 圖片指南 | `images/README.md` | 圖片管理說明 |

---

## ✨ 核心特性

✅ **動態加載** - 商品從 Supabase 實時加載
✅ **圖片管理** - 只存儲位址，本地存放圖片
✅ **系列分類** - 自動按系列 (dream/nature/character) 分組
✅ **詳細展示** - 點擊商品查看完整信息
✅ **錯誤處理** - 圖片無法加載時顯示佔位圖

---

## 🔧 Supabase 表結構

```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY DEFAULT nextval('products_id_seq'),
    series VARCHAR NOT NULL,           -- dream, nature, character
    title VARCHAR NOT NULL,            -- 商品名稱
    description TEXT NOT NULL,         -- 商品描述
    storage INT NOT NULL,              -- 庫存數量
    image VARCHAR NOT NULL,            -- 圖片位址
    create_at TIMESTAMP DEFAULT NOW()  -- 建立時間
);
```

---

## 💡 常用代碼片段

### 添加新商品

```javascript
// 在瀏覽器控制台運行
await window.supabase
    .from("products")
    .insert([{
        series: "dream",
        title: "新商品名稱",
        description: "商品描述",
        storage: 10,
        image: "images/products/your-image.jpg"
    }]);
```

### 查看所有商品

```javascript
// 在瀏覽器控制台運行
const data = await window.loadProductsFromSupabase();
console.log(data);
```

### 查看特定系列商品

```javascript
// 在瀏覽器控制台運行
await window.showProductCategoryFromSupabase('dream');
```

---

## 🎯 工作流程圖

```
用戶訪問 art.html
        ↓
點擊商品系列按鈕
        ↓
調用 showProductCategoryFromSupabase()
        ↓
從 Supabase 讀取商品數據
        ↓
按系列分組
        ↓
動態生成 HTML 卡片
        ↓
加載本地圖片 (images/products/)
        ↓
展示給用戶
        ↓
用戶點擊商品
        ↓
調用 showProductDetailsFromSupabase()
        ↓
顯示商品詳細信息
```

---

## 📊 數據流

```
initializeProducts.html
    ↓ (初始化商品)
    ↓
Supabase products 表
    ↓ (存儲商品元數據)
    ↓
art.html (查詢)
    ↓
script.js (處理數據)
    ↓
顯示給用戶 + 本地圖片
```

---

## 🐛 常見問題

**Q: 為什麼圖片不顯示？**
A: 確保圖片文件名完全相同，存放在 `images/products/` 資料夾

**Q: 可以修改已初始化的商品嗎？**
A: 可以。訪問 Supabase 控制面板直接編輯，或在代碼中調用：
```javascript
await window.supabase
    .from("products")
    .update({ storage: 20 })
    .eq('id', 1);
```

**Q: 怎樣刪除商品？**
A: 在 Supabase 控制面板刪除對應行，或使用代碼：
```javascript
await window.supabase
    .from("products")
    .delete()
    .eq('id', 1);
```

---

## 📚 更多資訊

- 🔗 [完整 Supabase 整合指南](./SUPABASE_SETUP.md)
- 🔗 [圖片管理指南](./images/README.md)
- 🔗 [Supabase 官方文檔](https://supabase.com/docs)

---

## ✅ 檢查清單

部署前確認：

- [ ] 商品已初始化 (訪問 initializeProducts.html)
- [ ] 6 張圖片已放入 images/products/ 資料夾
- [ ] 圖片文件名與 Supabase 中的完全相同
- [ ] art.html 已修改為使用 Supabase 函數
- [ ] 瀏覽器控制台無錯誤
- [ ] 可以成功加載商品（F12 網絡選項卡檢查）

---

祝您使用愉快！🎉
