
/*
Галлерея картинок
*/

// создаем объект
const gallery = {
  // настройки
  settings: {
    galleryMainContainer: '.gallery_main_container',
    previewSelector: '.myPreviewSelector',
    modalImageContainer: 'gallery__modal',
    modalImageClass: 'gallery__image',
    modalImageScreen: 'gallery__screen',
    modalImageClose: 'gallery__close',
    modalImageCloseSrc: './mimg/close.png',
    modalImagePrev: 'gallery__prev',
    modalImagePrevSrc: './mimg/prev.png',
    modalImageNext: 'gallery__next',
    modalImageNextSrc: './mimg/next.png',
    modalNow: null,
    galleryModal: null,
  },

  // инициализация
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);

    const galleryContainer = document.querySelector(this.settings.previewSelector);
    // console.log(galleryContainer);
    galleryContainer.addEventListener('click', (event) => this.containerClickHandler(event));
  },

  containerClickHandler(event) {
    // console.log(event.target);
    if (event.target.tagName !== 'IMG') {
      return;
    }
    this.modalNow = event.target;
    this.createGalleryModal(event.target);
  },

  createGalleryModal(img) {
    this.galleryModal = document.createElement('div');
    this.galleryModal.classList.add(this.settings.modalImageContainer);
    // console.log(this.galleryModal);
    const galleryScreen = document.createElement('div');
    galleryScreen.classList.add(this.settings.modalImageScreen);
    this.galleryModal.appendChild(galleryScreen);

    // const galleryClose = document.createElement('img');
    const galleryClose = new Image();
    galleryClose.classList.add(this.settings.modalImageClose);
    galleryClose.src = this.settings.modalImageCloseSrc;
    galleryClose.addEventListener('click', (event) => {
      // стрелочная функция закрытия модального окна
      this.close(event.target);
    });
    this.galleryModal.appendChild(galleryClose);
    // console.log(galleryClose);

    // стрелка влево
    const galleryPrev = new Image();
    galleryPrev.classList.add(this.settings.modalImagePrev);
    galleryPrev.src = this.settings.modalImagePrevSrc;
    galleryPrev.addEventListener('click', (event) => {
      // стрелочная функция переход к предыдущей картинке
      this.prevImg(event.target);  // -----------------------------left - prevImg
    });
    this.galleryModal.appendChild(galleryPrev);

    // стрелка вправо
    const galleryNext = new Image();
    galleryNext.classList.add(this.settings.modalImageNext);
    galleryNext.src = this.settings.modalImageNextSrc;
    galleryNext.addEventListener('click', (event) => {
      // стрелочная функция переход к предыдущей картинке
      this.nextImg(event.target);  // -----------------------------right - nextImg
    });
    this.galleryModal.appendChild(galleryNext);
    
    this.imageInModal(img);
    // // заменил на функцию
  },
  // функция - картинка в модалке
  imageInModal(img) {
    const ifNotEmpty = this.galleryModal.querySelector(`.${this.settings.modalImageClass}`.toString());
    if (ifNotEmpty !== null) {
      ifNotEmpty.remove();
    }
    const galleryImageBig = new Image();
    galleryImageBig.classList.add(this.settings.modalImageClass);
    // img.dataset
    galleryImageBig.src = img.dataset.fullImageUrl
    //
    this.galleryModal.appendChild(galleryImageBig);
    document.querySelector(this.settings.galleryMainContainer).appendChild(this.galleryModal);
  },
  //
  close(closeImg) {
    // удаление родительского элемента <div class="gallery__modal">
    // с помощью метода .remove()
    closeImg.parentElement.remove();
  },
  //
  prevImg(leftImg) {
    //
    // console.log('left - previous');
    // console.log(this.modalNow.previousElementSibling);  // предыдущий братец
    // console.log(this.modalNow.parentElement.lastElementChild);  // последний

    this.modalNow = (this.modalNow.previousElementSibling === null) ? this.modalNow.parentElement.lastElementChild : this.modalNow.previousElementSibling;
    this.imageInModal(this.modalNow);
  },
  //
  nextImg(rightImg) {
    //
    // console.log('right - next');
    // console.log(this.modalNow.nextElementSibling);  // следующий братец
    // console.log(this.modalNow.parentElement.firstElementChild);  // первый

    this.modalNow = (this.modalNow.nextElementSibling === null) ? this.modalNow.parentElement.firstElementChild : this.modalNow.nextElementSibling;
    // this.createGalleryModal(this.modalNow);
    this.imageInModal(this.modalNow);
    // this.containerClickHandler(nextImgEl);
  }
};

window.addEventListener('load', () => {
  gallery.init({
    galleryMainContainer: '.gallery',
    previewSelector: '.gallery__container',
    modalImageScreen: 'gallery__back',
  });
});
