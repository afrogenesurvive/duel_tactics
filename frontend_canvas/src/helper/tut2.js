
function startScene (event) {

    if(requestId){
        cancelAnimationFrame(requestId);
    }

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // get images
    let floorImage = document.getElementById("floor"); //'../assets/floor2.png'
    let wallImage = document.getElementById("wall"); //'../assets/wall2.png'

    // this is the calculation for the most common isometric angle (30 degrees)
    // because it's easy to calculate
    function cartesianToIsometric(cartPt) {
        var tempPt = new Point();
        tempPt.x = cartPt.x - cartPt.y;
        tempPt.y = (cartPt.x + cartPt.y) / 2;
        return (tempPt);
    }

    // isometric sprites sizes
    let floorImageWidth = 103;
    let floorImageHeight = 53;
    let wallImageWidth = 103;
    let wallImageHeight = 98;

    // some offsets to center the scene
    let sceneX = window.innerWidth/2;
    let sceneY = 100;
    // Normally this should be the width of each square tile in top-down looking scene
    // But, I couldn't figure out how the author reaches this value :(
    let tileWidth = 50;

    // draw scene elements like our sprites, images, etc.
    function drawScene(time) {
        for (var x = 0; x < 10; ++x) {
            for (var y = 0; y < 10; ++y) {
                let p = new Point();
                p.x = x * tileWidth;
                p.y = y * tileWidth;
                let iso = cartesianToIsometric(p);

                // apply offset to center scene for a better view
                iso.x += sceneX
                iso.y += sceneY

                // apply offset to place each isometric image from its bottom center.
                // the default pivot point (top left) won't do good if our image has height like the wall image here
                let offset = {x: floorImageWidth/2, y: floorImageHeight}
                ctx.drawImage(floor, iso.x - offset.x, iso.y - offset.y);

                // place some walls on every three
                if(y % 3 == 0 && x % 3 == 0){
                    offset = {x: wallImageWidth/2, y: wallImageHeight}
                    ctx.drawImage(wall, iso.x - offset.x, iso.y - offset.y);

                    // put some more on second level floor
                    if(y % 6 == 0 && x % 6 == 0){
                        let isoHeight = wallImageHeight - floorImageHeight
                        offset.y += isoHeight
                        ctx.drawImage(wall, iso.x - offset.x, iso.y - offset.y);
                    }

                }

            }
        }
    }

    let debug = false
    function debugDraw(time) {
        for (var x = 0; x < 50; ++x) {
            for (var y = 0; y < 50; ++y) {
                let p = new Point();
                p.x = x * tileWidth;
                p.y = y * tileWidth;
                let iso = cartesianToIsometric(p);
                // apply offset to center scene for a better view
                iso.x += sceneX
                iso.y += sceneY
                // draw pivot point for each floor image
                ctx.fillStyle = 'yellow';
                ctx.fillRect(iso.x - 5, iso.y - 5, 10, 10);
            }
        }
    }

    if(debug){
        // draw debug points after some time to wait image loading, otherwise they stay behind
        setTimeout(() => requestAnimationFrame(debugDraw), 2000)
    }

    return requestAnimationFrame(drawScene);

};

let requestId;
window.addEventListener('DOMContentLoaded', (event) => {
    requestId = startScene();
})
