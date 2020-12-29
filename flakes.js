
/* flakes.js */

let $background;
let $canvas;
let ctx;
let width;
let height;

//Flake
let Flakes;
let max_flakes;

//Timer
let addFlake_timer;
let flake_timer;

/* キャンバス初期化 */
function init_flakeAnimation() {
  //
  $background = document.querySelector(".background")
  $canvas = document.querySelector("canvas#flakes");
  ctx = $canvas.getContext("2d");

  //初期化
  stopFlakes();
  setCanvasSize();

  //フレーク生成開始
  Flakes = [];
  addFlake_timer = setInterval(makeFlake, 500);

  //アニメ開始
  flake_animation();

  //リサイズ時イベント
  window.addEventListener("resize", setCanvasSize);
}

/* キャンバスサイズ設定 */
function setCanvasSize() {
  width  = $background.clientWidth;
  height = $background.clientHeight;
  
  $canvas.width  = width;
  $canvas.height = height;
  max_flakes = height * 0.03;
}

/* アニメーション終了 */
function stopFlakes() {
  if (ctx) ctx.clearRect(0,0, width,height); //画面をクリア

  if (addFlake_timer) clearInterval(addFlake_timer);

  window.cancelAnimationFrame(flake_timer);
  window.removeEventListener("resize", setCanvasSize);
}


/** フレーク生成 */
function Flake() {
  //速度・大きさ・不透明度・色
  this.speed  = (Math.random() + 1) * 1.5;
  this.radius = (Math.random() + 2) * 1.5;
  this.opacity = this.speed * 0.5;
  this.color  = `hsla(${(Math.random() * 360)}, 75%, 75%, ${this.opacity})`

  //位置
  this.x = Math.random() * width;
  this.y = -(this.radius * 2);
}
//フレークリストにフレークを追加
function makeFlake() {
    Flakes.push(new Flake());
    if (Flakes.length >= max_flakes) clearInterval(addFlake_timer);
}

//フレークごとの状態を更新
function updateFlakes() {
    for (flake of Flakes) {
        flake.y += flake.speed;

        //画面の外に出た時
        if (flake.y > (height + flake.radius)) {
            flake.x = Math.random() * width;
            flake.y = -(flake.radius * 2);
            flake.speed = (Math.random() + 1) * 1.5;
            flake.color = `hsla(${(Math.random() * 360)}, 75%, 75%, ${flake.opacity})`
        }
    }
}

/* アニメーション */
function flake_animation() {
    updateFlakes();
    drowFlakes();

    flake_timer = window.requestAnimationFrame(flake_animation);
}
function drowFlakes() {
    //クリア
    ctx.clearRect(0,0, width,height);

    //フレーク描画
    for (flake of Flakes) {
        ctx.fillStyle = flake.color;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, 2*Math.PI, false);
        ctx.fill();
    }
}