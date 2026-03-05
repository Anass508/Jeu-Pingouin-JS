/* Début du scrip JavaScript */

let score = 0 ;
document.getElementById('score').textContent=score ; 
 

document.addEventListener('mousedown',ajouter_splat);

function ajouter_splat(event) 
{
    
  event.preventDefault();

  if ( (10 <= (event.pageX-16) && (event.pageX-16) <= 510)  &&  (
     90 <= (event.pageY-16) &&  (event.pageY-16) <= 590 ) ) {
  }    
  else {
    return ;
  }
  
  let i=document.createElement('img');
  i.src='https://moodle.iutv.univ-paris13.fr/img/bjs/splat.png';
  i.className='splat';
  document.body.append(i);

  // Forcer le navigateur à prendre en compte la situation actuelle (position, scale).
  // Ceci permettra au navigateur de s'apercevoir d'un changement futur des propriétés CSS.
  window.getComputedStyle(i).top;
  // Changer les propriétés CSS qui transitionnent. 
  // Le navigateur s’aperçoit du changement et déclenche la transition.

  i.style.top =(event.pageY-16)+'px';
  i.style.left=(event.pageX-16)+'px'; 
  i.style.transform='scale(1)';

  setTimeout( function(){ console.log("fin animation"); } , 1000 ); 

  /* ajouter les colision des rectangle */


  // 1. On récupère Tux précisément
  let tuxElement = document.getElementById('tux');
  let rectTux = tuxElement.getBoundingClientRect();

  // 3. Test de collision : la souris est-elle DANS le rectangle de Tux ?
  let touche = 
    event.clientX >= rectTux.left && 
    event.clientX <= rectTux.right && 
    event.clientY >= rectTux.top && 
    event.clientY <= rectTux.bottom;

  if( touche == true ){
    score=score+10;
    document.getElementById('score').textContent=score ;
    i.remove();
  }
  else{
    score=score-5;
    document.getElementById('score').textContent=score ; 
    i.style.zIndex =-1;  

  }

}


/* fonction anonyme pour capturer la touche utiliser par l'utilisateur */

  document.addEventListener('keydown', function(event) {
    
    let tux = document.getElementById('tux');
    let rect = tux.getBoundingClientRect();
  
    // 1. On prépare les variables au début (accessibles partout dans la fonction)
    let left = rect.left + window.scrollX;
    let top = rect.top + window.scrollY;
    let largeur = rect.width;
    let hauteur = rect.height;
  
    // 2. On change la valeur selon la touche
    if (event.key == "ArrowLeft")  { left -= 30; }
    if (event.key == "ArrowRight") { left += 30; }
    if (event.key == "ArrowUp")    { top -= 30;  }
    if (event.key == "ArrowDown")  { top += 30;  }
  
    // 3. On applique les limites (Le "Bridage")
    left = Math.max(10, left);
    left = Math.min(left, 510 - largeur);
  
    top = Math.max(90, top);
    top = Math.min(top, 590 - hauteur);
  
    // 4. On met à jour le style visuel à la toute fin
    tux.style.left = left + 'px';
    tux.style.top = top + 'px';
  });


