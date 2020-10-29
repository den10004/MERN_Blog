
class CardList {
  constructor(container, createCard) {
    this.container = container;
    this.createCard = createCard;
  }

  addCard(name, link) {
    const card = this.createCard(name, link)
    this.container.appendChild(card.create());
  }

  render(cards) {
    cards.forEach(item => {
      this.addCard(item.name, item.link)
    })
  }
};
