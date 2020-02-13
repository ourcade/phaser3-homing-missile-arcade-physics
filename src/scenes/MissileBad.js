import Phaser from 'phaser'

export default class MissileBad extends Phaser.Physics.Arcade.Image
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
		super(scene, x, y, texture)

		const tx = scene.scale.width * 0.5
		const ty = scene.scale.height * 0.5

		this.target = new Phaser.Math.Vector2(tx, ty)

		this.turnDegreesPerFrame = 1.25
		this.speed = 100
	}

	update(dt)
	{
		const targetAngle = Phaser.Math.Angle.Between(
			this.x, this.y,
			this.target.x, this.target.y
		)

		// clamp to -180 to 180 for smart turning
		let diff = Phaser.Math.Angle.Wrap(targetAngle - this.rotation)

		// set to targetAngle if less than turnDegreesPerFrame
		if (Math.abs(diff) < Phaser.Math.DegToRad(this.turnDegreesPerFrame))
		{
			this.rotation = targetAngle;
			this.body.rotation = targetAngle
        }
		else
		{
			let angle = this.angle
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
			
			this.setAngle(angle)
			this.body.angle = angle
		}

		// move missile in direction facing
		const vx = Math.cos(this.rotation) * this.speed
		const vy = Math.sin(this.rotation) * this.speed

		this.body.velocity.x = vx
    	this.body.velocity.y = vy
	}
}

Phaser.GameObjects.GameObjectFactory.register('missileBad', function (x, y, texture) {
	const missile = new MissileBad(this.scene, x, y, texture)

	this.displayList.add(missile)

    this.scene.physics.world.enableBody(missile, Phaser.Physics.Arcade.DYNAMIC_BODY)

	return missile
})
