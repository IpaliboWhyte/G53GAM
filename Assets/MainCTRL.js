#pragma strict

var levelMultiplier : float = 0.5;
var portal : PortalController;
var player : SquidController;
var level  : int = 1;
var shouldSpawn = true;
var shouldDecrease = true;
var hud_Level : GameObject;

var bgOverlay : Texture;

var btnTexture : Texture;

var hudFont : Font;

var soundTrack: AudioClip;

var paused : boolean = false;

public var fadeSpeed : float = 1.5f;            // Speed that the screen fades to and from black.

private var sceneStarting : boolean = true;     // Whether or not the scene is still fading in.

var overLayStyle : GUIStyle;

var myStyle : GUIStyle;

var isGameOver : boolean = false;

var playerScore = 0;

function spawnPortal() {

	while(true) { 
		portal.spawnPortal();
		yield WaitForSeconds(2); 
	} 
	
}

function Start () {

	audio.PlayOneShot(soundTrack);
	audio.loop = true;
	
	player.spawn();

	increaseLevel();
	spawnPortal();
		
	hud_Level = Instantiate(new GameObject(), new Vector3(0.87, 0.954, 0), Quaternion.identity); 
	hud_Level.AddComponent(GUIText);
	
	myStyle.font = hudFont;
	myStyle.fontSize = 70;
	myStyle.normal.textColor = Color.white;
	
	Time.timeScale = 1;
	
}

function Update () {

	//Debug.Log(currentPlayer.gameover);

	hud_Level.guiText.text = level.ToString();
	hud_Level.guiText.font = hudFont;
	
	// If the scene is starting...
    if(sceneStarting){
        StartScene();
    }
        	
     if(Input.GetKeyDown('space') && !paused ){
     	pauseGamePlay();
     }else if(Input.GetKeyDown('space') && paused){
     	resumeGamePlay();
     }
}

function pauseGamePlay () {
	paused = true;
    Time.timeScale = 0;
    audio.Pause();
}

function resumeGamePlay (){
	paused = false;
    Time.timeScale = 1;
    audio.Play();
}

function increaseLevel(){
	while (true){	
		if(portal.speed > 0.5){		
			level++;
			portal.speed -= levelMultiplier;
			
		}	
		yield WaitForSeconds(20);
	}
}

function Awake ()
{
    // Set the texture so that it is the the size of the screen and covers it.
    guiTexture.pixelInset = new Rect(0f, -300f, Screen.width, Screen.height);
}

function FadeToClear ()
{
    // Lerp the colour of the texture between itself and transparent.
    guiTexture.color = Color.Lerp(guiTexture.color, Color.clear, fadeSpeed * Time.deltaTime);
}


function FadeToBlack ()
{
    // Lerp the colour of the texture between itself and black.
    guiTexture.color = Color.Lerp(guiTexture.color, Color.black, fadeSpeed * Time.deltaTime);
}


function StartScene ()
{
    // Fade the texture to clear.
    FadeToClear();
    
    // If the texture is almost clear...
    if(guiTexture.color.a <= 0.05f)
    {
        // ... set the colour to clear and disable the GUITexture.
        guiTexture.color = Color.clear;
        guiTexture.enabled = false;
        
        // The scene is no longer starting.
        sceneStarting = false;
    }
}


public function EndScene ()
{
    // Make sure the texture is enabled.
    guiTexture.enabled = true;
    
    // Start fading towards black.
    FadeToBlack();
    
    // If the screen is almost black...
    if(guiTexture.color.a >= 0.95f)
        // ... reload the level.
        Application.LoadLevel(1);
}

function OnGUI() {
	// Show a message if the game is paused.
	if (paused) {
						
		GUI.contentColor = Color.white;
		 		 
	 	GUI.color.a = 0.83;

	 	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), bgOverlay, ScaleMode.ScaleAndCrop, true, 2f);
	 
	 	GUI.color.a = 1;
	 	
	 	GUI.color = Color.white;
	 	
	 		 	
	 	if(GUI.Button(Rect(Screen.width-180,100,100,30),btnTexture, GUIStyle.none)){
			Application.LoadLevel(0);
	 	}
		
	 	GUI.Label(Rect(Screen.width/2 - 150 ,270, 200,50),"PAUSED", myStyle);
	 	GUI.Label(Rect(Screen.width/2 - 100 ,360, 200,50),"Press Space to Continue");

	}
		
	if (isGameOver) {
	
		GUI.contentColor = Color.white;
		 		 
	 	GUI.color.a = 0.83;

	 	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), bgOverlay, ScaleMode.ScaleAndCrop, true, 2f);
	 
	 	GUI.color.a = 1;
	 	
	 	GUI.color = Color.white;
	 	
	 		 	
	 	if(GUI.Button(Rect(Screen.width-180,100,100,30),btnTexture, GUIStyle.none)){
			Application.LoadLevel(0);
	 	}
		
		
	 	GUI.Label(Rect(Screen.width/2 - 150 ,270, 200,50),"Game Over :( ", myStyle);
	 	GUI.Label(Rect(Screen.width/2 - 100 ,360, 200,50),"You rescued "+playerScore+" Gold fishes !");

		}
	
}

function endGame (score : int){

	playerScore = score;
	isGameOver = true;
	
}

function OnApplicationPause(pauseStatus: boolean) {
	paused = pauseStatus;
}
