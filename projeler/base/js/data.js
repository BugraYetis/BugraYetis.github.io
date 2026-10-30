/* ============================================================
   BASE — Content & demo data
   Product content transcribed from basestudio.com.tr
   ============================================================ */
window.BASE_DATA = {

  products: [
    {
      id:'ids', photo:'IDS-square.webp', photoCap:'Independent suspension drive axle assembly', code:'01', name:'Independent Suspension Drive Axle',
      claim:'Unmatched Off-Road Performance & Reliability',
      img:'assets/img/IDS-square.webp', imgAlt:'assets/img/independent-portfolio-coverage-4.webp',
      badge:'IDS · 4.0t – 12.0t',
      intro:'Engineered for maximum performance in extreme military, commercial, and off-road applications.',
      features:[
        'Tight turning radius for maneuverability in confined or rugged environments',
        'Best-in-class ground clearance for uneven, rocky, and muddy terrain',
        'Lightweight strength via advanced aluminum differential housing',
        'Hub reduction for improved torque and durability',
        'CTIS-ready for optimal tire pressure control',
        'Inter-wheel differential lock for maximum traction'
      ],
      note:'Over 2,500 vehicle sets delivered worldwide, with proven reliability in the harshest field conditions. Portfolio covers 4×4, 6×6 and 8×8 configurations from 4.0t to 12.0t axle load.',
      specHead:['Model','Axle Load Rating','Brake Type','Total Ratio','Wheel Travel','CTIS Ready'],
      specRows:[
        ['BTA-040','4,000 kg','Hydraulic Disc','1.7:1','200 mm','Yes'],
        ['BTA-075','7,500 kg','Air Disc','5.9, 6.3:1','300 mm','Yes'],
        ['BTA-100','11,500 kg','Air Disc','5.3 – 6.6:1','350 mm','Yes'],
        ['BTA-105','10,500 kg','Air Disc','6.5, 6.9:1','400 mm','Yes'],
        ['BTA-120','12,000 kg','Air Disc','6.54, 6.91:1','360 mm','Yes']
      ]
    },
    {
      id:'rda', photo:'RDA-square.webp', photoCap:'Rigid drive axle assembly', code:'02', name:'Rigid Drive Axle',
      claim:'Strength, Reliability, and Performance for Heavy-Duty Vehicles',
      img:'assets/img/RDA-square.webp', imgAlt:'assets/img/rigid-portfolio.webp',
      badge:'RDA · 11.0t – 16.0t',
      intro:'Engineered for maximum durability in demanding conditions, with hub reduction technology for efficient torque transfer. Applications across off-road, construction, mining and defense operations.',
      features:[
        'Hub reduction for improved torque and durability',
        'CTIS-ready for enhanced mobility and tire life',
        'Inter-wheel differential lock for maximum traction',
        'Optional disc or drum brakes for application-specific performance'
      ],
      note:'Military-grade rigid axles with load capacities ranging from 11 to 16 tonnes.',
      specHead:['Model','Axle Load Capacity','Brake Type','Total Ratio','Steering','CTIS Ready'],
      specRows:[
        ['RTA-110','11,000 kg','Air Disc','6.91, 6.54:1','37.6°','Yes'],
        ['RTA-120','12,000 kg','Air Drum','6.91:1','40°','Yes'],
        ['RTA-135','13,500 kg','Air Drum','6.91:1','non-steerable','Yes'],
        ['RTA-160','16,000 kg','Air Drum','6.91:1','non-steerable','Yes']
      ]
    },
    {
      id:'tc', photo:'TC-square.webp', photoCap:'Two-speed transfer case', code:'03', name:'Two-Speed Transfer Case',
      claim:'Mission-Ready Performance in Every Terrain',
      img:'assets/img/TC-square.webp', imgAlt:'assets/img/transmission.webp',
      badge:'TK · up to 32,000 Nm',
      intro:'For military & off-highway. The BASE unit delivers performance with modern shell design, modular gear set, and lightweight aluminum housing.',
      features:[
        'Interaxle differential lock for enhanced traction',
        'Pneumatically actuated indicator switches for fast, reliable speed shifting',
        'Remote and direct mount compatibility',
        'Integrates with Allison transmission and other transmission families',
        'Aluminum housing for weight savings',
        'In-house gear design enabling custom ratios'
      ],
      note:'Applications: tactical vehicles, frontline military vehicles, off-highway operations.',
      specHead:['Model','Input Speed','Input Torque','Drop Distance','Low Ratio','High Ratio'],
      specRows:[
        ['TK-330','4,000 rpm','5,000 Nm','330 mm','2.8:1','5.85:1'],
        ['TK-420','4,000 rpm','10,000 Nm','420 mm','0.94, 1.26:1','1.92, 2.34:1'],
        ['TK-423','3,500 rpm','32,000 Nm','423 mm','1.04, 1.15, 1.23:1','1.92:1'],
        ['TK-535','3,800 rpm','20,000 Nm','535 mm','1.16:1','2.55:1']
      ]
    },
    {
      id:'rc', photo:'Rolling-Chassis-Cover-Photo.png', photoCap:'4×4 rolling chassis — engine, transmission, axles, transfer case', code:'04', name:'4×4 Rolling Chassis',
      claim:'Turnkey Platform — Fast-Track Tactical Vehicle Production',
      img:'assets/img/Rolling-Chassis-Cover-Photo.png', imgAlt:'assets/img/14t-1.webp',
      badge:'BS360-14C / BS400-20C',
      intro:'A fully engineered, turnkey platform solution designed to fast-track tactical vehicle production, with a plug-and-play design that integrates with monocoque hull designs.',
      features:[
        'Cummins diesel engine · Allison automatic transmission',
        'BASE independent suspension drive axles',
        'BASE two-speed transfer case with interaxle differential lock',
        'BS360-14C — 14t GVW, up to 360 HP, engine bay ballistic protection (STANAG Level 1)',
        'BS360-14C — frameless design for monocoque integration; ladder frame option for pickups',
        'BS400-20C — 20t GVW, 400 HP, V-shaped underbody protection (STANAG 4569 Level 4a/4b)',
        'BS400-20C — lightweight ladder frame, best-in-class payload capacity',
        'Optional right-hand drive configuration on both platforms'
      ],
      note:'Delivery options: fully assembled for rapid deployment, or CKD (Completely Knocked Down) kits for localization.',
      specHead:['Platform','GVW','Engine Power','Protection','Frame','Delivery'],
      specRows:[
        ['BS360-14C','14 t','up to 360 HP','Engine bay · STANAG L1','Frameless / ladder option','Assembled or CKD'],
        ['BS400-20C','20 t','400 HP','V-hull · STANAG 4569 L4a/4b','Lightweight ladder','Assembled or CKD']
      ]
    }
  ],


  /* ── platform range explorer ──
     x/y are normalised positions on the 1672×941 lineup renders. */
  platforms:[
    { k:'01', n:'4×4 Tactical', drive:'4×4', x:.131, y:.635, zoom:2.6,
      d:'Two-axle protected platform. The BASE 4×4 rolling chassis delivers this class as a turnkey package — engine, transmission, axles and transfer case, ready for a hull.',
      rows:[['DRIVETRAIN','4×4 all-wheel drive'],['BASE AXLES','2 × independent suspension'],
            ['TRANSFER CASE','TK-330 two-speed'],['PLATFORM','BS360-14C · 14 t GVW']] },
    { k:'02', n:'6×6 Tactical', drive:'6×6', x:.344, y:.567, zoom:2.4,
      d:'Three-axle logistics and weapon-carrier class. Added payload and gradient capability without giving up the turning circle of an independent front axle.',
      rows:[['DRIVETRAIN','6×6 all-wheel drive'],['BASE AXLES','3 × drive axle'],
            ['TRANSFER CASE','TK-420 two-speed'],['TYPICAL AXLE LOAD','7.5 – 11.5 t']] },
    { k:'03', n:'8×8 APC', drive:'8×8', x:.578, y:.470, zoom:2.2,
      d:'Four-axle armoured personnel carrier class. Full independent suspension across all eight wheel stations for ground clearance and articulation under armour.',
      rows:[['DRIVETRAIN','8×8 all-wheel drive'],['BASE AXLES','4 × independent suspension'],
            ['TRANSFER CASE','TK-423 · up to 32,000 Nm'],['TYPICAL AXLE LOAD','10.5 – 12.0 t']] },
    { k:'04', n:'8×8 IFV', drive:'8×8', x:.825, y:.387, zoom:2.2,
      d:'Heaviest wheeled class in the range — turreted infantry fighting vehicle. Maximum axle load rating with hub reduction and inter-wheel differential lock at every station.',
      rows:[['DRIVETRAIN','8×8 all-wheel drive'],['BASE AXLES','4 × BTA-120 class'],
            ['TRANSFER CASE','TK-423 / TK-535'],['MAX AXLE LOAD','12.0 t independent · 16.0 t rigid']] }
  ],

  /* ── drivetrain components (real BASE product renders) ── */
  dtn:[
    { id:'ids', k:'01', p:'ids', img:'prod-ids.png', n:'Independent Suspension Drive Axle',
      c:'Unmatched off-road performance',
      d:'Double-wishbone geometry with up to 400 mm of wheel travel, an aluminium differential housing, and hub reduction that multiplies torque at the wheel instead of through the driveline.',
      rows:[['AXLE LOAD','4.0 – 12.0 t'],['WHEEL TRAVEL','up to 400 mm'],['BRAKES','Hydraulic / air disc'],['CTIS','Ready across the range']] },
    { id:'rda', k:'02', p:'rda', img:'prod-rda.png', n:'Rigid Drive Axle',
      c:'Strength for heavy-duty platforms',
      d:'One-piece beam housing with the differential at the centreline and hub reduction at each end. Inter-wheel differential lock and a choice of air disc or air drum brakes.',
      rows:[['AXLE LOAD','11.0 – 16.0 t'],['STEERING','up to 40°'],['BRAKES','Air disc / air drum'],['CTIS','Ready across the range']] },
    { id:'tc', k:'03', p:'tc', img:'prod-tc.png', n:'Two-Speed Transfer Case',
      c:'Mission-ready in every terrain',
      d:'Modular gear set in a lightweight aluminium housing — up to 210 kg saved against a cast-iron equivalent — with interaxle differential lock and pneumatically actuated shifting.',
      rows:[['INPUT TORQUE','up to 32,000 Nm'],['DROP DISTANCE','330 – 535 mm'],['WEIGHT SAVING','66 – 210 kg'],['RATIOS','Custom, in-house design']] },
    { id:'rc', k:'04', p:'rc', img:'prod-rc.png', n:'4×4 Rolling Chassis',
      c:'The complete platform',
      d:'Engine, transmission, BASE axles and BASE transfer case delivered as one turnkey platform — frameless for monocoque hull integration, or on a ladder frame.',
      rows:[['GVW','14 t / 20 t'],['ENGINE','up to 400 HP'],['PROTECTION','STANAG L1 / 4569 L4a-4b'],['DELIVERY','Assembled or CKD']] }
  ],


  /* ── configurator selection tables ──
     Ratings are the published figures from the product specification tables.
     Transfer-case and rolling-chassis banding is indicative, not validated. */
  selector:{
    ids:[ {m:'BTA-040', t:4.0,  travel:'200 mm', brake:'Hydraulic disc'},
          {m:'BTA-075', t:7.5,  travel:'300 mm', brake:'Air disc'},
          {m:'BTA-105', t:10.5, travel:'400 mm', brake:'Air disc'},
          {m:'BTA-100', t:11.5, travel:'350 mm', brake:'Air disc'},
          {m:'BTA-120', t:12.0, travel:'360 mm', brake:'Air disc'} ],
    rda:[ {m:'RTA-110', t:11.0, steer:'37.6°',        brake:'Air disc'},
          {m:'RTA-120', t:12.0, steer:'40°',          brake:'Air drum'},
          {m:'RTA-135', t:13.5, steer:'non-steerable',brake:'Air drum'},
          {m:'RTA-160', t:16.0, steer:'non-steerable',brake:'Air drum'} ],
    tc:[  {m:'TK-330', nm:'5,000 Nm',  drop:'330 mm', upTo:14},
          {m:'TK-420', nm:'10,000 Nm', drop:'420 mm', upTo:24},
          {m:'TK-535', nm:'20,000 Nm', drop:'535 mm', upTo:36},
          {m:'TK-423', nm:'32,000 Nm', drop:'423 mm', upTo:999} ],
    rc:[  {m:'BS360-14C', gvw:14, hp:'up to 360 HP', prot:'Engine bay · STANAG L1'},
          {m:'BS400-20C', gvw:20, hp:'400 HP',       prot:'V-hull · STANAG 4569 L4a/4b'} ]
  },

  /* ── validation & R&D ──
     Rig descriptions follow BASE's own wording; clips are cut from the company film. */
  validation:[
    { n:'In-house test centre',   d:'A dedicated validation facility — testing runs alongside development rather than after it.', f:'v1' },
    { n:'Suspension test rig',    d:'Fatigue and durability cycling on complete suspension and axle assemblies.',                f:'v2' },
    { n:'Dynamometer test rig',   d:'Gear and lubrication testing under load, across the operating temperature range.',          f:'v3' },
    { n:'Metrology & inspection', d:'Dimensional measurement and inspection feeding straight back into design.',                 f:'v4' }
  ],

  /* ── field experience sequence ── */
  proven:[
    { n:'Desert & high heat', d:'Middle East and North Africa. Sustained high ambient temperature, sand ingress and heavy payload on unimproved surfaces.',
      regions:['SAUDI ARABIA','UAE','QATAR','EGYPT','NORTH AFRICA'] },
    { n:'Extreme cold', d:'Eastern Europe. Cold starts, ice traction and deep snow — where cold-weather lubrication and driveline sealing decide uptime.',
      regions:['UKRAINE','POLAND','EASTERN EUROPE'] },
    { n:'Mixed and extreme terrain', d:'Türkiye and Europe. Mud, gradient, rock and unimproved roads — the everyday condition that defines service life.',
      regions:['TÜRKİYE','EUROPE','CENTRAL ASIA'] }
  ],

  /* ── film chapters ──
     Titles are the film's own on-screen cards; `t` is the seek point in the full
     film (verified by frame inspection), `f` is the standalone segment. */
  chapters:[
    {n:'BEHIND EVERY MISSION',      s:'Opening',              t:0,   f:'ch01', p:1},
    {n:'TÜRKİYE · KOCAELİ',         s:'The facility',         t:12,  f:'ch02', p:1},
    {n:'ENGINEERED IN-HOUSE',       s:'Design & engineering', t:20,  f:'ch03', p:1},
    {n:'TESTED TO THE LIMITS',      s:'Validation & testing', t:24,  f:'ch04', p:1},
    {n:'COMPLETE CONFIDENTIALITY',  s:'Working with OEMs',    t:36,  f:'ch05', p:1},
    {n:'STRATEGIC KNOW-HOW',        s:'Flexible supply chain',t:48,  f:'ch06', p:1},
    {n:'PRECISION CLEANING',        s:'Process control',      t:60,  f:'ch07', p:1},
    {n:'LEAN ASSEMBLY',             s:'Assembly cells',       t:66,  f:'ch08', p:1},
    {n:'PROTECTIVE FINISH',         s:'Coating & finish',     t:72,  f:'ch09', p:1},
    {n:'COMPLETE ROLLING CHASSIS',  s:'Turnkey platform',     t:96,  f:'ch10', p:1},
    {n:'14 COUNTRIES',              s:'Global reach',         t:126, f:'ch11', p:1}
  ],


  /* ── field gallery ── */
  gallery:[
    {f:'field-photo.jpg',      c:'6×6 protected platform on BASE drivetrain', w:2},
    {f:'BASE-platform-ready-to-delivery-e1755156103423.jpg', c:'Rolling chassis loading for delivery', w:2},
    {f:'14t-1.webp',           c:'BS360-14C rolling chassis · 14 t GVW', w:1},
    {f:'BMC-Kirpi-II-3.jpg',   c:'Armoured vehicles in service', w:1},
    {f:'20t-3.webp',           c:'BS400-20C rolling chassis · 20 t GVW', w:1},
    {f:'dakar-rally-base-8.jpg', c:'Dakar Rally · VDR Racing Team', w:1}
  ],

  /* ── portfolio coverage ── */
  coverage:[
    ['4×4','8 t GVW'],['4×4','11–14 t GVW'],['4×4','15–18 t GVW'],
    ['4×4','20–23–31 t GVW'],['6×6','28 t GVW'],['8×8','32 t GVW']
  ],

  partners:[
    {n:'Aselsan', f:'aselsan-logo.webp'}, {n:'BMC', f:'bmc-logo.webp'},
    {n:'FNSS', f:'fnss.png'}, {n:'Katmerciler', f:'katmerciler.webp'},
    {n:'Anadolu Defense', f:'anadoludefense.webp'}, {n:'Calidus', f:'calidus-logo.webp'},
    {n:'Chaiseri', f:'chaiseri-logo.webp'}, {n:'Inguar', f:'inguar.webp'},
    {n:'J-Forces', f:'jforces.webp'}, {n:'STENG', f:'steng.png'},
    {n:'Ukrainian Armor', f:'ukranianarmorlogo.webp'}, {n:'Zastava', f:'zastava.webp'}
  ],

  ticker:[
    'IDEX 2027 · STAND 12-E13','66.5 m² CORNER STAND','2,500+ VEHICLE SETS IN SERVICE',
    'ISO 9001 · 14001 · 27001','4×4 / 6×6 / 8×8 DRIVETRAIN','DAKAR RALLY PROVEN',
    'IN-HOUSE VALIDATION CENTRE','GEBZE · KOCAELİ · TÜRKİYE'
  ]
};
