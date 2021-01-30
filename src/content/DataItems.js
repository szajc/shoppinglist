import React, { Fragment } from 'react';
import trashIcon from '../assets/icons/trashWhite.png';

function DataItems(props) {

    const { data, deleteItem } = props;

    return (
        <Fragment>
        {data && data.map(item => (
            <div 
                className="item"
                key={item.id}>
              <div className="singleItem">
                <p>{item.item}</p>
              </div>
              <div 
                className="itemIcon"
                onClick={() => deleteItem(item.id, item.item)}>
                <img
                    src={trashIcon} 
                    alt=""/>
              </div>
            </div>
            ))
        }
        </Fragment>
    );
}

export default DataItems;