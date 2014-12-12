#pragma strict

var Eater_Enemy : EaterEnemyCTRL;
var Delay_Enemy : DelayEnemyCTRL;
var Perk_Point  : PointCTRL;
var Perk_Life   : PerkCTRL;
var Perk_Gun    : GunCTRL;

var portal : GameObject;

var shouldSpawn : boolean = false;

var speed : float = 2.5;


function Start () {
	spawnRandom();		// spawns random Enemy or perk between every 1.1 sec to 2 sec
	audio.volume = 0.3;
}

function Update () {
	
	if(transform.position.x < 6.877518){
		shouldSpawn = true;	
	}
	
	transform.Translate(Vector2(-speed*Time.smoothDeltaTime, 0)); // Continuousley more to the left with speed
	
	if(transform.position.x < -8.5){
	
	Destroy (gameObject);	// Destroy when off screen
	
	}

}

function spawnRandom () {
	
	while(true) { 
	if(shouldSpawn){
	var position;
	
	var randomNumber = Random.Range(0, 5);	// Randomly generate Number between 0 and 5
		
		switch(randomNumber){
			case 1:
				position = Vector3(this.portal.transform.position.x, this.portal.transform.position.y+0.5, 0);
				spawnEater(position);
				break;						
			case 2:
				position = Vector3(this.portal.transform.position.x, this.portal.transform.position.y+0.5, 0);
				spawnPoint(position);
				break;			
			
			default :
				switch(Random.Range(0, 10)){
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
					default:
						position = Vector3(this.portal.transform.position.x, this.portal.transform.position.y+0.5, 0);
						spawnDelay(position);
						break;					
					}
				break;
		}
		
		}
		yield WaitForSeconds(Random.Range(1.1, 2.0));
	} 
}

function spawnEater (position) {
	audio.Play();
	var temp = Instantiate(Eater_Enemy, position, transform.rotation);
	temp.speed = Random.Range(1.5, 3);

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
	temp.speed = Random.Range(1, 5);

}
function spawnGun (position) {
	
	var temp = Instantiate(Perk_Gun, position, transform.rotation);
	temp.speed = Random.Range(1, 4);

}

function spawnPortal () {
	var temp = Instantiate(portal, Vector2(7.885062,-3.336643), transform.rotation);
}