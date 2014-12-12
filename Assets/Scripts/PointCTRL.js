#pragma strict

var Point : GameObject;

var isSaved : boolean = false;

var speed 		: float = 2;
var directionX  : float = 0;
var directionY  : float = 1;

var sprite 		: SpriteRenderer;

var Sprite_fish : Sprite;

function spawn (position, speed) {
	
	this.speed = speed;
	Instantiate(Point, position, transform.rotation);

}

function popBubble(x, y){
	audio.Play();
	isSaved = true;
	sprite.sprite = Sprite_fish;
	directionX = x;
	directionY = y;
}

function Start () {
	sprite = GetComponent(SpriteRenderer);
}

function Update () {

	transform.Translate(Vector2(directionX * speed * Time.smoothDeltaTime, directionY * speed * Time.smoothDeltaTime));
	
	if(transform.position.y > 6.065119 || transform.position.x > 9){

		Destroy (gameObject);

	}	
	
}

function OnCollisionEnter2D(coll: Collision2D) {
	
	if(coll.gameObject.tag == 'Player'){	
		popBubble(Random.Range(2.5,4.5),Random.Range(-2.5,2.5));
	}
	
}