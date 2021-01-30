import { useState, useEffect } from 'react';
import './App.css';

import firebase from 'firebase/app'; // /app or /database
import 'firebase/database';
import InputBox from './content/InputBox';
import DataItems from './content/DataItems';
import config from "./firebaseConfig";
import toast from './assets/toast/toast';
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

function App() {
  const [cartData, setCartData] = useState([]);

  const getDataFirebase = () => {
    const getData = firebase.database().ref('/shoppingcart/');
    getData.on('value', function(snapshot) {
      const data = snapshot.val();
      if (data !== null) {
        const shoppingcart = Object.keys(data).map( key => {
          return  {
            id: key, 
            item: data[key].item,
            alreadyBought: data[key].alreadyBought, 
          };
        })
        setCartData(shoppingcart.reverse());
      }
    })
  }

  useEffect(() => {
    getDataFirebase();
    return () => {
      getDataFirebase.cancle();
    }
  }, [])

  const deleteItemHandler = (itemId, itemName) => {
    // delete item from "cartData"
    setCartData(prevstate => {
      const newData = [...prevstate];
      return newData.filter(item => item.id !== itemId);
    });
    // delete item from DB
    const removeData = firebase.database().ref('shoppingcart/' + itemId);
    removeData.remove()
    toast(`${itemName.slice(0, 10)}... odstranjen/a`);
  }

  const boughtItemHandler = (inputItem) => {
    // change item from "cartData"
    setCartData(prevstate => {
      const data = [...prevstate];
      let newData = data.map(item =>
        item.id === inputItem.id
        ? { ...item, alreadyBought: !inputItem.alreadyBought }
        : item
      )
      return newData;
    })
    // change item from DB
    const update = {
      item: inputItem.item,
      alreadyBought: !inputItem.alreadyBought
    }
    var updates = {};
    updates[inputItem.id] = update;
    return firebase.database().ref('shoppingcart/').update(updates);
  }

  return (
    <div className="mainContainer" id="forToast">
      <div className="textContainer">
        <p>Nakupovalni listek</p>
      </div>
      <InputBox />
      <div className="dataContainer">
        {
          cartData && cartData.length > 0 ?
          <DataItems data={cartData} deleteItem={deleteItemHandler} boughtItem={boughtItemHandler}/> :
          <p>Vaš nakupovalni listek je prazen</p>
        }
      </div>
      
    </div>
  );
}

export default App;
