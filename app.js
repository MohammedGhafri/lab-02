'use strict';

const ajaxSetting = {
    method: 'get',
    datatype: 'json'
}

$.ajax('./page-1.json', ajaxSetting)
    .then(data => {
        console.log(data);
        $('#select1').html('<option>filter by keword</option>');

        let array = [];
        data.forEach((item, idx) => {

            let hornes = new Hornes(item.title, item.image_url, item.description);
            array.push(item.keyword);
            array = array.filter(function (item, index, inputArray) {
                return inputArray.indexOf(item) == index;
            });
            hornes.render();
        });
        // console.log(array);
        for (let i = 0; i < array.length; i++) {
            $('#select1').append(`<option>${array[i]}</option>`);
        }

    });

$('#select1').on('click', function () {
    console.log('option clicked');

});

function Hornes(title, imagePath, description) {
    this.title = title;
    this.imagePath = imagePath;
    this.description = description;
}

Hornes.prototype.render = function () {
     let containerPerson = $('.container').clone();
     containerPerson.removeClass('container');
     
     //  console.log($('.container:eq(0)').text);
     containerPerson.find($('h2').text(this.title));
    //  containerPerson.find($('img').text(this.title));
    //  containerPerson.find($('img').atter('src',`${this.imagePath}`));
     

    // console.log(containerPerson.find($('img')));
     
    //  containerPerson.append(`<h2>${this.title}</h2>`);
    //  containerPerson.append(`<img src="${this.imagePath}">`);
    //  containerPerson.append(`<p>${this.description}</p>`);
    //   $('.container').append(containerPerson);

}
