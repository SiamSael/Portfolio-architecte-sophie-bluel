import {api} from "../model/api.js";

export const works = {

    showWorks() {
        api.getWorks().then(works => this.genDomWorks(works));
    },

    genDomWorks(works) {
        works.forEach(work => this.genDomWork(work));
    },

    genDomWork(work) {
        document.querySelector(".gallery").appendChild(this.genDomWorkFigure(work.imageUrl, work.title, work.categoryId));
    },
    
    genDomWorkFigure(imageUrl, title, categoryId) {
        const figure = document.createElement("figure");
        const img = this.genDomWorkFigureImg(imageUrl, title);
        const figcaption = this.genDomWorkFigureFigcaption(title);
        figure.dataset.categoryid = categoryId
        figure.appendChild(img);
        figure.appendChild(figcaption);
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
        return imgTitle;
    }
}