import React from "react";
import CardAdmin from "./card_admin";

const CardBlockAdmin = props => {
  const renderCards = () =>
    props.list
      ? props.list.map(card => (
          <div className="user_admin_block">
            {<CardAdmin key={card._id} {...card} grid={props.grid} />}
          </div>
        ))
      : null;
  return (
    <div>
      <div className="card_block_admin">
        <h3 className="title">{props.title}</h3>
        <div className="card_admin_wrapper">
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

export default CardBlockAdmin;
