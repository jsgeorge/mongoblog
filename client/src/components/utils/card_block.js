import React from "react";
import Card from "./card";
const CardBlock = props => {
  const renderCards = () =>
    props.list
      ? props.list.map((card, i) => (
          <div className="card_item_wrapper">{<Card key={i} {...card} />}</div>
        ))
      : null;
  return (
    <div className="container">
      <div className="card_block">
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

export default CardBlock;
