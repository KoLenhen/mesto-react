import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        props.onAddPlace({
            name: name,
            link: link,
        })
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            btnText="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <>
                <input type="text" id="location-name-input" name="locationName" placeholder="Название" required minLength="1"
                    maxLength="30" className="popup__text popup__text_type_location-name" value={name} onChange={handleChangeName} />
                <span id="location-name-input-error" className="popup__text-error">Проверьте правильность ввода</span>
                <input type="url" id="location-ref-input" name="locationRef" placeholder="Ссылка на картинку" required
                    className="popup__text popup__text_type_ref" value={link} onChange={handleChangeLink} />
                <span id="location-ref-input-error" className="popup__text-error">Проверьте правильность ввода</span>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;