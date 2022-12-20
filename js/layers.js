addLayer("dp", {
    name: "Destructive Power", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		cd: 0,
		s: 0,
		dmg: new Decimal(0),
    }},
			        tabFormat: [			
        "main-display",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
	microtabs: {
    stuff: {
		       "Buyables": {
                content: [
                    ["blank", "15px"],
                    "buyables"
                ]
            },
		       "Upgrades": {
				   unlocked() {return player.dp.dmg.gte(480)},
                content: [
                    ["blank", "15px"],
                    "upgrades"
                ]
            },
		       "Planets": {
				   unlocked() {return player.dp.buyables[15].gte(1)},
                content: [
                    ["blank", "15px"],
                    "clickables",
					["blank", "5px"],
					["bar", "aex69"],
					["blank", "15px"],
                ]
            },
	},
	},
    color: "#4AB1A3",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Destructive Power", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	buyables: {
		11: {
		title: "Found batteries",
        cost(x) {return new Decimal(15).times(x.add(1)).times(x.sub(20).max(1)).times(x.sub(60).max(1)).times(x.sub(69).max(1)).pow(1.2)},
		canAfford() {if (player.dp.buyables[11].gte(900)) return false
		else if (player.points.gte(this.cost())) return true},
        display() { return `<i>Trying to get something, you found a charged battery.</i><br> Boosts energy gain<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id).add(buyableEffect("dp", 13)))}/900<br>Cost: ${format(this.cost())} energy<br>Effect: x${format(this.effect())}`},
        buy() {
          player.points = player.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
if (player.dp.buyables[this.id].gte(1)) return x.add(1).times(buyableEffect("dp", 13)).max(1).times(10).log(1.2).times(x.sub(7).max(1)).times(x.sub(30).max(1)).times(x.add(buyableEffect("dp", 13)).sub(900).max(1)).min(10000000).max(1)
	else return new Decimal(1)
        },
        style: {
          width: "150px",
          height: "150px",
        },
      },
		12: {
		title: "Charge Generator",
        cost(x) {return new Decimal(2780).pow(x.add(1))},
		unlocked() {return (player.dp.buyables[11].gte(15) || player.dp.buyables[12].gte(1))},
		canAfford() {return (player.points.gte(this.cost()) && (!buyableEffect("dp", 14).gte(6200)))},
        display() { return `<i>Using found batteries, you tried to charge an old generator</i><br> Boost energy gain, but divide batteries amount<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id).add(buyableEffect("dp", 14)))}/6200<br>Cost: ${format(this.cost())} energy<br>Effect: x${format(this.effect())}`},
        buy() {
          player.points = player.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
setBuyableAmount(this.layer, 11, getBuyableAmount(this.layer, 11).sub(new Decimal(2).pow(player.dp.buyables[12])))
        },
        effect(x) {
if (player.dp.buyables[this.id].gte(1)) return x.add(1).pow(buyableEffect("dp", 14)).times(10).log(1.2)
		else return new Decimal(1)
        },
        style: { 
          width: "150px",
          height: "150px",
        },
      },
		13: {
			purchaseLimit: 5,
		title: "Generate Batteries",
        cost(x) {return new Decimal(6750000).times(x.times(12).add(1)).times(x.sub(7).max(1))},
		unlocked() {return (player.dp.buyables[11].gte(70) || player.dp.buyables[13].gte(1))},
		canAfford() {return (player.points.gte(this.cost()) && (!buyableEffect("dp",11).gte(10000000)))},
        display() { return `<i>Generator started working and you started providing batteries</i><br> Creates batteries<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} energy<br>Effect: +${format(this.effect())}`},
        buy() {
          player.points = player.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
if (player.dp.buyables[this.id].gte(1)) return x.add(1).times(player.points.pow(0.25)).times(x.sub(1).max(1))
		else return new Decimal(1)
        },
        style: {
          width: "150px",
          height: "150px",
        },
      },
		14: {
			purchaseLimit: 10,
		title: "Create Generator Parts",
        cost(x) {return new Decimal(2e10).times(x.times(12).add(1)).times(x.sub(7).max(1))},
		unlocked() {return (player.dp.buyables[13].gte(5) || player.dp.buyables[13].gte(1))},
		canAfford() {return (player.points.gte(this.cost()))},
        display() { return `<i>The batteries become garbage, you need something more... You started making parts of generators</i><br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/10<br>Cost: ${format(this.cost())} energy<br>Effect: +${format(this.effect())}`},
        buy() {
          player.points = player.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
if (player.dp.buyables[this.id].gte(1)) return x.add(1).times(player.points.pow(0.15)).times(x.sub(2).max(1))
		else return new Decimal(1)
        },
        style: {
          width: "150px",
          height: "150px",
        },
      },
		15: {
			purchaseLimit: 1,
		title: "Make a Rocket",
        cost(x) {return new Decimal(3e13).times(x.times(12).add(1)).times(x.sub(7).max(1))},
		unlocked() {return (player.dp.buyables[14].gte(10) || player.dp.buyables[15].gte(1))},
		canAfford() {return (player.points.gte(this.cost()))},
        display() { return `<i>W-w-what? Why did you made a rocket?</i> Start making Destructive Power<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/1<br>Cost: ${format(this.cost())} energy<br>Effect: +${format(this.effect())}`},
        buy() {
          player.points = player.points.sub(this.cost())
			  setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
if (player.dp.buyables[this.id].gte(1)) return x.add(1).times(player.points.pow(0.01))
		else return new Decimal(1)
        },
        style: {
          width: "150px",
          height: "150px",
        },
      },
	},
	clickables: {
		11: {
			title: "AEX-96",
			canClick() {return (player.dp.cd <= 0 && !player.dp.dmg.gte(480))},
			display() {if (player.dp.dmg.gte(480)) return "A small planet. <br><i>You destroyed it...</i><br>Unlock a row of Destructive Power upgrades."
				else return "A small planet. <i>Don't crush it...</i><br>" + "Timer: " + format(player.dp.cd) + "/30 sec <br>"},
onClick() {
	player.dp.cd = 30
	player.dp.s = 1
},			
		},
	},
		bars: {
    aex69: {
		unlocked() {return player.dp.s = 1},
        direction: RIGHT,
        width: 400,
        height: 20,
        progress() {return (player.dp.dmg.max(1).div(480))},
		display() {return "Destroying AEX-69... " + format(player.dp.dmg.div(480).times(100).min(100)) + "%"},
            fillStyle: { 'background-color': '#4ABB5F', }
    },
},
	update(diff) {
		if (player.dp.cd > 0) {
			player.dp.cd = player.dp.cd - diff
			player.dp.dmg = player.dp.dmg.add(player.dp.points.pow(0.5).max(1).times(diff))
		}
		if (player.dp.buyables[15].gte(1)) return player.dp.points = player.dp.points.add(buyableEffect("dp", 15).times(diff))
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
