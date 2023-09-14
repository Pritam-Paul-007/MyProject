import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'



const gun = Gun({
  peers: [
    'http://localhost:3030/gun'
  ]
})


const initialState = {
  messages: []
}


function reducer(state, message) {

  const array = [message, ...state.messages];
  console.log(array);
  let a = array.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    else if (a.createdAt > b.createdAt) return -1;
    else return 0;
  })

  
  let uniqueObjArray = [...new Map(a.map((item) => [item["createdAt"], item])).values()];
  return {
    messages: uniqueObjArray
  }
}

export default function App() {

    const [formState, setForm] = useState({
    name: '', message: ''
  })


  const [state, dispatch] = useReducer(reducer, initialState)


  useEffect(() => {
    const messages = gun.get('messages')
    messages.map().on(m => {
      dispatch({
        name: m.name,
        message: m.message,
        createdAt: m.createdAt
      })
    })
  }, [])

  function saveMessage() {
    const messages = gun.get('messages')
    messages.set({
      name: formState.name,
      message: formState.message,
      createdAt: Date.now()
    })
    setForm({
      name: '', message: ''
    })
  }

  function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value  })
  }

  return (
    <div style={{ padding: 30 }}>
      <input
        onChange={onChange}
        placeholder="Name"
        name="name"
        value={formState.name}
      />
      <input
        onChange={onChange}
        placeholder="Message"
        name="message"
        value={formState.message}
      />
      <button onClick={saveMessage}>Send Message</button>
      {
        state.messages.map(message => (
          <div key={message.createdAt}>
            <h2>{message.message}</h2>
            <h3>From: {message.name}</h3>
            <p>Date: {message.createdAt}</p>
          </div>
        ))
      }
    </div>
  );
}