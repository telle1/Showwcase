import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './welcome.css'


function Welcome(){

    const history = useHistory();
    const [name, setName] = useState("")

   const handleName = () => {
       history.push({pathname:'/home', state:{name: name}})
   }

    return (
        <div id="welcome">
                <div className="welcome-input">
                    <h1>Welcome to your education showcase!</h1>
                    <p>Help employers learn more about your background and highlight all the accomplishments
                        you have achieved. </p>
                    <form onSubmit={handleName}>
                    <input type="text" placeholder="Name" required value={name} onChange={(e)=>setName(e.target.value)}></input>
                    <button type="submit">Enter</button>
                    </form>
                </div>
        </div>
    )
}

export default Welcome


// const Content = styled.div`
//     height: 100vh;
//     box-sizing: border-box;
//     background: url( ${img} ) no-repeat center center/ cover;
//     padding: 200px 50px;
// `

// const Button = styled.button`
//     border: none;
//     border-radius: 5px;
//     padding: 12px;
//     color: white;
//     background-color: #636EF8
// `

// const TextInput = styled.input`
//     padding: 10px;
// `
