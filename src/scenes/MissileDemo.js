import Phaser from 'phaser'

import Missile from './Missile'
// import './MissileBad'

const MISSLE = 'missle'

export default class MissileDemo extends Phaser.Scene
{
	constructor()
	{
		super('missile-demo')

		this.missiles = []
	}

	preload()
    {
		// graphic by Kenney.nl
		this.load.image(MISSLE, 'assets/red_rocket.png')
    }

    create()
    {
		const x = this.scale.width * 0.5
		const y = this.scale.height * 0.5

		/** @type {Missile} */
		const missile = this.add.missile(x, y, MISSLE)
		missile.setTrackMouse(true)

		this.missiles.push(missile)

		// const other = this.add.missileBad(x - 100, y, MISSLE)
		// this.missiles.push(other)
	}
	
	update(t, dt)
	{
		const size = this.missiles.length
		if (size <= 0)
		{
			return
		}


		for (let i = 0; i < size; ++i)
		{
			this.missiles[i].update(dt)
		}
	}
}
