#pragma strict

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
var powerDown_Delay : AudioClip;
var powerDown_Eater : AudioClip;


var hudFont : Font;

var sprite 	  : SpriteRenderer;

var lives 	  : int = 3;
var points    : int = 0;
var speed     : int = DEFAULTSPEED;
var timer_Delay : int = 0;
var timer 	  : int = 0;
var timer_reset_value : int = 0;

var level     : int = 0;

function Start () {
	sprite = GetComponent(SpriteRenderer);
	resetTimer (TIMEDEFAULT);
	audio.volume = 0.8;
}

function resetTimer (time: int){
	timer_reset_value = time;
	while(timer_reset_value){
		timer_reset_value--;
		timer = timer_reset_value;
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
	
	if(timer < 5){
	
		hud_Timer.guiText.fontSize = 40;
		
	}else if (timer > 5){
	
		hud_Timer.guiText.fontSize = 25;
	}
	
	if(Input.GetAxis("Horizontal")){
		transform.Translate(Vector2(Input.GetAxis("Horizontal") *speed * Time.smoothDeltaTime, 0));	
	}
	
	if(Input.GetAxis("Vertical")){
		transform.Translate(Vector2(0, Input.GetAxis("Vertical") *(speed-1) * Time.smoothDeltaTime));	
	}
	
	if(transform.position.y > 5.1){
		transform.position.y = 5.1;
	}
	
	if(transform.position.x < -7.1){
		transform.position.x = -7.1;
	}
	
	if(transform.position.y < -2.5){
		transform.position.y = -2.5;
	}
	
	if(transform.position.x > 7.1){
		transform.position.x = 7.1;
	}
	
	if(( Mathf.Round(Time.time)) % 2 == 0){
		//Debug.Log('Move up');
		transform.Translate(Vector2(0, 0.3 * Time.deltaTime));
	}else{
		//Debug.Log('Move Down');
		transform.Translate(Vector2(0, -0.3 * Time.deltaTime));
	}
	
    if (Input.GetKey('left')) // If the space bar is pushed down
     {
		sprite.sprite = Player1Inv;	
     }else if((Input.GetKey('right'))){
     	sprite.sprite = Player1;	
     }
	
}

function OnCollisionEnter2D(coll: Collision2D) {
	if(coll.gameObject.tag == 'Eater'){
		audio.PlayOneShot(powerDown_Eater);
		Destroy (coll.gameObject);
		if(lives > 0){
			lives--;
		}
		
	}else if(coll.gameObject.tag == 'Delay'){
		audio.PlayOneShot(powerDown_Delay);
		Destroy (coll.gameObject);
		speedUp(10);
		
	}else if(coll.gameObject.tag == 'Point'){
		points += POINTMULTIPLIER;
		timer_reset_value = TIMEDEFAULT;
		if(timer <= 0){
			resetTimer (TIMEDEFAULT);
		}
		
	}else if(coll.gameObject.tag == 'Life'){
		audio.PlayOneShot(powerUp_Life);
		if(lives < MAXLIVES){
			lives++;
		}
		
		Destroy (coll.gameObject);
		
	}else if(coll.gameObject.tag == 'Gun'){
	
	}
	
		Debug.Log('You have '+lives+ 'lives left, Your saves are '+ points);
}