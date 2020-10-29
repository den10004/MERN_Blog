
class Popup {
    constructor(container, popup) {
        this.container = container;
        /**
         * Можно лучше:
         * Неиспользуемое свойство, лучше удалить.
         */
        this.popup = popup;
        this.closeButton = this.container.querySelector('.popup__close');
        this.setEventListener();
    }

    open() {
        this.container.classList.add('popup_is-opened')
    }

    close() {
        this.container.classList.remove('popup_is-opened')
    }

    setEventListener(){
        this.closeButton.addEventListener('click',() => this.close())
    }
}


