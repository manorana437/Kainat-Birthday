const screen=document.getElementById("screen");
const progressBar=document.getElementById("progressBar");
const stepLabel=document.getElementById("stepLabel");
const music=document.getElementById("music");
const soundBtn=document.getElementById("soundBtn");
let step=1,musicStarted=false,paused=false;

const media=[
 {type:"image",src:"assets/kainat-1.jpg",quote:"Kainat, meri zindagi ki sabse khoobsurat dosti mein se ek ho tum. 💜✨"},
 {type:"image",src:"assets/kainat-2.jpg",quote:"Some people become memories, but besties become a forever feeling. 🫶🏻💜"},
 {type:"image",src:"assets/kainat-3.jpg",quote:"No matter where life takes us, you will always be my Bestie Kainat. 💕🌙"},
 {type:"video",src:"assets/kainat-video.mp4",quote:"And this little moment? One of my favourite memories with you. 🥹💜"}
];
function update(){progressBar.style.width=`${step/8*100}%`;stepLabel.textContent=`${String(step).padStart(2,"0")} / 08`}
function startMusic(){if(musicStarted)return;musicStarted=true;music.volume=.48;music.play().catch(()=>{})}
function page(content){screen.innerHTML=`<div class="page">${content}</div>`;update()}
function go(n){step=n;render();update();flash()}
function flash(){const x=document.createElement("div");x.className="fade";document.body.appendChild(x);setTimeout(()=>x.remove(),450)}
function celebration(){const box=document.createElement("div");box.className="celebration";document.body.appendChild(box);const icons=["💜","💖","💕","💗","✨","🫶🏻","🌸","💝","🥰","♥"];for(let i=0;i<32;i++){const p=document.createElement("span");p.className="particle";p.textContent=icons[Math.floor(Math.random()*icons.length)];p.style.setProperty("--x",`${(Math.random()-.5)*640}px`);p.style.setProperty("--y",`${(Math.random()-.5)*720}px`);p.style.setProperty("--r",`${Math.random()*720-360}deg`);p.style.animationDelay=`${Math.random()*.15}s`;box.appendChild(p)}setTimeout(()=>box.remove(),1600)}
function render(){
 if(step===1)page(`<div class="eyebrow">A LITTLE SURPRISE FOR YOU</div><div class="locket"></div><div class="hero">Happy Birthday,<br><span>MY BESTIE KAINAT</span> 💜</div><p class="sub">A tiny digital gift for the girl who makes ordinary moments feel unforgettable.</p><button class="btn" id="open">Open My Heart →</button><div class="micro">tap to begin</div>`);
 if(step===2)page(`<div class="eyebrow">JUST ONE QUESTION</div><div class="hero" style="font-size:49px">Ready for<br><span>your surprise?</span></div><p class="sub">There are a few little moments waiting just for you. 🌙</p><div class="choice"><button class="btn" id="yes">Yes ♡</button><button class="btn ghost" id="no">Maybe...</button></div>`);
 if(step===3)renderBalloons();
 if(step===4)page(`<div class="eyebrow">MAKE A WISH</div><div class="cake">🎂</div><div class="wish">Close your eyes<br>& make a beautiful wish.</div><div class="sparkles">✦ ✧ ✦ ✧ ✦</div><button class="btn" id="blow" style="margin-top:24px">Blow the candle ✨</button>`);
 if(step===5)page(`<div class="eyebrow">A MESSAGE FROM MY HEART</div><div class="envelope" id="envelope">💌</div><div class="hero" style="font-size:39px">For my <span>Bestie</span></div><p class="sub">There's something I want you to read. 💜</p><button class="btn" id="openLetter">Open Letter</button>`);
 if(step===6){page(`<div class="eyebrow">DEAR KAINAT,</div><div class="letter"><h3>Happy Birthday to my beautiful bestie! 🎂💜</h3><p>You are not just my friend, you are one of those rare people who make life softer, happier, and a whole lot more fun.</p><p>Thank you for every laugh, every random conversation, every little memory, and every time you have simply been there. I am genuinely grateful for you.</p><p>On your special day, I wish you endless happiness, beautiful surprises, success in everything you dream of, and a heart that always has a reason to smile. May this year be your most magical one yet! ✨</p><p style="text-align:right;color:#8d3154">Forever your bestie, ♥</p></div>`);setTimeout(()=>{if(step===6)go(7)},7500)}
 if(step===7)page(`<div class="eyebrow">ONE LAST LITTLE THING</div><div class="gift" id="gift">🎁</div><div class="hero" style="font-size:42px">A gift,<br><span>just for you.</span></div><p class="sub">Tap the box. 💜</p>`);
 if(step===8)renderMedia(0);
}
function renderBalloons(){page(`<div class="eyebrow">A LITTLE FUN FIRST</div><div class="hero" style="font-size:43px">Pop all<br><span>4 balloons</span></div><div class="counter" id="counter">0 / 4</div><div class="balloon-area"><button class="balloon">💜</button><button class="balloon">💖</button><button class="balloon">💗</button><button class="balloon">💕</button></div>`);let popped=0;document.querySelectorAll(".balloon").forEach(b=>b.onclick=()=>{if(b.classList.contains("popped"))return;b.classList.add("popped");popped++;celebration();document.getElementById("counter").textContent=`${popped} / 4`;if(popped===4)setTimeout(()=>go(4),700)})}
function renderMedia(index){const p=media[index];const visual=p.type==="video"?`<video id="memoryVideo" src="${p.src}" muted playsinline preload="metadata"></video>`:`<img src="${p.src}" alt="Kainat birthday memory ${index+1}">`;screen.innerHTML=`<div class="page media-page"><div class="media-title">Happy Birthday,<br>MY BESTIE KAINAT ♡</div><div class="media-frame">${visual}</div><div class="quote">${p.quote}</div><div class="dots">${media.map((_,i)=>`<span class="dot ${i===index?"active":""}"></span>`).join("")}</div></div>`;update();if(p.type==="video"){const v=document.getElementById("memoryVideo");v.play().catch(()=>{})}if(index<media.length-1)setTimeout(()=>{if(step===8&&!paused)renderMedia(index+1)},4300);else setTimeout(()=>{if(step===8&&!paused)renderFinal()},5000)}
function renderFinal(){screen.innerHTML=`<div class="page"><div class="final-heart">♥</div><div class="hero" style="font-size:46px">Love you forever,<br><span>My Bestie Kainat</span> 💜</div><div class="signature">Happy Birthday, Kainat.</div></div>`;update();celebration()}

document.addEventListener("click",e=>{if(e.target.closest("#open")){startMusic();go(2)}if(e.target.closest("#yes")){startMusic();go(3)}if(e.target.closest("#no")){e.target.closest("#no").animate([{transform:"translateX(0)"},{transform:"translateX(16px)"},{transform:"translateX(-16px)"},{transform:"translateX(0)"}],{duration:420})}if(e.target.closest("#blow")){celebration();go(5)}if(e.target.closest("#openLetter")||e.target.closest("#envelope"))go(6);if(e.target.closest("#gift")){celebration();go(8)}});
soundBtn.onclick=()=>{startMusic();music.muted=!music.muted;soundBtn.textContent=music.muted?"×":"♪"};
render();
