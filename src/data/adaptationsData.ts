// Chapter 4: Adaptations - Comprehensive Curriculum Dataset for Primary Students

// Asset image paths generated for the application
import heroImage from '../assets/images/hero_adaptations_wildlife_1791423043958.jpg';
import arcticImage from '../assets/images/habitat_arctic_polar_1791423059457.jpg';
import desertImage from '../assets/images/habitat_desert_camel_1791423074169.jpg';
import rainforestImage from '../assets/images/habitat_rainforest_canopy_1791423088419.jpg';
import oceanImage from '../assets/images/habitat_ocean_depths_1791423099946.jpg';
import forestImage from '../assets/images/habitat_temperate_forest_1791432993005.jpg';
import freshwaterLakeImage from '../assets/images/habitat_freshwater_lake_1791433007970.jpg';

// Specific educational wildlife photography
import photoCamel from '../assets/images/photo_camel_desert_close_1791430301185.jpg';
import photoPolarBear from '../assets/images/photo_polar_bear_arctic_1791430314473.jpg';
import photoDuck from '../assets/images/photo_duck_webbed_feet_1791430330764.jpg';
import photoChameleon from '../assets/images/photo_chameleon_rainforest_1791430344210.jpg';
import photoCactus from '../assets/images/photo_cactus_desert_spines_1791430356672.jpg';
import photoFennecFox from '../assets/images/photo_fennec_fox_desert_1791430924694.jpg';
import photoGeese from '../assets/images/photo_geese_flying_v_1791430939882.jpg';
import photoPenguin from '../assets/images/photo_penguin_emperor_huddle_1791430951908.jpg';
import photoEagle from '../assets/images/photo_eagle_talons_hunting_1791430963563.jpg';
import photoAnglerfish from '../assets/images/photo_anglerfish_deep_sea_1791430975273.jpg';
import photoMeerkat from '../assets/images/photo_meerkat_sentry_1791430998722.jpg';
import photoBrownBear from '../assets/images/photo_brown_bear_cave_1791431016956.jpg';
import photoSeaTurtle from '../assets/images/photo_sea_turtle_swimming_1791431028757.jpg';
import photoPitcherPlant from '../assets/images/photo_pitcher_plant_carnivorous_1791431041870.jpg';
import photoOpossum from '../assets/images/photo_opossum_playing_dead_1791431056611.jpg';

export {
  heroImage,
  arcticImage,
  desertImage,
  rainforestImage,
  oceanImage,
  forestImage,
  freshwaterLakeImage,
  photoCamel,
  photoPolarBear,
  photoDuck,
  photoChameleon,
  photoCactus,
  photoFennecFox,
  photoGeese,
  photoPenguin,
  photoEagle,
  photoAnglerfish,
  photoMeerkat,
  photoBrownBear,
  photoSeaTurtle,
  photoPitcherPlant,
  photoOpossum,
};

export interface AdaptationItem {
  id: string;
  organism: string;
  traitName: string;
  description: string;
  type: 'structural' | 'behavioural';
  habitat: 'Desert' | 'Arctic' | 'Rainforest' | 'Ocean' | 'Pond & Wetland' | 'Forest';
  survivalPurpose: string;
  explanation: string;
  tag: string;
  image: string;
}

