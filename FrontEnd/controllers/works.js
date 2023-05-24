import { api } from "../model/api.js";
import { modal } from  "./modal.js"

export const works = {

    showWorks() {
        this.cleanWorks();
        api.getWorks().then(works => this.genDomWorks(works));
    },

    cleanWorks() {
        document.querySelectorAll('.gallery').forEach(gallery => gallery.innerHTML = '');
    },

    genDomWorks(works) {
        works.forEach(work => this.genDomWork(work));
    },

    genDomWork(work) {
        document.querySelectorAll('.gallery').forEach(gallery => {
            const isInModal = gallery.closest('.modal') !== null;
            gallery.appendChild(this.genDomWorkFigure(work.id, work.imageUrl, work.title, work.categoryId, isInModal))
        });
    },
    
    genDomWorkFigure(id, imageUrl, title, categoryId, isInModal) {
        const figure = document.createElement("figure");
        const img = this.genDomWorkFigureImg(imageUrl, title);
        const figcaption = this.genDomWorkFigureFigcaption(title, isInModal);
        figure.dataset.id = id
        figure.dataset.categoryid = categoryId
        figure.appendChild(img);
        figure.appendChild(figcaption);
        if (isInModal) {
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

    genDomWorkFigureFigcaption(title, isInModal) {
        const imgTitle = document.createElement("figcaption");
        imgTitle.innerText = `${title}`;
        if (isInModal) {
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
        api.workDelete(workId).then(result => {
            if (this.handleDelete(result)) {
                this.workDeleteFigures(workId);
            }
        });
    },

    workDeleteFigures(workId) {
        const works = document.querySelectorAll(`figure[data-id="${workId}"]`);
        works.forEach(work => work.remove())
    },

    handleDelete(result) {
        switch(result.status) {
            case 200: 
            case 204: 
                modal.formValid(); 
                return true;
            case 401: 
                modal.formError('Erreur : Non autorisé'); 
                break;
            default: 
                modal.formError('Erreur : Inconnue');
        }
        return false;
    }, 

    async workAdd(work) {
        await api.workAdd(work).then(result => {
            if (this.handleAdd(result)) {
                return true;
            }
        })
    },

    handleAdd(result) {
        switch(result.status) {
            case 201: 
                modal.formValid(); 
                return true;
            case 401: 
                modal.formError('Erreur : Non autorisé'); 
                break;
            default: 
                modal.formError('Erreur : Inconnue');
        }
        return false;
    }, 

    cleanError() {
        let domError = document.querySelector('p.error');
        if (domError) {
            domError.remove();
        }
    },

}