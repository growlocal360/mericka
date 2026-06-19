-- =========================================================================
-- Mericka Group — Content seed (services + sectors)
-- Paste into the Supabase SQL Editor and run. Idempotent: updates by slug,
-- safe to re-run. Requires the structured-field migrations to have run first
-- (positioning_headline / benefits / capabilities / summary on services,
--  intro_image_url on sectors).
-- =========================================================================

-- ----------------------------- SERVICES ----------------------------------

update services set
  positioning_headline = 'Elevate your project with Mericka Group',
  hero_image_url = '/images/scaffolding.jpg',
  benefits = array[
    'Accurate tracking saves you time and money while mitigating site congestion',
    'Industry-leading rope access procedures protect your safety record',
    'Innovative solutions keep your organization future-ready',
    'A massive skilled labor pool keeps your site fully staffed'
  ],
  capabilities = array[
    'EMMS scaffold tracking down to the craftsman and single scaffold',
    'Workfront planning, crew accountability, and resource level-loading',
    'Timely reporting so you can manage projects with less time committed',
    'Scaffolding, elevated work platforms, stair towers, and rope access'
  ],
  summary = 'Transform your projects with Mericka Group''s Scaffolding & Access Solutions. From scaffolding services, elevated work platforms, stair towers, and rope access, we have you covered from top to bottom — delivering reliable execution and data-driven results that eliminate schedule delays and enhance project efficiency.'
where slug = 'scaffolding-and-access-solutions';

update services set
  positioning_headline = 'We are the industry leader in turnaround planning and execution',
  hero_image_url = '/images/product-page-scaffolding-and-turnaround.jpg',
  benefits = array[
    'Proper planning of discovery work keeps schedules intact',
    'Accurate reporting keeps you informed and on track',
    'Innovative solutions keep your organization future-ready',
    'Aging assets demand higher quality and safety results'
  ],
  capabilities = array[
    'Industry-leading expertise from hundreds of large turnarounds',
    'EMMS workfront planning and crew accountability for on-schedule results',
    'Accurate, punctual reporting that takes less of your time',
    'A massive skilled labor pool, even for emergency coverage'
  ],
  summary = 'Experience seamless soft craft execution with Mericka Group''s Turnaround and Outage Support. From scaffolding and access to coatings, linings, and insulation, we are your one-stop shop for soft craft solutions — backed by innovative tracking, skilled professionals, and industry-leading experience.'
where slug = 'turnaround-and-outage-support';

update services set
  positioning_headline = 'Make your job easier with Mericka Group',
  hero_image_url = '/images/Nested-Maintenance-Background-Picture.jpg',
  benefits = array[
    'Efficient tracking improves your overall project schedule',
    'Forecasting workfronts increases your bottom line',
    'Innovative solutions keep your organization future-ready',
    'Aging assets demand higher quality and safety results'
  ],
  capabilities = array[
    'EMMS workfront planning and crew accountability for consistent results',
    'A multi-skilled labor pool that covers your site, even in emergencies',
    'Timely reporting so you can manage projects with less time committed',
    'In-house Quality and Safety programs built to exceed expectations'
  ],
  summary = 'Get the most out of your dollar with Mericka Group''s Nested Facility Maintenance Programs. From scaffold and access, tank and pipe insulation, to lead and asbestos abatement and coatings and linings, we are your one-stop shop for soft craft needs — designed for refineries and fractionation units.'
where slug = 'nested-facility-maintenance-programs';

update services set
  positioning_headline = 'Subcontracting made easy',
  hero_image_url = '/images/scaffold-background-2.jpg',
  benefits = array[
    'Consistent subcontractor execution leads to consistent results for your clients',
    'Accurate project reporting lets you manage your projects with confidence',
    'Innovative solutions help you win more projects',
    'Proper estimating and planning eliminates cost disputes'
  ],
  capabilities = array[
    'Every project treated as a unique problem to minimize cost and maximize efficiency',
    'EMMS workfront planning, crew accountability, and the data you need to manage',
    'A collaborative Pre-Job Process so we start and finish on the same page',
    'Quality and Safety programs aimed at zero injuries and minimal rework'
  ],
  summary = 'Transform the stress of missed schedules and cost overruns into seamless project execution by partnering with Mericka Group. As a trusted ally in the Energy, Aerospace, and Manufacturing sectors, we offer data-driven solutions and a skilled workforce. From coatings and linings, tank and piping insulation, to fireproofing and scaffold and access — don''t just hire a contractor, hire a partner.'
