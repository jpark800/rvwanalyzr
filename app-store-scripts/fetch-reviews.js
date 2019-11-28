//
const fs = require('fs');
var store = require('app-store-scraper');

let appIds = fs.readdirSync('data/apps');
appIds.forEach(appId => {
    fetch_reviews(appId, 1);
});

function fetch_reviews(appId, page) {
        store.reviews({
          appId: 'com.midasplayer.apps.candycrushsaga',
          sort: store.sort.RECENT,
          page: page
        })
            .then((reviews, err) => {
                if (!err) {
                    save_app_reviews(appId, page -1 , reviews);
                    if (reviews.length >= 40 && page < 10) {
                        fetch_reviews(appId, page + 1);
                    }
                }
            });
}

function save_app_reviews(appId, page, reviews) {
    if (reviews.length > 0) {
        let data = JSON.stringify(reviews);
        fs.writeFileSync('data/apps/' + appId + '/reviews-' + page + '.json', data,{ flag: "w" } );
    }
}