#pragma strict

var Eater_Enemy : EaterEnemyCTRL;
var Delay_Enemy : DelayEnemyCTRL;
var Perk_Life   : PerkCTRL;
var Perk_Point  : PointCTRL;
var Perk_Gun    : GunCTRL;
var shouldSpawn = false;

var count : int = 0;

var portal : GameObject;

var speed : float = 6;


function spawnEnemy () {
	
	while(true) { 
	if(shouldSpawn){
	var position;
	var randomNumber = Random.Range(1, 15);
	var seconds;
	
		switch(randomNumber){
			case 1:
				position = Vector3(this.portal.transform.position.x, this.portal.transform.position.y+0.5, 0);
				spawnLife(position);
				break;
			case 2:
				position = Vector3(this.portal.transform.position.x, this.portal.transform.position.y+0.5, 0);
				spawnEater(position);
				break;
			case 3:
				position = Vector3(this.portal.transform.position.x, this.portal.transform.position.y+0.5, 0);
				spawnPoint(position);
				break;						
			/*case 4:
				position = Vector3(this.portal.transform.position.x, this.portal.transform.position.y+0.5, 0);
				spawnGun(position);
				break;*/
			
			default :
				switch(Random.Range(1, 5)){
					case 1:
						position = Vector3(this.portal.transform.position.x, this.portal.transform.position.y+0.5, 0);
						spawnDelay(position);
						break;
					case 2:
						position = Vector3(this.portal.transform.position.x, this.portal.transform.position.y+0.5, 0);
						spawnPoint(position);
						break;
					default:
						position = Vector3(this.portal.transform.position.x, this.portal.transform.position.y+0.5, 0);
						spawnEater(position);
						break;					
					}
				break;
		}
		
		}
		yield WaitForSeconds(Random.Range(1.5, 3));
	} 
}

function spawnEater (position) {
	audio.Play();
	var temp = Instantiate(Eater_Enemy, position, transform.rotation);
	temp.speed = Random.Range(1, 3);

}

function spawnDelay (position) {
	audio.Play();
	var temp = Instantiate(Delay_Enemy, position, transform.rotation);
	temp.speed = Random.Range(1, 3);

}

function spawnPoint (position) {
	audio.Play();
	var temp = Instantiate(Perk_Point, position, transform.rotation);
	temp.speed = Random.Range(1, 3);

}

function spawnLife (position) {
	audio.Play();
	var temp = Instantiate(Perk_Life, position, transform.rotation);
	temp.speed = Random.Range(1, 7);

}
function spawnGun (position) {
	
	var temp = Instantiate(Perk_Gun, position, transform.rotation);
	temp.speed = Random.Range(1, 4);

}

function spawnPortal () {
	count++;
	var temp = Instantiate(portal, Vector2(7.885062,-3.336643), transform.rotation);
}

function Start () {
	spawnEnemy();
	audio.volume = 0.3;
}

function Update () {
	
	if(transform.position.x < 6.877518){
		shouldSpawn = true;	
	}
	
	transform.Translate(Vector2(-speed*Time.smoothDeltaTime, 0));
	
	if(transform.position.x < -8.5){
	
	Destroy (gameObject);
	
	}

}