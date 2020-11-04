import React from 'react';

function Card(props) {

    function handleImgClick() {
        props.onImgClick(props.card);
    }

    return (
        <div className="location">
            <img onClick={handleImgClick} src={String(props.card.link)} alt={`Фото ${props.card.name}`} className="location__image" />
            <button type="button" className="location__trash"></button>
            <div className="location__info">
                <h2 className="location__name">
                    {props.card.name}
                </h2>
                <div className="location__wrap">
                    <button type="button" className="location__rate"></button>
                    <span className="location__likes">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;