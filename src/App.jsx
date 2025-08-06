import { useCallback, useState, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  // let pass = ""

  let passwordGenerator = useCallback(() => {

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num = "0123456789"
    let specialChars = "!@#$%^&*()_+-={}[]|:;<>,.?/~`"

    if (numberAllowed) str += num
    if (charAllowed) str += specialChars

    let pass = ""
    for (let i = 0; i < length; i++) {
      const randomPass = Math.floor(Math.random() * str.length);
      pass += str[randomPass];
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const CopyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);

  },[password])



  return (
    <>
      <div className='main'>
        <div>
          <h1>Password Generator</h1>
        </div>
        <div className='inputField'>
          <input
            type='text'
            id='inpFld'
            placeholder='Password Generator'
            value={password}
            readOnly
            ref={passwordRef}

          />
          <button onClick={CopyToClipboard}> 
            COPY
          </button>
        </div>

        <div className='componentField'>
          <input
            type='range'
            id='len'
            min={6}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor='len'>Range : {length} </label>

          <input
            type="checkbox"
            id="num"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}

          />
          <label htmlFor="num">Numbers</label>

          <input
            type="checkbox"
            id="char"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="char">Symbols</label>
        </div>

        <button onClick={passwordGenerator} style={{ marginTop: '1rem' }}>
          Generate Password
        </button>
      </div>
    </>
  )
}

export default App
