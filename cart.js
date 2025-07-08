// ===============================
// カートシステムのJavaScript
// ===============================

// グローバル変数
let cart = [];
let wishlist = [];

// 商品データ（実際のデータベースから取得する想定）
const products = [
    {
        id: 1,
        name: 'ダイヤモンドブレスレット',
        price: 98000,
        image: '1.jpg',
        category: 'ブレスレット',
        description: '輝きを放つダイヤモンドを贅沢に使用した、エレガントなブレスレット',
        colors: ['シルバー', 'ゴールド', 'ローズゴールド'],
        sizes: ['S', 'M', 'L']
    },
    {
        id: 2,
        name: 'パールネックレス',
        price: 45000,
        image: '2.jpg',
        category: 'ネックレス',
        description: '上質な淡水パールを使用した、クラシックなネックレス',
        colors: ['ホワイト', 'ピンク'],
        sizes: ['40cm', '45cm', '50cm']
    },
    {
        id: 3,
        name: '和風髪飾りセット',
        price: 28000,
        image: '3.jpg',
        category: '髪飾り',
        description: '伝統的な和のモチーフを現代風にアレンジした髪飾り',
        colors: ['赤', '白', 'ピンク'],
        sizes: ['フリーサイズ']
    },
    {
        id: 4,
        name: 'レザーハンドバッグ',
        price: 68000,
        image: '4.jpg',
        category: 'バッグ',
        description: '上質なイタリアンレザーを使用した、実用的でスタイリッシュなハンドバッグ',
        colors: ['ブラック', 'ブラウン', 'ベージュ'],
        sizes: ['ミニ', 'レギュラー']
    },
    {
        id: 5,
        name: 'スワロフスキーピアス',
        price: 32000,
        image: '5.jpg',
        category: 'ピアス',
        description: 'スワロフスキークリスタルが輝く、華やかなピアス',
        colors: ['クリア', 'ピンク', 'ブルー'],
        sizes: ['フリーサイズ']
    },
    {
        id: 6,
        name: 'シルクスカーフ',
        price: 22000,
        image: '6.jpg',
        category: 'アクセサリー',
        description: '100%シルクの高級スカーフ。様々なスタイリングが楽しめます',
        colors: ['フローラル', 'ジオメトリック', 'モノトーン'],
        sizes: ['90cm×90cm']
    }
];

// ローカルストレージからカートデータを読み込み
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('fancyShopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// カートデータをローカルストレージに保存
function saveCartToStorage() {
    localStorage.setItem('fancyShopCart', JSON.stringify(cart));
}

// カートを開く
function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// カートを閉じる
function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// 商品をカートに追加
function addToCart(productId, quantity = 1, color = null, size = null) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // カートに同じ商品があるかチェック
    const existingItem = cart.find(item => 
        item.id === productId && 
        item.color === (color || product.colors[0]) && 
        item.size === (size || product.sizes[0])
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: color || product.colors[0],
            size: size || product.sizes[0],
            quantity: quantity
        });
    }

    saveCartToStorage();
    updateCartUI();
    showToast('商品をカートに追加しました');
}

// クイック追加（商品一覧から直接追加）
function quickAddToCart(productId) {
    addToCart(productId);
}

// カートから商品を削除
function removeFromCart(productId, color, size) {
    cart = cart.filter(item => 
        !(item.id === productId && item.color === color && item.size === size)
    );
    saveCartToStorage();
    updateCartUI();
}

// カート内の数量を更新
function updateCartQuantity(productId, color, size, newQuantity) {
    const item = cart.find(item => 
        item.id === productId && item.color === color && item.size === size
    );
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId, color, size);
        } else {
            item.quantity = newQuantity;
            saveCartToStorage();
            updateCartUI();
        }
    }
}

