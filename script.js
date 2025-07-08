// DOMが完全に読み込まれるまで待機
document.addEventListener("DOMContentLoaded", function () {
  // 全コンポーネントを初期化
  initLoading();
  initParticles();
  initSwiper();
  initAOS();
  initMobileMenu();
  initSmoothScroll();
  initHeaderScroll();
  initGSAPAnimations();
  initThreeJS();
});

// ローディング画面アニメーション
function initLoading() {
  const loadingScreen = document.querySelector(".loading-screen");

  // 2秒後にローディング画面を非表示
  setTimeout(() => {
    loadingScreen.classList.add("hidden");

    // トランジション後にDOMから削除
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 2000);
}

// Particles.js背景
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    // パーティクルの設定
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 90, // パーティクルの数を増やす
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ff9ec7", // パーティクルの色をテーマカラーに
        },
        shape: {
          type: "star", // 星形に統一
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.8, // 不透明度を上げる
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.4,
            sync: false,
          },
        },
        size: {
          value: 5, // 星のサイズを少し大きくする
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 3,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ff9ec7", // 線の色をテーマカラーに
          opacity: 0.5, // 線の不透明度を上げる
          width: 1.5, // 線を太くする
        },
        move: {
          enable: true,
          speed: 3, // 動きを少し速く
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.8, // ホバー時の線の不透明度を上げる
            },
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }
}

// Swiper初期化
function initSwiper() {
  const swiper = new Swiper(".hero-swiper", {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
    on: {
      slideChange: function () {
        // 現在のスライドのタイトルアニメーションをリセット・再実行
        animateTitle(this.activeIndex);
      },
      init: function () {
        // 最初のスライドのタイトルをアニメーション
        setTimeout(() => {
          animateTitle(0);
        }, 500);
      },
    },
  });
}

// タイトル文字アニメーション
function animateTitle(slideIndex) {
  // 全ての文字をリセット
  const allLetters = document.querySelectorAll(".letter");
  allLetters.forEach((letter) => {
    letter.style.animation = "none";
    letter.style.opacity = "0";
    letter.style.transform = "translateY(50px)";
  });

  // 現在のスライドの文字を取得
  const currentSlide = document.querySelectorAll(".swiper-slide")[slideIndex];
  if (currentSlide) {
    const letters = currentSlide.querySelectorAll(".letter");

    // 文字を一つずつアニメーション
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.animation = "letterDrop 0.5s ease forwards";
      }, index * 100);
    });
  }
}

// AOS（スクロールアニメーション）初期化
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }
}

// モバイルメニュー切り替え
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-menu a");

  let isMenuOpen = false;

  hamburger.addEventListener("click", () => {
    if (!isMenuOpen) {
      // メニューを開く
      hamburger.classList.add("active");
      mobileMenu.classList.add("active");
      document.body.style.overflow = "hidden";
      isMenuOpen = true;
    } else {
      // メニューを閉じてトップにスクロール
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
      isMenuOpen = false;

      // トップにスムーズスクロール
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  // リンククリック時にメニューを閉じる
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
      isMenuOpen = false;
    });
  });
}

// スムーススクロール
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ヘッダースクロール効果
function initHeaderScroll() {
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 4px 30px rgba(232, 213, 255, 0.4)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 20px rgba(232, 213, 255, 0.3)";
    }

    // スクロール方向に基づいてヘッダーを表示/非表示
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  });
}