export const ADAPTATION_ITEMS: AdaptationItem[] = [
  {
    id: 'camel-eyelashes',
    organism: 'Dromedary Camel',
    traitName: 'Double rows of long eyelashes',
    description: 'Long interlocking eyelashes that shield the camel\'s eyes during raging desert dust storms.',
    type: 'structural',
    habitat: 'Desert',
    survivalPurpose: 'Keeps flying sand and blowing dust out of eyes.',
    explanation: 'Eyelashes are physical body parts that the camel is born with. Since it is a physical part, it is a STRUCTURAL adaptation.',
    tag: 'Eye Protection',
    image: photoCamel,
  },
  {
    id: 'polar-bear-blubber',
    organism: 'Polar Bear',
    traitName: 'Thick layer of fat (blubber) under skin',
    description: 'Up to 11 cm thick layer of blubber that traps core body heat in sub-zero Arctic temperatures.',
    type: 'structural',
    habitat: 'Arctic',
    survivalPurpose: 'Provides thermal insulation and stores energy during harsh blizzards.',
    explanation: 'Blubber is a special internal body tissue/layer. Because it is a body structure, it is a STRUCTURAL adaptation.',
    tag: 'Warmth',
    image: photoPolarBear,
  },
  {
    id: 'geese-migration',
    organism: 'Canada Goose',
    traitName: 'Migrating south in a V-formation during winter',
    description: 'Flying thousands of kilometers south every autumn when temperature drops and lakes freeze.',
    type: 'behavioural',
    habitat: 'Forest',
    survivalPurpose: 'Escapes harsh freezing winters to find abundant food and open water.',
    explanation: 'Migration is an action or journey the bird chooses to take. It is a way the organism behaves, so it is a BEHAVIOURAL adaptation.',
    tag: 'Seasonal Action',
    image: photoGeese,
  },
  {
    id: 'fennec-nocturnal',
    organism: 'Fennec Fox',
    traitName: 'Hunting only at night (nocturnal)',
    description: 'Sleeps in deep cool burrows during the scorching daytime and emerges to hunt when the desert cools at night.',
    type: 'behavioural',
    habitat: 'Desert',
    survivalPurpose: 'Avoids deadly daytime heat and dehydration.',
    explanation: 'Choosing when to sleep and when to hunt is a daily behaviour/action. Therefore, it is a BEHAVIOURAL adaptation.',
    tag: 'Daily Habit',
    image: photoFennecFox,
  },
  {
    id: 'cactus-spines',
    organism: 'Saguaro Cactus',
    traitName: 'Sharp needle-like spines instead of wide leaves',
    description: 'Spines with very tiny surface area that drastically reduce water loss through transpiration.',
    type: 'structural',
    habitat: 'Desert',
    survivalPurpose: 'Prevents water loss and deters thirsty animals from chewing the stem.',
    explanation: 'Spines are modified plant leaves (special physical plant parts). Since it is a body part, it is a STRUCTURAL adaptation.',
    tag: 'Water Conservation',
    image: photoCactus,
  },
  {
    id: 'duck-webbed-feet',
    organism: 'Mallard Duck',
    traitName: 'Webbed feet with skin between toes',
    description: 'Flexible paddle-like feet that push against water efficiently like oars in a canoe.',
    type: 'structural',
    habitat: 'Pond & Wetland',
    survivalPurpose: 'Propels the duck swiftly through water to forage for aquatic plants and fish.',
    explanation: 'Webbed feet are anatomical body parts on the bird\'s legs. Since it is a physical part, it is a STRUCTURAL adaptation.',
    tag: 'Locomotion',
    image: photoDuck,
  },
  {
    id: 'chameleon-camouflage',
    organism: 'Panther Chameleon',
    traitName: 'Staying completely motionless and blending color with leaves',
    description: 'Freezes still on a tree branch and rocks gently like a leaf in the wind to ambush insects and avoid hawks.',
    type: 'behavioural',
    habitat: 'Rainforest',
    survivalPurpose: 'Prevents predators from spotting it and allows surprise attacks on prey.',
    explanation: 'Freezing still and swaying like a leaf is a deliberate action/habit the chameleon performs. This is a BEHAVIOURAL adaptation.',
    tag: 'Ambush Behaviour',
    image: photoChameleon,
  },
  {
    id: 'polar-bear-white-fur',
    organism: 'Polar Bear',
    traitName: 'Translucent hollow white fur coat',
    description: 'Dense fur that traps warm air and looks white, matching the surrounding sea ice and snow.',
    type: 'structural',
    habitat: 'Arctic',
    survivalPurpose: 'Camouflages the bear against snow to sneak up on seals, while retaining heat.',
    explanation: 'The fur coat and hollow hair shafts are physical body structures grown on the skin. It is a STRUCTURAL adaptation.',
    tag: 'Thermal & Camouflage',
    image: photoPolarBear,
  },
  {
    id: 'bear-hibernation',
    organism: 'Brown Bear',
    traitName: 'Hibernating in a cave for months during winter',
    description: 'Slows down heart rate and body temperature to sleep through the freezing winter when food is scarce.',
    type: 'behavioural',
    habitat: 'Forest',
    survivalPurpose: 'Conserves vital energy when snow covers berries and salmon streams freeze.',
    explanation: 'Entering prolonged winter sleep is a special survival way of behaving. Therefore, it is a BEHAVIOURAL adaptation.',
    tag: 'Energy Conservation',
    image: photoBrownBear,
  },
  {
    id: 'penguin-huddling',
    organism: 'Emperor Penguin',
    traitName: 'Huddling tightly in giant moving groups',
    description: 'Hundreds of penguins pack shoulder-to-shoulder, taking turns standing on the outside and warm inside.',
    type: 'behavioural',
    habitat: 'Arctic',
    survivalPurpose: 'Shares body heat to survive fierce -60°C Antarctic blizzards.',
    explanation: 'Gathering together in a cooperative circle is a group social action. Because it is an action, it is a BEHAVIOURAL adaptation.',
    tag: 'Group Action',
    image: photoPenguin,
  },
  {
    id: 'anglerfish-lure',
    organism: 'Deep-Sea Anglerfish',
    traitName: 'Bioluminescent glowing lure on its head (esca)',
    description: 'A fleshy light bulb projecting from above the mouth, tipped with glowing bacteria in the pitch-black ocean.',
    type: 'structural',
    habitat: 'Ocean',
    survivalPurpose: 'Attracts curious prey directly toward its sharp jaws in the midnight ocean zone.',
    explanation: 'The modified dorsal spine and glowing bulb are physical body parts. This is a STRUCTURAL adaptation.',
    tag: 'Food Capture',
    image: photoAnglerfish,
  },
  {
    id: 'opossum-playing-dead',
    organism: 'Virginia Opossum',
    traitName: 'Feigning death (playing possum) when attacked',
    description: 'Falls stiff on its side, curls its toes, opens its mouth, and emits an odor like a rotting carcass.',
    type: 'behavioural',
    habitat: 'Forest',
    survivalPurpose: 'Tricks predators who prefer live prey into leaving it alone.',
    explanation: 'Pretending to be dead is an involuntary defensive behavioural reaction. It is a BEHAVIOURAL adaptation.',
    tag: 'Defense Action',
    image: photoOpossum,
  },
  {
    id: 'eagle-talons',
    organism: 'Bald Eagle',
    traitName: 'Powerful curved talons with sharp gripping pads',
    description: 'Enormous sharp claws capable of exerting hundreds of pounds of crushing grip pressure.',
    type: 'structural',
    habitat: 'Forest',
    survivalPurpose: 'Snaws and holds onto slippery fish directly out of lakes while flying at high speed.',
    explanation: 'Talons are sharp claws attached to the eagle\'s feet (body parts). This is a STRUCTURAL adaptation.',
    tag: 'Hunting Part',
    image: photoEagle,
  },
  {
    id: 'pitcher-plant-fluid',
    organism: 'Tropical Pitcher Plant',
    traitName: 'Deep slippery vase-shaped leaves filled with digestive fluid',
    description: 'Leaves modified into slippery pitchers with downward-pointing hairs that trap falling insects.',
    type: 'structural',
    habitat: 'Rainforest',
    survivalPurpose: 'Absorbs minerals from trapped insects in nutrient-poor jungle soil.',
    explanation: 'The slippery vase-shaped leaf is a physical plant structure. Therefore, it is a STRUCTURAL adaptation.',
    tag: 'Plant Structure',
    image: photoPitcherPlant,
  },
  {
    id: 'meerkat-lookout',
    organism: 'Meerkat',
    traitName: 'Posting a designated sentry guard on high rocks',
    description: 'One meerkat stands tall on its hind legs watching the sky for hawks while others dig for scorpions.',
    type: 'behavioural',
    habitat: 'Desert',
    survivalPurpose: 'Warns the colony with bark alarms before predators strike.',
    explanation: 'Standing watch and sounding warning cries is a cooperative way of acting. This is a BEHAVIOURAL adaptation.',
    tag: 'Colony Vigilance',
    image: photoMeerkat,
  },
  {
    id: 'sea-turtle-flippers',
    organism: 'Green Sea Turtle',
    traitName: 'Streamlined paddle-shaped front flippers',
    description: 'Long wing-like forelimbs that propel the turtle gracefully across ocean currents.',
    type: 'structural',
    habitat: 'Ocean',
    survivalPurpose: 'Enables rapid, effortless gliding through water over thousands of migratory miles.',
    explanation: 'Paddle flippers are anatomical limbs (body parts). This is a STRUCTURAL adaptation.',
    tag: 'Marine Movement',
    image: photoSeaTurtle,
  }
];

