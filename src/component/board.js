// Importing the CSS for the board
import "./board.css";

import { useState, useEffect, useRef } from "react";


const Board = () => {
    const [reset, setReset] = useState(false);
    const [winner, setWinner] = useState('');
    const [playerType, setPlayerType] = useState({
        innerText: 'multiplayer',
        type: true
    })
    const [disablePlay, setDisablePlay] = useState(false)
    const [computateLoop, setcomputateLoop] = useState(false)

    const [players, setPlayers] = useState('A');
    const [data, setData] = useState(['', '', '', '', '', '', '', '', ''])

    const boardRef = useRef(null);

    const action = (e, index) => {
        console.log('action')
        if (data[index] === '' && winner === '') {
            const current = players === 'A' ? "X" : "O"
            data[index] = current;
            e.target.innerText = current;
            setPlayers(players === 'A' ? "B" : "A")
        }
    }

    const computateAction = (index) => {
        console.log('computateAction')
        const cells = boardRef.current.children
        // if (data[index - 1] === '' && winner === '') {
        if (winner === '') {
            const current = players === 'A' ? "X" : "O"
            data[index] = current;
            cells[index].innerText = current;
            setPlayers(players === 'A' ? "B" : "A")
            setDisablePlay(false)
        }
    }

    useEffect(() => {
        console.log('useEffect 1')
        setData(['', '', '', '', '', '', '', '', '']);
        const cells = boardRef.current.children
        for (let i = 0; i < 9; i++) {
            cells[i].innerText = '';
        }
        setPlayers('A');
        setWinner('');
        setReset(false);
        setDisablePlay(false)
    }, [reset, setReset, setWinner])

    useEffect(() => {
        console.log('playerType', playerType)
    }, [playerType])

    useEffect(() => {
        console.log('useEffect 2')
        console.log('data', data)
        console.log('players', players)
        console.log('checkWinner()', checkWinner())
        console.log('checkDrawPlay()', checkDrawPlay())

        if (players === 'B') {
            if (!playerType.type) {
                setDisablePlay(true)
                computate()
                // setcomputateLoop(true)
            }
        }

        if (checkWinner()) {
            setWinner(players === 'A' ? "Player B Wins!" : "Player A Wins!");
            return
        }
        if (checkDrawPlay()) {
            // setcomputateLoop(false)
            setWinner("It's a Draw..!");
            return
        }

    }, [players])

    // useEffect(()=>{
    //     computate()
    // },[computateLoop])

    // checking all  sqares its not empty
    const checkDrawPlay = () => {
        let count = 0;
        data.forEach((cell) => {
            if (cell !== '') {
                count++;
            }
        })
        return count === 9;
    }

    const computate = () => {
        console.log('computate')
        let localLoop = true
        setTimeout(() => {
            while (localLoop) {
                localLoop = data.includes('')
                console.log('LOOP')
                let randN = Math.floor(Math.random() * 10);
                console.log('randN', randN)
                if (data[randN] === '') {
                    computateAction(randN)
                    localLoop = false
                    // setcomputateLoop(false)
                }
            }
        }, 900)
    }

    const checkWinner = () => {
        const lines = [
            // row array
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // col array
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonal array
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                return true;
            }
        }
        return false;
    }

    const resetBoard = () => {
        setReset(true);
    }

    const playertypes = () => {
        setReset(true);
        if (playerType.type) setPlayerType({ innerText: 'computer', type: false })
        else setPlayerType({ innerText: 'multiplayer', type: true })
    }

    return (
        <>
            <div style={{
                color: 'white'
            }}>Player : {players}
            </div>
            <div>
                <button onClick={resetBoard} style={{
                    margin: 40
                }}>
                    Reset Board
                </button>
                <button onClick={playertypes} style={{
                    margin: 40
                }}>
                    {playerType.innerText}
                </button>
            </div>
            <div ref={boardRef} className="board">
                <button disabled={disablePlay} className="input input-0" onClick={(e) => action(e, 0)}></button>
                <button disabled={disablePlay} className="input input-1" onClick={(e) => action(e, 1)}></button>
                <button disabled={disablePlay} className="input input-2" onClick={(e) => action(e, 2)}></button>
                <button disabled={disablePlay} className="input input-3" onClick={(e) => action(e, 3)}></button>
                <button disabled={disablePlay} className="input input-4" onClick={(e) => action(e, 4)}></button>
                <button disabled={disablePlay} className="input input-5" onClick={(e) => action(e, 5)}></button>
                <button disabled={disablePlay} className="input input-6" onClick={(e) => action(e, 6)}></button>
                <button disabled={disablePlay} className="input input-7" onClick={(e) => action(e, 7)}></button>
                <button disabled={disablePlay} className="input input-8" onClick={(e) => action(e, 8)}></button>
            </div>
            <div style={{
                color: 'white'
            }}>
                {checkWinner() ? winner : ''}
                {checkDrawPlay() ? winner : ''}
            </div>
        </>
    )
}

export default Board;
