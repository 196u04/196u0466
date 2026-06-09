# 商品圖片管理指南

## 資料夾結構

```
images/
└── products/
    ├── dream-1.jpg          (夢境系列 - 星空追憶)
    ├── dream-2.jpg          (夢境系列 - 羽翼之夜)
    ├── nature-1.jpg         (自然系列 - 晨霧松林)
    ├── nature-2.jpg         (自然系列 - 綻放光影)
    ├── character-1.jpg      (角色系列 - 沉思少女)
    └── character-2.jpg      (角色系列 - 城市旅人)
```

## 使用說明

1. **添加圖片**
   - 將您的商品圖片放入 `images/products/` 資料夾
   - 使用指定的文件名（如上面所示）
   - 支持的格式：.jpg, .png, .webp, .gif

2. **圖片規格建議**
   - 寬度：400-500px
   - 高度：250-350px
   - 文件大小：< 500KB（最佳網頁性能）
   - 格式：JPG（推薦）或 PNG

3. **在 Supabase 中的位址**
   - 圖片在 Supabase 中只存儲**相對路徑**，不存儲實際圖片文件
   - 例如：`images/products/dream-1.jpg`
   - 當網站加載時，會從本地資料夾讀取圖片

## 初始化商品步驟

1. 訪問 `initializeProducts.html`
2. 點擊「初始化商品到 Supabase」按鈕
3. 系統將自動建立 6 件商品到 Supabase
4. 之後可在「圖畫創作」頁面的「商品類別」部分查看商品

## 更新商品

如果要修改商品信息：

1. 訪問 Supabase 控制面板：https://supabase.com
2. 進入 `products` 表格
3. 直接編輯欄位或刪除舊記錄重新初始化

## 常見問題

**Q: 如何修改商品價格？**
A: 目前 `products` 表中沒有價格欄位。如需添加，請在 Supabase 中：
   - 添加新欄位 `price`（類型：numeric）
   - 在 `script.js` 的商品初始化數據中添加價格信息

**Q: 圖片無法顯示怎麼辦？**
A: 
   - 檢查圖片是否存在於 `images/products/` 資料夾
   - 確認文件名是否與 Supabase 中的 `image` 欄位完全相同
   - 確認相對路徑是否正確

**Q: 可以使用外部圖片 URL 嗎？**
A: 是的！`image` 欄位支持完整的 URL：
   - 例如：`https://example.com/image.jpg`
   - 或相對路徑：`images/products/dream-1.jpg`

## 文件大小優化

使用在線工具優化圖片大小：
- TinyPNG: https://tinypng.com
- ImageMagick: 用於批量處理

## 支持的圖片格式

| 格式 | 優點 | 缺點 |
|------|------|------|
| JPG  | 小文件，適合照片 | 有損壓縮 |
| PNG  | 無損，透明背景 | 文件較大 |
| WebP | 最小文件 | 舊瀏覽器不支持 |

推薦使用 **JPG** 格式以獲得最佳平衡。