export interface HabitatDetectiveCase {
  id: string;
  habitatName: string;
  biomeImage: string;
  organismPhoto?: string;
  organism: string;
  threatHeadline: string;
  threatDescription: string;
  correctAdaptationId: string;
  correctType: 'structural' | 'behavioural';
  adaptationChoices: {
    id: string;
    text: string;
    type: 'structural' | 'behavioural';
    isCorrect: boolean;
    explanation: string;
  }[];
  survivalOutcome: string;
}

export const DETECTIVE_CASES: HabitatDetectiveCase[] = [
  {
    id: 'case-1-desert',
    habitatName: 'Sahara Desert',
    biomeImage: desertImage,
    organismPhoto: photoCamel,
    organism: 'Dromedary Camel',
    threatHeadline: 'Hot Sand Sinking & Severe Blinding Dust!',
    threatDescription: 'The desert ground reaches 65°C and shifting sands cause heavy animals to sink. Fierce desert winds kick up tons of sharp sand grains.',
    correctAdaptationId: 'camel-feet-eyes',
    correctType: 'structural',
    adaptationChoices: [
      {
        id: 'camel-feet-eyes',
        text: 'Broad, flat leathery footpads and double rows of long eyelashes',
        type: 'structural',
        isCorrect: true,
        explanation: 'Wide footpads distribute the camel\'s heavy weight so it does not sink into soft sand, while double eyelashes physically block airborne dust.'
      },
      {
        id: 'distractor-1',
        text: 'Thick waterproof blubber and webbed swimming feet',
        type: 'structural',
        isCorrect: false,
        explanation: 'Webbed feet and blubber are for cold marine animals, which would cause a camel to overheat rapidly in the desert!'
      },
      {
        id: 'distractor-2',
        text: 'Climbing high into jungle trees during sandstorms',
        type: 'behavioural',
        isCorrect: false,
        explanation: 'There are no tall trees in sandy sand dunes, and camels cannot climb trees!'
      }
    ],
    survivalOutcome: 'Success! The camel strides comfortably across shifting dunes without sinking, and arrives at the oasis with clear, protected eyes!'
  },
  {
    id: 'case-2-arctic',
    habitatName: 'Polar Arctic Tundra',
    biomeImage: arcticImage,
    organismPhoto: photoPenguin,
    organism: 'Emperor Penguin',
    threatHeadline: 'Blinding -50°C Wind Chills & Frostbite!',
    threatDescription: 'In the Antarctic winter, hurricane-force blizzard winds plummet temperatures to -60°C. Individual birds would quickly lose body heat and perish.',
    correctAdaptationId: 'penguin-huddle-action',
    correctType: 'behavioural',
    adaptationChoices: [
      {
        id: 'distractor-arctic-1',
        text: 'Basking in the sun on hot rocks at midday',
        type: 'behavioural',
        isCorrect: false,
        explanation: 'During polar winter, there is zero direct sun for months and rocks are covered in deep ice.'
      },
      {
        id: 'penguin-huddle-action',
        text: 'Huddling tightly in giant cooperative groups and rotating turns',
        type: 'behavioural',
        isCorrect: true,
        explanation: 'Huddling reduces the exposed surface area of each penguin to cold wind by up to 80%. Birds continuously shuffle from the cold edge to the warm core!'
      },
      {
        id: 'distractor-arctic-2',
        text: 'Growing large broad leaves to capture solar rays',
        type: 'structural',
        isCorrect: false,
        explanation: 'Penguins are birds with feathers, not plants! They do not grow leaves.'
      }
    ],
    survivalOutcome: 'Success! The colony stays warm together at 35°C in the center of the huddle, protecting their fragile eggs through the polar storm!'
  },
  {
    id: 'case-3-rainforest',
    habitatName: 'Tropical Rainforest Canopy',
    biomeImage: rainforestImage,
    organismPhoto: photoChameleon,
    organism: 'Red-Eyed Tree Frog',
    threatHeadline: 'Slippery Wet Foliage & Hungry Tree Snakes!',
    threatDescription: 'Torrential tropical rains make wet leaves dangerously slick. Predators like tree snakes and birds hunt from branch to branch.',
    correctAdaptationId: 'frog-suction-flash',
    correctType: 'structural',
    adaptationChoices: [
      {
        id: 'frog-suction-flash',
        text: 'Suction-cup toe pads and sudden bright red flash eyes to startle predators',
        type: 'structural',
        isCorrect: true,
        explanation: 'Expanded toe pads secrete moist mucus that creates capillary grip on slick leaves, while sudden bright red eyes momentarily stun attacking predators.'
      },
      {
        id: 'distractor-rf-1',
        text: 'Digging deep underground burrows to hibernate for 6 months',
        type: 'behavioural',
        isCorrect: false,
        explanation: 'Rainforest floor is soaked with water and never freezes; tree frogs live in trees and do not hibernate.'
      },
      {
        id: 'distractor-rf-2',
        text: 'Thick layer of blubber to withstand sub-zero ice',
        type: 'structural',
        isCorrect: false,
        explanation: 'Blubber would cause the frog to overheat in the hot, humid tropical jungle.'
      }
    ],
    survivalOutcome: 'Success! The tree frog grips securely onto a vertical wet palm frond and startles a sneaking snake with a quick flash of ruby red eyes!'
  },
  {
    id: 'case-4-ocean',
    habitatName: 'Abyssal Deep Ocean',
    biomeImage: oceanImage,
    organismPhoto: photoAnglerfish,
    organism: 'Deep-Sea Anglerfish',
    threatHeadline: 'Total Pitch Blackness & Scarce Food!',
    threatDescription: 'One thousand meters beneath the sea surface, sunlight never penetrates. Food is extraordinarily rare and spread out across vast freezing darkness.',
    correctAdaptationId: 'anglerfish-light-mouth',
    correctType: 'structural',
    adaptationChoices: [
      {
        id: 'distractor-ocean-1',
        text: 'Swimming up to the ocean surface to catch flying insects',
        type: 'behavioural',
        isCorrect: false,
        explanation: 'The deep sea anglerfish cannot survive the extreme pressure change of ascending thousands of meters to the surface.'
      },
      {
        id: 'anglerfish-light-mouth',
        text: 'Bioluminescent dorsal lure to attract prey & expandable stomach to swallow large meals',
        type: 'structural',
        isCorrect: true,
        explanation: 'The glowing lure tricks curious fish into swimming straight into range, while an elastic jaw and stomach let it devour meals twice its own size!'
      },
      {
        id: 'distractor-ocean-2',
        text: 'Sprouting needle-like spines to reduce transpiration of water',
        type: 'structural',
        isCorrect: false,
        explanation: 'Spines for transpiration are adaptations of desert plants, not ocean fish!'
      }
    ],
    survivalOutcome: 'Success! In the pitch black abyss, a shrimp spots the radiant blue glow, swims close, and provides vital nourishment for the anglerfish!'
  },
  {
    id: 'case-5-desert-meerkat',
    habitatName: 'Kalahari Desert Scrub',
    biomeImage: desertImage,
    organismPhoto: photoMeerkat,
    organism: 'Meerkat',
    threatHeadline: 'Aerial Predators Attacking While Foraging!',
    threatDescription: 'Martial eagles and jackals strike silently from above and behind bushes. While digging for scorpions, meerkats keep their heads buried in the sand.',
    correctAdaptationId: 'meerkat-sentry-call',
    correctType: 'behavioural',
    adaptationChoices: [
      {
        id: 'meerkat-sentry-call',
        text: 'Posting a designated sentry guard on high mounds to watch the sky and bark warning cries',
        type: 'behavioural',
        isCorrect: true,
        explanation: 'Cooperative sentry guarding is an action/behaviour that alerts the entire mob to dive into burrows seconds before an eagle or jackal can strike!'
      },
      {
        id: 'distractor-meerkat-1',
        text: 'Growing hollow bird bones and flight feathers to escape into clouds',
        type: 'structural',
        isCorrect: false,
        explanation: 'Meerkats are digging mammals, not birds! They cannot grow feathers or fly.'
      },
      {
        id: 'distractor-meerkat-2',
        text: 'Swimming deep underwater to hide at the bottom of desert rivers',
        type: 'behavioural',
        isCorrect: false,
        explanation: 'The arid Kalahari scrubland has no deep rivers, and meerkats are terrestrial tunnel dwellers.'
      }
    ],
    survivalOutcome: 'Success! The lookout sentry spots an eagle soaring 1 km away, sounds an urgent bark alarm, and all meerkats safely scamper into their underground burrows!'
  },
  {
    id: 'case-6-forest-bear',
    habitatName: 'Temperate Mountain Forest',
    biomeImage: forestImage,
    organismPhoto: photoBrownBear,
    organism: 'Brown Bear',
    threatHeadline: 'Harsh Freezing Winter & Complete Food Shortage!',
    threatDescription: 'In sub-zero winter, snow buries berry shrubs, icy frost kills insects, and rivers freeze solid. Foraging in deep snow burns far more calories than can be found.',
    correctAdaptationId: 'bear-hibernation-winter',
    correctType: 'behavioural',
    adaptationChoices: [
      {
        id: 'bear-hibernation-winter',
        text: 'Entering prolonged winter dormancy (hibernation) in a cozy cave den to lower body metabolism',
        type: 'behavioural',
        isCorrect: true,
        explanation: 'Hibernation is a behavioural adaptation where the bear dramatically drops heart rate and body temperature, surviving for months purely on stored autumn body fat.'
      },
      {
        id: 'distractor-bear-1',
        text: 'Shedding all fur coat and sunbathing on freezing mountain ridges',
        type: 'behavioural',
        isCorrect: false,
        explanation: 'Shedding fur in freezing winter would result in lethal hypothermia within hours!'
      },
      {
        id: 'distractor-bear-2',
        text: 'Growing green pine needles to make food from sunlight',
        type: 'structural',
        isCorrect: false,
        explanation: 'Bears are carnivorous mammals, not evergreen coniferous trees!'
      }
    ],
    survivalOutcome: 'Success! The brown bear sleeps safely in its insulated rock cave, using barely any energy until sunny springtime brings returning salmon and green berries!'
  },
  {
    id: 'case-7-ocean-turtle',
    habitatName: 'Tropical Coral Reef & Ocean',
    biomeImage: oceanImage,
    organismPhoto: photoSeaTurtle,
    organism: 'Green Sea Turtle',
    threatHeadline: 'Vast Ocean Migrations & Turbulent Waves!',
    threatDescription: 'Sea turtles must migrate thousands of kilometers across open ocean between feeding seagrass pastures and natal nesting beaches, constantly fighting powerful wave drag.',
    correctAdaptationId: 'turtle-streamlined-flippers',
    correctType: 'structural',
    adaptationChoices: [
      {
        id: 'turtle-streamlined-flippers',
        text: 'Streamlined hydrodynamic shell and long paddle-shaped wing flippers',
        type: 'structural',
        isCorrect: true,
        explanation: 'The flattened tear-drop shell minimizes water resistance, while long wing-like front flippers generate powerful, effortless propulsion over thousands of kilometers.'
      },
      {
        id: 'distractor-turtle-1',
        text: 'Galloping on four hoofed legs across floating sea ice',
        type: 'structural',
        isCorrect: false,
        explanation: 'Hooves are adaptations of land ungulates like horses, not marine reptiles in tropical oceans!'
      },
      {
        id: 'distractor-turtle-2',
        text: 'Climbing tall palm trees to lay eggs in bird nests',
        type: 'behavioural',
        isCorrect: false,
        explanation: 'Sea turtles cannot climb trees; they crawl onto sandy shores to bury eggs.'
      }
    ],
    survivalOutcome: 'Success! The sea turtle cruises effortlessly through strong ocean currents, conserving precious energy and arriving safely at its nesting island!'
  },
  {
    id: 'case-8-freshwater-eagle',
    habitatName: 'Freshwater Lake & River Valley',
    biomeImage: freshwaterLakeImage,
    organismPhoto: photoEagle,
    organism: 'Bald Eagle',
    threatHeadline: 'Snatching Slick, Slippery Fish from Rippling Water!',
    threatDescription: 'Fish swim below rippling water surfaces and have slick mucus-covered scales. A hunting eagle diving at 120 km/h must grip thrashing prey without it slipping out.',
    correctAdaptationId: 'eagle-talons-spicules',
    correctType: 'structural',
    adaptationChoices: [
      {
        id: 'eagle-talons-spicules',
        text: 'Curved razor-sharp talons with spiny rough friction pads (spicules) under toes',
        type: 'structural',
        isCorrect: true,
        explanation: 'Curved razor talons sink into prey with immense crushing pressure, while microscopic rough spikes (spicules) prevent slippery fish scales from sliding away!'
      },
      {
        id: 'distractor-eagle-1',
        text: 'Filtering microscopic plankton through feathery mouth baleen',
        type: 'structural',
        isCorrect: false,
        explanation: 'Baleen is an adaptation of baleen whales in the ocean, not predatory birds of prey!'
      },
      {
        id: 'distractor-eagle-2',
        text: 'Swimming quietly underwater for hours to ambush fish from below',
        type: 'behavioural',
        isCorrect: false,
        explanation: 'Eagles cannot breathe underwater and hunt exclusively from aerial swoops.'
      }
    ],
    survivalOutcome: 'Success! The bald eagle swoops inches above the lake surface, locks its rough talons onto a wriggling trout, and soars back to its eyrie nest!'
  },
  {
    id: 'case-9-wetlands-geese',
    habitatName: 'Sub-Arctic Marsh & Migratory Flyway',
    biomeImage: freshwaterLakeImage,
    organismPhoto: photoGeese,
    organism: 'Canada Goose',
    threatHeadline: 'Sudden Autumn Freeze Locks Away All Food & Water!',
    threatDescription: 'In late autumn, northern lakes freeze into thick solid ice. Aquatic weeds and seeds become unreachable, and sub-zero blizzards make survival impossible.',
    correctAdaptationId: 'geese-v-migration',
    correctType: 'behavioural',
    adaptationChoices: [
      {
        id: 'geese-v-migration',
        text: 'Migrating thousands of kilometers south in an energy-saving V-formation',
        type: 'behavioural',
        isCorrect: true,
        explanation: 'Seasonal migration is a behavioural adaptation to escape freezing winters. Flying in an aerodynamic V-formation lets each bird catch the updraft of the bird ahead, saving up to 70% flight energy!'
      },
      {
        id: 'distractor-geese-1',
        text: 'Growing thick fur and tunneling deep into permafrost soils',
        type: 'structural',
        isCorrect: false,
        explanation: 'Geese have waterproof feathers, not mammalian fur, and cannot dig through rock-hard frozen permafrost.'
      },
      {
        id: 'distractor-geese-2',
        text: 'Drinking boiling hydrothermal water to melt ice',
        type: 'behavioural',
        isCorrect: false,
        explanation: 'Drinking boiling water would severely scald and kill the bird!'
      }
    ],
    survivalOutcome: 'Success! The geese take flight in synchrony, riding high-altitude tailwinds in a sharp V-formation to reach warm southern wetlands bursting with food!'
  },
  {
    id: 'case-10-sahara-fennec',
    habitatName: 'Saharan Sand Dunes & Stony Plains',
    biomeImage: desertImage,
    organismPhoto: photoFennecFox,
    organism: 'Fennec Fox',
    threatHeadline: 'Lethal 50°C Ground Heat & Extreme Dehydration!',
    threatDescription: 'Blistering daytime sand heats up to 50°C, causing small animals to overheat and dehydrate in a few hours. In addition, desert beetles and lizards stay hidden during midday.',
    correctAdaptationId: 'fennec-nocturnal-habit',
    correctType: 'behavioural',
    adaptationChoices: [
      {
        id: 'fennec-nocturnal-habit',
        text: 'Nocturnal lifestyle: sleeping in cool underground burrows by day and hunting only at night',
        type: 'behavioural',
        isCorrect: true,
        explanation: 'Being nocturnal is a behavioural adaptation that allows the fennec fox to escape the deadly sun inside cool subterranean dens, emerging when temperatures plummet after sunset!'
      },
      {
        id: 'distractor-fennec-1',
        text: 'Submerging completely underwater in desert lakes for 6 hours',
        type: 'behavioural',
        isCorrect: false,
        explanation: 'Open sand dunes have no lakes, and foxes are air-breathing terrestrial mammals!'
      },
      {
        id: 'distractor-fennec-2',
        text: 'Growing broad leaves to capture water vapor from morning clouds',
        type: 'structural',
        isCorrect: false,
        explanation: 'Leaves are physical parts of plants, not desert animals!'
      }
    ],
    survivalOutcome: 'Success! The fennec fox rests comfortably in its 20°C subterranean burrow during scorching midday, and bounds out under cool starlight to forage successfully!'
  }
];

