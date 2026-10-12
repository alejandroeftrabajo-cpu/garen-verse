'use strict';
// Destinos editables: dejar null hasta disponer de la URL real.
const DESTINATIONS = Object.freeze({
  arlin: null,
  asunaah: null,
  erik: 'https://erikgaren.com/',
  alerik: null
});
const CHARACTERS = [
  {id:'arlin',name:'ARLIN',tag:'CREATE · EXPLORE · INSPIRE',color:'#ff91c0',description:'Un universo de ilustración, arte y expresión creativa.'},
  {id:'asunaah',name:'ASUNAAH',tag:'IMAGINE · DESIGN · EVOLVE',color:'#f4be66',description:'Tatuaje, diseño, imaginación y creación visual.'},
  {id:'erik',name:'ERIK',tag:'CODE · SIMULATE · TAKE OFF',color:'#ff6676',description:'Ingeniería de software, helicópteros, drones y simulación.'},
  {id:'alerik',name:'ALERIK',tag:'MOVE · EXPLORE · CREATE',color:'#60d5ff',description:'Música, tecnología, exploración y creatividad.'}
];
const byId = id => CHARACTERS.find(character => character.id === id);
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cards = document.querySelector('#cards');
const world = document.querySelector('#world');
const flash = document.querySelector('#flash');
const hero = document.querySelector('.hero');
const portalSlot = document.querySelector('#world-portal-slot');
const back = document.querySelector('#back');
const positions = {arlin:[13,59],asunaah:[38,58],erik:[62,58],alerik:[87,58]};
let busy = false;
let transitionTimer;
let focusReturn = null;

cards.innerHTML = CHARACTERS.map((character,index) => `
  <button type="button" class="card" data-world="${character.id}" style="--accent:${character.color}">
    <img src="assets/${character.id}.jpg" alt="Astronauta ${character.name}" loading="lazy">
    <span class="card-text"><small>0${index+1} / 04 <b aria-hidden="true">↗</b></small><strong class="card-name">${character.name}</strong><span class="card-tag">${character.tag}</span></span>
  </button>`).join('');

function portalMarkup(character) {
  const destination = DESTINATIONS[character.id];
  const image = `<span class="portal-visual"><img src="assets/portal-${character.id}.webp" alt="" width="200" height="200"></span>`;
  const copy = `<span class="portal-copy"><strong>ENTER ${character.name}’S WORLD</strong><span>${destination ? new URL(destination).hostname + ' ↗' : 'DESTINO PENDIENTE'}</span></span>`;
  if (!destination) return `<div class="portal-entry portal-pending" aria-label="Portal de ${character.name}. Destino pendiente de confirmar">${image}${copy}</div>`;
  return `<a class="portal-entry portal-active" href="${destination}" aria-label="Entrar en el portfolio de ${character.name}: ${new URL(destination).hostname}">${image}${copy}</a>`;
}

function showFlash(color, action, duration=350) {
  window.clearTimeout(transitionTimer);
  flash.style.background = color;
  flash.classList.add('on');
  transitionTimer = window.setTimeout(() => {
    flash.classList.remove('on');
    action();
  }, reduced() ? 0 : duration);
}

function populateWorld(id) {
  const character = byId(id);
  if (!character) return;
  document.querySelector('#world-name').textContent = character.name;
  document.querySelector('#world-tag').textContent = character.tag;
  document.querySelector('#world-desc').textContent = character.description;
  const image = document.querySelector('#world-img');
  image.src = `assets/${id}.jpg`;
  image.alt = `Astronauta ${character.name}`;
  world.style.setProperty('--accent', character.color);
  portalSlot.innerHTML = portalMarkup(character);
  world.hidden = false;
  document.body.classList.add('world-open');
  back.focus({preventScroll:true});
}

function openWorld(id, push=true) {
  const character = byId(id);
  if (!character) return;
  focusReturn = document.activeElement;
  showFlash(character.color, () => {
    populateWorld(id);
    if (push) history.pushState({world:id},'',`#world-${id}`);
  });
}

function closeWorld(push=true) {
  window.clearTimeout(transitionTimer);
  flash.classList.remove('on');
  world.hidden = true;
  document.body.classList.remove('world-open');
  if (push) history.pushState(null,'','#home');
  if (focusReturn && focusReturn.isConnected) focusReturn.focus({preventScroll:true});
}

function selectFromStage(id) {
  if (busy) return;
  const character = byId(id);
  if (!character) return;
  busy = true;
  const [x,y] = positions[id];
  hero.style.setProperty('--accent',character.color);
  hero.style.setProperty('--fx',`${x}%`);
  hero.style.setProperty('--fy',`${y}%`);
  flash.style.setProperty('--lx',`${x}%`);
  flash.style.setProperty('--ly',`${y}%`);
  hero.classList.add('target');
  window.setTimeout(() => {
    hero.classList.add('launch');
    window.setTimeout(() => {
      openWorld(id);
      hero.classList.remove('target','launch');
      busy = false;
    },reduced()?0:540);
  },reduced()?0:310);
}

document.addEventListener('click',event => {
  const selector = event.target.closest('[data-world]');
  if (selector) {
    if (selector.closest('.hotspots')) selectFromStage(selector.dataset.world);
    else openWorld(selector.dataset.world);
    return;
  }
  const portal = event.target.closest('a.portal-active');
  if (!portal || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  if (busy || reduced()) return;
  const destination = portal.href;
  if (!destination) return;
  event.preventDefault();
  busy = true;
  portal.classList.add('portal-activating');
  const color = CHARACTERS.find(item => item.name === document.querySelector('#world-name').textContent)?.color || '#ff6676';
  flash.style.setProperty('--lx','50%');
  flash.style.setProperty('--ly','50%');
  flash.style.background = color;
  window.setTimeout(() => {
    flash.classList.add('on');
    window.setTimeout(() => window.location.assign(destination),220);
  },130);
});

back.addEventListener('click',()=>closeWorld());
document.addEventListener('keydown',event => {
  if (event.key==='Escape' && !world.hidden) closeWorld();
  if (event.key==='Tab' && !world.hidden) {
    const controls = [...world.querySelectorAll('button:not([disabled]),a[href]')].filter(el => el.getClientRects().length);
    if (!controls.length) return;
    if (event.shiftKey && document.activeElement===controls[0]) {event.preventDefault();controls.at(-1).focus();}
    else if (!event.shiftKey && document.activeElement===controls.at(-1)) {event.preventDefault();controls[0].focus();}
  }
});
function route() {
  const id = location.hash.startsWith('#world-') ? location.hash.slice(7) : null;
  if (byId(id)) populateWorld(id);
  else if (!world.hidden) closeWorld(false);
}
window.addEventListener('popstate',route);
window.addEventListener('hashchange',route);
route();
