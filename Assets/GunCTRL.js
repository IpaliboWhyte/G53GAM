#pragma strict

var Gun : GameObject;
var speed : float = 2;
var TYPE = 'GUN';

function spawn (position, speed) {
	
	this.speed = speed;
	
	Instantiate(Gun, position, transform.rotation);

}

function Start () {
	
}

function Update () {

	transform.Translate(Vector2(0, speed * Time.smoothDeltaTime));	
	
	if(transform.position.y > 6.065119){

		Destroy (gameObject);

	}


}