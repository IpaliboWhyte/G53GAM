#pragma strict

var portal : PortalController;	//Portal Controller
var player : SquidController;	//Squid Controller which is the main player

var hud_Level : GameObject;		//Hud item to display levels

//GameOver properties Textures
var bgOverlay 		 : Texture;	
var btnMenuTexture 	 : Texture;
var btnReplayTexture : Texture;

//GameOver properties Styles
var myStyle      : GUIStyle;
var myStyleSub   : GUIStyle;
var overLayStyle : GUIStyle;

// When the game is paused, boolean for if its a highscore, boolean for if the game is over
var paused 		  : boolean = false;
var highestScore  : boolean = false;
var isGameOver    : boolean = false;
var sceneStarting : boolean = true;     // Whether or not the scene is still fading in.

var hudFont : Font;

//The LevelMultiplier that affects the gameplay progression
//responsible for challenges/Difficulty
var levelMultiplier : float = 0.95;

// Speed that the screen fades to and from black.
var fadeSpeed 		: float = 1.5f; 

//Gameplay properties
var level  		: int = 1;
var playerScore : int = 0;

// Spawns the portals every 2 seconds
function spawnPortal() {

	while(true) { 
		portal.spawnPortal();
		yield WaitForSeconds(2); 
	} 
	
}

function Start () {
		
	// Pawn the player
	player.spawn();
	
	// get the spawned player object
	player = GameObject.Find("Player1(Clone)").GetComponent(SquidController);
	
	// Start the level	
	increaseLevel();
	
	// spawn the portals
	spawnPortal();
		
	// Creating the hud Level item and hud styling
	hud_Level = Instantiate(new GameObject(), new Vector3(0.87, 0.954, 0), Quaternion.identity); 
	hud_Level.AddComponent(GUIText);
	
	myStyle.font = hudFont;
	myStyle.fontSize = 70;
	myStyle.normal.textColor = Color.white;
	
	myStyleSub.font = hudFont;
	myStyleSub.fontSize = 40;
	myStyleSub.normal.textColor = Color.white;
	
}

function Update () {
	
	//display the level value
	hud_Level.guiText.text = level.ToString();
	hud_Level.guiText.font = hudFont;
	
	// If the scene is starting...
    if(sceneStarting){
        StartScene();
    }
     
     //On space down handle pause
     if(Input.GetKeyDown('space') && !paused && !isGameOver){
     	pauseGamePlay();
     }else if(Input.GetKeyDown('space') && paused && !isGameOver){
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

// Level increases and gameplay gets affected
// Difficulty of challanges fluctuiates
function increaseLevel(){
	while (isGameOver == false){
		
		if(portal.speed > 0.5){
		
			player.TIMEDEFAULT = Mathf.Round(player.TIMEDEFAULT * levelMultiplier);
			portal.speed *= levelMultiplier;
			
		}
			
		if(player.TIMEDEFAULT < 5){
			player.TIMEDEFAULT = 15;
		}
			level++;
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
	if (paused && !isGameOver) {
						
		GUI.contentColor = Color.white;
		 		 
	 	GUI.color.a = 0.83;

	 	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), bgOverlay, ScaleMode.ScaleAndCrop, true, 2f);
	 
	 	GUI.color.a = 1;
	 	
	 	GUI.color = Color.white;
	 	
	 		 	
	 	if(GUI.Button(Rect(Screen.width-180,100,100,30),btnMenuTexture, GUIStyle.none)){
			Application.LoadLevel(0);
	 	}
		
	 	GUI.Label(Rect(Screen.width/2 - 150 ,270, 200,50),"PAUSED", myStyle);
	 	GUI.Label(Rect(Screen.width/2 - 100 ,360, 200,50),"Press Space to Continue");

	}
	
	// Show a message if the game is Over.	
	if (isGameOver) {
	
		GUI.contentColor = Color.white;
		 		 
	 	GUI.color.a = 0.83;

	 	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), bgOverlay, ScaleMode.ScaleAndCrop, true, 2f);
	 
	 	GUI.color.a = 1;
	 	
	 	GUI.color = Color.white;
	 	 		 	
	 	if(GUI.Button(Rect(Screen.width-180,100,100,30),btnMenuTexture, GUIStyle.none)){
			Application.LoadLevel(0);
	 	}
		
		
	 	GUI.Label(Rect(Screen.width/2 - 220 ,270, 200,50),"Game Over :( ", myStyle);
	 	
	 	if(highestScore){
	 		GUI.Label(Rect(Screen.width/2 - 150 ,360, 200,50),"New HighScore !", myStyleSub);
	 	}
	 	
	 	GUI.Label(Rect(Screen.width/2 - 95 ,400, 200,50),playerScore+" rescues ", myStyleSub);
	 	
	 	if(GUI.Button(Rect(Screen.width/2 - 110,480,200,50),btnReplayTexture, GUIStyle.none)){
			Application.LoadLevel(1);
	 	}

		}
		
}

// updates gameover properties
function endGame (score : int, isHighScore){
	highestScore = isHighScore;
	playerScore = score;
	
	audio.Pause();
	yield WaitForSeconds (3);
	audio.Play();
	
	isGameOver = true;
		
}

function OnApplicationPause(pauseStatus: boolean) {
	paused = pauseStatus;
}
