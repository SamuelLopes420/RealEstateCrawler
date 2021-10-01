document.getElementsByTagName('title')[0].innerHTML = 'Crawling ...'

if (!localStorage.getItem('lastProperty')) {
    localStorage.setItem('lastProperty', 'nothing');
    console.log('lastProperty Token set as nothing');
}

chrome.storage.sync.get('propertyRMUK', function (result) {
    if (!result.propertyRMUK) {
        const empty = [];
        chrome.storage.sync.set({ 'propertyRMUK': empty }, function () {
            console.log('Property local storage set to empty')
        })
    }
})

setInterval(function () {

    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    const div = getElementByXpath('//*[@id="l-searchResults"]/div');
    const childs = div.childNodes;
    const house_number = childs.length;
    const report = [];

    for (let i = 1; i < house_number; i++) {

        let current = childs[i];

        if (current.getElementsByClassName('propertyCard-title')[0]) {

            if (localStorage.getItem('lastProperty') == current.id) {
                i = house_number;  //STOP FOR CYCLE
            } else {

                let report_line = {
                    ID: current.id,
                    title: current.getElementsByClassName('propertyCard-title')[0].innerHTML,
                    price: current.getElementsByClassName('propertyCard-priceValue')[0].innerHTML,
                    link: current.getElementsByClassName('propertyCard-moreInfoItem')[0].href
                }
                report.push(report_line)
            }

            if (i == 1) {
                localStorage.setItem('lastProperty', current.id)
            }
        }
    }
    
    chrome.storage.sync.get('propertyRMUK', function (result) {

        let propertyRMUK = result.propertyRMUK;
        console.log(result.propertyRMUK)
        let updatedpropertyRMUK = [].concat(propertyRMUK, report);
        console.log(updatedpropertyRMUK);
        chrome.storage.sync.set({ 'propertyRMUK': updatedpropertyRMUK }, function () {
        });
    });

     location.reload(); 

}, 60000)