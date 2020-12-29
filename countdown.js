
/* countdown.js */

const $clock = document.querySelector("#clock");
const $message_text = document.querySelector("#message-text");
const $nextyear_text = document.querySelector("#nextyear-text");

const $time = document.querySelector(".time");
const $hour = document.querySelector("#hour");
const $min = document.querySelector("#min");
const $sec = document.querySelector("#sec");

const $progress_bar  = document.querySelector("#progress-bar");
const $progress_text = document.querySelector("#progress-text");

//
const curr_year = new Date().getFullYear();
const curr_year_start = new Date(`${curr_year}/01/01 00:00:00`).getTime();
const next_year_start = new Date(`${(curr_year + 1)}/01/01 00:00:00`).getTime();
const curr_year_seconds = next_year_start - curr_year_start;

//表示
$message_text.textContent = `${(curr_year + 1)}年まであと`;
$nextyear_text.textContent = `${(curr_year + 1)}`;

let animation = false;

//文字列を分割して1文字ずつspanにする
const span_character = text => {
  let result = "";
  for (let i in text) {
    result += `<span>${text[i]}</span>`;
  }
  return result;
}

//残り時間を更新
function update_countdown() {
  const dt = new Date();
  const time_now = dt.getTime();

  /* 計算 */
  //残り秒数を計算
  const _diff = (next_year_start - time_now) / 1000;
  const diff  = _diff > 0 ? _diff : -1;
  const diff_hour = (diff + 1) / 3600; //「+ 1」で謎の誤差を埋める
  const diff_min  = 60 * (diff_hour - Math.floor(diff_hour));
  const diff_sec  = 60 * (diff_min  - Math.floor(diff_min));

  //割合を計算
  const _progress = String((parseFloat(time_now) - curr_year_start) / curr_year_seconds * 100);
  const progress  = _diff >= 0 ? _progress : "100";
  const dc_idx = progress.indexOf(".");
  const progress_text = dc_idx != -1 ? `<span>${progress.slice(0,dc_idx)}</span>${progress.slice(dc_idx, dc_idx+6)}%` : "<span>100<span>%"
  
  /* 表示 */
  //文字列に変換・ゼロ埋め
  const hour = `${Math.floor(diff_hour)}`;
  const min  = ("0"+ Math.floor(diff_min)).slice(-2);
  const sec  = ("0"+ Math.floor(diff_sec)).slice(-2);

  $hour.innerHTML = span_character(hour);
  $min.innerHTML  = span_character(min);
  $sec.innerHTML  = span_character(sec);


  $progress_bar.style.width = `${progress}%`;
  $progress_text.innerHTML = progress_text;
  
  //現在時刻
  let [m,d,H,M,S] = [
    ("0" + (dt.getMonth()+1)).slice(-2),
    ("0" + dt.getDate()).slice(-2),
    ("0" + dt.getHours()).slice(-2),
    ("0" + dt.getMinutes()).slice(-2),
    ("0" + dt.getSeconds()).slice(-2),
  ]
  $clock.textContent = `${m}/${d} ${H}:${M}:${S}`;

  //カウントダウンが完了した時
  if (progress == 100 && !animation) {
    $message_text.innerHTML = "<span>Happy New Year!</span>";

    init_flakeAnimation();
    animation = true;
  }
}