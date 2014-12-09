#pragma strict

var levelMultiplier : float = 0.5;
var portal : PortalController;
var player : SquidController;
var level  : int = 1;
var shouldSpawn = true;
var shouldDecrease = true;
var hud_Level : GameObject;

var hudFont : Font;

function spawnPortal() {

	while(true) { 
		portal.spawnPortal();
		yield WaitForSeconds(2); 
	} 
	
}

function Start () {
	player.spawn();
	increaseLevel();
	spawnPortal();
		
	hud_Level = Instantiate(new GameObject(), new Vector3(0.87, 0.954, 0), Quaternion.identity); 
	hud_Level.AddComponent(GUIText);
}

function Update () {
	hud_Level.guiText.text = level.ToString();
	hud_Level.guiText.font = hudFont;
}

function increaseLevel(){
	while (true){
		if(portal.speed > 0.5){
			level++;
			portal.speed -= levelMultiplier;
			
		}
		
		yield WaitForSeconds(40);
	}
}