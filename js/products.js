/* ==========================================================================
   PRODUCTS DATABASE (That's My Paw)
   HOW TO ADD A NEW PRODUCT:
   1. Copy any { ... } block inside the PRODUCTS array below.
   2. Paste it at the top or bottom of the list (keep the comma between blocks).
   3. Update title, image, rating, reviews, badge, category, subcategory, and link.
   4. OPTIONAL "media" FIELD: Add a media: [ ... ] array to show a photo/video
      slider inside the card (supports image, youtube, and video slides).
      Omit "media" to show the single "image" field as usual.
   5. OPTIONAL "details" FIELD: Add a details: { about, bestFor, howToUse, pros, cons }
      object to show the "View Details" dropdown under the card. Omit "details" to
      hide the dropdown button for that product.
   6. IMPORTANT (Amazon Rules): Do NOT include prices or discounts anywhere.
   ========================================================================== */

window.PRODUCTS_API_URL = ""; // FUTURE: paste your own backend/API endpoint here. Leave empty to use the products below.

window.PRODUCTS = [
  /* ---------- DOG PRODUCTS ---------- */
  {
    id: "dog-orthopedic-bed",
    title: "Orthopedic Memory Foam Bolster Dog Bed",
    image: "images/products/dog-bed.jpg",
    rating: 4.9,
    reviews: 2840,
    badge: "Top Pick",
    category: "dogs",
    subcategory: "beds-furniture",
    keywords: "dog bed orthopedic memory foam sleep joint support bolster",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A supportive memory foam dog bed with raised padded bolsters and a removable washable linen cover.",
      bestFor: "Medium to large dogs, senior pups, and dogs that love resting their chin on a soft edge.",
      howToUse: [
        "Unbox the foam insert and let it expand flat for 24 hours.",
        "Zip on the outer cover and place the bed in a quiet, draft-free corner.",
        "Machine wash the outer cover cold on a gentle cycle as needed."
      ],
      pros: [
        "Thick high-density foam holds its shape over time",
        "Removable zippered cover is easy to wash"
      ],
      cons: [
        "Takes a full day to expand after unboxing",
        "Not designed for heavy chewers"
      ]
    }
  },
  {
    id: "dog-no-pull-harness",
    title: "Reflective No-Pull Padded Dog Harness & Leash Set",
    image: "images/products/dog-harness.jpg",
    rating: 4.8,
    reviews: 1920,
    badge: "Top Pick",
    category: "dogs",
    subcategory: "collars-leashes",
    keywords: "dog harness leash collar walking reflective no pull training",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A breathable mesh dog harness with front and back leash clips plus high-visibility reflective stitching.",
      bestFor: "Everyday walkers, dogs learning polite leash manners, and early-morning or evening strolls.",
      howToUse: [
        "Slide the neck loop over your dog's head and buckle both chest straps.",
        "Adjust the straps so two fingers fit comfortably underneath.",
        "Clip the leash to the front chest ring for training or back ring for casual walks."
      ],
      pros: [
        "Soft chest padding prevents chafing on long walks",
        "Bright reflective trim boosts low-light visibility"
      ],
      cons: [
        "Requires measuring your dog's chest girth before ordering",
        "Not chew-proof if left on unsupervised"
      ]
    }
  },
  {
    id: "dog-puzzle-toy",
    title: "Interactive Treat Dispensing Dog Puzzle Toy",
    image: "images/products/dog-puzzle-toy.jpg",
    rating: 4.7,
    reviews: 1450,
    badge: "",
    category: "dogs",
    subcategory: "toys",
    keywords: "dog toy puzzle enrichment brain game treat dispenser",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A multi-compartment sliding puzzle board that challenges dogs to nudge lids and spin discs for hidden kibble.",
      bestFor: "Curious puppies, high-energy breeds, and indoor rainy-day mental enrichment.",
      howToUse: [
        "Place small dry treats or kibble inside the recessed compartments.",
        "Start with half the sliders open so your dog learns the game.",
        "Supervise play and rinse the tray with warm soapy water afterward."
      ],
      pros: [
        "Slows down fast eaters and keeps minds busy",
        "Non-slip base stays steady on hardwood floors"
      ],
      cons: [
        "Best suited for dry treats rather than wet food",
        "Clever dogs may master level-one sliders quickly"
      ]
    }
  },
  {
    id: "dog-grooming-kit",
    title: "Deshedding Brush & Quiet Cordless Nail Grinder Kit",
    image: "images/products/grooming-kit.jpg",
    rating: 4.8,
    reviews: 1180,
    badge: "",
    category: "dogs",
    subcategory: "grooming",
    keywords: "dog grooming brush deshedding nail trimmer grinder coat care",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A stainless-tooth undercoat brush paired with a low-vibration USB-rechargeable nail grinder.",
      bestFor: "Double-coated dogs, seasonal shedders, and pets nervous around loud clippers.",
      howToUse: [
        "Brush gently in the direction of coat growth using short strokes.",
        "Introduce the grinder turned off with treats before trimming.",
        "File small nail tips in 2–3 second touches to avoid warming the nail."
      ],
      pros: [
        "Low-noise motor keeps anxious pets calmer",
        "Built-in LED light helps spot the nail quick"
      ],
      cons: [
        "Needs periodic USB charging before long sessions",
        "Extra-thick nails require patience and multiple passes"
      ]
    }
  },
  {
    id: "dog-freeze-dried-treats",
    title: "Single-Ingredient Freeze-Dried Chicken Dog Treats",
    image: "images/products/dog-treats.svg",
    rating: 4.9,
    reviews: 960,
    badge: "Top Pick",
    category: "dogs",
    subcategory: "food-treats",
    keywords: "dog food treats chicken healthy natural training snacks",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "Bite-sized cubes made from 100% pure freeze-dried chicken breast with no fillers, grains, or artificial flavors.",
      bestFor: "Training rewards, picky eaters, and dogs on simple single-protein snack routines.",
      howToUse: [
        "Offer whole cubes as high-value training rewards.",
        "Crumble one or two pieces over regular kibble as a meal topper.",
        "Reseal the pouch tightly and store in a cool, dry pantry."
      ],
      pros: [
        "Simple single-ingredient recipe dogs eagerly work for",
        "Easy to break into tiny pieces for small breeds"
      ],
      cons: [
        "Can leave light crumbs at the bottom of the bag",
        "Not suitable for dogs with poultry sensitivities"
      ]
    }
  },
  {
    id: "dog-travel-carrier",
    title: "Breathable Airline-Approved Soft Pet Travel Carrier",
    image: "images/products/dog-travel-carrier.svg",
    rating: 4.7,
    reviews: 740,
    badge: "",
    category: "dogs",
    subcategory: "travel-carriers",
    keywords: "dog travel carrier bag airline crate road trip portable",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A lightweight, structured soft carrier featuring four-sided ventilation mesh, locking zippers, and a washable fleece pad.",
      bestFor: "Small dogs under 15 lbs, road trips, vet visits, and under-seat cabin travel.",
      howToUse: [
        "Open the carrier at home for a few days with a favorite blanket inside.",
        "Clip the interior safety tether to your dog's harness before zipping.",
        "Confirm exact cabin size rules with your airline before flying."
      ],
      pros: [
        "Folds flat for closet storage when not in use",
        "Includes both a luggage strap and padded shoulder strap"
      ],
      cons: [
        "Sized strictly for toy and small breeds",
        "Mesh panels can snag if scratched repeatedly"
      ]
    }
  },

  /* ---------- CAT PRODUCTS ---------- */
  {
    id: "cat-stainless-fountain",
    title: "Ultra-Quiet Stainless Steel Cat Water Fountain",
    image: "images/products/cat-fountain.jpg",
    rating: 4.9,
    reviews: 3420,
    badge: "Top Pick",
    category: "cats",
    subcategory: "fountains-bowls",
    keywords: "cat water fountain stainless steel hydration bowl quiet filter",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A dishwasher-safe 304 stainless steel pet fountain with a gentle faucet stream and whisper-quiet submersible pump.",
      bestFor: "Cats that prefer running tap water, multi-cat households, and indoor hydration.",
      howToUse: [
        "Soak the carbon filter in clean water for 5 minutes before assembling.",
        "Fill the steel basin up to the max line and plug in the USB adapter.",
        "Rinse the pump weekly and swap filters every 3–4 weeks."
      ],
      pros: [
        "Stainless steel surface is easy to sanitize",
        "Quiet pump runs smoothly in bedrooms or living rooms"
      ],
      cons: [
        "Requires a nearby outlet for the power cord",
        "Replacement filters are needed monthly"
      ]
    }
  },
  {
    id: "cat-wooden-tree",
    title: "Modern Multi-Level Wood & Sisal Cat Tree Tower",
    image: "images/products/cat-tree.jpg",
    rating: 4.8,
    reviews: 1630,
    badge: "Top Pick",
    category: "cats",
    subcategory: "cat-trees",
    keywords: "cat tree tower scratching post perch furniture wood sisal",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A sturdy wooden cat tower with natural sisal-wrapped scratching posts, a cozy cubby hideout, and a plush top perch.",
      bestFor: "Indoor climbers, multi-cat apartments, and living rooms where modern furniture style matters.",
      howToUse: [
        "Assemble from the heavy base upward using the included hex tool.",
        "Place near a sunny window for bird-watching and lounging.",
        "Sprinkle a pinch of catnip on the sisal posts to invite scratching."
      ],
      pros: [
        "Solid wood base stays stable during energetic leaps",
        "Wipeable wood surfaces collect less fur than full-carpet trees"
      ],
      cons: [
        "Takes about 25 minutes to assemble",
        "Top bed cushion is spot-clean or hand-wash only"
      ]
    }
  },
  {
    id: "cat-ceramic-feeder",
    title: "Elevated Tilted Ceramic Cat Food & Slow Feeder Bowl",
    image: "images/products/cat-feeder-bowl.svg",
    rating: 4.8,
    reviews: 1120,
    badge: "",
    category: "cats",
    subcategory: "food-treats",
    keywords: "cat food bowl ceramic elevated whisker friendly slow feeder",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A wide, shallow ceramic bowl raised on a gentle 15-degree tilt to make mealtime comfortable and whisker-friendly.",
      bestFor: "Adult cats, flat-faced breeds, and kitties that prefer wide dishes over deep bowls.",
      howToUse: [
        "Place on a washable silicone feeding mat to keep floors tidy.",
        "Serve dry kibble or wet food spread evenly across the wide dish.",
        "Wash daily in the dishwasher or with mild dish soap."
      ],
      pros: [
        "Wide rim prevents uncomfortable whisker rubbing",
        "Heavy glazed ceramic stays put instead of sliding"
      ],
      cons: [
        "Ceramic material can chip if dropped on tile",
        "Holds smaller portions suitable for single meals"
      ]
    }
  },
  {
    id: "cat-play-tunnel",
    title: "Collapsible Crinkle Cat Play Tunnel with Plush Ball",
    image: "images/products/cat-tunnel.svg",
    rating: 4.7,
    reviews: 890,
    badge: "",
    category: "cats",
    subcategory: "toys",
    keywords: "cat toy tunnel crinkle interactive indoor play kitten",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A pop-open fabric tunnel lined with crisp crinkle paper, a peek-a-boo center window, and a dangling plush ball.",
      bestFor: "Playful kittens, indoor cats needing afternoon exercise, and hide-and-pounce games.",
      howToUse: [
        "Unfasten the side toggle so the spring frame pops open safely.",
        "Toss a feather wand or small toy mouse through the tunnel.",
        "Fold flat and secure the elastic loop for quick storage."
      ],
      pros: [
        "Opens and folds back down in just seconds",
        "Crinkle sound keeps curious cats engaged"
      ],
      cons: [
        "Crinkle noise can be noticeable during late-night zoomies",
        "Lightweight fabric slides easily on smooth floors"
      ]
    }
  },
  {
    id: "cat-grooming-set",
    title: "Gentle Cat Grooming Brush & Low-Noise Paw Trimmer",
    image: "images/products/grooming-kit.jpg",
    rating: 4.7,
    reviews: 675,
    badge: "",
    category: "cats",
    subcategory: "grooming",
    keywords: "cat grooming brush shedding hair care nail trimmer",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A soft-tipped deshedding comb and compact low-vibration trimmer tailored for delicate feline coats and paw pads.",
      bestFor: "Long-haired and medium-haired indoor cats, plus gentle weekly coat maintenance.",
      howToUse: [
        "Brush in short, calm 3-minute sessions along the back and sides.",
        "Clear collected fur from the comb between passes.",
        "Reward your cat with a favorite treat right after brushing."
      ],
      pros: [
        "Rounded bristle tips feel gentle on sensitive skin",
        "Compact trimmer handles tidy paw-tuft grooming easily"
      ],
      cons: [
        "Doesn't remove deeply tangled mats on its own",
        "Skittish cats still need slow introduction to the trimmer hum"
      ]
    }
  },
  {
    id: "cat-travel-carrier",
    title: "Ventilated Soft-Sided Cat Carrier for Vet & Travel",
    image: "images/products/dog-travel-carrier.svg",
    rating: 4.8,
    reviews: 810,
    badge: "",
    category: "cats",
    subcategory: "travel-carriers",
    keywords: "cat carrier travel vet bag soft breathable",
    link: "#", // PASTE YOUR AMAZON AFFILIATE LINK HERE
    details: {
      about: "A soft, breathable pet carrier with both top and side zippered entry doors to make vet checkups less stressful.",
      bestFor: "Routine vet visits, car rides, and calm cabin travel with cats up to 15 lbs.",
      howToUse: [
        "Leave the carrier open in your living room with a familiar towel inside.",
        "Use the wide top opening when lifting nervous cats in or out.",
        "Buckle the side loop into a car seatbelt during drives."
      ],
      pros: [
        "Top-loading entry makes gentle placement much easier",
        "Removable cozy base pad wipes clean quickly"
      ],
      cons: [
        "Not intended for cats that chew zippers or mesh",
        "Large cat breeds over 16 lbs will need a bigger hard crate"
      ]
    }
  }
];

/* ==========================================================================
   COMMENTED EXAMPLE: PRODUCT WITH MULTIPLE IMAGES + VIDEO SLIDER ("media")
   Copy the block below into window.PRODUCTS above whenever you want a slider:
   {
     id: "example-slider-product",
     title: "Example Dog Toy with Photo & Video Slider",
     image: "images/products/dog-puzzle-toy.jpg",
     media: [
       { type: "image", src: "images/products/dog-puzzle-toy.jpg" },
       { type: "image", src: "images/products/dog-harness.jpg" },
       { type: "youtube", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
       { type: "video", src: "videos/demo.mp4", poster: "images/products/dog-puzzle-toy.jpg" }
     ],
     rating: 4.8,
     reviews: 520,
     badge: "Top Pick",
     category: "dogs",
     subcategory: "toys",
     keywords: "dog toy interactive puzzle video demo",
     link: "#"
   }
   ========================================================================== */
