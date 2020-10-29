class Card {
    
    constructor(name, link, openCallback) {
        this.name = name;
        this.link = link;
        this.remove = this.remove.bind(this);
        this.openCallback = openCallback;
        this.card = null;
        this.imageOpening = this.imageOpening.bind(this);

    };

    _like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    };

    remove() {
        this.removeListener();
        this.newCard.remove();  
    };

    create() {
        const list = `<div class="place-card">
			<div class="place-card__image" style="background-image: url(https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg)">
				<button class="place-card__delete-icon"></button>
			</div>
			<div class="place-card__description">
				<h3 class="place-card__name"></h3>
				<button class="place-card__like-icon"></button>
			</div>
          </div>`;
        const template = document.createElement("div");
        template.insertAdjacentHTML('afterbegin', list);
        const newCard = template.firstElementChild;
        newCard.querySelector(".place-card__name").textContent = this.name;
        newCard.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;
        this.newCard = newCard;
        this.setListener();
        return newCard;
    }

    setListener() {
        this.newCard.querySelector('.place-card__like-icon').addEventListener('click', this._like);
        this.newCard.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
        this.newCard.querySelector('.place-card__image').addEventListener('click', this.imageOpening);


    }
    removeListener() {
        this.newCard.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
        this.newCard.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
        this.newCard.querySelector('.place-card__image').removeEventListener('click', this.imageOpening);
    }

    imageOpening(event) {
        if (event.target.classList.contains('place-card__image')) {
            this.openCallback(this.link);
        }
    }

}


