import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const API_URL = 'http://localhost:4001'

const MUSIC_SRC = encodeURI(
    `${process.env.PUBLIC_URL || ''}/Dofus 1.29 - Les meilleures Musiques.mp3`
)

/* ---------- Icônes vectorielles (style ligne, pro) ---------- */

const ICON_PATHS = {
    sword: (
        <>
            <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
            <path d="M13 19l6-6" />
            <path d="M16 16l4 4" />
            <path d="M19 21l2-2" />
        </>
    ),
    bow: (
        <>
            <path d="M6 3c-3.5 5.5-3.5 12.5 0 18" />
            <path d="M6 3v18" />
            <path d="M6 12h15" />
            <path d="M17 8l4 4-4 4" />
        </>
    ),
    wand: (
        <>
            <path d="M3 21L14 10" />
            <path d="M14 6V3" />
            <path d="M18 10h3" />
            <path d="M16.5 7.5L19 5" />
            <path d="M11.5 7.5L9 5" />
            <path d="M16.5 12.5L19 15" />
        </>
    ),
    dagger: (
        <>
            <path d="M12 2l2.5 7L12 22l-2.5-13z" />
            <path d="M7.5 9h9" />
        </>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    book: (
        <>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </>
    ),
    shuffle: (
        <>
            <path d="M16 3h5v5" />
            <path d="M4 20L21 3" />
            <path d="M21 16v5h-5" />
            <path d="M15 15l6 6" />
            <path d="M4 4l5 5" />
        </>
    ),
    reset: (
        <>
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
        </>
    ),
    rotateLeft: (
        <>
            <path d="M9 14L4 9l5-5" />
            <path d="M4 9h10a6 6 0 0 1 0 12h-3" />
        </>
    ),
    rotateRight: (
        <>
            <path d="M15 14l5-5-5-5" />
            <path d="M20 9H10a6 6 0 0 0 0 12h3" />
        </>
    ),
    star: (
        <path
            d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7L2 9.5l7.1-.6z"
            fill="currentColor"
            stroke="none"
        />
    ),
    info: (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-5" />
            <path d="M12 8h.01" />
        </>
    ),
    soundOn: (
        <>
            <path d="M11 5L6 9H2v6h4l5 4z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9.5 9.5 0 0 1 0 13" />
        </>
    ),
    soundOff: (
        <>
            <path d="M11 5L6 9H2v6h4l5 4z" />
            <path d="M22 9l-6 6" />
            <path d="M16 9l6 6" />
        </>
    ),
    flame: (
        <>
            <path d="M12 2c4.5 5 6.5 8.3 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.3 7.5 7 12 2z" />
            <path d="M12 9c1.5 2 2.5 3.2 2.5 4.8a2.5 2.5 0 0 1-5 0C9.5 12.2 10.5 11 12 9z" />
        </>
    ),
    chevronsUp: (
        <>
            <path d="M7 14l5-5 5 5" />
            <path d="M7 19l5-5 5 5" />
        </>
    ),
    burst: (
        <>
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="M5 5l2.8 2.8" />
            <path d="M16.2 16.2L19 19" />
            <path d="M19 5l-2.8 2.8" />
            <path d="M7.8 16.2L5 19" />
            <circle cx="12" cy="12" r="3" />
        </>
    ),
    arrow: (
        <>
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
        </>
    ),
    wind: (
        <>
            <path d="M3 8h9a3 3 0 1 0-3-5" />
            <path d="M3 12h13" />
            <path d="M3 16h7a3 3 0 1 1-3 5" />
        </>
    ),
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
    portal: (
        <>
            <path d="M12 21a9 9 0 1 1 9-9" />
            <path d="M12 17a5 5 0 1 1 5-5" />
            <path d="M12 13a1 1 0 1 1 1-1" />
        </>
    ),
    snow: (
        <>
            <path d="M12 2v20" />
            <path d="M3.5 7l17 10" />
            <path d="M20.5 7l-17 10" />
        </>
    ),
    ghost: (
        <>
            <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 3L12 19l2.5 3L17 19l3 3V10a8 8 0 0 0-8-8z" />
            <path d="M9.5 10h.01" />
            <path d="M14.5 10h.01" />
        </>
    ),
    poison: (
        <>
            <path d="M12 2s6.5 7.2 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 9.2 12 2 12 2z" />
            <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
        </>
    ),
    cross: (
        <>
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
        </>
    ),
    wall: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <path d="M3 12h18" />
            <path d="M9 5v7" />
            <path d="M15 12v7" />
        </>
    ),
    target: (
        <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v3" />
            <path d="M12 18v3" />
            <path d="M3 12h3" />
            <path d="M18 12h3" />
        </>
    ),
    shieldPlus: (
        <>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v6" />
            <path d="M9 11h6" />
        </>
    ),
    paw: (
        <>
            <circle cx="8" cy="8" r="1.7" />
            <circle cx="16" cy="8" r="1.7" />
            <circle cx="4.8" cy="12.5" r="1.5" />
            <circle cx="19.2" cy="12.5" r="1.5" />
            <path d="M12 11.5c-3 0-5.5 2.5-5.5 5.1 0 1.8 1.3 3.1 3 3.1 1 0 1.7-.5 2.5-.5s1.5.5 2.5.5c1.7 0 3-1.3 3-3.1 0-2.6-2.5-5.1-5.5-5.1z" />
        </>
    ),
    feather: (
        <>
            <path d="M20.2 3.8a6 6 0 0 0-8.5 0L5 10.5V19h8.5l6.7-6.7a6 6 0 0 0 0-8.5z" />
            <path d="M16 8L2 22" />
            <path d="M17.5 15H9" />
        </>
    ),
    galaxy: (
        <>
            <circle cx="12" cy="12" r="3" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
        </>
    ),
}

