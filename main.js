'use strict';
const assert = require('assert');

let marvelChar = [];


function getchar(fetch, numberSearch, start) {
    return fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${start}&limit=${numberSearch}&ts=1&apikey=e1cffbc5d074cc3af16053983ad97635&hash=f4bdcf4b9587350e3453a3d3f6529473`)
        .then(reponse => reponse.json())
        .then(data => marvelChar = data.results[0])
}



describe('getchar', () => {
    it('calls fetch with correct url', () => {
        const fakeFetch = url => {
            assert(
                url ===
                `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=spider&limit=1&ts=1&apikey=e1cffbc5d074cc3af16053983ad97635&hash=f4bdcf4b9587350e3453a3d3f6529473`
            )
            return new Promise(function (resolve) {

            })
        }
        getchar(fakeFetch, '1', 'spider')
    })

    it('parses the response of fetch correctly', (done) => {
        const fakeFetch2 = url => {
            return Promise.resolve({
                json: () => Promise.resolve({
                    results: [
                        {
                            id: 3
                        }
                    ]

                })
            })
        }
        getchar(fakeFetch2, '3', 'spider')
            .then(results => {
                assert(results.id == 3)

                done();
                assert(marvelChar.id == 3)

            })
    })

    it('calls fetch with correct key url', () => {
        let apiKey = 'e1cffbc5d074cc3af16053983ad97635'
        const fakeFetch = url => {
            assert(
                url ===
                `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=spider&limit=1&ts=1&apikey=${apiKey}&hash=f4bdcf4b9587350e3453a3d3f6529473`
            )
            return new Promise(function (resolve) {

            })
        }
        getchar(fakeFetch, '1', 'spider')


    })

    it('calls fetch with correct key word search', () => {
        let apiKey = 'e1cffbc5d074cc3af16053983ad97635'
        const fakeFetch = url => {
            assert(
                url ===
                `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=spider&limit=1&ts=1&apikey=${apiKey}&hash=f4bdcf4b9587350e3453a3d3f6529473`
            )
            return new Promise(function (resolve) {

            })
        }
        getchar(fakeFetch, '1', 'spider')


    })
    it('finds first card name correctly', (done) => {
        const fakeFetch2 = url => {
            return Promise.resolve({
                json: () => Promise.resolve({
                    results: [
                        {
                            name: "Spider-dok"
                        }
                    ]

                })
            })
        }
        getchar(fakeFetch2, '3', 'spider')
            .then(results => {
                assert(results.name == 'Spider-dok')

                done();


            })
    })


})