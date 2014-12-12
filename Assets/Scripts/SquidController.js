#pragma strict

var main : MainCTRL;

var HIGHESTSCORE		: int = 0;
var POINTMULTIPLIER 	: int = 1;
var DEFAULTSPEED 		: int = 5;
var MAXLIVES 			: int = 3;
public var TIMEDEFAULT 		: int = 15;

var lives 	  			: int = MAXLIVES;
var speed     			: int = DEFAULTSPEED;

var level     			: int = 0;
var timer 	  			: int = 0;
var points    			: int = 0;
var timer_Delay 		: int = 0;
var timer_reset_value 	: int = 0;

var sprite : SpriteRenderer;

var Player1Inv	: Sprite;
var Player1		: Sprite;

// Player and hud Objects
var player      : GameObject;
var hud_Rescues : GameObject;
var hud_Best 	: GameObject;
var hud_Life    : GameObject;
var hud_Timer   : GameObject;

var swoosh          : AudioClip;
var powerUp_Life    : AudioClip;
var eFX_CountDown   : AudioClip;
var life_exuasted   : AudioClip;
var powerDown_Delay : AudioClip;
var powerDown_Eater : AudioClip;


var hudFont : Font;

var gameover : boolean = false;

function Start () {
	sprite = GetComponent(SpriteRenderer);		// Sprite renderer for rendering sprites 
	resetTimer (TIMEDEFAULT);	// Gives the countdown the time
	audio.volume = 0.2;
	
	main = GameObject.Find("background_only").gameObject.GetComponent(MainCTRL);	//Get Our main OObject

	HIGHESTSCORE = PlayerPrefs.GetInt("Highest Score");		// Get the saved best score
	
	// hud item initialisation
	hud_Best = Instantiate(new GameObject(), new Vector3(0.263, 0.957, 0), Quaternion.identity); 
	hud_Best.AddComponent(GUIText);
	hud_Best.guiText.font = hudFont;
	hud_Best.guiText.text = HIGHESTSCORE.ToString();
}

// Count down to resetTheTimer
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

// Count down to slow the player
function slowDown (time : int) {
	if(timer_Delay<=0){
		while(time){
			time--;
			timer_Delay = time;
			yield WaitForSeconds(1);
		}
	}
}

function spawn(){
	
	// spawn the Hud Items
	hud_Rescues = Instantiate(new GameObject(), new Vector3(0.145, 0.957, 0), Quaternion.identity); 
	hud_Rescues.AddComponent(GUIText);
	
	hud_Life = Instantiate(new GameObject(), new Vector3(0.75, 0.954, 0), Quaternion.identity); 
	hud_Life.AddComponent(GUIText);

	hud_Timer = Instantiate(new GameObject(), new Vector3(0.48, 0.955, 0), Quaternion.identity); 
	hud_Timer.AddComponent(GUIText);
	
	// spawns the player
	Instantiate(player, Vector2(-7.043443, 0.9334681), transform.rotation);

}

function Update () {
		
	// updates hud
	hud_Rescues.guiText.text = points.ToString();
	hud_Rescues.guiText.font = hudFont;
	
	hud_Life.guiText.text = lives.ToString();
	hud_Life.guiText.font = hudFont;
	
	hud_Timer.guiText.text = timer.ToString();
	hud_Timer.guiText.font = hudFont;
	
	if(points > HIGHESTSCORE){
		// Notify High Score Achived by making hud item bigger
		hud_Rescues.guiText.fontSize = 35;
		hud_Rescues.guiText.color = new Color32(244,221,81, 255);
	}
	
	if (timer_Delay > 0){
		// reduce speed of player
		speed = 1;
	}else if (timer_Delay <= 0){
		// reset speed
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
		transform.Translate(Vector2(0, Input.GetAxis("Vertical") *3.5 * Time.smoothDeltaTime));	
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
		transform.Translate(Vector2(0, 0.3 * Time.deltaTime));
	}
	
    if (Input.GetKey('left') && !gameover)
     {
		sprite.sprite = Player1Inv;	
     }else if((Input.GetKey('right')) && !gameover){
     	sprite.sprite = Player1;	
     }
     
     if( Input.GetKeyDown('left') && !gameover ){
     	audio.PlayOneShot(swoosh, 0.5);
     }else if(Input.GetKeyDown('right') && !gameover){
     	audio.PlayOneShot(swoosh, 0.3);
     }   
     
     if(gameover){
		transform.Translate(Vector2(1 *speed * Time.smoothDeltaTime, 0));
     }
	
}

// Collision Detection
function OnCollisionEnter2D(coll: Collision2D) {
	if(coll.gameObject.tag == 'Eater' && !gameover){
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
		slowDown(4);
		
	}else if(coll.gameObject.tag == 'Point' && !gameover){
		points += POINTMULTIPLIER;
		timer_reset_value = TIMEDEFAULT;
		if(timer <= 0){
			resetTimer (TIMEDEFAULT);
		}
		
	}else if(coll.gameObject.tag == 'Life' && !gameover){
		audio.PlayOneShot(powerUp_Life, 0.2);
		if(lives < MAXLIVES){
			lives++;
		}
		
		Destroy (coll.gameObject);
		
	}else if(coll.gameObject.tag == 'Gun'){
	
	}

}

function stopGame(){
	sprite.sprite = Player1;
	timer_reset_value = 0;
	audio.PlayOneShot(life_exuasted);
	gameover = true;
		
	if(points > HIGHESTSCORE){
		PlayerPrefs.SetInt("Highest Score", points);
		main.endGame(points, true);
	}else{
		main.endGame(points, false);
	}

}