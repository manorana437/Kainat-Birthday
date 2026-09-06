const screen=document.querySelector("#screen"),bar=document.querySelector("#bar"),stepNo=document.querySelector("#step"),music=document.querySelector("#music"),sound=document.querySelector("#sound");
let step=0,popped=0,mi=0,timer;
const media=[
["image","assets/kainat-1.jpg","Happy Birthday, My Bestie Kainat ♡","May your life be filled with as much happiness as you give to others."],
["image","assets/kainat-2.jpg","My beautiful bestie ♡","Every little memory with you is special."],
["image","assets/kainat-3.jpg","Forever my Bestie ♡","No matter where life takes us, our memories stay."],
["video","assets/kainat-video.mp4","I love u Bestie ♡ Kainat","One more little memory to keep forever."]
];
function musicOn(){music.play().then(()=>sound.textContent="🔊").catch(()=>{})}
sound.onclick=()=>music.paused?musicOn():(music.pause(),sound.textContent="🔇");
function render(h){screen.innerHTML=h;bar.style.width=(Math.min(step+1,8)/8*100)+"%";stepNo.textContent=String(Math.min(step+1,8)).padStart(2,"0")+" / 08"}
function go(n){clearTimeout(timer);step=n;renderStep()}
function renderStep(){
clearTimeout(timer);
if(step===0)render(`<div class="page"><div class="kicker">A LITTLE SURPRISE FOR YOU</div><div class="orn">♡ ✧ ♡</div><div class="script">My Bestie</div><div class="name">KAINAT</div><div class="rule">— ♥ —</div><div class="body">A tiny digital gift for the girl who makes life brighter, funner and more beautiful. ♡</div><button class="btn" id="open">Open My Heart →</button><div class="tap">tap to begin ♥</div></div>`);
if(step===1)render(`<div class="page"><div class="kicker">JUST ONE QUESTION</div><div class="orn">— ♥ —</div><div class="big">Ready for<br>your surprise?</div><div class="mini">There are a few little moments waiting for you. ♡</div><div class="choice"><button class="btn" id="yes">Yes ♡</button><button class="btn alt" id="maybe">Maybe...</button></div><div class="orn" style="margin-top:42px">— ♥ —</div></div>`);
if(step===2){popped=0;render(`<div class="page balloons"><div class="kicker">A LITTLE FUN FIRST</div><div class="title">Pop all<br>4 balloons</div><div class="counter"><span id="count">0</span> / 4</div><div class="balloon-grid"><button class="balloon">🎈</button><button class="balloon">🎈</button><button class="balloon">🎈</button><button class="balloon">🎈</button></div></div>`)}
if(step===3)render(`<div class="page cake-page"><div class="kicker">MAKE A WISH ♥</div><div class="cake">🎂</div><div class="wish">Close your eyes<br>& make a beautiful wish. ♡</div><div class="starsline">✦ ✧ ✦ ✧ ✦</div><button class="btn" id="blow">Blow the candle ✧</button></div>`);
if(step===4)render(`<div class="page"><div class="special-title">You are so special</div><div class="special-heart">♥</div><div class="body">You are my sweet soul, my rock, and someone I am so grateful to have in my life. 🫶🏻</div><button class="btn" id="special">Continue ♡</button></div>`);
if(step===5)render(`<div class="page envelope-page"><div class="kicker">A MESSAGE FROM MY HEART ♥</div><div class="envelope" id="envelope">💌</div><div class="for">For my<strong>Kainat</strong></div><div class="body">There's something I want you to read. ♡</div><button class="btn" id="openLetter">Open Letter</button></div>`);
if(step===6)render(`<div class="page letter-page"><div class="letter-head">DEAR MY BESTIE,</div><div class="letter"><p>Happy Birthday to someone truly special! ♡</p><p>You are my sweet soul, my rock, and someone I am so grateful to have in my life.</p><p>You bring so much happiness, love and positivity into my world.</p><p>On your special day, I wish you all the happiness, success and joy you deserve. May this year bring you countless beautiful moments!</p><p>Stay happy, stay you, always. ♡</p><p>With all my love, ♡</p></div><button class="btn" id="letterNext" style="margin-top:10px">One Last Little Thing ♥</button></div>`);
if(step===7)render(`<div class="page gift-page"><div class="kicker">ONE LAST LITTLE THING ♥</div><div class="gift" id="gift">🎁</div><div class="giftcap">A gift,<br>just for you. ♡</div><button class="btn" id="tapGift">Tap the box</button></div>`);
if(step===8){render(`<div class="page memories"><div class="memory-title">Happy Birthday, My Bestie Kainat ♡</div><div class="frame" id="frame"></div><div class="caption" id="caption"></div><div class="sub" id="sub"></div><div class="dots" id="dots"></div></div>`);showMedia()}
}
function showMedia(){clearTimeout(timer);const m=media[mi],f=document.querySelector("#frame");if(!f)return;f.innerHTML=m[0]==="video"?`<video src="${m[1]}" autoplay muted playsinline controls></video>`:`<img src="${m[1]}" alt="Kainat memory">`;document.querySelector("#caption").textContent=m[2];document.querySelector("#sub").textContent=m[3];document.querySelector("#dots").innerHTML=media.map((_,i)=>`<span class="dot ${i===mi?"active":""}"></span>`).join("");timer=setTimeout(()=>{mi=(mi+1)%media.length;showMedia()},m[0]==="video"?9000:3200)}
document.addEventListener("click",e=>{const b=e.target.closest("button,.envelope,.gift");if(!b)return;
if(b.id==="open"){musicOn();go(1)}else if(b.id==="yes"||b.id==="maybe"){musicOn();go(2)}
else if(b.classList.contains("balloon")&&!b.classList.contains("popped")){b.classList.add("popped");popped++;const c=document.querySelector("#count");if(c)c.textContent=popped;if(popped===4)setTimeout(()=>go(3),420)}
else if(b.id==="blow"){musicOn();go(4)}else if(b.id==="special"){go(5)}else if(b.id==="envelope"||b.id==="openLetter"){go(6)}else if(b.id==="letterNext"){go(7)}else if(b.id==="gift"||b.id==="tapGift"){go(8)}});
renderStep();