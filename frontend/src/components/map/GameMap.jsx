import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CharacterFigure } from '../home/Home'
import './GameMap.css'

const GRID_COLS = 14
const GRID_ROWS = 9

const GameMap = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // personnage passé par la page de création, sinon copie locale
    const [character] = useState(() => {
        if (location.state?.character) return location.state.character
        const saved = localStorage.getItem('indra-character')
        return saved ? JSON.parse(saved) : null
    })

    const [position, setPosition] = useState({ x: 6, y: 4 })

    useEffect(() => {
        if (!character) return undefined

        const onKeyDown = (e) => {
            const moves = {
                ArrowUp: { x: 0, y: -1 },
                ArrowDown: { x: 0, y: 1 },
                ArrowLeft: { x: -1, y: 0 },
                ArrowRight: { x: 1, y: 0 },
            }
            const move = moves[e.key]
            if (!move) return
            e.preventDefault()
            setPosition((prev) => ({
                x: Math.min(GRID_COLS - 1, Math.max(0, prev.x + move.x)),
                y: Math.min(GRID_ROWS - 1, Math.max(0, prev.y + move.y)),
            }))
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [character])

    if (!character) {
        return (
            <div className="gm gm-empty">
                <p>Aucun personnage trouvé.</p>
                <button type="button" onClick={() => navigate('/')}>
                    Créer un personnage
                </button>
            </div>
        )
    }

    const tiles = Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => ({
        x: i % GRID_COLS,
        y: Math.floor(i / GRID_COLS),
    }))

    return (
        <div className="gm">
            <header className="gm-hud">
                <div className="gm-badge">
                    <strong>{character.name}</strong>
                    <span>
                        {character.className} — niveau {character.level ?? 1}
                    </span>
                </div>
                <button type="button" className="gm-back" onClick={() => navigate('/')}>
                    Changer de personnage
                </button>
            </header>

            <div
                className="gm-grid"
                style={{ '--cols': GRID_COLS, '--rows': GRID_ROWS }}
            >
                {tiles.map((tile) => (
                    <button
                        key={`${tile.x}-${tile.y}`}
                        type="button"
                        className={
                            (tile.x + tile.y) % 2 === 0 ? 'gm-tile light' : 'gm-tile dark'
                        }
                        onClick={() => setPosition({ x: tile.x, y: tile.y })}
                    />
                ))}
                <div
                    className="gm-hero"
                    style={{
                        '--x': position.x,
                        '--y': position.y,
                    }}
                >
                    <CharacterFigure
                        colors={character.colors}
                        cut={character.hairCut}
                        className="gm-hero-svg"
                    />
                </div>
            </div>

            <p className="gm-hint">
                Déplace-toi avec les flèches du clavier ou en cliquant sur une case
            </p>
        </div>
    )
}

export default GameMap
