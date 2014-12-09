#pragma strict

var Enemy : GameObject;
var speed : float = 2;
var TYPE = 'EATER';

function spawn (position) {
	
	Instantiate(Enemy, position, transform.rotation);	

}

function Start () {
	
}

function Update () {

	transform.Translate(Vector2(0, speed * Time.smoothDeltaTime));	
		
	if(transform.position.y > 6.065119){

		Destroy (gameObject);

	}

			
}