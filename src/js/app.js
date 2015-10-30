'use strict';

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


    }

    function _deletePhotoForm() {


    }

    function _footerSubmissions() {

        var newImage,
            newTitle,
            newLink,
            newDescription;

        var payload = {

          image : newImage,
          title : newTitle,
          link : newLink,
          description : newDescription

        };

        var addPhotoSubmit = document.querySelector('#addPhotoForm');
        addPhotoSubmit.addEventListener('submit', function(event) {

          event.preventDefault();

          newImage = document.querySelector( 'input:text[name=link]').value; //either the vanilla or jquery way will work
          newTitle = $( 'input:text[name=title]').val();
          newLink = $( 'input:text[name=link]').val();
          newDescription = $( 'input:text[name=description]').val();

          $( document ).ajaxSend(function() {

            sessionStorage.setItem('payload', payload);

          });

          $.ajax({

            url : '/gallery/',
            method : 'POST',
            data : payload,

            success : function() {

              //display a message that confirms photo added

            },

            error : function(err) {


              $('#addPhotoForm').removeClass('show');
              $('#loginForm').addClass('show');

            }

          });


        });

        $('#usernameInput').blur(function() {

          var currentUser = { username : $('input:text[name=username').val() };  //could break out into two separate

          $.ajax({

            url : '/api/isUser/',
            method : 'POST',
            data : currentUser,

            success : function() {

              //display a message that confirms login

            },

            error : function(err) {


              $('#loginForm').removeClass('show');
              $('#signUpForm').addClass('show');

            }

          });


        });

        //login starter function

        document.querySelector('#LoginForm').addEventListener('submit', function() {

          var username = $('input:text[name=username]').val();
          var password = $('input:text[name=password]').val();

          loginUser(username, password);

        });

        //post new photo function

        var postNewPhoto = function(loginUser, payload) {

            var sessionData = sessionStorage.getItem(payload);

            $.ajax({

              url: '/gallery/',
              method: 'POST',
              data: payload,

              success: function () {

                $('#actionMenu').removeClass('hide');
                $('#signUpForm').removeClass('show');

              },

              error: function (err) {

                  console.log('photo not received. please try again.');

              }

            });

        }

        //reusable login function

        var loginUser = function(username, password) {

          $.ajax({

            url : '/login/',
            method : 'POST',
            data : {
              username: username,
              password: password
            },

            success : function() {

              $('#actionMenu').removeClass('hide');
              $('#signUpForm').removeClass('show');

            },

            error : function(err) {

              console.log('could not find the user in question. please try again');

            }

          });

        }

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