Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

const ASPECT = Object.freeze({
	"DEATH":          "Mortem",
	"SCIENCE":        "Progressus",
	"FOOD":           "Fames",
	"WEAPON":         "Telum",
	"RESOURCES":      "Metallum",
	"SPAWN":          "Partum",
	"TORTURE":        "Cruciatu", // FLAGELLATION in code
	"RESCUE":         "Salutis",
	"MYSTIC":         "Spiritus",
	"TECH":           "Arsus",
	"CHAOS":          "Chaos",
	"WACKY":          "Rabidus",
	"ABSENCE":        "Absentia",
	"OBSCURE":        "Obscurum",
	"LIGHT":          "Lux",
	"GREED":          "Lucrum",
	"HERD":           "Turbam",
});

const SPELLS = Object.freeze({
	"Spawn Bible"             : { [ASPECT.RESOURCES] : 1, [ASPECT.RESCUE]     : 1, },
	"Heal"                    : { [ASPECT.CHAOS]     : 1, [ASPECT.RESCUE]     : 1, },
	"Punishment"              : { [ASPECT.CHAOS]     : 1, [ASPECT.OBSCURE]    : 1, },
	"Blessing"                : { [ASPECT.WEAPON]    : 1, [ASPECT.MYSTIC]     : 1, },
	"Electric Charge Pulse"   : { [ASPECT.RESCUE]    : 1, [ASPECT.TECH]       : 1, },
	"Spawn food"              : { [ASPECT.SPAWN]     : 1, [ASPECT.FOOD]       : 1, },
	"Spawn animal"            : { [ASPECT.SPAWN]     : 1, [ASPECT.DEATH]      : 1, }, // Create random friendly animal. Consider renaming this in game
	"Spill grease"            : { [ASPECT.WACKY]     : 3, },
	"Spread a good infection" : { [ASPECT.RESCUE]    : 1, [ASPECT.OBSCURE]    : 1, },
	"Spread a evil infection" : { [ASPECT.DEATH]     : 1, [ASPECT.OBSCURE]    : 1, },
	"The smell of rot"        : { [ASPECT.FOOD]      : 1, [ASPECT.OBSCURE]    : 2, },
});

const RITES = Object.freeze({
	// Swap
	"Devaluation"             : { [ASPECT.GREED]     : 1  },
	"Upgrade"                 : { [ASPECT.SCIENCE]   : 1  },
	"Devaluation"             : { [ASPECT.GREED]     : 1, [ASPECT.HERD]       : 1, },

	// Consent
	"Synthetic Conversion"    : { [ASPECT.TECH]      : 1  },
	"Sacrifice"               : { [ASPECT.DEATH]     : 1  },
	"Clownconversion"         : { [ASPECT.WACKY]     : 1, [ASPECT.HERD]       : 1, },

	// Legacy
	"Electric Charge Pulse"   : { [ASPECT.RESCUE]    : 1, [ASPECT.TECH]       : 1, },

	// Misc
	"Create food"             : { [ASPECT.FOOD]      : 1  },
	"Prayer to god"           : { [ASPECT.RESCUE]    : 1  },
	"Clown shriek"            : { [ASPECT.WACKY]     : 1  },
	"Animation"               : { [ASPECT.SPAWN]     : 1, [ASPECT.WEAPON]     : 1, },
	"Spook"                   : { [ASPECT.OBSCURE]   : 1  },
	"Illuminate"              : { [ASPECT.LIGHT]     : 1  },
	"Revive"                  : { [ASPECT.SPAWN]     : 1, [ASPECT.RESCUE]     : 1, },

	// Spawn item
	"Create banana"           : { [ASPECT.WACKY]     : 1, [ASPECT.CHAOS]      : 1, }, // Very long name in game. Consider renaming
	"Bananium ore"            : { [ASPECT.WACKY]     : 1, [ASPECT.RESOURCES]  : 1, },
	"Call animal"             : { [ASPECT.SPAWN]     : 1, },
	"Create sword"            : { [ASPECT.WEAPON]    : 1, },
});

// same structure for convenience. rip constant access
const OFFERS = Object.freeze({
	"Blood, organs"                                  : { [ASPECT.DEATH]     : 1 },
	"Sci-fi items and other science"                 : { [ASPECT.SCIENCE]   : 1 },
	"Food"                                           : { [ASPECT.FOOD]      : 1 },
	"Resource sheets"                                : { [ASPECT.RESOURCES] : 1 },
	"Batteries, stock parts, circuits, devices"      : { [ASPECT.TECH]      : 1 },
	"Banana peel, bananium, slipping on holy turfs"  : { [ASPECT.WACKY]     : 1 },
	"Darkness on holy turfs"                         : { [ASPECT.OBSCURE]   : 1 },
	"Light level on holy turfs"                      : { [ASPECT.LIGHT]     : 1 },
	"Items that cost money"                          : { [ASPECT.GREED]     : 1 },
});