const Icon = ({ name, size = 20, stroke = 1.8, className }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {ICON_PATHS[name]}
    </svg>
)

/* ---------- Visages (attitudes) ---------- */

const FACE_FEATURES = {
    sourire: (
        <>
            <circle cx="8.5" cy="10" r="1" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="10" r="1" fill="currentColor" stroke="none" />
            <path d="M8 14.5q4 3.5 8 0" />
        </>
    ),
    cool: (
        <>
            <path d="M5.5 9.5h5v2.6a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1z" />
            <path d="M13.5 9.5h5v2.6a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1z" />
            <path d="M10.5 10h3" />
            <path d="M9 16q3 2 6 0" />
        </>
    ),
    fier: (
        <>
            <path d="M7 10q1.5-2 3 0" />
            <path d="M14 10q1.5-2 3 0" />
            <path d="M9 15q3 2 6-.5" />
        </>
    ),
    fatigue: (
        <>
            <path d="M7.5 10h3" />
            <path d="M13.5 10h3" />
            <circle cx="12" cy="15.5" r="1.6" />
        </>
    ),
    malicieux: (
        <>
            <path d="M7 8l3.5 1.5" />
            <path d="M17 8l-3.5 1.5" />
            <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
            <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
            <path d="M9 15.5q4 2 6-1" />
        </>
    ),
    fou: (
        <>
            <circle cx="8.5" cy="10" r="1.6" />
            <circle cx="15.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
            <path d="M8 15q2-2 4 0t4 0" />
        </>
    ),
}

