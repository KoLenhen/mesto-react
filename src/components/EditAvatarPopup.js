import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {

    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="renew"
            title="Обновить аватар"
            btnText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <>
                <input type="url" id="avatar-ref-input" name="avatar" placeholder="Ссылка на новый аватар" required
                    className="popup__text popup__text_type_ref" ref={avatarRef} />
                <span id="avatar-ref-input-error" className="popup__text-error">Проверьте правильность ввода</span>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;