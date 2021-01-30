import React, { useState } from 'react';
import firebase from 'firebase'; // /app or /database
import toast from '../assets/toast/toast';

function InputBox(props) {

    const [input, setInput] = useState('');

    function writeData(inputData) {
        let newPostKey = firebase.database().ref('shoppingcart/').push().key;
        const updates = {};
        updates[newPostKey] = inputData;
        return firebase.database().ref('shoppingcart/').update(updates);
    }

    const sendData = () => {
        if (input === '') {
            console.log('polje prazno')
            //return toast('polje je prazno!');
        } else {
            const data = {
                item: input,
                alreadyBought: false,
            }
            writeData(data);
            setInput('');
            toast(`${input} dodan!`)
        }
    }

    return (
        <div className="inputContainer">
            <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
            />
            <button onClick={sendData}>+</button>
        </div>
    );
}

export default InputBox;