// カートUIを更新
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartCount = document.getElementById('cartCount');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartShipping = document.getElementById('cartShipping');
    const cartTotal = document.getElementById('cartTotal');

    // カートアイテム数を更新
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        cartEmpty.style.display = 'block';
        cartSubtotal.textContent = '¥0';
        cartShipping.textContent = '¥0';
        cartTotal.textContent = '¥0';
        return;
    }

    cartItemsContainer.style.display = 'block';
    cartEmpty.style.display = 'none';

    // カートアイテムをレンダリング
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-details">
                    ${item.color} / ${item.size}
                </div>
                <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, '${item.color}', '${item.size}', ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, '${item.color}', '${item.size}', ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id}, '${item.color}', '${item.size}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    // 合計金額を計算
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 10000 ? 0 : 800; // 1万円以上で送料無料
    const total = subtotal + shipping;

    cartSubtotal.textContent = `¥${subtotal.toLocaleString()}`;
    cartShipping.textContent = shipping === 0 ? '無料' : `¥${shipping.toLocaleString()}`;
    cartTotal.textContent = `¥${total.toLocaleString()}`;
}

// 商品詳細モーダルを開く
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    
    // モーダルに商品情報を設定
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductTitle').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = `¥${product.price.toLocaleString()}`;
    document.getElementById('modalProductDescription').textContent = product.description;

    // カラーオプションを生成
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.innerHTML = product.colors.map((color, index) => `
        <button class="color-option ${index === 0 ? 'selected' : ''}" 
                data-color="${color}"
                style="background-color: ${getColorCode(color)};"
                onclick="selectColor(this, '${color}')">
        </button>
    `).join('');

    // サイズオプションを生成
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = product.sizes.map((size, index) => `
        <button class="size-option ${index === 0 ? 'selected' : ''}" 
                data-size="${size}"
                onclick="selectSize(this, '${size}')">
            ${size}
        </button>
    `).join('');

    // モーダルのカートに追加ボタンにproductIdを設定
    document.getElementById('modalAddToCart').setAttribute('data-product-id', productId);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// モーダルを閉じる
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = '';
}

// カラー選択
function selectColor(button, color) {
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
}

// サイズ選択
function selectSize(button, size) {
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
}

// カラーコードを取得（実際のプロジェクトではもっと洗練された方法で実装）
function getColorCode(colorName) {
    const colorMap = {
        'シルバー': '#C0C0C0',
        'ゴールド': '#FFD700',
        'ローズゴールド': '#B76E79',
        'ホワイト': '#FFFFFF',
        'ピンク': '#FFC0CB',
        'ブラック': '#000000',
        'ブラウン': '#8B4513',
        'ベージュ': '#F5DEB3',
        'クリア': '#E0E0E0',
        'ブルー': '#87CEEB',
        '赤': '#DC143C',
        '白': '#FFFFFF'
    };
    return colorMap[colorName] || '#CCCCCC';
}

// モーダルからカートに追加
function addToCartFromModal() {
    const productId = parseInt(document.getElementById('modalAddToCart').getAttribute('data-product-id'));
    const selectedColor = document.querySelector('.color-option.selected').getAttribute('data-color');
    const selectedSize = document.querySelector('.size-option.selected').getAttribute('data-size');
    const quantity = parseInt(document.getElementById('quantityInput').value);

    addToCart(productId, quantity, selectedColor, selectedSize);
    closeProductModal();
}

// ウィッシュリストに追加
function addToWishlist(productId) {
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        showToast('ウィッシュリストに追加しました');
        updateWishlistCount();
    } else {
        showToast('すでにウィッシュリストに追加されています');
    }
}

// ウィッシュリストカウントを更新
function updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// トースト通知を表示
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', function() {
    // カートアイコンクリック
    const cartIcon = document.querySelector('.cart-icon-wrapper');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }

    // カートを閉じる
    const cartClose = document.getElementById('cartClose');
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    // カートオーバーレイクリック
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // 買い物を続けるボタン
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', closeCart);
    }

    // モーダルを閉じる
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeProductModal);
    }

    // モーダルの背景クリック
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                closeProductModal();
            }
        });
    }

    // 数量セレクター
    const quantityMinus = document.getElementById('quantityMinus');
    const quantityPlus = document.getElementById('quantityPlus');
    const quantityInput = document.getElementById('quantityInput');

    if (quantityMinus) {
        quantityMinus.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }

    if (quantityPlus) {
        quantityPlus.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }

    // モーダルのカートに追加ボタン
    const modalAddToCart = document.getElementById('modalAddToCart');
    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', addToCartFromModal);
    }

    // チェックアウトボタン
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                showToast('チェックアウト機能は準備中です');
            }
        });
    }

    // ページ読み込み時にカートを復元
    loadCartFromStorage();
});