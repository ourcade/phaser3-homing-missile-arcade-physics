import Phaser from 'phaser'

import MissileDemo from './scenes/MissileDemo'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		}
	},
	scene: [MissileDemo]
}

export default new Phaser.Game(config)
