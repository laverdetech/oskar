import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS (Lucide Icons inspired SVGs) ---
// Komponenty pre ikony, aby bol kód prehľadnejší
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d={path} />
    </svg>
);

const HomeIcon = () => <Icon path="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;
const HistoryIcon = () => <Icon path="M1 4v6h6" />;
const LeafIcon = () => <Icon path="M2 12a10 10 0 0 1 10-10v0a10 10 0 0 1 10 10v0a10 10 0 0 1-10 10v0A10 10 0 0 1 2 12v0Z M12 12a10 10 0 0 0 10-10v0" />;
const GlobeIcon = () => <Icon path="M21.54 15H17a2 2 0 0 0-2 2v4.54" />;
const ScaleIcon = () => <Icon path="M16 16l-4-4-4 4M16 8l-4 4-4-4" />;
const SparklesIcon = () => <Icon path="M10 3L8 21M14 3l2 18M3 10h18M3 14h18" />;
const BookIcon = () => <Icon path="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />;
const SearchIcon = () => <Icon path="M21 21l-4.35-4.35 M16.65 10.35a6.3 6.3 0 1 1-12.6 0 6.3 6.3 0 0 1 12.6 0z" />;
const MenuIcon = () => <Icon path="M3 12h18 M3 6h18 M3 18h18" />;
const XIcon = () => <Icon path="M18 6L6 18 M6 6l12 12" />;
const StarIcon = () => <Icon path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
const SunIcon = () => <Icon path="M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 18.36l1.42-1.42 M18.36 4.22l1.42-1.42" />;
const PlanetIcon = () => <Icon path="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z M18 8h-2a4 4 0 0 0-4-4V2a8 8 0 0 1 6 6z" />;
const ClockIcon = () => <Icon path="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M12 6v6l4 2" />;

// --- DATA ---
// Tieto dáta sú extrahované z poskytnutého dokumentu
const popularityData = [
    { country: 'Švédsko', popularity: 0.1365, value: 3 },
    { country: 'Poľsko', popularity: 0.0738, value: 7 },
    { country: 'Nórsko', popularity: 0.0271, value: 15 },
    { country: 'Fínsko', popularity: 0.0268, value: 16 },
    { country: 'Rakúsko', popularity: 0.0198, value: 20 },
    { country: 'Španielsko', popularity: 0.0168, value: 25 },
    { country: 'Česko', popularity: 0.0107, value: 30 },
];

const gematriaData = [
    { name: 'Jednoduchá', value: 64, color: '#facc15' },
    { name: '6-násobná', value: 384, color: '#fb923c' },
    { name: 'NAEQ6', value: 34, color: '#60a5fa' },
    { name: 'Židovská', value: 231, color: '#a78bfa' },
];

const archetypeData = [
    { trait: 'Charizma', A: 90, fullMark: 100 },
    { trait: 'Vodcovstvo', A: 85, fullMark: 100 },
    { trait: 'Odvaha', A: 95, fullMark: 100 },
    { trait: 'Citlivosť', A: 70, fullMark: 100 },
    { trait: 'Optimizmus', A: 80, fullMark: 100 },
    { trait: 'Žiarlivosť', A: 40, fullMark: 100 },
];

const famousOskars = [
    { name: "Oskar I. Švédsky", field: "História", contribution: "Švédsky a nórsky kráľ, prispel k popularizácii mena.", img: "https://placehold.co/100x100/1f2937/a78bfa?text=OI" },
    { name: "Oskar Schindler", field: "Humanita", contribution: "Záchrana 1 200 Židov počas holokaustu.", img: "https://placehold.co/100x100/1f2937/a78bfa?text=OS" },
    { name: "Oscar Wilde", field: "Literatúra", contribution: "Írsky dramatik, autor Portrétu Doriana Graya.", img: "https://placehold.co/100x100/1f2937/a78bfa?text=OW" },
    { name: "Oskar Kokoschka", field: "Umenie", contribution: "Rakúsky expresionistický maliar.", img: "https://placehold.co/100x100/1f2937/a78bfa?text=OK" },
    { name: "Oskár Čepan", field: "Literatúra", contribution: "Slovenský literárny kritik a teoretik.", img: "https://placehold.co/100x100/1f2937/a78bfa?text=OČ" },
    { name: "Oscar Peterson", field: "Hudba", contribution: "Kanadský jazzový pianista a skladateľ.", img: "https://placehold.co/100x100/1f2937/a78bfa?text=OP" },
];

const numerologyData = [
    { trait: 'Vízia', A: 95, fullMark: 100 },
    { trait: 'Disciplína', A: 85, fullMark: 100 },
    { trait: 'Kreativita', A: 75, fullMark: 100 },
    { trait: 'Stabilita', A: 90, fullMark: 100 },
    { trait: 'Duchovný rast', A: 80, fullMark: 100 },
];