const ALCHEMY = Object.freeze({
	"Holy Water"     : { [ASPECT.RESCUE]  : 1, },
	"Unholy Water"   : { [ASPECT.OBSCURE] : 1, },
	"Blood"          : { [ASPECT.DEATH]   : 1, },
	"Ectoplasm"      : { [ASPECT.MYSTIC]  : 1, },
	"Gold"           : { [ASPECT.GREED]   : 2, },
	"Silver"         : { [ASPECT.GREED]   : 1, },
	"Sugar"          : { [ASPECT.FOOD]    : 1, },
	"Wine"           : { [ASPECT.FOOD]    : 1, [ASPECT.RESCUE]  : 1},
	"Poisonous Wine" : { [ASPECT.FOOD]    : 1, [ASPECT.OBSCURE] : 1},
});

const Adj = Object.freeze({
	[ASPECT.DEATH] :          "Deadly",
	[ASPECT.SCIENCE] :        "Progressive",
	[ASPECT.FOOD] :           "Hungry",
	[ASPECT.WEAPON] :         "Armed",
	[ASPECT.RESOURCES] :      "Metallic",
	[ASPECT.SPAWN] :          "Creative",
	[ASPECT.TORTURE] :        "Tortured",
	[ASPECT.RESCUE] :         "Pure",
	[ASPECT.MYSTIC] :         "Sacred",
	[ASPECT.TECH] :           "Technologic",
	[ASPECT.CHAOS] :          "Chaotic",
	[ASPECT.WACKY] :          "Wacky",
	[ASPECT.ABSENCE] :        "Absent",
	[ASPECT.OBSCURE] :        "Obscure",
	[ASPECT.LIGHT] :          "Lucid",
	[ASPECT.GREED] :          "Greedy",
	[ASPECT.HERD] :           "Crowded",
});

const Obj = Object.freeze({
	[ASPECT.DEATH] :          "Reapers",
	[ASPECT.SCIENCE] :        "Researchers",
	[ASPECT.FOOD] :           "Breadwinners",
	[ASPECT.WEAPON] :         "Warriors",
	[ASPECT.RESOURCES] :      "Earners",
	[ASPECT.SPAWN] :          "Creators",
	[ASPECT.TORTURE] :        "Torturers",
	[ASPECT.RESCUE] :         "Puritans",
	[ASPECT.MYSTIC] :         "Psychics",
	[ASPECT.TECH] :           "Technomancers",
	[ASPECT.CHAOS] :          "Chaotics",
	[ASPECT.WACKY] :          "Jesters",
	[ASPECT.ABSENCE] :        "Voiders",
	[ASPECT.OBSCURE] :        "Obscurants",
	[ASPECT.LIGHT] :          "Enlighteners",
	[ASPECT.GREED] :          "Cointers",
	[ASPECT.HERD] :           "Followers",
});

const Subj = Object.freeze({
	[ASPECT.DEATH] :          "Death",
	[ASPECT.SCIENCE] :        "Progress",
	[ASPECT.FOOD] :           "Hunger",
	[ASPECT.WEAPON] :         "Battle",
	[ASPECT.RESOURCES] :      "Metal",
	[ASPECT.SPAWN] :          "Creation",
	[ASPECT.TORTURE] :        "Torture",
	[ASPECT.RESCUE] :         "Rescue",
	[ASPECT.MYSTIC] :         "Spirits",
	[ASPECT.TECH] :           "Technology",
	[ASPECT.CHAOS] :          "Chaos",
	[ASPECT.WACKY] :          "Humor",
	[ASPECT.ABSENCE] :        "Abyss",
	[ASPECT.OBSCURE] :        "Darkness",
	[ASPECT.LIGHT] :          "Light",
	[ASPECT.GREED] :          "Greed",
	[ASPECT.HERD] :           "Herd",
});

function group(list) {
	let ob = {};
	for(let v of list) {
		ob[v] = (ob[v] + 1) || 1
	}
	return ob;
}

function contains(as, bs) {
	for(a in as) {
		if(!(bs[a] && as[a] <= bs[a]))
			return false;
	}
	return true;
}

function lookup(obj, aspects) {
	let res = [];
	for(let v in obj) {
		if(contains(obj[v], aspects))
			res.push(v);
	}
	return res;
}

function curriedLookup(obj) {
	return aspects => lookup(obj, aspects);
}