// GSAPアニメーション
function initGSAPAnimations() {
  if (typeof gsap !== "undefined") {
    // ロゴパルスアニメーション
    gsap.to(".logo", {
      scale: 1.05,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    // プロダクトカードホバーアニメーション
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.02,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // セクションフェードインアニメーション
    if (typeof ScrollTrigger !== "undefined") {
      gsap.fromTo(
        ".section-title",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".section-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }
}

// Three.js 3D要素
function initThreeJS() {
  if (typeof THREE !== "undefined") {
    // 全ての画像コンテナに3Dハートを追加（heart-shapeクラスの有無に関わらず）
    const allImageContainers = document.querySelectorAll(".image-container");

    allImageContainers.forEach((container, index) => {
      // Three.jsシーンの設定
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      // レンダラーサイズ設定（大きくする）
      const canvasSize = 180; // 120から180に拡大
      renderer.setSize(canvasSize, canvasSize);
      renderer.setClearColor(0x000000, 0);

      // 3Dハート形状の作成
      const heartShape = new THREE.Shape();

      // ハートの形状をベジェ曲線で描画
      const x = 0,
        y = 0;
      heartShape.moveTo(x + 0, y + 0.5);
      heartShape.bezierCurveTo(
        x + 0,
        y + 0.2,
        x - 0.3,
        y - 0.1,
        x - 0.5,
        y + 0.1
      );
      heartShape.bezierCurveTo(
        x - 0.8,
        y + 0.3,
        x - 0.8,
        y + 0.7,
        x - 0.5,
        y + 0.9
      );
      heartShape.bezierCurveTo(
        x - 0.3,
        y + 1.1,
        x + 0,
        y + 1.3,
        x + 0,
        y + 1.5
      );
      heartShape.bezierCurveTo(
        x + 0,
        y + 1.3,
        x + 0.3,
        y + 1.1,
        x + 0.5,
        y + 0.9
      );
      heartShape.bezierCurveTo(
        x + 0.8,
        y + 0.7,
        x + 0.8,
        y + 0.3,
        x + 0.5,
        y + 0.1
      );
      heartShape.bezierCurveTo(
        x + 0.3,
        y - 0.1,
        x + 0,
        y + 0.2,
        x + 0,
        y + 0.5
      );

      // 押し出し設定（より立体的に）
      const extrudeSettings = {
        depth: 0.4, // 0.3から0.4に増加
        bevelEnabled: true,
        bevelSegments: 12, // 8から12に増加
        steps: 3, // 2から3に増加
        bevelSize: 0.08, // 0.05から0.08に増加
        bevelThickness: 0.08, // 0.05から0.08に増加
      };

      // ジオメトリとマテリアル
      const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

      // ハートの色を全てピンクに統一
      const material = new THREE.MeshPhongMaterial({
        color: 0xff9ec7, // 全て統一ピンク色
        transparent: true,
        opacity: 0.95,
        shininess: 150,
        specular: 0x222222,
      });

      const heart3D = new THREE.Mesh(geometry, material);

      // ハートのサイズと位置調整（大きくする）
      heart3D.scale.set(0.45, 0.45, 0.45);
      heart3D.position.set(0, 0, 0);

      scene.add(heart3D);

      // ライティング設定（より豪華に）
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      const pointLight1 = new THREE.PointLight(0xff9ec7, 0.8); // ピンク系ライト
      pointLight1.position.set(-1, -1, 1);
      scene.add(pointLight1);

      // 追加のピンク系ポイントライト
      const pointLight2 = new THREE.PointLight(0xff9ec7, 0.6); // ブルーからピンクに変更
      pointLight2.position.set(1, -1, 1);
      scene.add(pointLight2);

      // カメラポジション
      camera.position.z = 2.5;

      // キャンバスの配置（位置を上に移動）
      const canvas = renderer.domElement;
      canvas.style.position = "absolute";
      canvas.style.top = "5px";
      canvas.style.right = "15px";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "15";
      canvas.style.borderRadius = "50%";
      canvas.style.boxShadow = "0 6px 20px rgba(255, 158, 199, 0.4)";

      // 確実にコンテナに追加
      if (container) {
        container.appendChild(canvas);
        console.log(`3D Heart added to container ${index + 1}`);
      }

      // アニメーション関数
      let animationId;
      function animate() {
        animationId = requestAnimationFrame(animate);

        // ハートの回転アニメーション（よりダイナミックに）
        heart3D.rotation.x += 0.012; // 0.008から0.012に増加
        heart3D.rotation.y += 0.018; // 0.012から0.018に増加
        heart3D.rotation.z += 0.006; // 0.004から0.006に増加

        // 浮遊効果（より大きな動き）
        heart3D.position.y = Math.sin(Date.now() * 0.0015 + index) * 0.15; // 0.1から0.15に増加

        // スケールアニメーション（脈打つ効果）
        const scale = 0.45 + Math.sin(Date.now() * 0.002 + index) * 0.05;
        heart3D.scale.set(scale, scale, scale);

        renderer.render(scene, camera);
      }

      animate();

      // クリーンアップ用に保存
      container._threeCleanup = () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    });
  }
}

// 追加のインタラクティブ機能
document.addEventListener("mousemove", (e) => {
  // パーティクルのパララックス効果
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  const particles = document.getElementById("particles-js");
  if (particles) {
    particles.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
  }
});

// 文字ホバー時のランダム色変更
document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".letter");
  const colors = ["#ff9ec7", "#add8ff", "#e8d5ff", "#8b7fb8"];

  letters.forEach((letter) => {
    letter.addEventListener("mouseenter", () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      letter.style.color = randomColor;
      letter.style.transform = "scale(1.2) rotate(10deg)";
      letter.style.transition = "all 0.3s ease";
    });

    letter.addEventListener("mouseleave", () => {
      letter.style.color = "#8b7fb8";
      letter.style.transform = "scale(1) rotate(0deg)";
    });
  });
});

// プロダクトカードのフローティングアニメーション追加
function addFloatingAnimation() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card, index) => {
    // 各カードにランダムな遅延
    const delay = Math.random() * 2;
    card.style.animationDelay = `${delay}s`;
    card.classList.add("floating");
  });
}

