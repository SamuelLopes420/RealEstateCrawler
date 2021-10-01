function contentDownload(){
    
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }


    chrome.storage.sync.get('propertyRMUK', function (result) {
        const text_data = result.propertyRMUK;
        let final_string = '';

        for(let i = 0 ; i < text_data.length ; i++ ){
            let line = 'ID=' + text_data[i].ID + ' | title=' + text_data[i].title + ' | price=' + text_data[i].price + ' | link=' + text_data[i].link + '\n';
            final_string += line;
        }

         download("RightMoveUK.txt",final_string);

    })

}


document.getElementById('gowebsite').addEventListener('click', function () {
    chrome.tabs.create({ url: 'https://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=USERDEFINEDAREA%5E%7B%22polylines%22%3A%22qnhmHnwnh%40yczBc%7B%7Df%40wxiFoxaNgguG%3F%7D~rBn%7DnDii~P~ceIeutFxfsDeutTwvfFri%7DIvbyo%40fsxQhsfEfz%7CO%60l%7DKnazCgtRfleJcd~E_~_E%7DjxTpgLawXcymBouaB%60n_Afjp%40x%7CwA%7Cj_AfvkKrytA%22%7D&sortType=6&propertyTypes=&mustHave=&dontShow=&furnishTypes=&keywords=' })
})

document.getElementById('gorepository').addEventListener('click', contentDownload)