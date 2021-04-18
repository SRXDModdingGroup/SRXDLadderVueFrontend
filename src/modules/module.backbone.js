const axios = require('axios');

class BACKBONE {
    constructor() {
        if (process.env.NODE_ENV == "development") {
            this.urlBase = "http://localhost:3000/api/";
        }
        else {
            this.urlBase = "https://spin-board.herokuapp.com/api/";
        }
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
    async getScores(hash, difficulty, pageIndex, multiHashBool) {
        let backboneURL = this.urlBase + 'getScores?search='+hash+"&difficulty="+difficulty+"&page="+pageIndex;
        if (multiHashBool) backboneURL = backboneURL + "&multiHash=true"
        return axios.get(backboneURL)
        .then(function(response) {
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }
    async getUserScore(steamID, hash, difficulty, multiHashBool) {
        let backboneURL = this.urlBase + 'getUserScore?search='+hash+"&difficulty="+difficulty+"&steamID="+steamID;
        if (multiHashBool) backboneURL = backboneURL + "&multiHash=true"
        return axios.get(backboneURL)
        .then(function(response) {
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }
}

module.exports = BACKBONE;
