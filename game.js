// Iteration 1: Declare variables required for this game

var zombieImages = [
    'zombie-1.png',
    'zombie-2.png',
    'zombie-3.png',
    'zombie-4.png',
    'zombie-5.png',
    'zombie-6.png',
];

const gameBody = document.getElementById("game-body");
const live = document.getElementById("lives");
let timer = document.getElementById("timer");
var seconds=timer.textContent;
var zombieId=0;

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio("./assets/shotgun.wav");
gameBody.onclick=()=>{
    shotgunSound.pause();
    shotgunSound.currentTime=0;
    shotgunSound.play();
}


// Iteration 1.3: Add background sound
const backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop=true;

// Iteration 1.4: Add lives
const maximumLives = 4;
var lives=4;


// Iteration 2: Write a function to make a zombie


function makeZombie(zombieId) {
    const newZombie = document.createElement('img');
    const randomImage = Math.floor(Math.random()*zombieImages.length);
    newZombie.src = `./assets/${zombieImages[randomImage]}`;
    newZombie.classList.add("zombie-image");
    newZombie.setAttribute("id",`zombie-${zombieId}`);
    newZombie.style.transform = `translateX(${getRandomNum(10, 90)}vw)`;
    newZombie.style.animationDuration = `${getRandomNum(2, 10)}s`;
    newZombie.onclick = () => {
        destroyZombie(newZombie);
    };
    gameBody.appendChild(newZombie);
    zombieId++;
}


// Iteration 3: Write a function to check if the player missed a zombie
function missed(zombie) {
    if(zombie.getBoundingClientRect().top<=0)
    {
        lives--;
        return true;
    }
    else
    {
        return false;
    }
}
     

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    zombie.style.display = "none";
    zombieId++;
    makeZombie();
  }

// Iteration 5: Creating timer


 timer = setInterval(function () {
    seconds--;
    document.getElementById("timer").textContent = seconds;
    let zombie = document.getElementById("zombie" + zombieId);
    if (missed(zombie) == true) {
        destroyZombie(zombie);
      if (lives == 0) {
        clearInterval(timer);
        location.href = "./game-over.html";
      }
    }
    if (seconds == 0) {
      clearInterval(timer);
      location.href = "./win.html";
    }
  }, 1000);
   

// Iteration 6: Write a code to start the game by calling the first zombie 
makeZombie(zombieId);

// Iteration 7: Write the helper function to get random integer
function getRandomNum(min,max){
    return Math.floor(Math.random()* (max-min))+min;
}
