﻿#pragma strict

var main : MainCTRL;

var POINTMULTIPLIER = 1;
var DEFAULTSPEED = 5;
var MAXLIVES = 3;
var TIMEDEFAULT = 15;

var Player1Inv: Sprite;
var Player1: Sprite;
var player : GameObject;
var hud_Rescues : GameObject;
var hud_Life : GameObject;
var hud_Timer : GameObject;

var powerUp_Life : AudioClip;
var swoosh : AudioClip;
var powerDown_Delay : AudioClip;
var powerDown_Eater : AudioClip;
var eFX_CountDown   : AudioClip;
var life_exuasted   : AudioClip;

var hudFont : Font;

var sprite 	  : SpriteRenderer;

var lives 	  : int = 3;

var points    : int = 0;

var speed     : int = DEFAULTSPEED;
var timer_Delay : int = 0;
var timer 	  : int = 0;
var timer_reset_value : int = 0;

var level     : int = 0;

public var gameover : boolean = false;

function Start () {
	sprite = GetComponent(SpriteRenderer);
	resetTimer (TIMEDEFAULT);
	audio.volume = 0.2;
	
	
	main = GameObject.Find("background_only").gameObject.GetComponent(MainCTRL);
	
}

function resetTimer (time: int){
	timer_reset_value = time;
	while(timer_reset_value){
		timer_reset_value--;
		timer = timer_reset_value;
		if(timer <= 5){
			audio.PlayOneShot(eFX_CountDown);
		}
		yield WaitForSeconds(1);
	}
}

function speedUp (time : int) {
	if(timer_Delay<=0){
		while(time){
			time--;
			timer_Delay = time;
			yield WaitForSeconds(1);
		}
	}
}

function spawn(){
	
	hud_Rescues = Instantiate(new GameObject(), new Vector3(0.152, 0.954, 0), Quaternion.identity); 
	hud_Rescues.AddComponent(GUIText);
	
	hud_Life = Instantiate(new GameObject(), new Vector3(0.75, 0.954, 0), Quaternion.identity); 
	hud_Life.AddComponent(GUIText);

	hud_Timer = Instantiate(new GameObject(), new Vector3(0.48, 0.955, 0), Quaternion.identity); 
	hud_Timer.AddComponent(GUIText);
	
	Instantiate(player, Vector2(-7.043443, 0.9334681), transform.rotation);

}

function Update () {
		
	hud_Rescues.guiText.text = points.ToString();
	hud_Rescues.guiText.font = hudFont;
	
	hud_Life.guiText.text = lives.ToString();
	hud_Life.guiText.font = hudFont;
	
	hud_Timer.guiText.text = timer.ToString();
	//hud_Timer.guiText.fontSize = 25;
	hud_Timer.guiText.font = hudFont;
	
	if (timer_Delay > 0){
		speed = 16;
		//hud_Timer.guiText.fontSize = 40;
	}else if (timer_Delay <= 0){
		speed = DEFAULTSPEED;
	}

	if (timer == 0 && !gameover) {
		stopGame();
	}
	
	if(timer < 5){
		
		hud_Timer.guiText.fontSize = 40;
		
	}else if (timer > 5){
	
		hud_Timer.guiText.fontSize = 25;
	}
	
	if(Input.GetAxis("Horizontal") && !gameover){
		transform.Translate(Vector2(Input.GetAxis("Horizontal") *speed * Time.smoothDeltaTime, 0));	
	}
	
	if(Input.GetAxis("Vertical") && !gameover){
		transform.Translate(Vector2(0, Input.GetAxis("Vertical") *(speed-1) * Time.smoothDeltaTime));	
	}
	
	if(transform.position.y > 5.1){
		transform.position.y = 5.1;
	}
	
	if(transform.position.x < -7.1){
		transform.position.x = -7.1;
	}
	
	if(transform.position.y < -2.5 && !gameover){
		transform.position.y = -2.5;
	}
	
	if(transform.position.x > 7.1 && !gameover){
		transform.position.x = 7.1;
	}
	
	if(( Mathf.Round(Time.time)) % 2 == 0){
		//Debug.Log('Move up');
		transform.Translate(Vector2(0, 0.3 * Time.deltaTime));
	}else{
		//Debug.Log('Move Down');
		//transform.Translate(Vector2(0, -0.3 * Time.deltaTime));
	}
	
    if (Input.GetKey('left') && !gameover)
     {
		sprite.sprite = Player1Inv;	
     }else if((Input.GetKey('right')) && !gameover){
     	sprite.sprite = Player1;	
     }
     
     if( Input.GetKeyDown('left') && !gameover ){
     	audio.PlayOneShot(swoosh, 0.7);
     }else if(Input.GetKeyDown('right') && !gameover){
     	audio.PlayOneShot(swoosh, 0.5);
     }   
     
     if(gameover){
		transform.Translate(Vector2(1 *speed * Time.smoothDeltaTime, 0));
     }
	
}

function OnCollisionEnter2D(coll: Collision2D) {
	if(coll.gameObject.tag == 'Eater'){
		audio.PlayOneShot(powerDown_Eater);
		Destroy (coll.gameObject);
		if(lives > 0){
			lives--;
		}else if(lives == 0 && !gameover){
			stopGame();
		}
		
	}else if(coll.gameObject.tag == 'Delay' && !gameover){
		audio.PlayOneShot(powerDown_Delay);
		Destroy (coll.gameObject);
		speedUp(10);
		
	}else if(coll.gameObject.tag == 'Point' && !gameover){
		points += POINTMULTIPLIER;
		timer_reset_value = TIMEDEFAULT;
		if(timer <= 0){
			resetTimer (TIMEDEFAULT);
		}
		
	}else if(coll.gameObject.tag == 'Life' && !gameover){
		audio.PlayOneShot(powerUp_Life);
		if(lives < MAXLIVES){
			lives++;
		}
		
		Destroy (coll.gameObject);
		
	}else if(coll.gameObject.tag == 'Gun'){
	
	}
	
		//Debug.Log('You have '+lives+ 'lives left, Your saves are '+ points);
}

function stopGame(){
	sprite.sprite = Player1;
	timer_reset_value = 0;
	audio.PlayOneShot(life_exuasted);
	gameover = true;
	main.endGame(points);

}

function rotatePlayer(){
	
}
