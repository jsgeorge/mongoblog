import React from "react";
import Card from "./card";

const CardBlockShop = props => {
  const renderCards = () =>
    props.list
      ? props.list.map(card => (
          <div className="card_item_wrapper">
            {<Card key={card._id} {...card} grid={props.grid} />}
          </div>
        ))
      : null;
  return (
    <div>
      <div className="card_block_shop">
        <h3 className="title">{props.title}</h3>
        <div className="card_items_wrapper">
          {props.list ? (
            props.list.length === 0 ? (
              <div className="no_result">No products found</div>
            ) : null
          ) : null}
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlockShop;
