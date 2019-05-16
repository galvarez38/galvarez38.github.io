package { 
import flash.display.*; 
import flash.events.*; 
  
public class RedCircle extends MovieClip { 
  
var radians = 0; 
var speed = 0; 
var radius = 5; 
  
public function RedCircle() 
{ 
speed = .01+.5*Math.random(); 
radius = 2+10*Math.random(); 
  
this.addEventListener(Event.ENTER_FRAME, RotateCircle); 
} 
  
function RotateCircle(e:Event) 
{ 
radians += speed; 
  
this.x += Math.round(radius*Math.cos(radians)); 
this.y += Math.round(radius*Math.sin(radians)); 
} 
} 
} 