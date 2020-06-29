'use strict';

const ajaxSetting = {
    method: 'get',
    datatype: 'json'
}

$.ajax('./data/page-1.json', ajaxSetting)
    .then(data => {
        console.log(data);
        $('#select1').html('<option>filter by keword</option>');

        let array = [];//To store the options and to be used to aviod the repeation;
        data.forEach((item, idx) => {

            let hornes = new Hornes(item.title, item.image_url, item.description, item.keyword);
            array.push(item.keyword);//To store the keywords for the options
            array = array.filter(function (item, index, inputArray) {//Filter to delet the repeated keywords;
                return inputArray.indexOf(item) == index;
            });
            hornes.render();
        });
        $('div:first').remove();//To remove the first div which its empty;
        
        for (let i = 0; i < array.length; i++) {//To generate the options and append it to the select
            $('#select1').append(`<option>${array[i]}</option>`);
        }

    });

$('#select1').on('click', function () {
    let selectedoption = $('#select1').val();//Store the selected option in variable for flexbility;


    render2(selectedoption);// To render the patterns of the selected option(render by keyword);
   
});

function Hornes(title, imagePath, description, keyword) {
    this.title = title;
    this.imagePath = imagePath;
    this.description = description;
    this.keyword = keyword;
    Hornes.all.push(this);
}
Hornes.all = [];


Hornes.prototype.render = function () {// The rendered function when refreash the page;
    let containerPerson = $('.container').clone();
    containerPerson.removeClass('container');
    // console.log(containerPerson.find('h2'));
    containerPerson.find('h2').text(this.title);
    containerPerson.find('img').attr('src', `${this.imagePath}`);
    containerPerson.find('p').text(this.description);

    $('main').append(containerPerson);

}

function render2(value) {//To render the patterns of the selected option(render by keyword)

    $('main').empty();// To initiat the render for the selected keyword;
    
    for (var i = 0; i < Hornes.all.length; i++) {
        if ((Hornes.all[i].keyword) == value||value=='filter by keword') {
            let a=`<div></div>`;
            $('main').append(a);

            let headTitlte=`<h2>${Hornes.all[i].title}</h2>`;
            let image=`<img class="imegSection" src=${Hornes.all[i].imagePath}>`;
            let desc = `<p>${Hornes.all[i].description} </p>`;
            
            $('div:last').append(headTitlte);
            $('div:last').append(image);
            $('div:last').append(desc);
      
        }
    }
}