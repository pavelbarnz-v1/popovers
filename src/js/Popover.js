export default class Popover {
  constructor() {
    this.btns = Array.from(document.getElementsByClassName('toggle-popover'));
    this.popover = document.querySelector('[data-popover="popover"]');
    this.popoverTitle = this.popover.querySelector('[data-popover="title"]');

    this.setPopover();
  }

  setPopover() {
    this.btns.forEach((item) => {
      item.addEventListener('click', () => {
        this.popoverTitle.textContent = item.dataset.hint;

        this.popover.style.top = `${
          item.offsetTop - item.offsetHeight - item.offsetHeight / 2
        }px`;

        this.popover.style.left = `${
          item.offsetLeft - item.offsetWidth / 4 + 10
        }px`;

        this.popover.classList.remove('off');
        setTimeout(() => {
          this.popover.classList.add('off');
        }, 1000);
      });
    });
  }
}
