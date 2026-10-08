import React, { useState } from 'react';
import { BookOpen, Check, Layers, Compass, HelpCircle, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import {
  desertImage,
  arcticImage,
  rainforestImage,
  oceanImage,
  photoPolarBear,
  photoDuck,
  photoChameleon,
  photoCactus,
  photoPenguin,
} from '../data/adaptationsData';
import { sound } from '../utils/audio';

export const ConceptGuide: React.FC<{ onLaunchGame: (gameId: string) => void }> = ({ onLaunchGame }) => {
  const [selectedBiome, setSelectedBiome] = useState<'desert' | 'arctic' | 'rainforest' | 'ocean'>('desert');
  const [activeInteractiveCard, setActiveInteractiveCard] = useState<number>(0);

  const biomes = [
    {
      id: 'desert',
      name: 'Hot Desert',
      image: desertImage,
      challenges: 'Scorching temperatures (over 45°C), little to no rain, shifting burning sand.',
      structural: [
        { name: 'Camel Eyelashes & Nostrils', desc: 'Double rows of lashes block windblown sand; nostrils close tight during storms.' },
        { name: 'Cactus Spines', desc: 'Modified leaves with microscopic surface area to drastically reduce water loss through transpiration.' },
        { name: 'Fennec Fox Enormous Ears', desc: 'Packed with capillaries that radiate excess heat away from blood into the cool evening breeze.' }
      ],
      behavioural: [
        { name: 'Nocturnal Activity', desc: 'Fennec foxes and desert snakes sleep underground in cool burrows by day and hunt at night.' },
        { name: 'Basking Angle Adjustment', desc: 'Lizards angle their bodies away from the direct sun to absorb less solar radiation.' }
      ]
    },
    {
      id: 'arctic',
      name: 'Polar Arctic',
      image: arcticImage,
      challenges: 'Sub-zero temperatures (-40°C), howling blizzard winds, frozen sea ice, freezing ocean waters.',
      structural: [
        { name: 'Polar Bear Blubber', desc: 'A thick layer of subcutaneous fat (up to 11 cm) acts as an impenetrable thermal blanket.' },
        { name: 'Hollow Fur Coat', desc: 'Clear hollow hair shafts trap pockets of body-warmed air and reflect light to appear snowy white.' },
        { name: 'Small Ears & Tail', desc: 'Short rounded ears reduce surface area to minimize body heat loss.' }
      ],
      behavioural: [
        { name: 'Penguin Group Huddling', desc: 'Penguins tightly pack together in rotating huddles, sharing warmth to withstand -60°C storms.' },
        { name: 'Snow Den Digging', desc: 'Polar bears dig snow dens that stay 20°C warmer than the howling winds outside.' }
      ]
    },
    {
      id: 'rainforest',
      name: 'Tropical Rainforest',
      image: rainforestImage,
      challenges: 'Dense competitor species, tall slippery canopy trees, heavy tropical downpours, abundance of predators.',
      structural: [
        { name: 'Tree Frog Sticky Toe Pads', desc: 'Expanded toe tips with mucous glands generate strong capillary grip on slippery leaves.' },
        { name: 'Toucan Lightweight Bill', desc: 'Enormous honeycombed bill reaches fruits on thin branches that cannot support the bird\'s weight.' },
        { name: 'Pitcher Plant Slippery Rim', desc: 'Vase-shaped leaves coated in waxy fluid trap falling insects to obtain scarce soil nitrogen.' }
      ],
      behavioural: [
        { name: 'Chameleon Rocking Walk', desc: 'Walks forward with a gentle swaying motion that mimics leaves rustling in the wind to fool predators.' },
        { name: 'Calling Alarms in Troops', desc: 'Monkeys sound distinct alarm calls when seeing an aerial eagle vs a ground jaguar.' }
      ]
    },
    {
      id: 'ocean',
      name: 'Deep Marine Ocean',
      image: oceanImage,
      challenges: 'Water resistance, intense cold water pressure, total pitch-blackness in deep waters, breathing underwater.',
      structural: [
        { name: 'Sea Turtle Flippers', desc: 'Paddle-shaped forelimbs allow powerful aquatic propulsion with minimal energy expenditure.' },
        { name: 'Fish Gills', desc: 'Feathery gill filaments extract dissolved oxygen directly from flowing water molecules.' },
        { name: 'Anglerfish Esca (Lure)', desc: 'Glowing bulb hanging over the mouth attracts curious prey straight into its jaws in total darkness.' }
      ],
      behavioural: [
        { name: 'Fish Schooling', desc: 'Thousands of fish swim in tightly synchronized balls, confusing predators and appearing as one giant beast.' },
        { name: 'Vertical Migration', desc: 'Zooplankton and deep fish swim to surface waters at night to feed under cover of darkness.' }
      ]
    }
  ];

  const currentBiome = biomes.find((b) => b.id === selectedBiome) || biomes[0];

  return (
    <div className="space-y-12">
      {/* Chapter Introduction Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Chapter 4 Learning Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What is an Adaptation?
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          An <strong className="text-slate-900 font-semibold">adaptation</strong> is any special characteristic that helps an organism (animal or plant) survive in its natural habitat and reproduce. Without these adaptations, organisms would not survive harsh environments or predators!
        </p>
      </div>

      {/* Structural vs Behavioural Comparison Deck */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Structural vs. Behavioural Adaptations
          </h3>
          <p className="text-sm text-slate-600">
            Primary science categorises all adaptations into two fundamental groups:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Structural Card */}
          <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-emerald-100 text-emerald-800 rounded-md">
                  Type 1: Structural
                </span>
                <span className="text-xs font-medium text-slate-500">Physical Anatomy</span>
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-emerald-950">Special Body Parts</h4>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  A structural adaptation is a <strong>physical feature or body part</strong> that an organism has that helps it survive. The organism is born with it!
                </p>
              </div>

              {/* Photo Showcase of Structural Traits */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="relative rounded-xl overflow-hidden border border-emerald-200 aspect-4/3 group">
                  <img
                    src={photoPolarBear}
                    alt="Polar bear with thick fur and blubber"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[11px] font-bold text-white">
                      Thick Blubber &amp; Fur
                    </span>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-emerald-200 aspect-4/3 group">
                  <img
                    src={photoCactus}
                    alt="Desert Cactus spines reducing water loss"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[11px] font-bold text-white">
                      Cactus Spines
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-2">
                <span className="text-xs font-bold text-emerald-900 uppercase">Key Primary Examples:</span>
                <ul className="text-xs sm:text-sm text-emerald-950 space-y-1.5 list-disc list-inside">
                  <li><strong>Polar bear&apos;s blubber:</strong> Thick fat insulating against sub-zero Arctic cold.</li>
                  <li><strong>Duck&apos;s webbed feet:</strong> Flaps of skin acting as paddles to swim through water.</li>
                  <li><strong>Cactus needle spines:</strong> Modified thin leaves that prevent water loss in the desert.</li>
                  <li><strong>Eagle&apos;s sharp talons:</strong> Curved claws to grasp slippery fish from lakes.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Memory Trick: What it HAS</span>
              <button
                onClick={() => {
                  sound.playClick();
                  onLaunchGame('sorter');
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                Practice in Sorter Lab <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Behavioural Card */}
          <div className="bg-white rounded-2xl border-2 border-sky-200 p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-sky-100 text-sky-800 rounded-md">
                  Type 2: Behavioural
                </span>
                <span className="text-xs font-medium text-slate-500">Actions & Habits</span>
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-sky-950">Special Ways of Behaving</h4>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  A behavioural adaptation is a <strong>special action, response, or way an organism acts</strong> to help it survive in its natural habitat.
                </p>
              </div>

              {/* Photo Showcase of Behavioural Traits */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="relative rounded-xl overflow-hidden border border-sky-200 aspect-4/3 group">
                  <img
                    src={photoChameleon}
                    alt="Chameleon camouflaged and rocking to mimic moving leaves"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[11px] font-bold text-white">
                      Freezing &amp; Camouflage
                    </span>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-sky-200 aspect-4/3 group">
                  <img
                    src={photoPenguin}
                    alt="Penguins huddling together in giant cooperative groups"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[11px] font-bold text-white">
                      Penguins Huddling
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-sky-50/70 rounded-xl border border-sky-200/80 space-y-2">
                <span className="text-xs font-bold text-sky-900 uppercase">Key Primary Examples:</span>
                <ul className="text-xs sm:text-sm text-sky-950 space-y-1.5 list-disc list-inside">
                  <li><strong>Geese migration:</strong> Flying south in winter to escape freezing temperatures and find food.</li>
                  <li><strong>Penguins huddling:</strong> Packing closely in giant circles to share body heat during blizzards.</li>
                  <li><strong>Fennec fox nocturnality:</strong> Sleeping in cool burrows by day and hunting in the cool night.</li>
                  <li><strong>Opossum playing dead:</strong> Feigning death to convince predators that it is not fresh prey.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Memory Trick: What it DOES</span>
              <button
                onClick={() => {
                  sound.playClick();
                  onLaunchGame('sorter');
                }}
                className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1"
              >
                Practice in Sorter Lab <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The 2-Question Cheat Code */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>The Primary Student Secret Rule</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            How to Never Get Confused on an Exam Question:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-2">
              <p className="font-bold text-emerald-300 text-sm">Question 1: Can you point to it on the body?</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                If it is an actual physical part (claws, fur, blubber, leaves, gills, hollow bones) that you can photograph on the body, it is <strong className="text-white underline">STRUCTURAL</strong>.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-2">
              <p className="font-bold text-sky-300 text-sm">Question 2: Is it an action the animal chooses to do?</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                If it is an activity or habit (migrating, hibernating, huddling, burrowing, playing dead, dancing) that the animal performs, it is <strong className="text-white underline">BEHAVIOURAL</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Habitat Exploratorium */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Habitat Exploratorium: Adaptations in Action
          </h3>
          <p className="text-sm text-slate-600">
            Select a habitat below to see how organisms adapt their bodies and actions to conquer extreme challenges.
          </p>
        </div>

        {/* Biome Segmented Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {biomes.map((biome) => {
            const isSelected = selectedBiome === biome.id;
            return (
              <button
                key={biome.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedBiome(biome.id as any);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {biome.name}
              </button>
            );
          })}
        </div>

        {/* Selected Biome Stage */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Biome Visual Left Column */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
            <img
              src={currentBiome.image}
              alt={currentBiome.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Biome Environment</span>
              <h4 className="text-2xl font-extrabold">{currentBiome.name}</h4>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">{currentBiome.challenges}</p>
            </div>
          </div>

          {/* Biome Adaptations Right Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                1. Structural Adaptations (What they have)
              </span>
              <div className="grid grid-cols-1 gap-3 mt-3">
                {currentBiome.structural.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      {item.name}
                    </h5>
                    <p className="text-xs text-slate-600 pl-4">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md">
                2. Behavioural Adaptations (What they do)
              </span>
              <div className="grid grid-cols-1 gap-3 mt-3">
                {currentBiome.behavioural.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-600" />
                      {item.name}
                    </h5>
                    <p className="text-xs text-slate-600 pl-4">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => {
                  sound.playClick();
                  onLaunchGame('detective');
                }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-xs"
              >
                Solve Detective Case in this Habitat
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