const famous22_4 = [
    { name: "Bill Gates", icon: "🧠", contribution: "Premena vízie o PC na realitu a globálna filantropia.", img: "https://placehold.co/100x100/1e1b4b/c4b5fd?text=BG" },
    { name: "Paul McCartney", icon: "🎵", contribution: "Staviteľ kultúrnych mostov cez hudbu, ktorá formovala generácie.", img: "https://placehold.co/100x100/1e1b4b/c4b5fd?text=PM" },
    { name: "Richard Branson", icon: "🚀", contribution: "Budovanie impéria Virgin, od hudby po vesmírne lety.", img: "https://placehold.co/100x100/1e1b4b/c4b5fd?text=RB" },
    { name: "Dalajláma", icon: "🌍", contribution: "Staviteľ mostov medzi kultúrami a duchovný líder pre mier.", img: "https://placehold.co/100x100/1e1b4b/c4b5fd?text=DL" },
];


// --- COMPONENTS ---

// Karta pre UI elementy
const Card = ({ children, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-lg ${className}`}
    >
        {children}
    </motion.div>
);

// Hlavička sekcie
const SectionHeader = ({ icon, title, subtitle, className = '' }) => (
    <div className={`flex items-center gap-4 mb-6 ${className}`}>
        <div className="bg-yellow-400/10 text-yellow-400 p-3 rounded-xl border border-yellow-400/20">
            {icon}
        </div>
        <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
            <p className="text-gray-400">{subtitle}</p>
        </div>
    </div>
);

// Úvodný panel
const HeroSection = ({ contentRef }) => (
    <div ref={contentRef} className="text-center py-20 px-4">
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter"
        >
            Komplexná Analýza Mena <span className="text-yellow-400">Oskar</span>
        </motion.h1>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
            Kultúrny, Historický a Mystický Rozbor
        </motion.p>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-400 max-w-2xl mx-auto mb-12"
        >
            Vitajte v interaktívnom vedomostnom prostredí venovanom menu Oskar. Preskúmajte jeho pôvod, cestu dejinami a skryté symbolické významy.
        </motion.p>
        
        {/* Mind Map */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8, type: 'spring' }}
            className="max-w-xl mx-auto"
        >
            <Card className="relative p-8">
                <h3 className="text-lg font-semibold text-white mb-6">Mapa Vzťahov</h3>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-full z-10">Oskar</div>
                
                {/* Lines */}
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 200 120">
                    <line x1="100" y1="60" x2="40" y2="30" stroke="#4a5568" strokeWidth="1"/>
                    <line x1="100" y1="60" x2="160" y2="30" stroke="#4a5568" strokeWidth="1"/>
                    <line x1="100" y1="60" x2="40" y2="90" stroke="#4a5568" strokeWidth="1"/>
                    <line x1="100" y1="60" x2="160" y2="90" stroke="#4a5568" strokeWidth="1"/>
                </svg>

                <div className="relative grid grid-cols-2 gap-y-16">
                    <div className="bg-gray-700/80 px-4 py-2 rounded-lg backdrop-blur-sm">Pôvod</div>
                    <div className="bg-gray-700/80 px-4 py-2 rounded-lg backdrop-blur-sm">Archetyp</div>
                    <div className="bg-gray-700/80 px-4 py-2 rounded-lg backdrop-blur-sm">História</div>
                    <div className="bg-gray-700/80 px-4 py-2 rounded-lg backdrop-blur-sm">Gematria</div>
                </div>
            </Card>
        </motion.div>
    </div>
);

// Sekcia: Kultúrna a historická identita
const HistorySection = ({ contentRef }) => (
    <div ref={contentRef}>
        <SectionHeader icon={<HistoryIcon />} title="Kultúrna a historická identita" subtitle="Časová os a popularita mena v priebehu vekov" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
                <h3 className="font-bold text-white text-lg mb-6">Kľúčové Míľniky</h3>
                <div className="relative border-l-2 border-gray-700 pl-8 space-y-12">
                    {/* Timeline Item 1 */}
                    <div className="relative group">
                        <div className="absolute -left-[38px] top-1.5 w-4 h-4 bg-gray-600 rounded-full border-2 border-gray-800 group-hover:bg-yellow-400 transition-colors"></div>
                        <h4 className="font-semibold text-yellow-400">18. storočie</h4>
                        <p className="text-white">Literárny pôvod</p>
                        <p className="text-gray-400 text-sm mt-1">Meno sa dostáva do európskeho povedomia vďaka "Ossianovskej poézii" Jamesa Macphersona.</p>
                    </div>
                    {/* Timeline Item 2 */}
                    <div className="relative group">
                        <div className="absolute -left-[38px] top-1.5 w-4 h-4 bg-gray-600 rounded-full border-2 border-gray-800 group-hover:bg-yellow-400 transition-colors"></div>
                        <h4 className="font-semibold text-yellow-400">zač. 19. storočia</h4>
                        <p className="text-white">Kráľovský patronát</p>
                        <p className="text-gray-400 text-sm mt-1">Napoleon Bonaparte menuje svojho krstného syna Oscarom, ktorý sa neskôr stáva švédskym kráľom Oskarom I.</p>
                    </div>
                    {/* Timeline Item 3 */}
                     <div className="relative group">
                        <div className="absolute -left-[38px] top-1.5 w-4 h-4 bg-gray-600 rounded-full border-2 border-gray-800 group-hover:bg-yellow-400 transition-colors"></div>
                        <h4 className="font-semibold text-yellow-400">1929</h4>
                        <p className="text-white">Moderné asociácie</p>
                        <p className="text-gray-400 text-sm mt-1">Založenie Cien Akadémie ("Oscary") vytvára trvalú pozitívnu asociáciu s excelentnosťou vo filme.</p>
                    </div>
                </div>
            </Card>
            <Card>
                <h3 className="font-bold text-white text-lg mb-4">Popularita v Európe</h3>
                <p className="text-gray-400 text-sm mb-6">Percentuálny podiel v populácii.</p>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={popularityData} layout="vertical" margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="country" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} width={80} />
                            <Tooltip
                                cursor={{ fill: 'rgba(250, 204, 21, 0.1)' }}
                                contentStyle={{
                                    background: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '0.75rem'
                                }}
                            />
                            <Bar dataKey="popularity" fill="#facc15" barSize={15} radius={[0, 10, 10, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    </div>
);

// Sekcia: Etymológia
const EtymologySection = ({ contentRef }) => (
    <div ref={contentRef}>
        <SectionHeader icon={<LeafIcon />} title="Etymológia mena" subtitle="Duálne korene a ich poetické významy" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-t-4 border-blue-400">
                <div className="flex items-center gap-4">
                    <LeafIcon className="w-8 h-8 text-blue-400"/>
                    <h3 className="font-bold text-white text-xl">Staronórsky pôvod</h3>
                </div>
                <p className="text-gray-400 mt-4 pl-12">Odvodené od mena <span className="font-semibold text-gray-200">Ásgeirr</span>.</p>
                <div className="mt-4 bg-gray-900/50 p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-400">áss („Boh“) + geirr („kopija“)</p>
                    <p className="text-2xl font-bold text-blue-400 mt-2">„Božia kopija“</p>
                </div>
            </Card>
            <Card className="border-t-4 border-emerald-400">
                 <div className="flex items-center gap-4">
                    <LeafIcon className="w-8 h-8 text-emerald-400"/>
                    <h3 className="font-bold text-white text-xl">Írsky gaelský pôvod</h3>
                </div>
                <p className="text-gray-400 mt-4 pl-12">Odvodené z mien <span className="font-semibold text-gray-200">Oscur</span> alebo <span className="font-semibold text-gray-200">Osgar</span>.</p>
                <div className="mt-4 bg-gray-900/50 p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-400">os („jeleň“) + cara („milovník“)</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-2">„Milovník jeleňov“</p>
                </div>
            </Card>
        </div>
    </div>
);

// Nový komponent pre SVG mapu sveta
const WorldMap = () => {
    const regions = [
        // Súradnice a dáta pre zvýraznené regióny
        { id: 'scandinavia', name: 'Škandinávia (Oskar)', path: 'M 93 13 L 96 14 L 98 20 L 96 23 L 92 25 L 90 20 L 93 13 Z', color: 'rgba(59, 130, 246, 0.7)' },
        { id: 'uk_ireland', name: 'UK & Írsko (Oscar)', path: 'M 85 24 L 83 23 L 83 28 L 86 30 L 88 28 L 88 25 Z', color: 'rgba(16, 185, 129, 0.7)' },
        { id: 'central_europe', name: 'Stredná Európa (Oskar)', path: 'M 95 25 L 98 22 L 102 24 L 103 29 L 98 32 L 95 30 Z', color: 'rgba(59, 130, 246, 0.7)' },
        { id: 'western_europe', name: 'Západná Európa (Oscar)', path: 'M 90 30 L 92 32 L 96 35 L 94 38 L 88 36 L 87 31 Z', color: 'rgba(16, 185, 129, 0.7)' },
        { id: 'iberia', name: 'Pyrenejský polostrov (Óscar)', path: 'M 85 38 L 87 37 L 89 40 L 85 42 L 83 40 Z', color: 'rgba(239, 68, 68, 0.7)' },
        { id: 'italy', name: 'Taliansko (Oscar)', path: 'M 97 34 L 99 33 L 101 38 L 98 42 L 97 38 Z', color: 'rgba(16, 185, 129, 0.7)' },
        { id: 'finland', name: 'Fínsko (Oskari)', path: 'M 100 18 L 104 19 L 103 23 L 100 22 Z', color: 'rgba(139, 92, 246, 0.7)' },
    ];

    const [hoveredRegion, setHoveredRegion] = useState(null);

    return (
        <div className="relative w-full h-full">
            <svg viewBox="0 0 200 100" className="w-full h-full">
                {/* Placeholder pre kontinenty - jednoduché tvary */}
                <path d="M 30 50 C 40 20, 70 20, 80 50 C 70 80, 40 80, 30 50 Z" fill="#374151" /> {/* Južná Amerika */}
                <path d="M 40 20 C 50 -10, 100 -10, 110 20 L 120 40 L 90 45 L 60 40 Z" fill="#374151" /> {/* Severná Amerika */}
                <path d="M 85 20 L 115 15 L 110 45 L 88 45 Z" fill="#4b5563" /> {/* Základ Európy */}
                <path d="M 115 15 L 160 20 L 155 50 L 110 45 Z" fill="#374151" /> {/* Ázia */}
                <path d="M 95 50 L 125 55 L 115 75 L 90 65 Z" fill="#374151" /> {/* Afrika */}
                <path d="M 130 70 L 150 75 L 145 85 L 125 80 Z" fill="#374151" /> {/* Austrália */}

                {/* Interaktívne regióny */}
                {regions.map(region => (
                    <motion.path
                        key={region.id}
                        d={region.path}
                        fill={region.color}
                        stroke="#111827"
                        strokeWidth="0.5"
                        onMouseEnter={() => setHoveredRegion(region.name)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        whileHover={{ fill: 'rgba(250, 204, 21, 1)', scale: 1.1, transition: { duration: 0.2 } }}
                        className="cursor-pointer"
                    />
                ))}
            </svg>
            {/* Tooltip pre zobrazenie názvu regiónu */}
            {hoveredRegion && (
                 <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white text-sm px-3 py-1 rounded-md backdrop-blur-sm pointer-events-none"
                >
                    {hoveredRegion}
                </motion.div>
            )}
        </div>
    );
};


// Sekcia: Globálna stopa
const GlobalPresenceSection = ({ contentRef }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const variants = [
        { name: "Oskar", regions: "Nemecko, Poľsko, Česko, Škandinávia" },
        { name: "Oscar", regions: "Anglicko, Francúzsko, Taliansko, Španielsko" },
        { name: "Óskar", regions: "Island, Maďarsko" },
        { name: "Óscar", regions: "Španielsko, Portugalsko" },
        { name: "Oskari", regions: "Fínsko" },
    ];
    
    const filteredVariants = variants.filter(v => 
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        v.regions.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div ref={contentRef}>
            <SectionHeader icon={<GlobeIcon />} title="Globálna stopa" subtitle="Varianty mena po celom svete" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <h3 className="font-bold text-white text-lg mb-4">Interaktívna mapa</h3>
                    <div className="bg-gray-900/50 rounded-lg h-80 p-4">
                        <WorldMap />
                    </div>
                </Card>
                <Card>
                    <h3 className="font-bold text-white text-lg mb-4">Varianty podľa jazyka</h3>
                    <div className="relative mb-4">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Hľadať variant..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-900/70 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div className="space-y-3 h-64 overflow-y-auto pr-2">
                        {filteredVariants.map(v => (
                            <div key={v.name} className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="font-bold text-yellow-400">{v.name}</p>
                                <p className="text-sm text-gray-400">{v.regions}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};


// Sekcia: Archetyp
const ArchetypeSection = ({ contentRef }) => (
    <div ref={contentRef}>
        <SectionHeader icon={<ScaleIcon />} title="Archetyp mena Oskar" subtitle="Osobnostný profil a známi nositelia" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <h3 className="font-bold text-white text-lg mb-4">Profil Osobnosti</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={archetypeData}>
                            <PolarGrid stroke="#4a5568" />
                            <PolarAngleAxis dataKey="trait" stroke="#9ca3af" fontSize={14} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false}/>
                            <Radar name="Oskar" dataKey="A" stroke="#facc15" fill="#facc15" fillOpacity={0.6} />
                            <Tooltip
                                contentStyle={{
                                    background: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '0.75rem'
                                }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
            <Card>
                 <h3 className="font-bold text-white text-lg mb-4">Známi Nositelia</h3>
                 <div className="space-y-4 h-80 overflow-y-auto pr-2">
                    {famousOskars.map(oskar => (
                        <motion.div 
                            key={oskar.name}
                            className="flex items-center gap-4 bg-gray-700/50 p-3 rounded-xl hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            <img src={oskar.img} alt={oskar.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                            <div>
                                <p className="font-bold text-white">{oskar.name}</p>
                                <p className="text-sm text-yellow-400">{oskar.field}</p>
                                <p className="text-xs text-gray-400 mt-1 hidden sm:block">{oskar.contribution}</p>
                            </div>
                        </motion.div>
                    ))}
                 </div>
            </Card>
        </div>
    </div>
);

// Sekcia: Gematria
const GematriaSection = ({ contentRef }) => (
    <div ref={contentRef}>
        <SectionHeader icon={<SparklesIcon />} title="Mystický rozmer (Gematria)" subtitle="Odhalenie skrytých numerických významov" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <h3 className="md:col-span-2 font-bold text-white text-lg">Výpočty v štyroch systémoch</h3>
                {gematriaData.map(item => (
                    <div key={item.name} className="bg-gray-900/50 p-4 rounded-xl text-center relative overflow-hidden">
                         <div className="absolute -top-2 -right-2 w-16 h-16" style={{backgroundColor: item.color, opacity: 0.1, filter: 'blur(20px)'}}></div>
                        <p className="text-sm font-semibold" style={{color: item.color}}>{item.name}</p>
                        <p className="text-4xl font-bold text-white my-2">{item.value}</p>
                        <p className="text-xs text-gray-400">
                            {item.name === 'Jednoduchá' && "Symbol štruktúry a stability."}
                            {item.name === '6-násobná' && "Potenciál pre transformáciu."}
                            {item.name === 'NAEQ6' && "Rovnováha a praktickosť."}
                            {item.name === 'Židovská' && "Signál rastu a pozitívnych zmien."}
                        </p>
                    </div>
                ))}
            </Card>
            <Card>
                <h3 className="font-bold text-white text-lg mb-4">Porovnanie výsledkov</h3>
                 <div className="h-64 mt-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={gematriaData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                           <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip
                                 contentStyle={{
                                    background: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '0.75rem'
                                }}
                            />
                            <Bar dataKey="value">
                                {gematriaData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    </div>
);


// NOVÁ SEKCE: Osobný Kontext a Kozmická Identita
const CosmicProfileSection = ({ contentRef }) => {
    const [activeTab, setActiveTab] = useState('Analýza');

    const personalityTraits = {
        'Analýza': {
            icon: '🔍',
            title: 'Analýza a detail',
            description: 'Praktický, systematický, spoľahlivý, orientovaný na zlepšovanie.',
            color: 'text-blue-400',
        },
        'Služba': {
            icon: '💚',
            title: 'Služba a etika',
            description: 'Pomáha iným cez reálne činy, lojálny a zodpovedný.',
            color: 'text-emerald-400',
        },
        'Rovnováha': {
            icon: '⚖️',
            title: 'Rovnováha a diplomacia',
            description: 'Na hranici s Váhami – diplomatickosť, potreba harmónie.',
            color: 'text-rose-400',
        },
        'Výzvy': {
            icon: '⚠️',
            title: 'Výzvy a rast',
            description: 'Perfekcionizmus, prehnaná kontrola, úzkosť z detailov.',
            color: 'text-amber-400',
        },
    };
    
     const [showCalculation, setShowCalculation] = useState(false);
     const [reflection, setReflection] = useState('');

    const generateReflection = () => {
        const reflections = [
            "Sila mena Oskar ťa vedie, zatiaľ čo tvoja cesta 22/4 stavia mosty pre ostatných.",
            "Ako Panna vidíš detaily, ako Majster Staviteľ staviaš z nich katedrály.",
            "Tvoja vizionárska energia (22) je uzemnená praktickosťou Panny. Sen sa stáva plánom.",
            "Meno ti dáva kráľovský mandát, dátum narodenia nástroje na jeho realizáciu.",
        ];
        setReflection(reflections[Math.floor(Math.random() * reflections.length)]);
    };

    return (
        <div ref={contentRef} className="border-t-2 border-indigo-500/30 pt-16">
            <SectionHeader 
                icon={<StarIcon />} 
                title="Osobný Kontext a Kozmická Identita" 
                subtitle="Spojenie mena, narodenia a kozmického rytmu" 
                className="!mb-10"
            />
            
            <Card className="mb-8 bg-indigo-900/10 border-indigo-500/30">
                <p className="text-center text-indigo-200">
                    Táto sekcia skúma, ako sa symbolika mena Oskar prelína s energiami dátumu narodenia – Panna s majstrovskou životnou cestou 22/4.
                </p>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Astrologický profil */}
                <Card className="lg:col-span-2 !p-0 overflow-hidden relative">
                    <div className="p-6">
                        <h3 className="font-bold text-white text-xl mb-4">Astrologický Profil: Panna</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6 pb-6 text-center">
                        <div className="bg-gray-900/50 p-3 rounded-lg"><p className="text-3xl">♍</p><p className="text-sm text-gray-400">Panna</p></div>
                        <div className="bg-gray-900/50 p-3 rounded-lg"><p className="text-3xl">☿</p><p className="text-sm text-gray-400">Merkúr</p></div>
                        <div className="bg-gray-900/50 p-3 rounded-lg"><p className="text-3xl">🌍</p><p className="text-sm text-gray-400">Zem</p></div>
                        <div className="bg-gray-900/50 p-3 rounded-lg"><p className="text-3xl">💎</p><p className="text-sm text-gray-400">Sodalit</p></div>
                        <div className="bg-gray-900/50 p-3 rounded-lg"><p className="text-3xl">🎨</p><p className="text-sm text-gray-400">Zemitá zelená</p></div>
                        <div className="bg-gray-900/50 p-3 rounded-lg"><p className="text-3xl">♎</p><p className="text-sm text-gray-400">Vplyv Váh</p></div>
                    </div>
                     <div className="absolute top-4 right-4 text-xs text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded-full">22.9.2025, 13:56 CEST</div>
                </Card>

                {/* Osobnostné črty */}
                <Card>
                    <h3 className="font-bold text-white text-xl mb-4">Osobnostné Črty</h3>
                    <div className="flex space-x-2 mb-4 border-b border-gray-700">
                        {Object.keys(personalityTraits).map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 text-sm font-medium transition-colors ${activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-start gap-4"
                        >
                            <span className={`text-3xl ${personalityTraits[activeTab].color}`}>{personalityTraits[activeTab].icon}</span>
                            <div>
                                <h4 className={`font-bold ${personalityTraits[activeTab].color}`}>{personalityTraits[activeTab].title}</h4>
                                <p className="text-gray-300 text-sm">{personalityTraits[activeTab].description}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                 {/* Numerológia */}
                <Card>
                     <h3 className="font-bold text-white text-xl mb-4">Numerológia: Životná Cesta 22/4</h3>
                     <div className="text-center bg-indigo-900/20 p-6 rounded-xl cursor-pointer" onClick={() => setShowCalculation(!showCalculation)}>
                        <p className="text-sm text-indigo-300">Dátum: 22.9.2025</p>
                        <p className="text-5xl font-bold text-white my-2">22/4</p>
                        <p className="text-indigo-200 font-semibold">"Master Builder"</p>
                        <AnimatePresence>
                        {showCalculation && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-gray-400 mt-4 text-left overflow-hidden"
                            >
                                <p><strong>Deň:</strong> 22 → 2+2 = 4</p>
                                <p><strong>Mesiac:</strong> 9</p>
                                <p><strong>Rok:</strong> 2+0+2+5 = 9</p>
                                <p className="font-bold mt-2"><strong>Súčet:</strong> 4 + 9 + 9 = 22</p>
                            </motion.div>
                        )}
                        </AnimatePresence>
                     </div>
                </Card>
                
                <Card>
                    <h3 className="font-bold text-white text-xl mb-4">Numerologický Profil</h3>
                     <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={numerologyData}>
                                <PolarGrid stroke="#4a5568" />
                                <PolarAngleAxis dataKey="trait" stroke="#c4b5fd" fontSize={12} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false}/>
                                <Radar name="Profil 22/4" dataKey="A" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.6} />
                                <Tooltip contentStyle={{ background: '#1e1b4b', border: '1px solid #4338ca', borderRadius: '0.75rem' }}/>
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Inšpirácie */}
             <div className="mt-8">
                 <h3 className="font-bold text-white text-xl mb-4 ml-2">Inšpirácie: Majstri Stavitelia (22/4)</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {famous22_4.map(person => (
                         <Card key={person.name} className="!p-4 text-center hover:border-indigo-400 transition-colors">
                             <img src={person.img} alt={person.name} className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-indigo-400/50" />
                             <h4 className="font-bold text-white">{person.name} <span className="text-lg">{person.icon}</span></h4>
                             <p className="text-xs text-gray-400 mt-1">{person.contribution}</p>
                         </Card>
                    ))}
                 </div>
            </div>

            {/* Záver a Reflexia */}
             <div className="mt-16">
                 <Card className="!p-8 bg-gradient-to-tr from-yellow-500/10 via-gray-900 to-indigo-500/10 border-yellow-400/30">
                     <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Rezonancia Mena a Narodenia</h3>
                        <p className="text-yellow-200/80 max-w-3xl mx-auto">
                            Oskar ako meno symbolizuje silu a božský mandát. Tvoj dátum narodenia 22.9.2025 pridáva k tejto energii praktický zmysel pre detail a schopnosť stavať mosty medzi snom a realitou.
                        </p>
                        <button onClick={generateReflection} className="mt-6 bg-yellow-400 text-gray-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-300 transition-colors">
                           Reflektuj
                        </button>
                        <AnimatePresence>
                        {reflection && (
                            <motion.p
                                key={reflection}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="italic text-gray-300 mt-4"
                            >
                                "{reflection}"
                            </motion.p>
                        )}
                        </AnimatePresence>
                     </div>
                 </Card>
             </div>

        </div>
    );
};


// NOVÁ SEKCE: Presný Vek
const LiveAgeSection = ({ contentRef }) => {
    const birthDate = new Date('2025-09-22T13:56:00');
    const [age, setAge] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        const updateAge = () => {
            const now = new Date();
            const distance = now.getTime() - birthDate.getTime();

            if (distance < 0) {
                setAge({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return false; // Stop interval if birth hasn't happened
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            setAge({ days, hours, minutes, seconds });
            return true; // Continue interval
        };

        if (updateAge()) {
             const interval = setInterval(updateAge, 1000);
            return () => clearInterval(interval);
        }
    }, []);

    const AgeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gray-900/70 rounded-lg flex items-center justify-center overflow-hidden border border-gray-700/50">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={value}
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ ease: "circOut", duration: 0.5 }}
                        className="absolute text-4xl md:text-5xl font-bold text-yellow-300"
                    >
                        {String(value).padStart(2, '0')}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="mt-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
        </div>
    );

    if (!isClient) {
        return <div ref={contentRef} className="h-96"></div>; // Placeholder for SSR
    }

    return (
        <div ref={contentRef}>
            <SectionHeader icon={<ClockIcon />} title="Presný Vek od Narodenia" subtitle="Uplynulý čas v reálnom čase" />
            <Card>
                <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
                    <AgeUnit value={age.days} label="Dní" />
                    <AgeUnit value={age.hours} label="Hodín" />
                    <AgeUnit value={age.minutes} label="Minút" />
                    <AgeUnit value={age.seconds} label="Sekúnd" />
                </div>
                <p className="text-center text-sm text-gray-500 mt-8">Dátum narodenia: 22. September 2025, 13:56 CEST</p>
            </Card>
        </div>
    );
};


// Sekcia: Záver
const SynthesisSection = ({ contentRef }) => (
    <div ref={contentRef}>
        <SectionHeader icon={<BookIcon />} title="Záverečná syntéza" subtitle="Spojenie histórie, kultúry a symboliky" />
        <Card>
            <div className="text-center">
                 <SparklesIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                 <h3 className="text-2xl font-bold text-white">Oskar: Meno s hĺbkou</h3>
                 <p className="text-gray-300 max-w-3xl mx-auto mt-4">
                    Identita mena Oskar je fascinujúcou zmesou overiteľnej histórie a subjektívnej mystiky. Je ukotvená v duálnom pôvode, ktorý spája severskú silu „Božej kopije“ s keltskou citlivosťou „milovníka jeleňov“. Jeho cesta dejinami, formovaná literatúrou, kráľmi a kultúrnymi ikonami, mu zaistila globálne uznanie, zatiaľ čo na Slovensku si zachováva status jedinečnosti. Gematrická analýza pridáva ďalšiu, ezoterickú vrstvu, ktorá obohacuje komplexnosť mena o symbolické významy spojené so stvorením, transformáciou a duchovným rastom.
                 </p>
                 <div className="mt-8 border-t-2 border-yellow-400/50 w-20 mx-auto pt-8">
                    <p className="text-lg italic text-gray-400">"Meno s hlbokým historickým odkazom a bohatým symbolickým potenciálom."</p>
                 </div>
            </div>
        </Card>
    </div>
);


const OskarDashboard = () => {
    const [activeSection, setActiveSection] = useState('úvod');
    const [isNavOpen, setIsNavOpen] = useState(false);
    
    const sectionRefs = {
        'úvod': useRef(null),
        'história': useRef(null),
        'etymológia': useRef(null),
        'globalita': useRef(null),
        'archetyp': useRef(null),
        'gematria': useRef(null),
        'kozmický profil': useRef(null),
        'vek': useRef(null),
        'syntéza': useRef(null),
    };
    
    const sections = [
        { id: 'úvod', label: 'Úvodný panel', icon: <HomeIcon /> },
        { id: 'história', label: 'História', icon: <HistoryIcon /> },
        { id: 'etymológia', label: 'Etymológia', icon: <LeafIcon /> },
        { id: 'globalita', label: 'Globálna stopa', icon: <GlobeIcon /> },
        { id: 'archetyp', label: 'Archetyp', icon: <ScaleIcon /> },
        { id: 'gematria', label: 'Gematria', icon: <SparklesIcon /> },
        { id: 'kozmický profil', label: 'Kozmický Profil', icon: <StarIcon /> },
        { id: 'vek', label: 'Presný Vek', icon: <ClockIcon /> },
        { id: 'syntéza', label: 'Syntéza', icon: <BookIcon /> },
    ];
    
    const handleNavClick = (id) => {
        sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
        setIsNavOpen(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = Object.keys(sectionRefs).find(key => sectionRefs[key].current === entry.target);
                        if (id) setActiveSection(id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
        );

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);


    const NavMenu = () => (
        <nav className="flex flex-col space-y-2 p-4">
            {sections.map(section => (
                <button
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    className={`flex items-center gap-4 px-4 py-2 rounded-lg text-left transition-colors duration-200 ${
                        activeSection === section.id
                            ? 'bg-yellow-400/10 text-yellow-400'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                    {section.icon}
                    <span className="font-medium">{section.label}</span>
                </button>
            ))}
        </nav>
    );

    return (
        <div className="bg-gray-900 text-white font-sans min-h-screen antialiased">
            <style>{`
                html { scroll-behavior: smooth; }
                body {
                  background-image:
                    radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.1) 0px, transparent 50%),
                    radial-gradient(at 97% 21%, hsla(38, 98%, 49%, 0.1) 0px, transparent 50%),
                    radial-gradient(at 52% 99%, hsla(355, 98%, 61%, 0.1) 0px, transparent 50%),
                    radial-gradient(at 10% 29%, hsla(256, 96%, 61%, 0.1) 0px, transparent 50%),
                    radial-gradient(at 97% 96%, hsla(38, 60%, 62%, 0.1) 0px, transparent 50%),
                    radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.1) 0px, transparent 50%),
                    radial-gradient(at 79% 53%, hsla(343, 68%, 63%, 0.1) 0px, transparent 50%);
                  background-color: #111827;
                }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #1f2937; }
                ::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #6b7280; }
            `}</style>

            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-40 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                     <BookIcon className="text-yellow-400" />
                     <h1 className="font-bold text-lg">Oskar Dashboard</h1>
                </div>
                <button onClick={() => setIsNavOpen(!isNavOpen)} className="p-2">
                    {isNavOpen ? <XIcon /> : <MenuIcon />}
                </button>
            </header>

            {/* Mobile Nav Panel */}
            <AnimatePresence>
                {isNavOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden fixed top-16 left-0 right-0 z-30 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800"
                    >
                       <NavMenu />
                    </motion.div>
                )}
            </AnimatePresence>


            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-72 h-screen sticky top-0 border-r border-gray-800">
                    <div className="p-6">
                        <div className="flex items-center gap-2">
                            <BookIcon className="text-yellow-400 w-8 h-8" />
                            <h1 className="font-bold text-xl">Oskar Dashboard</h1>
                        </div>
                         <div className="relative mt-6">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input type="text" placeholder="Vyhľadať..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400" />
                        </div>
                    </div>
                    <NavMenu />
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <HeroSection contentRef={sectionRefs['úvod']} />
                    <div className="p-4 md:p-8 lg:p-12 space-y-16">
                        <HistorySection contentRef={sectionRefs['história']} />
                        <EtymologySection contentRef={sectionRefs['etymológia']} />
                        <GlobalPresenceSection contentRef={sectionRefs['globalita']} />
                        <ArchetypeSection contentRef={sectionRefs['archetyp']} />
                        <GematriaSection contentRef={sectionRefs['gematria']} />
                        <CosmicProfileSection contentRef={sectionRefs['kozmický profil']} />
                        <LiveAgeSection contentRef={sectionRefs['vek']} />
                        <SynthesisSection contentRef={sectionRefs['syntéza']} />
                    </div>

                    <footer className="text-center p-8 border-t border-gray-800 text-gray-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} Vedomostný Dashboard Mena Oskar. Vytvorené s vášňou pre dáta a dizajn.</p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default OskarDashboard;
