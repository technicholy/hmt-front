let snowflakes = []; // array to hold snowflake objects
let img;


let speed = .1
let direction = 1
let x = -150

function preload() {
    img = loadImage('http://localhost:3000/image.png');
}

function setup() {
    createCanvas(windowWidth / 4, windowHeight * .6);
    fill(240);
    noStroke();
    img.resize(windowWidth / 3, 0);

}

function draw() {
    // background('dark');
    clear()
    x = x + speed * direction
    if (x > 0) {
        direction *= -1
    }
    if (x < -150) {
        direction *= -1
    }
    let t = frameCount / 60; // update time
    // create a random number of snowflakes each frame
    for (let i = 0; i < random(5); i++) {
        snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    image(img, x, ((windowHeight * .6) - img.height) + 50);
    for (let flake of snowflakes) {
        flake.update(t); // update snowflake position
        flake.display(); // draw snowflake
    }
}

// snowflake class
function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width / 2, 2)));

    this.update = function(time) {
        // x position follows a circle
        let w = 0.6; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += pow(this.size, 0.5);

        // delete snowflake if past end of screen
        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function() {
        ellipse(this.posX, this.posY, this.size);
    };
}