#pragma strict

var Life : GameObject;
var speed : float = 2;
var TYPE = 'LIFE';

function spawn (position, speed) {
	
	this.speed = speed;
	
	Instantiate(Life, position, transform.rotation);

}

function Start () {
	
}

function Update () {

	transform.Translate(Vector2(0, speed * Time.smoothDeltaTime));
		
	if(transform.position.y > 6.065119){

		Destroy (gameObject);

	}


}