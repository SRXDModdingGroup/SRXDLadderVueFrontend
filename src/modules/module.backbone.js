const axios = require('axios');

class BACKBONE {
    constructor() {
        this.urlBase = "http://localhost:3000/";
    }

    async getHashes(search) {
        let backboneURL = this.urlBase + "getHashes?search=" + search;
        return axios.get(backboneURL)
        .then(function(response) {
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }
    async getScores(hash, difficulty, pageIndex) {
        let backboneURL = this.urlBase + 'getScores?search='+hash+"&difficulty="+difficulty+"&page="+pageIndex;
        return axios.get(backboneURL)
        .then(function(response) {
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }
    async getUserScore(steamID, hash, difficulty) {
        let backboneURL = this.urlBase + 'getUserScore?search='+hash+"&difficulty="+difficulty+"&steamID="+steamID;
        return axios.get(backboneURL)
        .then(function(response) {
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }
}

module.exports = BACKBONE;