where slug = 'subcontracting-partnerships';

update services set
  positioning_headline = 'Your storage capacity is our concern',
  hero_image_url = '/images/tank-services.jpg',
  benefits = array[
    'Properly applied liners mitigate product and storage loss',
    'Aging assets demand higher quality and safety results',
    'Innovative solutions keep your organization future-ready',
    'On-time mobilization keeps your schedule intact'
  ],
  capabilities = array[
    'Years of tank expertise for maximum asset longevity and faster time to market',
    'EMMS workfront planning and crew accountability for consistent results',
    'Accurate, punctual reporting that takes less of your time',
    'Coating and blasting robotics for efficient, cost-effective work'
  ],
  summary = 'Protect your assets and ensure project success with Mericka Group''s Comprehensive Storage Tank Services. From internal liners to external coatings, tank insulation, scaffolding and access, and pipe integrity, we are your one-stop shop for soft craft solutions — streamlining operations and upholding safety standards.'
where slug = 'comprehensive-storage-tank-services';

update services set
  positioning_headline = 'We make out-of-sight projects easy',
  hero_image_url = '/images/more-pipes.jpg',
  benefits = array[
    'Accurate tracking eliminates progress confusion',
    'Quality craftsmanship mitigates DOT audit risk',
    'On-time mobilization keeps your schedule intact',
    'Aging assets demand higher quality and safety results'
  ],
  capabilities = array[
    'Timely reporting to manage multiple projects at once in less time',
    'DOT-compliant data tracking and storage to help you pass your next audit',
    'EMMS workfront planning and crew accountability for constant results',
    'Diverse, multi-skilled manpower so projects combine with ease'
  ],
  summary = 'Transform your pipeline maintenance with Mericka Group''s expertise. Our proven methods safeguard against corrosion and ensure DOT compliance, delivering reliable execution that keeps schedules intact. With crews experienced in soil-to-air transitions, lead and asbestos abatement, coatings, scaffold, and insulation, we are your one-stop shop for soft craft solutions.'
where slug = 'pipeline-maintenance-programs';


-- ----------------------------- SECTORS -----------------------------------
-- description is TipTap rich-text JSON (rendered by the "Mericka in [Sector]" block)

update sectors set
  hero_image_url = '/images/rockets.jpg',
  intro_image_url = '/images/scaffolding.jpg',
  description = '{"type":"doc","content":[
    {"type":"paragraph","content":[{"type":"text","text":"Aerospace is a specialized sector centered on the design, construction, and operation of the facilities that enable the successful deployment of rockets, satellites, and space missions. These sites, ranging from coastal launch pads to inland testing grounds, require robust infrastructure to support vehicle assembly, fuel storage, and mission control operations critical to space missions."}]},
    {"type":"paragraph","content":[{"type":"text","text":"For Mericka Group, the aerospace sector presents opportunities to deliver essential services such as scaffolding and access solutions, insulation, coatings and linings, fireproofing, and launch tower services, ensuring facilities remain safe, efficient, and capable of withstanding extreme conditions."}]},
    {"type":"paragraph","content":[{"type":"text","text":"As the aerospace sector accelerates with increased commercial space exploration and satellite launches, companies depend on skilled industrial partners, like Mericka Group, to maintain cutting-edge infrastructure, adapt to rapid technological advancements, and support the ambitious goals of a space-faring future."}]}
  ]}'::jsonb
where slug = 'aerospace';

update sectors set
  hero_image_url = '/images/oil-gas-market.jpg',
  intro_image_url = '/images/pipes.jpg',
  description = '{"type":"doc","content":[
    {"type":"paragraph","content":[{"type":"text","text":"The petrochemical market is a dynamic sector focused on converting raw materials from oil and gas into essential chemical products that underpin modern manufacturing and daily life, such as plastics, fertilizers, solvents, and synthetic fibers. This industry spans production facilities, processing plants, and distribution networks that transform hydrocarbons into high-value goods."}]},
    {"type":"paragraph","content":[{"type":"text","text":"For Mericka Group, the petrochemical market offers opportunities to provide vital services like insulation, scaffolding, coatings and linings, and maintenance expertise, ensuring plants operate safely, efficiently, and with minimal downtime."}]}
  ]}'::jsonb