export interface BioCraftBiome {
  id: string;
  name: string;
  badge: string;
  image: string;
  climateTitle: string;
  temperature: string;
  hazards: string[];
  structuralOptions: {
    category: 'Body Covering' | 'Limbs & Extremities';
    options: {
      id: string;
      name: string;
      description: string;
      scoreInBiome: number;
      feedback: string;
    }[];
  }[];
  behaviouralOptions: {
    category: 'Activity Rhythm' | 'Survival Reaction';
    options: {
      id: string;
      name: string;
      description: string;
      scoreInBiome: number;
      feedback: string;
    }[];
  }[];
}

export const BIOCRAFT_BIOMES: BioCraftBiome[] = [
  {
    id: 'desert',
    name: 'Scorching Sahara Desert',
    badge: 'Desert Specialist',
    image: desertImage,
    climateTitle: 'Arid, 46°C Highs, Scant Rainfall, Shifting Sands',
    temperature: '46°C / 115°F',
    hazards: [
      'Hazard 1: Blistering Solar Radiation & Heat Exhaustion',
      'Hazard 2: Extreme Scarcity of Drinking Water',
      'Hazard 3: Sinking & Slipping in Loose Sand Dunes'
    ],
    structuralOptions: [
      {
        category: 'Body Covering',
        options: [
          {
            id: 'desert-light-fur',
            name: 'Short reflective pale fur / Light scales',
            description: 'Reflects intense solar radiation and allows excess body heat to radiate away quickly.',
            scoreInBiome: 35,
            feedback: 'Excellent choice! Pale coloration reflects the blazing desert sunlight and keeps internal organs cool.'
          },
          {
            id: 'desert-thick-blubber',
            name: 'Dense heavy blubber layer & thick dark wool',
            description: 'Heavy insulation that traps body heat tightly against the body core.',
            scoreInBiome: 5,
            feedback: 'Danger! Thick blubber traps body heat, causing your creature to overheat and suffer heat stroke!'
          }
        ]
      },
      {
        category: 'Limbs & Extremities',
        options: [
          {
            id: 'desert-padded-feet',
            name: 'Broad padded leathery footpads & large cooling ears',
            description: 'Spreads out body weight over sand and large blood vessels in ears release excess heat.',
            scoreInBiome: 35,
            feedback: 'Brilliant structural trait! Broad pads prevent sinking in fine sand, and large ears act as heat radiators.'
          },
          {
            id: 'desert-webbed-feet',
            name: 'Thin webbed flippers with sharp ice claws',
            description: 'Oar-like paddles designed for slicing through freezing water.',
            scoreInBiome: 10,
            feedback: 'Poor match: Webbed flippers dry out and crack on blistering desert stones and cannot grip sand.'
          }
        ]
      }
    ],
    behaviouralOptions: [
      {
        category: 'Activity Rhythm',
        options: [
          {
            id: 'desert-nocturnal-habit',
            name: 'Nocturnal Activity (Rest in deep cool burrows by day, hunt at night)',
            description: 'Stays underground where it is 20°C cooler during peak sunshine hours.',
            scoreInBiome: 15,
            feedback: 'Smart behavioural adaptation! Avoiding midday sun saves up to 80% of bodily water.'
          },
          {
            id: 'desert-midday-sprint',
            name: 'Midday Sprinting & Sunbathing on open dunes',
            description: 'Active and running around continuously during the peak noon heat.',
            scoreInBiome: 2,
            feedback: 'Severe risk! Sprinting at noon causes rapid dehydration and lethal hyperthermia.'
          }
        ]
      },
      {
        category: 'Survival Reaction',
        options: [
          {
            id: 'desert-water-burrow',
            name: 'Conserving water by licking morning dew and burrowing',
            description: 'Collects tiny water droplets formed before dawn and stays sheltered.',
            scoreInBiome: 15,
            feedback: 'Great survival strategy! Using condensation and staying sheltered minimizes moisture loss.'
          },
          {
            id: 'desert-panting-sweat',
            name: 'Heavy constant panting and sweating freely',
            description: 'Relies on losing buckets of water to cool down.',
            scoreInBiome: 5,
            feedback: 'Dehydration alert! Sweating constantly rapidly depletes the animal\'s limited water reserves in a desert.'
          }
        ]
      }
    ]
  },
  {
    id: 'arctic',
    name: 'Freezing Arctic Ice Floes',
    badge: 'Polar Champion',
    image: arcticImage,
    climateTitle: 'Sub-Zero, -40°C Blizzard Winds, Icy Seawater',
    temperature: '-40°C / -40°F',
    hazards: [
      'Hazard 1: Lethal Sub-Zero Frostbite and Hypothermia',
      'Hazard 2: Slipping on Sea Ice and Swimming in Freezing Oceans',
      'Hazard 3: Heavy White Camouflage Needed to Sneak Up on Prey'
    ],
    structuralOptions: [
      {
        category: 'Body Covering',
        options: [
          {
            id: 'arctic-blubber-coat',
            name: 'Thick insulating blubber layer & hollow white fur',
            description: 'Traps body heat inside, repels icy seawater, and blends seamlessly with snow.',
            scoreInBiome: 35,
            feedback: 'Superb! The hollow hair traps warm air and blubber prevents deadly heat loss into freezing water.'
          },
          {
            id: 'arctic-thin-skin',
            name: 'Thin bare translucent skin with no fat',
            description: 'Allows heat to escape quickly into the surrounding air.',
            scoreInBiome: 5,
            feedback: 'Catastrophe! Without insulation, your creature will freeze solid in minutes.'
          }
        ]
      },
      {
        category: 'Limbs & Extremities',
        options: [
          {
            id: 'arctic-snowshoe-paws',
            name: 'Broad furred snowshoe paws with non-slip bumpy pads & short ears',
            description: 'Small rounded ears prevent heat loss, and bumpy soles grip slippery ice.',
            scoreInBiome: 35,
            feedback: 'Perfect structural fit! Short extremities stop frostbite, and furred grips keep the animal upright on ice.'
          },
          {
            id: 'arctic-giant-ears',
            name: 'Enormous thin ears and long spindly legs',
            description: 'Large surface area for releasing heat away from the body.',
            scoreInBiome: 10,
            feedback: 'Frostbite danger! Giant ears radiate vital warmth away and will freeze in sub-zero polar winds.'
          }
        ]
      }
    ],
    behaviouralOptions: [
      {
        category: 'Activity Rhythm',
        options: [
          {
            id: 'arctic-group-huddle',
            name: 'Cooperative huddling in tight packs & digging snow dens',
            description: 'Blocks freezing winds by clustering together and building insulated snow caves.',
            scoreInBiome: 15,
            feedback: 'Top-tier behavioural adaptation! Snow dens trap warm microclimates above freezing.'
          },
          {
            id: 'arctic-solitary-swimming',
            name: 'Solitary long-distance swimming without resting',
            description: 'Stays alone in open water during blizzard gales.',
            scoreInBiome: 5,
            feedback: 'Exhaustion! Solo exposure to rough freezing seas drains stamina rapidly.'
          }
        ]
      },
      {
        category: 'Survival Reaction',
        options: [
          {
            id: 'arctic-curl-snout',
            name: 'Curling into a ball with tail tucked over sensitive nose',
            description: 'Buries muzzle into bushy fur to pre-warm air before inhaling.',
            scoreInBiome: 15,
            feedback: 'Wonderful behaviour! Tucking the nose reduces exposed skin area and retains lung warmth.'
          },
          {
            id: 'arctic-sprawling-flat',
            name: 'Sprawling belly-down flat on open ice',
            description: 'Exposing maximum body surface area to cold ice sheets.',
            scoreInBiome: 5,
            feedback: 'Fatal heat loss! Sprawling directly onto ice draws heat straight out of the core.'
          }
        ]
      }
    ]
  },
  {
    id: 'rainforest',
    name: 'Emerald Rainforest Canopy',
    badge: 'Canopy Master',
    image: rainforestImage,
    climateTitle: 'Warm, 90% Humidity, Dense Foliage, Many Predators',
    temperature: '29°C / 84°F',
    hazards: [
      'Hazard 1: Navigating High Slippery Trees 40 Meters Up',
      'Hazard 2: Evading Keen-Eyed Birds of Prey and Tree Vipers',
      'Hazard 3: Finding Nutritious Fruits & Insects Among Dense Leaves'
    ],
    structuralOptions: [
      {
        category: 'Body Covering',
        options: [
          {
            id: 'rainforest-camo-skin',
            name: 'Mottled green-brown camouflage skin / feather pattern',
            description: 'Mimics dappled sunbeams and rainforest leaves to vanish against foliage.',
            scoreInBiome: 35,
            feedback: 'Master of camouflage! Mottled patterns blend perfectly into dappled canopy light.'
          },
          {
            id: 'rainforest-bright-snow',
            name: 'Pure bright white snowy coat',
            description: 'Bright white reflective fur that stands out brightly.',
            scoreInBiome: 8,
            feedback: 'Easy prey! A white coat shines like a beacon against green leaves, alerting every predator.'
          }
        ]
      },
      {
        category: 'Limbs & Extremities',
        options: [
          {
            id: 'rainforest-prehensile-tail',
            name: 'Prehensile grasping tail and curved gripping claws / suction pads',
            description: 'Acts as a fifth hand to hold branches while reaching for fruit.',
            scoreInBiome: 35,
            feedback: 'Outstanding canopy structure! A grasping tail prevents deadly 30-meter falls to the jungle floor.'
          },
          {
            id: 'rainforest-flat-paddles',
            name: 'Heavy flat paddle flippers with no grasping toes',
            description: 'Paddles meant for pushing through ocean water.',
            scoreInBiome: 5,
            feedback: 'Fatal mismatch! Flat paddles cannot grasp round branches, leading to a disastrous fall.'
          }
        ]
      }
    ],
    behaviouralOptions: [
      {
        category: 'Activity Rhythm',
        options: [
          {
            id: 'rainforest-stealth-climb',
            name: 'Moving slowly with rocking swaying motions that mimic breeze',
            description: 'Walks with rhythmic pauses so predators mistake movement for rustling leaves.',
            scoreInBiome: 15,
            feedback: 'Genius behavioural adaptation! Rocking like a leaf in wind confounds hunting hawks.'
          },
          {
            id: 'rainforest-loud-screaming',
            name: 'Thrashing through branches noisily shaking leaves constantly',
            description: 'Makes loud cracking noises wherever it travels.',
            scoreInBiome: 5,
            feedback: 'Alert! Constant branch thrashing immediately draws snakes, eagles, and jaguars.'
          }
        ]
      },
      {
        category: 'Survival Reaction',
        options: [
          {
            id: 'rainforest-freeze-still',
            name: 'Freezing completely still when danger shadows pass overhead',
            description: 'Remains like a wooden knot on the branch until predators fly by.',
            scoreInBiome: 15,
            feedback: 'Top defense behaviour! Hawks hunt via motion detection; freezing still saves lives.'
          },
          {
            id: 'rainforest-run-straight',
            name: 'Running in a straight line out into open canopy sunlight',
            description: 'Bolts across clearings where vision is completely exposed.',
            scoreInBiome: 5,
            feedback: 'Target acquired! Running across open clearings exposes your creature to dive-bombing eagles.'
          }
        ]
      }
    ]
  }
];

