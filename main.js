let flag = true;
let x = 0;
let y = 1;
//名前入力
let plyname = prompt("名前を入力してください");
//プレイヤーデータ
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 30, 50, 70, 100];
let plyImg = document.getElementById("plyImg");
let plySt = new Array(7);
for (i = 0; i < plySt.length; i++) {
  plySt[i] = document.getElementById("plySt" + i);
}
plySt0.textContent = plyname;
//プレイヤーの回復
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    plySt2.textContent = "HP:" + plyHp;
  }
});
//敵データ
let t = 0;
let eneLv = 1;
let eneHp = 10;
let eneCntMax = new Array(10);
let eneAtt = new Array(10);
let eneExp = new Array(10);
let eneHpMax = new Array(10);
let eneKill = new Array(10);
let eneCnt = 5;
for (n = 0; n < 10; n++) {
  eneAtt[n] = 2 + 2 * n;
  eneCntMax[n] = 5 + n;
  eneExp[n] = 1 + 3 * n;
  eneHpMax[n] = 10 + 5 * n;
  eneKill[n] = 0;
}
let eneSt0 = document.getElementById("eneSt0");
let eneImg = document.getElementById("eneImg");
let eneSt = new Array(5);
for (let i = 0; i < eneSt.length; i++) {
  eneSt[i] = document.getElementById("eneSt" + i);
}
let enename = new Array(10);
enename = [
  "スライム",
  "バットマン",
  "ハダカデバネズミ",
  "ハブ",
  "猛犬",
  "泣かない黄鬼",
  "おばけ",
  "栄養失調",
  "火の玉ボール",
  "ヒグマ",
];
//敵への攻撃
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "img/enemyB" + t + ".png";
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "img/enemyA" + t + ".png";
    if (eneHp > 1) {
      eneHp -= plyAtt;
    } else {
      eneHp = eneHpMax[t];
      eneKill[t]++;
      eneSt4.textContent = "倒した回数" + eneKill[t];
      //終了処理
      x = x + 1;
      console.log(x);
      if (x == 100) {
        eneSec.textContent = "ゲームクリア！！";
        eneSec.style.color = "red";
        flag = false;
      }
      //経験値の処理
      plyExp += eneExp[t];
      plySt5.textContent = "経験値:" + plyExp;
      plyExpNext -= eneExp[t];
      //レベルアップの処理
      if (plyExpNext < 1) {
        plyExpNext = plyExpNeed[plyLv];
        plyLv++;
        plySt1.textContent = "レベル:" + plyLv;
        plyHpMax = plyLv * 2 + 6;
        plyHp = plyHpMax;
        plySt2.textContent = "HP:" + plyHp;
        plyAtt++;
        plySt3.textContent = "攻撃力:" + plyAtt;
        plyHeal++;
        plySt4.textContent = "回復魔法:" + plyHeal;
      }
      plySt6.textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
    }
    eneSt2.textContent = "HP:" + eneHp;
  }
});
//敵が時間ごとに攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  if (eneCnt > 0 && flag) {
    eneCnt--;
    eneSec.textContent = "モンスターの攻撃まで " + eneCnt + " 秒";
  }
  if (eneCnt < 1) {
    plyImg.src = "img/playerB.png";
    plyHp -= eneAtt[t];
    if (plyHp > 0) {
      plySt2.textContent = "HP:" + plyHp;
      eneCnt.textContent = "モンスターの攻撃まで " + eneCnt + " 秒";
    }
    if (plyHp < 1) {
      plyHp = 0;
      clearInterval(loop);
      flag = false;
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "ゲームオーバー";
    }
    setTimeout(() => {
      if (flag) {
        eneCnt = eneCntMax[t];
        plyImg.src = "img/playerA.png";
        eneSec.textContent = "モンスターの攻撃まで " + eneCnt + " 秒";
      }
    }, 500);
  }
}, 1000);
//強いモンスターへ
let right = document.getElementById("right");
right.addEventListener("click", () => {
  if (plyHp < 0 || t == 9) {
    flag = false;
  } else {
    t++;
    y++;
    if (t < 11 && flag) {
      eneSt[0].textContent = enename[t];
      eneSt[1].textContent = "レベル:" + y;
      eneSt[2].textContent = "HP:" + eneHpMax[t];
      eneSt[3].textContent = "攻撃力:" + eneAtt[t];
      eneSt[4].textContent = "倒した回数:0";
      eneHp = eneHpMax[t];
      eneLv++;
      eneImgA = "img/enemyA" + t + ".png";
      eneImg.src = eneImgA;
    } else {
      t = 10;
    }
  }
});
//弱いモンスターへ
let left = document.getElementById("left");
left.addEventListener("click", () => {
  if (plyHp < 0 || t == 0) {
    flag = false;
  } else {
    t--;
    y--;
    if (t < 11 && flag) {
      eneSt[0].textContent = enename[t];
      eneSt[1].textContent = "レベル:" + y;
      eneSt[2].textContent = "HP:" + eneHpMax[t];
      eneSt[3].textContent = "攻撃力:" + eneAtt[t];
      eneSt[4].textContent = "倒した回数:0";
      eneHp = eneHpMax[t];
      eneLv++;
      eneImgA = "img/enemyA" + t + ".png";
      eneImg.src = eneImgA;
    } else {
      t = 0;
    }
  }
});
//終了処理
console.log(x);
if (x == 1) {
  eneSec.textContent = "ゲームクリア！！";
  eneSec.color.css = "red";
}
