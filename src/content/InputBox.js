import React, { useState, useRef, useEffect } from 'react';
import firebase from 'firebase'; // /app or /database
import toast from '../assets/toast/toast';

function InputBox(props) {

    const [input, setInput] = useState('');
    const ref = useRef();

    useEffect(() => {
        ref.current.focus();
    }, [])

    function writeData(inputData) {
        let newPostKey = firebase.database().ref('shoppingcart/').push().key;
        const updates = {};
        updates[newPostKey] = inputData;
        return firebase.database().ref('shoppingcart/').update(updates);
    }

    const sendData = () => {
        if (input === '') {
            return toast('polje je prazno!');
        } else {
            const data = {
                item: input,
                alreadyBought: false,
            }
            writeData(data);
            setInput('');
            toast(input.length > 10 ? `${input.slice(0, 10)}... dodan/a`: `${input} dodan/a!`, 'green')
        }
    }

    const onKeyUpSendMessage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.keyCode === 13) {
          sendData();
        }
    }


    return (
        <div className="inputContainer">
            <input
                ref={ref}
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyUp={onKeyUpSendMessage} 
            />
            <button onClick={sendData}>+</button>
        </div>
    );
}

export default InputBox;