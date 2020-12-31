import React from 'react';
import './welcome.css'
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


function Welcome(){
    return (
        <div id="welcome">
                <div className="welcome-input">
                    <h1>Welcome to your education showcase!</h1>
                    <p>Help employers learn more about your background and highlight all the accomplishments
                        you have achieved. </p>
                    <input type="text" placeholder="Name"></input>
                    <button type="submit">Enter</button>
                </div>
        </div>
    )
}

export default Welcome