export interface SpeedQuestion {
  id: string;
  category: 'Structural vs Behavioural' | 'Habitat Function' | 'Plant Adaptations' | 'Survival Purpose';
  objective: string;
  question: string;
  options: string[];
  correctIndex: number;
  scienceTip: string;
  image?: string;
}

export const SPEED_QUESTIONS: SpeedQuestion[] = [
  {
    id: 'q1',
    category: 'Structural vs Behavioural',
    objective: 'Differentiate between structural and behavioural adaptations',
    question: 'A beaver builds a strong lodge out of mud, logs, and stones. What type of adaptation is this?',
    options: [
      'Structural Adaptation (Body Part)',
      'Behavioural Adaptation (Action / Way of behaving)',
      'Neither, it is an accident'
    ],
    correctIndex: 1,
    scienceTip: 'Building a lodge is an action or work the animal does, NOT a physical part attached to its body. Therefore, it is BEHAVIOURAL.',
    image: heroImage,
  },
  {
    id: 'q2',
    category: 'Structural vs Behavioural',
    objective: 'Show an understanding that structural adaptations are special parts',
    question: 'A polar bear has a thick layer of fat called blubber under its skin. What type of adaptation is this?',
    options: [
      'Structural Adaptation (Special body part/tissue)',
      'Behavioural Adaptation (Action/Habit)',
      'Social Adaptation'
    ],
    correctIndex: 0,
    scienceTip: 'Blubber is a physical tissue/layer of the bear\'s body that you can touch or measure. Physical body parts are STRUCTURAL adaptations.',
    image: photoPolarBear,
  },
  {
    id: 'q3',
    category: 'Survival Purpose',
    objective: 'Describe adaptations that serve to enhance survival',
    question: 'Why do ducks and frogs have webbed feet with skin between their toes?',
    options: [
      'To help them fly faster in strong head winds',
      'To act as paddles that push efficiently against water when swimming',
      'To keep their claws warm on frozen snow'
    ],
    correctIndex: 1,
    scienceTip: 'Webbed feet create a larger surface area like oars, pushing more water backward to propel the animal forward quickly.',
    image: photoDuck,
  },
  {
    id: 'q4',
    category: 'Plant Adaptations',
    objective: 'Identify a structural adaptation in plants',
    question: 'Why does a desert cactus have sharp spines instead of broad, wide leaves?',
    options: [
      'To reduce water loss through transpiration and deter animals from eating it',
      'To make the cactus heavier so strong winds don\'t blow it away',
      'To collect falling snow and ice crystals'
    ],
    correctIndex: 0,
    scienceTip: 'Leaves lose water through tiny pores called stomata. Spines have almost no surface area, dramatically cutting water loss in hot deserts.',
    image: photoCactus,
  },
  {
    id: 'q5',
    category: 'Structural vs Behavioural',
    objective: 'Identify a behavioural adaptation',
    question: 'Which of the following is a BEHAVIOURAL adaptation?',
    options: [
      'An eagle\'s sharp hooked beak for tearing meat',
      'A bird migrating thousands of kilometers south for the winter',
      'A lion\'s sharp retractable claws'
    ],
    correctIndex: 1,
    scienceTip: 'Migrating south is an action/journey the bird takes. Beaks and claws are physical structures!',
    image: photoDuck,
  },
  {
    id: 'q6',
    category: 'Habitat Function',
    objective: 'Recognise that adaptations help organisms survive in natural habitats',
    question: 'How do broad, wide footpads help a camel survive in the sandy desert?',
    options: [
      'They make loud clapping sounds to scare hyenas',
      'They prevent the camel from sinking into soft, loose sand dunes',
      'They allow the camel to swim across rivers'
    ],
    correctIndex: 1,
    scienceTip: 'Broad feet distribute the camel\'s heavy body weight over a larger area, exerting less pressure so it doesn\'t sink.',
    image: photoCamel,
  },
  {
    id: 'q7',
    category: 'Structural vs Behavioural',
    objective: 'Identify a structural adaptation',
    question: 'Which of the following is a STRUCTURAL adaptation?',
    options: [
      'A meerkat standing on its hind legs to keep watch for hawks',
      'A bat sleeping upside down in a dark cave',
      'A zebra\'s black and white striped fur coat that confuses biting flies'
    ],
    correctIndex: 2,
    scienceTip: 'The striped fur coat is a physical physical covering on the animal\'s skin (structural). Standing watch and sleeping upside down are actions (behavioural).',
    image: photoChameleon,
  },
  {
    id: 'q8',
    category: 'Survival Purpose',
    objective: 'Describe adaptations that serve to enhance survival',
    question: 'Why do emperor penguins huddle closely together in giant groups during Antarctic winter?',
    options: [
      'To share precious body heat and shield each other from -60°C blizzard winds',
      'To practice singing songs to attract mates',
      'To hide from seals swimming in the water'
    ],
    correctIndex: 0,
    scienceTip: 'Huddling is a behavioural adaptation that reduces heat loss to the cold air by up to 80%!',
    image: arcticImage,
  },
  {
    id: 'q9',
    category: 'Structural vs Behavioural',
    objective: 'Differentiate between structural and behavioural adaptations',
    question: 'When threatened, an opossum rolls onto its side, stiffens, and plays dead. What kind of adaptation is this?',
    options: [
      'Structural Adaptation',
      'Behavioural Adaptation',
      'Nutritional Adaptation'
    ],
    correctIndex: 1,
    scienceTip: 'Playing dead is a behavioural defense action triggered to trick predators into leaving it alone.',
    image: heroImage,
  },
  {
    id: 'q10',
    category: 'Plant Adaptations',
    objective: 'Identify a structural adaptation in plants',
    question: 'A water lily has broad, flat leaves with air sacs that float on pond water. What is the structural adaptation?',
    options: [
      'The air sacs and broad floating leaves that keep it buoyant and exposed to sunlight',
      'The frog jumping onto the leaf',
      'The water rippling across the pond'
    ],
    correctIndex: 0,
    scienceTip: 'Air sacs inside the plant tissues provide buoyancy, holding the broad flat leaves at the surface where sunlight is strongest.',
    image: rainforestImage,
  }
];

