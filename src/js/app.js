'use strict';
let db = require('../../models');

//namespace
let ExpressGallery = window.ExpressGallery || {};

//module
ExpressGallery.expressGalleryModule = (function() {

    let module = {

      init : _init,
      footerListeners : _footerListeners,
      footerSubmissions : _footerSubmissions

    };

    function _footerListeners() {

        var addPhotoButton = document.querySelector('#addPhotoNavButton');
        addPhotoButton.addEventListener('click', _addPhotoForm);

        var editPhotoButton = document.querySelector('#editPhotoNavButton');
        editPhotoButton.addEventListener('click', _editPhotoForm);

        var deletePhotoButton = document.querySelector('#deletePhotoNavButton');
        deletePhotoButton.addEventListener('click', _deletePhotoForm);

    }

    function _addPhotoForm() {

        $('#actionMenu').addClass('hide');
        $('#addPhotoForm').addClass('show');

    }

    function _editPhotoForm() {

        $.ajax({

            url : '/isAuthenticated',
            success : function(data) {




            },

            error : function(err) {

                console.log(err);

            }

        });

    }

    function _deletePhotoForm() {

        $.ajax({

            url : '/isAuthenticated',
            success : function(data) {




            },

            error : function(err) {

                console.log(err);

            }

        });

    }

    function _footerSubmissions() {

        var addPhotoSubmit = document.querySelector('#addPhotoForm');
        addPhotoSubmit.addEventListener('submit', function(event) {

          event.preventDefault();

          console.log(this);

          var newImage = $( 'input:text[name=link]').val();
          var newTitle = $( 'input:text[name=title]').val();
          var newLink = $( 'input:text[name=link]').val();
          var newDescription = $( 'input:text[name=description]').val();

          $( document ).ajaxSend(function() {

            sessionStorage.setItem(photoData);

          });

          $.ajax({

            url : '/gallery/',
            method : 'POST',
            photoData : {

              image : newImage,
              title : newTitle,
              link : newLink,
              description : newDescription

            },

            success : function(photoData) {

              console.log(photoData);

            },

            error : function(err) {


              $('#addPhotoForm').removeClass('show');
              $('#loginForm').addClass('show');

              console.log(err);

            }

          });


        });

        $('#usernameInput').blur(function() {

          var currentUser = $('input:text[name=username').val();

          if (User.findOne({where: {username: currentUser }})) {

            return true;

          } else {



          }

        });

        loginSubmit.addEventListener('submit', function(event) {

          var sessionData = sessionStorage.getItem(photoData);

          console.log(photoData);


          console.log(this);

          var newImage = $( 'input:text[name=link]').val();
          var newTitle = $( 'input:text[name=title]').val();
          var newLink = $( 'input:text[name=link]').val();
          var newDescription = $( 'input:text[name=description]').val();

          $.ajax({

            url : '/gallery/',
            method : 'POST',
            data : {

              image : newImage,
              title : newTitle,
              link : newLink,
              description : newDescription

            },

            success : function(data) {

              console.log(data);

            },

            error : function(err) {

              $('#addPhotoForm').removeClass('show');
              $('#loginForm').addClass('show');

              console.log(err);

            }

          });


      });

    }



    function _init() {

        //load footer button click listeners
       _footerListeners();

       _footerSubmissions();

    }

    return module;

})();

//load function

document.addEventListener('DOMContentLoaded', function(event) {

    ExpressGallery.expressGalleryModule.init();

});