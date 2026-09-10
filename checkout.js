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
