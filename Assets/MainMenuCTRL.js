#pragma strict

var btnTexture : Texture;

var mainMenu_track : AudioClip;

function OnGUI() {

	if (!btnTexture) {
		Debug.LogError("Please assign a texture on the inspector");
		return;
	}
	if (GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 25,200,50),btnTexture, GUIStyle.none)){
		//Debug.Log("Clicked the button with an image");
		Application.LoadLevel (1);
	}
	
}

function Start(){
	audio.PlayOneShot(mainMenu_track);
}