export interface LearningObjective {
  id: string;
  code: string;
  title: string;
  description: string;
  associatedGames: string[];
}

export const SYLLABUS_OBJECTIVES: LearningObjective[] = [
  {
    id: 'obj-1',
    code: 'LO 4.1',
    title: 'Concept of Adaptations',
    description: 'Recognise that adaptations are special characteristics that help organisms to survive in their natural habitats.',
    associatedGames: ['Concept Explorer', 'Habitat Detective', 'BioCraft Simulator']
  },
  {
    id: 'obj-2',
    code: 'LO 4.2',
    title: 'Differentiate Types',
    description: 'Differentiate between structural adaptations and behavioural adaptations.',
    associatedGames: ['Sorter Lab', 'Speed Master']
  },
  {
    id: 'obj-3',
    code: 'LO 4.3',
    title: 'Structural Adaptations Definition',
    description: 'Show an understanding that structural adaptations are special parts an organism has that help it to survive.',
    associatedGames: ['Sorter Lab', 'BioCraft Simulator', 'Speed Master']
  },
  {
    id: 'obj-4',
    code: 'LO 4.4',
    title: 'Behavioural Adaptations Definition',
    description: 'Show an understanding that behavioural adaptations are special ways an organism behaves to survive.',
    associatedGames: ['Sorter Lab', 'BioCraft Simulator', 'Speed Master']
  },
  {
    id: 'obj-5',
    code: 'LO 4.5',
    title: 'Identify Structural Trait',
    description: 'Identify a structural adaptation in varied animal and plant organisms.',
    associatedGames: ['Sorter Lab', 'Habitat Detective', 'Speed Master']
  },
  {
    id: 'obj-6',
    code: 'LO 4.6',
    title: 'Identify Behavioural Trait',
    description: 'Identify a behavioural adaptation in varied animal and plant organisms.',
    associatedGames: ['Sorter Lab', 'Habitat Detective', 'Speed Master']
  },
  {
    id: 'obj-7',
    code: 'LO 4.7',
    title: 'Survival Function in Context',
    description: 'Describe some adaptations of organisms that serve to enhance their survival in specific environments.',
    associatedGames: ['Habitat Detective', 'BioCraft Simulator', 'Speed Master']
  }
];
