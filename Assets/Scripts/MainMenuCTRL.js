#pragma strict

var btnTexture 		: Texture;

function OnGUI() {

	// Main Menu with options
	if (!btnTexture) {
		Debug.LogError("Please assign a texture on the inspector");
		return;
	}
	if (GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 10,200,50),btnTexture, GUIStyle.none)){
		Application.LoadLevel (1);
	}
	
}

function Start(){
	//Play the Background track
	audio.Play();
	audio.loop = true;
}