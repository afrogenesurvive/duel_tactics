// <img onload="startScene()" src="https://i.ibb.co/xz5jtnc/tile.png" id="floor"/>
// <img onload="startScene()" src="https://i.ibb.co/8gHBHd8/cube.png" id="wall"/>
// <canvas id="canvas"></canvas>
//
//
//
// redrawTiles: function() {
//   for(var Xi = (this.Xtiles - 1); Xi >= 0; Xi--) {
//     for(var Yi = 0; Yi < this.Ytiles; Yi++) {
//       this.drawTile(Xi, Yi);
//     }
//   }
// },
//
// drawTile: function(Xi, Yi) {
//   var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX;
//   var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY;
//
//   // Draw tile interior
//   if( Xi == this.selectedTileX && Yi == this.selectedTileY)
//     this.context.fillStyle = 'yellow';
//   else
//     this.context.fillStyle = 'green';
//   this.context.moveTo(offX, offY + this.tileRowOffset / 2);
//   this.context.lineTo(offX + this.tileColumnOffset / 2, offY, offX + this.tileColumnOffset, offY + this.tileRowOffset / 2);
//   this.context.lineTo(offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY + this.tileRowOffset);
//   this.context.lineTo(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, offX, offY + this.tileRowOffset / 2);
//   this.context.stroke();
//   this.context.fill();
//   this.context.closePath();
//
//   // Draw tile outline
//   var color = '#999';
//   this.drawLine(offX, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY, color);
//   this.drawLine(offX + this.tileColumnOffset / 2, offY, offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, color);
//   this.drawLine(offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, color);
//   this.drawLine(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, offX, offY + this.tileRowOffset / 2, color);
//
//   if(this.showCoordinates) {
//     this.context.fillStyle = 'orange';
//     this.context.fillText(Xi + ", " + Yi, offX + this.tileColumnOffset/2 - 9, offY + this.tileRowOffset/2 + 3);
//   }
// },


// $(window).on('mousemove', function(e) {
//   e.pageX = e.pageX - self.tileColumnOffset / 2 - self.originX;
//   e.pageY = e.pageY - self.tileRowOffset / 2 - self.originY;
//   tileX = Math.round(e.pageX / self.tileColumnOffset - e.pageY / self.tileRowOffset);
//   tileY = Math.round(e.pageX / self.tileColumnOffset + e.pageY / self.tileRowOffset);
// }
