interface IFont {
    originalFont: string
    family: string
    use: string
    variants: {
        italic: boolean,
        bold: boolean,
        'bold italic': boolean
    }
}

export const baseURL = 'https://raw.githubusercontent.com/jonathonf/solbera-dnd-fonts/master/'

export const data: IFont[] = [
    {
        originalFont:'Bookmania',
        family: 'Bookinsanity',
        use: 'Body text',
        variants: {
            italic: true,
            bold: true,
            'bold italic': true
        }
    },
    {
        originalFont:'Dai Vernon Misdirect',
        family: 'Zatanna Misdirection',
        use: 'Monster Manual quotes',
        variants: {
            italic: true,
            bold: true,
            'bold italic': true
        }
    },
    {
        originalFont:'Modesto Bold Condensed',
        family: 'Nodesto Caps Condensed',
        use: 'Book and card titles',
        variants: {
            italic: true,
            bold: true,
            'bold italic': true
        }
    },
    {
        originalFont:'Mrs Eaves Small Caps',
        family: 'Mr Eaves Small Caps',
        use: 'Headings',
        variants: {
            italic: false,
            bold: false,
            'bold italic': false
        }
    },
    {
        originalFont:'Scala Sans',
        family: 'Scaly Sans',
        use: 'Tables',
        variants: {
            italic: true,
            bold: true,
            'bold italic': true
        }
    },
    {
        originalFont:'Scala Sans Caps',
        family: 'Scaly Sans Caps',
        use: 'Titles of tables',
        variants: {
            italic: true,
            bold: true,
            'bold italic': true
        }
    },
    {
        originalFont:'(unknown)',
        family: 'Solbera Imitation',
        use: 'Drop caps',
        variants: {
            italic: false,
            bold: false,
            'bold italic': false
        }
    },
    {
        originalFont:'(unknown)',
        family: 'Dungeon Drop Case (Ners)',
        use: 'Drop caps',
        variants: {
            italic: false,
            bold: false,
            'bold italic': false
        }
    },
]

export const examplePhrases = [
    `The wizard Eigengrau shook her head. The text was totally illegible, and she found that she couldn't decipher it, despite her skill.`,
    `The rains fell softly on the forest, dampening the Ranger as he waited for his prey. The jewels in his pouch clinked gently.`,
    `The Barbarian waltzed into the bar, sat down at a table, and ordered the largest mug of the foulest brew that the innkeep had to sell. She needed to wash the taste of Undead out of her teeth.`,
    `The Bard was sure he could get through the gate. All he had to do is convincingly explain why he was being followed by a bright yellow, vocally angry Flumph.`,
    `The Cleric gave up trying to speak with the Svirfneblin; they had tried Common, Undercommon, Elvish, Gnomish, Goblin, Sylvan, Orc and even Abyssal, but they could not get across to the tiny Svirfneblin the danger it was in.`,
    `Yesterday the Druid had planted flowers in their garden. Today, they would defend the pumpkin patch against invaders.`,
    `The Fighter polished her sword. She was stalling for time; this battle would not be pleasant. Sibling rivalries never were.`,
    `High on the temple tower, the Monk watched the acolytes light the courtyard lanterns below. He was sure he had mastered Slow Fall, but could he prove it to the Abbot?`,
    `The Paladin had cracked. All they could think was the last words of their opponent: "Only nothingness above."`,
    `The Rogue was ready. So, so ready. now was the time for dancing, and her competitors would not see her coming.`,
    `At long last, Luck was with the Sorceror. He had seen what the rest of the party had not, and quickly cast Snilloc's Snowball Storm to defend against the schoolchildren.`,
    `The Warlock's patron had brought 'em to a strange and desolate island, but their task here was obvious. The castle on the central peak must be purged.`,
    `The Wizard was running late. She'd missed the last ferry to the city, and though she had been able to procure a kayak, her lack of proficiency with it was rapidly drawing her towards the city's waterfall.`,
    `In a hole in the ground there lived a Halfling, for he had not yet heard the call of adventure. That would come next week, when the tavern burned down.`,
    `The dragon was discontent, for its entire horde had disappeared while it was out hunting. It suspected the local fishermen, and set out to steal their boats.`,
    `It was a time of peace, and so of course the Soldier was worried. The silence of the night kept her waiting for the zip of an arrow, the crackle of a spell, the scream of a sword. She needed something to do, and that would probably require desertion.`,
    `Why was the Criminal in this city? Certainly he didn't need any money. But the pact he had made with his patron required him to seek knowledge, and this town's university had a tempting library.`,
    `If one more traveling writer asked the Hermit what life was like atop her pole, she swore she would climb down, uproot her pole, drag it into the city where the writers came from, and spit their leader upon its sharpened point.`,
    `This Urchin had grown up on the streets alone, until this Urchin forged a family. Now, these Urchins ruled seven city blocks. Soon, they would be big enough to take on the City Guard.`,
    `The Charlatan was bored, bored, bored. He'd been stuck on this rock for seventeen days after being thrown overboard by the pirates. Was that a sail on the horizon? No, probably just a wisp of cloud.`,
    `The Sailor didn't expect to find a tiefling sitting on a rock in the middle of an ocean, and she didn't expect him to be such a smooth talker. If he deserted her when they hit port, she'd kill him herself.`,
    `The Weapon Master was also a blacksmith, which was helpful when a roving party came to town, flush with money, looking for upgraded blades. They wanted swords? She had swords. Lots of swords.`,
    `If you can read this text, talk to the priest of the smallest temple in the city.`,
]