const FaceIcon = ({ variant, size = 26 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="9.5" />
        {FACE_FEATURES[variant]}
    </svg>
)

/* ---------- Coupes de cheveux ---------- */

const HAIR_CUTS = [
    {
        id: 'court',
        label: 'Court',
        d: 'M70 82 Q68 44 100 44 Q132 44 130 82 Q122 60 100 58 Q78 60 70 82 Z',
    },
    {
        id: 'epis',
        label: 'En épis',
        d: 'M70 82 Q68 52 80 50 L84 36 92 48 100 32 108 48 116 36 120 50 Q132 52 130 82 Q120 60 100 58 Q80 60 70 82 Z',
    },
    {
        id: 'long',
        label: 'Long',
        d: 'M70 80 Q68 44 100 44 Q132 44 130 80 L134 132 Q126 128 122 114 Q122 70 100 62 Q78 70 78 114 Q74 128 66 132 Z',
    },
    {
        id: 'queue',
        label: 'Queue de cheval',
        d: 'M70 82 Q68 44 100 44 Q132 44 130 82 Q122 60 100 58 Q78 60 70 82 Z M126 58 Q150 66 146 100 Q140 94 136 82 Q134 68 122 64 Z',
    },
    {
        id: 'iroquois',
        label: 'Iroquois',
        d: 'M92 56 Q92 30 100 26 Q108 30 108 56 Q104 52 100 52 Q96 52 92 56 Z',
    },
    { id: 'rase', label: 'Rasé', d: '' },
]

/* ---------- Personnage vectoriel piloté par les couleurs ---------- */

export const CharacterFigure = ({ colors, cut, className }) => {
    const hair = HAIR_CUTS.find((h) => h.id === cut)
    return (
        <svg viewBox="0 0 200 300" className={className} aria-hidden="true">
            {/* cape */}
            <path
                d="M64 116 L136 116 L142 200 Q100 214 58 200 Z"
                fill={colors.vetements2}
                opacity="0.92"
            />
            {/* jambes */}
            <rect x="80" y="172" width="16" height="42" rx="5" fill={colors.vetements2} />
            <rect x="104" y="172" width="16" height="42" rx="5" fill={colors.vetements2} />
            {/* bottes */}
            <rect x="77" y="208" width="21" height="17" rx="6" fill={colors.vetements4} />
            <rect x="102" y="208" width="21" height="17" rx="6" fill={colors.vetements4} />
            {/* bras */}
            <rect x="50" y="116" width="15" height="46" rx="7.5" fill={colors.vetements1} />
            <rect x="135" y="116" width="15" height="46" rx="7.5" fill={colors.vetements1} />
            <circle cx="57.5" cy="166" r="7" fill={colors.peau} />
            <circle cx="142.5" cy="166" r="7" fill={colors.peau} />
            {/* torse */}
            <path
                d="M72 112 h56 q6 0 7 8 l4 46 q0 6 -8 6 H69 q-8 0 -8 -6 l4 -46 q1 -8 7 -8 z"
                fill={colors.vetements1}
            />
            <rect x="95" y="112" width="10" height="60" fill={colors.vetements3} />
            {/* épaulettes */}
            <circle cx="63" cy="119" r="10" fill={colors.vetements3} />
            <circle cx="137" cy="119" r="10" fill={colors.vetements3} />
            {/* ceinture */}
            <rect x="62" y="163" width="76" height="10" rx="4" fill={colors.vetements4} />
            <rect x="94" y="161" width="12" height="14" rx="3" fill={colors.vetements3} />
            {/* cou + tête */}
            <rect x="93" y="100" width="14" height="12" fill={colors.peau} />
            <circle cx="70" cy="80" r="5" fill={colors.peau} />
            <circle cx="130" cy="80" r="5" fill={colors.peau} />
            <circle cx="100" cy="78" r="30" fill={colors.peau} />
            {/* visage */}
            <ellipse cx="90" cy="78" rx="3" ry="4.2" fill="#2b2b33" />
            <ellipse cx="110" cy="78" rx="3" ry="4.2" fill="#2b2b33" />
            <path
                d="M94 91 Q100 95 106 91"
                fill="none"
                stroke="#2b2b33"
                strokeWidth="2"
                strokeLinecap="round"
            />
            {/* cheveux ou bandeau */}
            {hair && hair.d ? (
                <path d={hair.d} fill={colors.cheveux} />
            ) : (
                <rect x="72" y="55" width="56" height="9" rx="4.5" fill={colors.vetements3} />
            )}
        </svg>
    )
}

/* miniature de coupe pour le panneau de droite */
const HairThumb = ({ cut, colors }) => (
    <svg viewBox="52 22 96 84" aria-hidden="true">
        <circle cx="100" cy="78" r="30" fill={colors.peau} />
        {cut.d ? (
            <path d={cut.d} fill={colors.cheveux} />
        ) : (
            <rect x="72" y="55" width="56" height="9" rx="4.5" fill={colors.vetements3} />
        )}
    </svg>
)

/* ---------- Données des classes ---------- */

const CHARACTERS = [
    {
        id: 'valior',
        name: 'Valior',
        subtitle: 'Guerrier Téméraire',
        faction: 'Les Lames Ardentes',
        weapon: 'Épée lourde',
        icon: 'sword',
        color: '#ff5c4d',
        description:
            "Les Valior sont des guerriers fonceurs et sans reproche ! Une chose est sûre : ils savent faire parler les armes. Leur tempérament impétueux en fait des paladins de l'extrême, capables du meilleur… comme du pire !",
        skills: [
            { icon: 'burst', name: 'Frappe Sismique' },
            { icon: 'chevronsUp', name: 'Charge Royale' },
            { icon: 'flame', name: 'Colère du Titan' },
        ],
    },
    {
        id: 'sylphar',
        name: 'Sylphar',
        subtitle: 'Archère Lunaire',
        faction: 'Les Archers Lunaires',
        weapon: 'Arc magique',
        icon: 'bow',
        color: '#89b820',
        description:
            "Les Sylphar utilisent des arcs enchantés capables de contrôler le terrain. Tireurs d'élite, ils éliminent leurs ennemis à distance avec une précision mortelle avant même d'être repérés.",
        skills: [
            { icon: 'arrow', name: 'Flèche Perforante' },
            { icon: 'wind', name: 'Tir Repoussant' },
            { icon: 'moon', name: 'Œil du Chasseur' },
        ],
    },
    {
        id: 'aelys',
        name: 'Aelys',
        subtitle: "Tisseuse d'Éther",
        faction: "Les Tisseurs d'Éther",
        weapon: 'Bâton',
        icon: 'wand',
        color: '#b06cff',
        description:
            "Les Aelys manipulent une énergie ancienne appelée l'Éther pour modifier la réalité. Très stratégiques, ils contrôlent le champ de bataille en téléportant leurs alliés et en emprisonnant le temps lui-même.",
        skills: [
            { icon: 'burst', name: 'Explosion Astrale' },
            { icon: 'portal', name: 'Portail Éthéré' },
            { icon: 'snow', name: 'Prison du Temps' },
        ],
    },
    {
        id: 'noxian',
        name: 'Noxian',
        subtitle: 'Ombre Silencieuse',
        faction: 'Les Ombres Silencieuses',
        weapon: 'Dagues',
        icon: 'dagger',
        color: '#7d8cff',
        description:
            "Les Noxian attaquent depuis les ténèbres et éliminent rapidement leurs adversaires. Invisibles, mobiles et mortels, ils frappent là où on ne les attend jamais… puis disparaissent sans laisser de trace.",
        skills: [
            { icon: 'ghost', name: 'Pas Fantôme' },
            { icon: 'poison', name: 'Lame Empoisonnée' },
            { icon: 'cross', name: 'Exécution Noire' },
        ],
    },
    {
        id: 'gairon',
        name: 'Gaïron',
        subtitle: 'Gardien Primordial',
        faction: 'Les Gardiens Primordiaux',
        weapon: 'Marteau + bouclier',
        icon: 'shield',
        color: '#f4c260',
        description:
            "Les Gaïron utilisent la puissance de la terre pour protéger leurs alliés. Véritables remparts vivants, ils encaissent les coups à la place de leurs compagnons et ne reculent jamais d'un pouce.",
        skills: [
            { icon: 'wall', name: 'Mur de Pierre' },
            { icon: 'target', name: 'Séisme Défensif' },
            { icon: 'shieldPlus', name: 'Serment du Gardien' },
        ],
    },
    {
        id: 'lyria',
        name: 'Lyria',
        subtitle: 'Invocatrice Astrale',
        faction: 'Les Invocatrices Astrales',
        weapon: 'Grimoire',
        icon: 'book',
        color: '#38c8ff',
        description:
            "Les Lyria invoquent des créatures liées aux étoiles. Fines stratèges, elles submergent le champ de bataille d'unités célestes et peuvent fusionner leurs invocations en une créature supérieure.",
        skills: [
            { icon: 'paw', name: 'Loup Stellaire' },
            { icon: 'feather', name: 'Esprit Protecteur' },
            { icon: 'galaxy', name: 'Fusion Astrale' },
        ],
    },
]

const COLOR_SLOTS = [
    { key: 'peau', label: 'Peau', initial: '#EFA06C' },
    { key: 'cheveux', label: 'Cheveux', initial: '#E97A21' },
    { key: 'vetements1', label: 'Vêtements 1', initial: '#E0DAC1' },
    { key: 'vetements2', label: 'Vêtements 2', initial: '#BA2B3C' },
    { key: 'vetements3', label: 'Vêtements 3', initial: '#076381' },
    { key: 'vetements4', label: 'Vêtements 4', initial: '#BDA976' },
]

const ATTITUDES = ['sourire', 'cool', 'fier', 'fatigue', 'malicieux', 'fou']

const NAME_SYLLABLES = ['ka', 'ryn', 'thal', 'or', 'is', 'mel', 'dra', 'vor', 'lu', 'nae', 'zik', 'sha']

const randomHex = () =>
    `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase()}`

const randomName = () => {
    const count = 2 + Math.floor(Math.random() * 2)
    let name = ''
    for (let i = 0; i < count; i++) {
        name += NAME_SYLLABLES[Math.floor(Math.random() * NAME_SYLLABLES.length)]
    }
    return name.charAt(0).toUpperCase() + name.slice(1)
}

const initialColors = Object.fromEntries(COLOR_SLOTS.map((s) => [s.key, s.initial]))

/* ---------- Page ---------- */

const Home = () => {
    const [selectedId, setSelectedId] = useState(CHARACTERS[0].id)
    const [colors, setColors] = useState(initialColors)
    const [hairCut, setHairCut] = useState(HAIR_CUTS[0].id)
    const [attitude, setAttitude] = useState(0)
    const [characterName, setCharacterName] = useState('')
    const [facing, setFacing] = useState(1)
    const [musicOn, setMusicOn] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState(null)
    const audioRef = useRef(null)
    const navigate = useNavigate()

    const selected = CHARACTERS.find((c) => c.id === selectedId)

    /* la lecture automatique est souvent bloquée : on démarre à la
       première interaction si le navigateur a refusé */
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return undefined
        audio.volume = 0.35

        const tryPlay = () =>
            audio
                .play()
                .then(() => setMusicOn(true))
                .catch(() => setMusicOn(false))

        tryPlay()

        const onFirstInteraction = () => {
            if (audio.paused) tryPlay()
            window.removeEventListener('pointerdown', onFirstInteraction)
        }
        window.addEventListener('pointerdown', onFirstInteraction)
        return () => window.removeEventListener('pointerdown', onFirstInteraction)
    }, [])

    const toggleMusic = () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false))
        } else {
            audio.pause()
            setMusicOn(false)
        }
    }

    const setColor = (key, value) => {
        setColors((prev) => ({ ...prev, [key]: value.toUpperCase() }))
    }

    const shuffleColor = (key) => setColor(key, randomHex())

    const shuffleAllColors = () =>
        setColors(Object.fromEntries(COLOR_SLOTS.map((s) => [s.key, randomHex()])))

    const resetColors = () => setColors(initialColors)

    const pickRandomClass = () => {
        const other = CHARACTERS.filter((c) => c.id !== selectedId)
        setSelectedId(other[Math.floor(Math.random() * other.length)].id)
    }

    const handlePlay = async () => {
        if (!characterName.trim()) {
            setSaveError('Choisis un nom de personnage avant de jouer !')
            return
        }
        setSaving(true)
        setSaveError(null)
        try {
            const response = await fetch(`${API_URL}/api/characters`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: characterName.trim(),
                    classId: selected.id,
                    className: selected.name,
                    subtitle: selected.subtitle,
                    colors,
                    hairCut,
                    attitude,
                }),
            })
            if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                throw new Error(data.error || `Erreur serveur (${response.status})`)
            }
            const character = await response.json()
            // le personnage est en base : on garde une copie locale et direction la map
            localStorage.setItem('indra-character', JSON.stringify(character))
            navigate('/map', { state: { character } })
        } catch (err) {
            setSaveError(
                err.message === 'Failed to fetch'
                    ? 'Impossible de joindre le serveur. Le backend est-il lancé sur le port 4001 ?'
                    : err.message
            )
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="cc">
            <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

            <div className="cc-sky" aria-hidden="true">
                <div className="cc-stars" />
                <div className="cc-clouds" />
            </div>

            <button
                type="button"
                className="cc-music"
                title={musicOn ? 'Couper la musique' : 'Activer la musique'}
                onClick={toggleMusic}
            >
                <Icon name={musicOn ? 'soundOn' : 'soundOff'} size={22} />
            </button>

            {/* ------- Colonne gauche : classes ------- */}
            <aside className="cc-panel cc-left">
                <div className="cc-class-grid">
                    {CHARACTERS.map((character) => (
                        <button
                            key={character.id}
                            type="button"
                            className={
                                character.id === selectedId
                                    ? 'cc-class-tile selected'
                                    : 'cc-class-tile'
                            }
                            title={character.name}
                            style={{ '--accent': character.color }}
                            onClick={() => setSelectedId(character.id)}
                        >
                            <Icon name={character.icon} size={26} />
                        </button>
                    ))}
                    <button
                        type="button"
                        className="cc-class-tile cc-random"
                        title="Classe aléatoire"
                        onClick={pickRandomClass}
                    >
                        <Icon name="shuffle" size={20} />
                    </button>
                </div>

                <div className="cc-class-info">
                    <h2 className="cc-class-subtitle">{selected.subtitle}</h2>
                    <div className="cc-divider" style={{ '--accent': selected.color }}>
                        <span className="cc-divider-line" />
                        <span className="cc-divider-icons">
                            <Icon name={selected.icon} size={16} />
                            <Icon name="chevronsUp" size={16} />
                            <Icon name="star" size={14} />
                        </span>
                        <span className="cc-divider-line" />
                    </div>
                    <p className="cc-class-description">{selected.description}</p>
                    <div className="cc-spells">
                        {selected.skills.map((skill) => (
                            <span
                                key={skill.name}
                                className="cc-spell"
                                title={skill.name}
                                style={{ '--accent': selected.color }}
                            >
                                <Icon name={skill.icon} size={22} />
                            </span>
                        ))}
                    </div>
                    <button type="button" className="cc-ghost-button">
                        Voir tous les sorts
                    </button>
                </div>
            </aside>

            {/* ------- Centre : aperçu du personnage ------- */}
            <main className="cc-center">
                <div className="cc-class-name">
                    <h1>{selected.name}</h1>
                    <Icon name="star" size={18} className="cc-star" />
                </div>

                <div className="cc-stage">
                    <button
                        type="button"
                        className="cc-rotate"
                        aria-label="Tourner à gauche"
                        onClick={() => setFacing(-1)}
                    >
                        <Icon name="rotateLeft" size={24} />
                    </button>

                    <div className="cc-island">
                        <div
                            className="cc-hero"
                            style={{ transform: `scaleX(${facing})` }}
                        >
                            <CharacterFigure colors={colors} cut={hairCut} className="cc-hero-svg" />
                        </div>
                        <div className="cc-island-top" />
                        <div className="cc-island-rock" />
                    </div>

                    <button
                        type="button"
                        className="cc-rotate"
                        aria-label="Tourner à droite"
                        onClick={() => setFacing(1)}
                    >
                        <Icon name="rotateRight" size={24} />
                    </button>
                </div>

                <div className="cc-name-box">
                    <label htmlFor="cc-name">
                        Nom de personnage <Icon name="info" size={13} />
                    </label>
                    <div className="cc-name-row">
                        <input
                            id="cc-name"
                            type="text"
                            value={characterName}
                            maxLength={20}
                            onChange={(e) => setCharacterName(e.target.value)}
                        />
                        <button
                            type="button"
                            className="cc-shuffle"
                            title="Nom aléatoire"
                            onClick={() => setCharacterName(randomName())}
                        >
                            <Icon name="shuffle" size={16} />
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    className="cc-play"
                    disabled={saving}
                    onClick={handlePlay}
                >
                    {saving ? 'Création…' : 'Jouer'}
                </button>
                {saveError ? <p className="cc-error">{saveError}</p> : null}
            </main>

            {/* ------- Colonne droite : personnalisation ------- */}
            <aside className="cc-panel cc-right">
                <div className="cc-section">
                    <h3 className="cc-section-title">Coiffure</h3>
                    <div className="cc-hair-grid">
                        {HAIR_CUTS.map((cut) => (
                            <button
                                key={cut.id}
                                type="button"
                                className={
                                    cut.id === hairCut
                                        ? 'cc-hair-tile selected'
                                        : 'cc-hair-tile'
                                }
                                title={cut.label}
                                onClick={() => setHairCut(cut.id)}
                            >
                                <HairThumb cut={cut} colors={colors} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="cc-section">
                    <div className="cc-color-tools">
                        <h3 className="cc-section-title">Couleurs</h3>
                        <button
                            type="button"
                            className="cc-shuffle"
                            title="Couleurs aléatoires"
                            onClick={shuffleAllColors}
                        >
                            <Icon name="shuffle" size={16} />
                        </button>
                        <button
                            type="button"
                            className="cc-shuffle"
                            title="Réinitialiser les couleurs"
                            onClick={resetColors}
                        >
                            <Icon name="reset" size={16} />
                        </button>
                    </div>

                    {COLOR_SLOTS.map((slot) => (
                        <div key={slot.key} className="cc-color-row">
                            <span className="cc-color-label">{slot.label}</span>
                            <input
                                type="color"
                                className="cc-color-input"
                                value={colors[slot.key].toLowerCase()}
                                title={`Choisir la couleur — ${slot.label}`}
                                onChange={(e) => setColor(slot.key, e.target.value)}
                            />
                            <span className="cc-hex">{colors[slot.key]}</span>
                            <button
                                type="button"
                                className="cc-shuffle"
                                title={`Couleur ${slot.label} aléatoire`}
                                onClick={() => shuffleColor(slot.key)}
                            >
                                <Icon name="shuffle" size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cc-section">
                    <h3 className="cc-section-title">Attitudes</h3>
                    <div className="cc-attitudes">
                        {ATTITUDES.map((variant, index) => (
                            <button
                                key={variant}
                                type="button"
                                className={
                                    index === attitude
                                        ? 'cc-attitude selected'
                                        : 'cc-attitude'
                                }
                                title={variant}
                                onClick={() => setAttitude(index)}
                            >
                                <FaceIcon variant={variant} />
                            </button>
                        ))}
                    </div>

                    <h3 className="cc-section-title">Équipements</h3>
                    <div className="cc-equipment">
                        <span className="cc-equip-item">
                            <Icon name={selected.icon} size={14} /> {selected.weapon}
                        </span>
                        <span className="cc-equip-item">{selected.faction}</span>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Home
