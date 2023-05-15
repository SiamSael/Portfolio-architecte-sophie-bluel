export const api = {

    getWorks: async () => {
        const response = await fetch('http://localhost:5678/api/works');
        return await response.json();
    },

    getCategories : async () => {
        const response = await fetch('http://localhost:5678/api/categories');
        return await response.json();
    },

    authentification : async (entries) => {
        let response = await fetch('http://localhost:5678/api/users/login', {
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            },
            body: JSON.stringify(entries)
        });
        return {
            status: response.status,
            content: await response.json(),
        };
    },

    setToken(token) {
        window.localStorage.setItem("authentification_token", token);
    },

    getToken() {
        return window.localStorage.getItem("authentification_token");
    },

    deleteToken() {
        window.localStorage.removeItem("authentification_token");
    },

    async workDelete(workId) {
        let response = await fetch('http://localhost:5678/api/works/' + `${workId}`, {
            method:"DELETE",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization": 'Bearer ' + this.getToken(),
            }
        });
        return {
            status: response.status,
        };
    }
}
