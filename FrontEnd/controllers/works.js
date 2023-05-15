import {api} from "../model/api.js";

export const works = {

    gallerySelector: null,

    showWorks() {
        api.getWorks().then(works => this.genDomWorks(works));
    },

    genDomWorks(works) {
        this.gallerySelector = document.querySelector(".modal") ? ".gallery-modal" : ".gallery";
        works.forEach(work => this.genDomWork(work));
    },

    genDomWork(work) {
        document.querySelector(this.gallerySelector).appendChild(this.genDomWorkFigure(work.id, work.imageUrl, work.title, work.categoryId));
    },
    
    genDomWorkFigure(id, imageUrl, title, categoryId) {
        const figure = document.createElement("figure");
        const img = this.genDomWorkFigureImg(imageUrl, title);
        const figcaption = this.genDomWorkFigureFigcaption(title);
        figure.dataset.id = id
        figure.dataset.categoryid = categoryId
        figure.appendChild(img);
        figure.appendChild(figcaption);
        if (document.querySelector(".modal")) {
            const figdelete = this.genDomWorkFigureDelete();
            figure.insertAdjacentElement("afterbegin", figdelete);
        }
        return figure;
    },

    genDomWorkFigureImg(imageUrl, title) {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = title;
        return img;
    },

    genDomWorkFigureFigcaption(title) {
        const imgTitle = document.createElement("figcaption");
        imgTitle.innerText = `${title}`;
        if (document.querySelector(".modal")) {
            imgTitle.innerText = "éditer";
        }
        return imgTitle;
    },

    genDomWorkFigureDelete() {
        const imgDelete = document.createElement('span');
        imgDelete.classList.add('del-work');
        const iconDelete = document.createElement('i');
        iconDelete.className = 'fa-solid' + ' fa-trash-can';
        imgDelete.appendChild(iconDelete);
        imgDelete.addEventListener('click', (e) => {
            e.preventDefault();
            this.workDelete(e.target.closest('figure'));

        });
        return imgDelete;
    },

    workDelete(work) {
        let workId = work.dataset.id;
        api.workDelete(workId).then(result => this.handleDelete(result));
    },

    handleDelete(result) {
        switch(result.status) {
            case 401: this.formDelError('Erreur : Non autorisé'); break;
            default: this.formDelError('Erreur : Inconnue');
        }
    }, 

    formDelError(message) {
        this.cleanError();
        let domError = document.createElement('p');
        domError.classList.add('error');  
        domError.innerText = message;
        document.querySelector(".modal").insertBefore(domError, document.querySelector(".modal").querySelector('input[type="submit"]'));
    },

    cleanError() {
        let domError = document.querySelector('p.error');
        if (domError) {
            domError.remove();
        }
    },

}