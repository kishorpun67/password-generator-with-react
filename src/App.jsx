import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  // ref hook 
  const passwordRef = useRef(null)

  const handlePassword = useCallback(()=>{
    let pass = ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()-_+=[]{}|;:,.<>?"
    console.log(str)
    for (let i =1; i<=length; i++){
      let char = Math.floor(Math.random()* str.length +1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)
  },[length, numAllowed,charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 99)
    window.navigator.clipboard.writeText(password)
  },[password]) 

  useEffect(() => {
    handlePassword()
  },[length, numAllowed, charAllowed, handlePassword])
  console.log(numAllowed, charAllowed)
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input 
            type="text" 
            value={password}
             readOnly 
            ref={passwordRef}  
            placeholder='passsword'
            className='outline-none w-full py-1 px-3' 
          />
          <button className='outline-none bg-blue-700 px-3 py-1  shrink-0'
            onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input type="range" id='range' className='cusor-pointer' min={6} max={20} value={length}  
              onChange={(e)=>{setLength(e.target.value)}} />
              <label htmlFor="range">Length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox"  className='cusor-pointer' 
              onChange={(prev)=>{setNumAllowed(!prev)}} />
              <label>Number</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox"  className='cusor-pointer' 
              onChange={(prev)=>{setCharAllowed(!prev) }} />
              <label>Charter</label>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
