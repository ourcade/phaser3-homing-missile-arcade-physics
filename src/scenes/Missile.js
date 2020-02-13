import Phaser from 'phaser'

/**
 * Use a container that doesn't actually rotate
 * The missile image in the container rotates while the container
 * is moved based on where the missile image is facing
 * 
 * missile image needs to be facing right to start; 0 deg starts at v(1, 0)
 */
export default class Missile extends Phaser.GameObjects.Container
{
	/**
	 *
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 * @param {string} texture
	 */
	constructor(scene, x, y, texture)
	{
		super(scene, x, y)

		this.image = scene.add.image(0, 0, texture)
		this.image.setOrigin(0.8, 0.5)
		this.add(this.image)

		scene.physics.add.existing(this)

		const radius = this.image.height * 0.3
		this.body.setCircle(radius)
		this.image.y += radius
		this.image.x += radius

		const tx = scene.scale.width * 0.5
		const ty = scene.scale.height * 0.5

		this.target = new Phaser.Math.Vector2(tx, ty)

		this.turnDegreesPerFrame = 1.25
		this.speed = 100
		this.trackMouse = false
	}

	setTrackMouse(enabled)
	{
		this.trackMouse = enabled
	}

	update(dt)
	{
		const target = this.trackMouse ? this.scene.input.activePointer.position : this.target

		const targetAngle = Phaser.Math.Angle.Between(
			this.x, this.y,
			target.x, target.y
		)

		// clamp to -PI to PI for smarter turning
		let diff = Phaser.Math.Angle.Wrap(targetAngle - this.image.rotation)

		// set to targetAngle if less than turnDegreesPerFrame
		if (Math.abs(diff) < Phaser.Math.DegToRad(this.turnDegreesPerFrame))
		{
			this.image.rotation = targetAngle;
        }
		else
		{
			let angle = this.image.angle
			if (diff > 0)
			{
				// turn clockwise
				angle += this.turnDegreesPerFrame
			}
			else
			{
				// turn counter-clockwise
				angle -= this.turnDegreesPerFrame
			}
			
			this.image.setAngle(angle)
		}

		// move missile in direction facing
		const vx = Math.cos(this.image.rotation) * this.speed
		const vy = Math.sin(this.image.rotation) * this.speed

		this.body.velocity.x = vx
    	this.body.velocity.y = vy
	}
}

Phaser.GameObjects.GameObjectFactory.register('missile', function (x, y, texture) {
	const missile = new Missile(this.scene, x, y, texture)

	this.displayList.add(missile)

    this.scene.physics.world.enableBody(missile, Phaser.Physics.Arcade.DYNAMIC_BODY)

	return missile
})