where slug = 'petrochemical';

update sectors set
  hero_image_url = '/images/Paint-spray-tank-roof.jpg',
  intro_image_url = '/images/scaffolding.jpg',
  description = '{"type":"doc","content":[
    {"type":"paragraph","content":[{"type":"text","text":"The downstream oil and gas market encompasses the refining, distribution, and marketing of petroleum products, transforming crude oil and natural gas into fuels, lubricants, and petrochemicals that power industries and everyday life. This sector includes refineries, distribution networks, retail stations, and storage facilities that deliver finished products to end users."}]},
    {"type":"paragraph","content":[{"type":"text","text":"For Mericka Group, the downstream market offers opportunities to supply critical services like insulation, scaffolding, coatings and linings, and maintenance support, ensuring refineries and distribution systems operate safely and efficiently."}]}
  ]}'::jsonb
where slug = 'downstream-oil-gas';

update sectors set
  hero_image_url = '/images/more-pipes.jpg',
  intro_image_url = '/images/pipes.jpg',
  description = '{"type":"doc","content":[
    {"type":"paragraph","content":[{"type":"text","text":"The midstream oil and gas market serves as the critical link between upstream exploration and production and downstream refining and distribution, ensuring the seamless transportation, storage, and processing of hydrocarbons. This sector encompasses pipelines, terminals, storage facilities, and transportation networks that move crude oil, natural gas, and refined products to key markets worldwide."}]},
    {"type":"paragraph","content":[{"type":"text","text":"For Mericka Group, the midstream market presents unique opportunities to provide essential services such as insulation, scaffolding, coatings and linings, and maintenance solutions that enhance operational efficiency and safety — relying on skilled industrial partners, like Mericka Group, to keep operations running smoothly."}]}
  ]}'::jsonb
where slug = 'midstream-oil-gas';

update sectors set
  hero_image_url = '/images/semiconductor.jpg',
  intro_image_url = '/images/scaffolding-semiconductor.jpg',
  description = '{"type":"doc","content":[
    {"type":"paragraph","content":[{"type":"text","text":"The semiconductor market is a high-tech cornerstone of the modern economy, driving the production of integrated circuits and microchips that power everything from smartphones and computers to automotive systems and industrial machinery. This sector encompasses advanced manufacturing facilities, known as fabs, along with research labs and supply chains that produce these critical components under stringent precision and cleanliness standards."}]},
    {"type":"paragraph","content":[{"type":"text","text":"For Mericka Group, the semiconductor market offers opportunities to provide specialized services such as scaffolding and access solutions, coatings and linings, insulation, and maintenance support, ensuring that fabrication plants operate efficiently, safely, and with minimal disruptions."}]},
    {"type":"paragraph","content":[{"type":"text","text":"As demand for semiconductors surges amid rapid technological innovation and global digitalization, this market relies on skilled industrial partners, like Mericka Group, to uphold infrastructure integrity, meet rigorous production demands, and adapt to the evolving needs of a connected world."}]}
  ]}'::jsonb
where slug = 'semiconductor';

update sectors set
  hero_image_url = '/images/scaffold-background-2.jpg',
  intro_image_url = '/images/scaffolding.jpg',
  description = '{"type":"doc","content":[
    {"type":"paragraph","content":[{"type":"text","text":"Data centers are mission-critical, fast-track builds where speed, certainty, and control define success. These hyperscale and colocation facilities demand high-reliability infrastructure and tightly coordinated trades delivered on aggressive schedules with no margin for delay."}]},
    {"type":"paragraph","content":[{"type":"text","text":"For Mericka Group, the data center market is a strategic partnership with leading General Contractors — combining pre-construction advisory services rooted in energy-sector best practices with high-quality self-performed trade execution, including fast-track sequencing, speed-to-market optimization, work-at-heights coordination, and industry-leading safety and quality programs."}]},
    {"type":"paragraph","content":[{"type":"text","text":"From scaffolding, rope access, coatings, and surface preparation to insulation and specialized access, Mericka Group delivers integrated, high-performance solutions tailored to complex, fast-track data center programs."}]}
  ]}'::jsonb
where slug = 'data-centers';
