const steps = [
  'Contacting payment processor…',
  'Verifying billing address…',
  'Checking squirrel availability…',
  'Reviewing wildlife regulations…',
  'Order cancelled.'
];

const overlay  = document.getElementById('processing');
const procText = document.getElementById('procText');
const more     = document.getElementById('more');
const keepBtn  = document.getElementById('keepReading');

let cartHadItems = false;
try {
  const c = JSON.parse(localStorage.getItem('sq_cart') || '{}');
  cartHadItems = Object.keys(c).length > 0;
  localStorage.removeItem('sq_cart');
} catch (e) {}

function runProcessing(done){
  let i = 0;
  procText.textContent = steps[0];
  const timer = setInterval(() => {
    i++;
    if (i >= steps.length){
      clearInterval(timer);
      setTimeout(done, 700);
      return;
    }
    procText.textContent = steps[i];
    if (i === steps.length - 1) overlay.classList.add('cancelled');
  }, 850);
}

function finishProcessing(){
  overlay.classList.add('hide');
  setTimeout(() => overlay.remove(), 500);
  document.body.classList.add('ready');
}

if (cartHadItems){
  document.body.classList.add('processing-on');
  runProcessing(finishProcessing);
} else {
  overlay.remove();
  document.body.classList.add('ready');
}

keepBtn.addEventListener('click', () => {
  more.classList.add('open');
  keepBtn.classList.add('used');
  setTimeout(() => {
    more.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 120);
});

const copyBtns = document.querySelectorAll('.copy-link');
copyBtns.forEach(copyBtn => {
  const url = copyBtn.dataset.url;
  copyBtn.addEventListener('click', async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch (e) {
      const t = document.createElement('textarea');
      t.value = url;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      try { ok = document.execCommand('copy'); } catch (e2) {}
      t.remove();
    }
    copyBtn.textContent = ok ? 'Copied! 🌰' : 'Press to copy';
    copyBtn.classList.toggle('copied', ok);
    setTimeout(() => {
      copyBtn.textContent = 'Copy link';
      copyBtn.classList.remove('copied');
    }, 2000);
  });
});