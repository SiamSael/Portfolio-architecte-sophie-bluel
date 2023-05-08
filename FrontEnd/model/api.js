export const api = {

    getWorks: async () => {
        const response = await fetch('http://localhost:5678/api/works');
        return await response.json();
    },

    getCategories : async () => {
        const response = await fetch('http://localhost:5678/api/categories');
        return await response.json();
    }

}