// フローティングアニメーション用CSS動的追加
const floatingCSS = `
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .floating {
        animation: floating 3s ease-in-out infinite;
    }
`;

const style = document.createElement("style");
style.textContent = floatingCSS;
document.head.appendChild(style);

// ページ読み込み後にフローティングアニメーション初期化
window.addEventListener("load", addFloatingAnimation);

// クリック時のスパークル効果追加
document.addEventListener("click", (e) => {
  createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.style.position = "fixed";
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  sparkle.style.width = "10px";
  sparkle.style.height = "10px";
  sparkle.style.background = "#ff9ec7";
  sparkle.style.borderRadius = "50%";
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "9999";
  sparkle.style.animation = "sparkleAnimation 1s ease-out forwards";

  document.body.appendChild(sparkle);

  // アニメーション後にスパークルを削除
  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

// スパークルアニメーションCSS追加
const sparkleCSS = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;

const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = sparkleCSS;
document.head.appendChild(sparkleStyle);

// ドロワーメニューの制御
const hamburger = document.querySelector(".hamburger");
const drawerMenu = document.querySelector(".drawer-menu");
const drawerClose = document.querySelector(".drawer-close");

// ハンバーガーメニューをクリックしたときの処理
hamburger.addEventListener("click", () => {
  drawerMenu.classList.add("open");
  document.body.style.overflow = "hidden"; // スクロール防止
});

// 閉じるボタンをクリックしたときの処理
drawerClose.addEventListener("click", () => {
  drawerMenu.classList.remove("open");
  document.body.style.overflow = ""; // スクロール再開
});

// ドロワーメニュー外をクリックしたときの処理
document.addEventListener("click", (e) => {
  if (
    !drawerMenu.contains(e.target) &&
    !hamburger.contains(e.target) &&
    drawerMenu.classList.contains("open")
  ) {
    drawerMenu.classList.remove("open");
    document.body.style.overflow = "";
  }
});

// ドロワーメニュー内のリンクをクリックしたときの処理
const drawerLinks = document.querySelectorAll(".drawer-nav-menu a");
drawerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    drawerMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});
