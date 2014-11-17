$(document).ready(function() {

    Parse.initialize("7aIsf4kOGwWpoDDxN91lbgTvUtBxWmiwOUZSd7KB", "VbTnOMf2XcgNnoEdECTOuXXv6b56xI5mYrMpOxuw");

    var userArrayLogged = [];
    var currentUser = Parse.User.current();
    var user = new Parse.User();
    var postsTracker = [];
    var countTracker = [];
    var postArray = [];
    var arraycigPosts = [];
    var userFBname = [];
    var passFBword = [];
    var loggedInKey = [];
    var baseArray = [];

    //fastclick 
    $(function() {
        FastClick.attach(document.body);
    });
window.addEventListener('native.keyboardshow', keyboardShowHandler);

function keyboardShowHandler(e){
    setTimeout(function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    }, 0);
}




    //fb functions
    var login = function() {
        var usernamelogged = [];
        var emaillogged = [];
        var passwordfblogged = "fbuser";
        var fbuser = "yes";

        if (!window.cordova) {
            facebookConnectPlugin.browserInit('594956433960405');
            facebookConnectPlugin.browserInit(appId);
        }


        facebookConnectPlugin.login(["email"], function(response) {
            if (response.authResponse) {
                facebookConnectPlugin.api('/me', null,
                    function(response) {
                        usernamelogged.push(response.name.toLowerCase());
                        emaillogged.push(response.email);
                        var username = usernamelogged.toString();
                        var email = emaillogged.toString().toLowerCase();
                        var password = passwordfblogged.toLowerCase();

                            

                        // alert(username);
                        //parse fb signup
                        user.set("username", username);
                        user.set("email", email);
                        user.set("password", password);
                        user.set("fbuser", fbuser);
                        user.signUp(null, {
                            success: function(user) {
                                userArrayLogged.length = 0;
                                userArrayLogged.push(username);
                                $('form#signup, #homePage, #hometitle, .logohome, #passwordReset').hide();
                                $('#dbHeader').show();
                                $('.indicatorsLeft, .indicatorsAdd').hide();
                                $('#statusUpdate, .statuscue').show();
                                $('#brandTitle').html('CLIQUE FEED');
                                $('#statusUpdate, #cigarfooter').show("slide", {
                                    direction: "right"
                                }, 200);
                                $('#userSlider').fadeIn();
                                                    
                            window.mySwipe = new Swipe(document.getElementById('userSlider'), {
                                // startSlide: 0,
                                // speed: 400,
                                continuous: false,
                                // disableScroll: false,
                                // stopPropagation: false,
                                callback: function(e, pos) {
                                    var bullets = $('#position em');
                                    //var i = bullets.length;
                                    bullets.className = '';
                                    var posi = window.mySwipe.getPos();
                                    bullets[posi].className = 'on';
                                    bullets[posi - 1].className = '';
                                    bullets[posi + 1].className = '';
                                    if (bullets[posi] === 0) {
                                        bullets[1].className = 'bully';
                                    }
                                },
                                transitionEnd: function(index, elem) {
                                    if (window.mySwipe.getPos() === 4) {
                                        $('#userSlider, #bullets').fadeOut(function() {
                                            $('#userSlider, #bullets').remove();
                                        });
                                    }
                                }
                            });


                            },
                            error: function(user, error) {
                               // alert(fbuserarray);
                                //fbUserAlert();
                             var stringThis = response.name.toLowerCase();
                                //alert(stringThis);
                    Parse.User.logIn(stringThis, "fbuser", {
                        success: function(user) {
                            $('form#signup, #login, #homePage, #hometitle, .logohome, #passwordReset').hide();
                            $('.indicatorsLeft, .indicatorsAdd').hide();
                            $('#statusUpdate, .statuscue').show('');
                            $('#dbHeader').show();
                            $('#cigarfooter').show();
                            $('#brandTitle').html('CLIQUE FEED');
                             $('#userSlider').remove();
                            // Do stuff after successful login.

                        },
                        error: function(user, error) {
                            wronguserAlert();
                            // The login failed. Check error to see why.
                        }
                    });
                

                            }
                        });
                    });
            }
        });
    }


    $('#fblogin').click(function() {
        login();
    });


    $('#dbHeader').hide();

    if (currentUser) {
        var nameCurrent = currentUser.getUsername();
        userArrayLogged.length = 0;
        userArrayLogged.push(nameCurrent);

         $('#userSlider').fadeOut(function(){
            $('#userSlider').remove();
            });
        //$('body').append(nameCurrent + ' is logged in');
        $('#homePage, #form#signup, #hometitle, .logohome, #passwordReset').hide();
        $('#dbHeader').show();
        $('#brandTitle').html('CLIQUE FEED');
        $('#statusUpdate, .statuscue').show();
        $('.indicatorsLeft, .indicatorsAdd').hide();
        $('#cigarfooter').show();
        $('#fileselect').attr('data-name', nameCurrent);

    } else

    {
        //user signup
        $('form#signup').fadeIn();


$("#signup").keyup(function(event){
    if(event.keyCode == 13){
        $("#signupbutton").click();
    }
});

        $('#signupbutton').click(function() {
            var user = new Parse.User();
            var username = $("#signup-username").val().toLowerCase();
            var password = $("#signup-password").val();
            var email = $("#signup-email").val().toLowerCase();
           user.set("username", username);
            user.set("password", password);
            user.set("email", email);
         
            user.signUp(null,{
                success: function(user) {
                    userArrayLogged.length = 0;
                    userArrayLogged.push(username);
                    $('form#signup, #homePage, #hometitle, .logohome, #passwordReset').hide();
                    $('#dbHeader').show();
                    $('.indicatorsLeft, .indicatorsAdd').hide();
                    $('#statusUpdate, .statuscue').show();
                    $('#brandTitle').html('CLIQUE FEED');
                    $('#statusUpdate, #cigarfooter').show("slide", {
                        direction: "right"
                    }, 200);
                                    
                      $('#userSlider').fadeIn();  
        window.mySwipe = new Swipe(document.getElementById('userSlider'), {
             startSlide: 0,
            // speed: 400,
             continuous: false,
            // disableScroll: false,
            // stopPropagation: false,
            callback: function(e, pos) {
                var bullets = $('#position em');
                //var i = bullets.length;
                bullets.className = '';
                var posi = window.mySwipe.getPos() + 1;
                bullets[posi].className = 'on';
                bullets[posi - 1].className = 'bully';
                bullets[posi + 1].className = '';
      
            },
            transitionEnd: function(index, elem) {
                if (window.mySwipe.getPos() === 4) {
                    $('#userSlider, #bullets').fadeOut(function() {
                        $('#userSlider, #bullets').remove();
                    });
                }
            }
        }); 

                },
                error: function(user, error) {
                    setTimeout(function() {
                        signupAlert();
                    }, 200);

                }
            });
        });
    }


    $('#logmein').click(function() {

        $('form#signup, #signupbutton, #logtext, #forgottext, #fblogin, #passwordReset').hide();
        $('form#login').hide().fadeIn(350);

    });


$("#login").keyup(function(event){
    if(event.keyCode == 13){
        $("#loginbutton").click();
    }
});

    $('#signmeup, #signmeup2').click(function() {

        $('form#login, form#passwordReset, #resetSuccess').hide();
        $('form#signup, #signupbutton, #logtext, #forgottext, #fblogin').hide().fadeIn(350);

    });


       $('#loginbutton').click(function() {
        var emaillogged = $("#login-email").val().toLowerCase();
        var passwordlogged = $("#login-password").val();
        if(emaillogged.length === 0){
            signupAlert();
        }
        var queryUser = new Parse.Query(Parse.User);
        queryUser.equalTo("email", emaillogged);
        queryUser.first({
            success: function(resultEmail) {
                var resultuser = resultEmail.get("username")
                  Parse.User.logIn(resultuser, passwordlogged, {
                        success: function(user) {
                            resultuser.length = 0;
                            userArrayLogged.push(resultuser);
                            $('form#signup, #login, #homePage, #hometitle, .logohome, #passwordReset').hide();
                            $('.indicatorsLeft, .indicatorsAdd').hide();
                            $('#statusUpdate, .statuscue').show('');
                            $('#dbHeader').show();
                            $('#cigarfooter').show();
                            $('#brandTitle').html('CLIQUE FEED');
                             $('#userSlider').remove();
                            // Do stuff after successful login.

                        },
                        error: function(user, error) {
                            wronguserAlert();
                            // The login failed. Check error to see why.
                        }
                    });

              },
              error: function(error){
                wrongEmailAlert();
              }
             });
             });

    

//forgot password

$('#passwordresetbtn').click(function(){
        $('form#signup, #signupbutton, #logtext, #forgottext, #fblogin').hide();
        $('form#passwordReset, #signmeup2').fadeIn();

        $('#resetpbutton').click(function(){
            var emailReset = $('#reset-email').val().toLowerCase();
            Parse.User.requestPasswordReset(emailReset, {
                success: function() {
                    $('#resetSuccess').show().html('Weve sent intructions on resetting your password to' + emailReset);
                    $('#resetpbutton, #reset-email').hide();
                    // Password reset request was sent successfully
                },
                error: function(error) {
                    // Show the error message somewhere
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        });
});



//fb already signed up
//fb already signed up
$("#fbLoginEmail").keyup(function(event){
    if(event.keyCode == 13){
        $("#loginfbbutton").click();
    }
});

        $('#loginfbbutton').click(function(){
            var emailReset = $('#fb-loginemail').val().toLowerCase();
            var queryUser = new Parse.Query(Parse.User);
        queryUser.equalTo("email", emailReset);
        queryUser.first({
            success: function(resultEmail) {
                var resultuser = resultEmail.get("username");
                 var resultpswd = resultEmail.get("password");
                  Parse.User.logIn(resultuser, "fbuser", {
                        success: function(user) {
                            resultuser.length = 0;
                            userArrayLogged.push(resultuser);
                            $('form#signup, #homePage, #hometitle, .logohome').hide();
                            $('.indicatorsLeft, .indicatorsAdd').hide();
                            $('#statusUpdate, .statuscue').show('');
                            $('#dbHeader').show();
                            $('#cigarfooter').show();
                            $('#brandTitle').html('CLIQUE FEED');
                             
                            // Do stuff after successful login.

                        },
                        error: function(user, error) {
                            wronguserAlert();
                            // The login failed. Check error to see why.
                        }
                    });

                    }
                });
            });


   /* $('#loginbuttonFB').click(function() {
               $('#login-username, #login-password').fadeOut(350, function() {
               $('#fb-email').fadeIn(350);
               $('.fbactive').click(function(){
                var emaillogged = $("#fb-email").val().toLowerCase();
                var queryUser = new Parse.Query(Parse.User);
                queryUser.equalTo("email", emaillogged);
                queryUser.first({
                 success: function(resultEmail) {
                    if (resultEmail.get("fbuser") === "yes") {
                        var thisUser = resultEmail.get("username");
                         Parse.User.logIn(thisUser,"fbuser", {
                        success: function(userLOGGED) {
                            $('form#login, #homePage').hide();
                            $('.indicatorsLeft, .indicatorsAdd').hide();
                            $('#statusUpdate, .statuscue').show('');
                            $('#dbHeader').show();
                            $('#cigarfooter').show();
                            $('#brandTitle').html('CLIQUE FEED');

                            // Do stuff after successful login.

                        },
                        error: function(userLOGGED, error) {
                            alert('The username entered does not exist');
                            // The login failed. Check error to see why.
                        }
                    });

                           
                        }
    
                    },
                        error: function(resultEmail, error) {
                            alert('vnjsdvnd');
                            // The login failed. Check error to see why.
                        }
                    });
                });
                });
   });

*/



    $('#updateicon').on('click', function() {
        $('body').attr('id', 'status');

        if ($('body').attr('id') == 'status') {
            $('#updateicon').attr('src', 'img/updateiconhover.png').show();
            $('#updateicon').parent().addClass('footeractive');
        }
        $('#cigarlisticon, #myhumidoricon, #locateicon').parent().removeClass('footeractive');
        $('#cigarlisticon').attr('src', 'img/cigarlist.png').show();
        $('#myhumidoricon').attr('src', 'img/myhumidor.png').show();
        $('#locateicon').attr('src', 'img/locateicon.png').show();
        $('.mainsection, .statuscue, .indicatorsLeft, .indicatorsAdd, .indicatortopRated').hide();
        $('#statusUpdate, .statuscue').show();
        arraycigPosts.length = 0;
        console.log("this is arraycigs" + arraycigPosts.length);
       setTimeout(function() {
            getPostsOnLoad();
        }, 0);

        $('#brandTitle').html('Clique Feed');

        addStatus();
    });




    //update status
    $('.statuscue').click(function(e) {
        $(this).addClass('tapActive');

$('.logohome').hide();
        setTimeout(function() {
            $('#statusInnerWrapper').css('visibility', 'visible');
            $('#statusInnerWrapper').addClass('slideLeft');
            $('.previewupload, #resultImage').attr('src', '');
            $('.statuscue').removeClass('tapActive');
        }, 300);

    });

    /*$('#uploadbutton').click(function(e) {
        if ($('#fileselect').attr('data-change') == "false") {
            selectphotoAlert();
        }
    });

    /*$('#fileselect').click(function(e) {
        //alert();
        setTimeout(function(){
        if ($('#resultImage').attr('src').length > 1) {
            alert();
        }
    },500);
    });*/

//user selects a photo

    $(".camera").on("click", function() {
        $(this).addClass('tapActive');
        $('#resultImage').remove();
        setTimeout(function(){
        $('.cameraAlert').addClass('slideLeft');
    },350);
            $('#takePhoto').click(function(){
                 $(this).addClass('tapActive');
            navigator.camera.getPicture(gotPic, onFail, {
                quality: 10,
                destinationType: navigator.camera.DestinationType.DATA_URL,
                sourceType: navigator.camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300
            });
        });

            $('#choosePhoto').click(function(){
                 $(this).addClass('tapActive');
            navigator.camera.getPicture(gotPic, onFail, {
                quality: 10,
                destinationType: navigator.camera.DestinationType.DATA_URL,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300
            });
        });
            $('#cancelPhoto').click(function(){
                 $(this).addClass('tapActive');
            setTimeout(function(){
        $('.cameraAlert').removeClass('slideLeft');
                },50);
            });
    });





    function gotPic(data) {

        $('#statusupdateform').val('');

        $('#statusInnerWrapper').append('<img id="resultImage">');
        dataurl = "data:image/jpeg;base64," + data;
        //preview image
        $('#resultImage').attr('src', dataurl);
        $('#statusupdateform').addClass('adjustTextArea');
        //user submits selected photo
    }


    $('#uploadBtn').click(function() {
        $(this).addClass('tapActive');
        if($('#resultImage').attr('src') === ""){
           selectphotoAlert(); 
        }
        else{
        //alert(baseArray);
        submitPic();
    }
    });


    function submitPic() {

        var sendThis = $('#resultImage').attr('src');
        var parseFile = new Parse.File("mypic.jpg", {
            base64: sendThis
        });

        var val = document.getElementById('statusupdateform').value;
        var statusupdate = $('#statusupdateform').val();
        var currentUser = Parse.User.current();
        parseFile.save().then(function() {
            var nameCurrent = currentUser.getUsername();
            var cigarWall = new Parse.Object("cigarwall");
            cigarWall.set("appuser", nameCurrent);
            cigarWall.set("statusupdate", statusupdate);
            cigarWall.set("imagefile", parseFile);
            cigarWall.save({
                success: function() {
                    $('#uploadBtn').removeClass('tapActive');

                    var postupdate = cigarWall.get('statusupdate');
                    //$('#fileselect').attr('data-change', 'false');
                    $('#statusInnerWrapper').removeClass('slideLeft');
                    location.reload();



                },
                error: function() {
                    alert("upload failed. please try again!");
                }
            });
        });
    }


    function onFail(message) {
        alert('Failed because: ' + message);
    }





        
    //upload post
/*
    $('.camera').click(function() {
$('#resultImage').remove();

navigator.camera.getPicture(onSuccess, onFail, { quality: 50,targetWidth: 300,
    destinationType: Camera.DestinationType.DATA_URL,
   sourceType : Camera.PictureSourceType.PHOTOLIBRARY

});

function onSuccess(imageData) {
$('#statusInnerWrapper').append('<img id="resultImage" src="">');
    var image = document.getElementById('resultImage');
    image.src = "data:image/jpeg;base64," + imageData;
    var filesrc = image.src;
//pushBase.push(imageData);
//console.log(pushBase);

//var pushBaseString = JSON.stringify(pushBase);
     //var dataURL = resCanvas2.toDataURL('image/jpeg', 1.0);
        //var blob = dataURItoBlob(imageData);
        //$("#fileselect").attr('src', pushBase)
 setTimeout(function() {
                $('#uploadbutton').click(function(e) {
                var name = "image1.jpg";
                       var parseFile = new Parse.File(name, {
        base64: filesrc
     });
            //var fileUploadControl = $("#fileselect");
    // var file = fileUploadControl.attr('src');
                     // alert(pushBase);
                
                    var val = document.getElementById('statusupdateform').value;
                    var statusupdate = $('#statusupdateform').val();
                    var currentUser = Parse.User.current();
                    parseFile.save().then(function() {
                        var nameCurrent = currentUser.getUsername();
                        var cigarWall = new Parse.Object("cigarwall");
                        cigarWall.set("appuser", nameCurrent);
                        cigarWall.set("statusupdate", statusupdate);
                        cigarWall.set("imagefile", parseFile);
                        cigarWall.save({
                            success: function() {
                                
                               var postupdate = cigarWall.get('statusupdate');
                                //$('#fileselect').attr('data-change', 'false');
                                $('#statusInnerWrapper').removeClass('slideLeft');
                                /*setTimeout(function() {
                                    location.reload();
                                }, 500);
            
                            },
                            error: function() {
                                alert("upload failed. please try again!");
                            }
                        });
                    });
                }); 
        }, 700);

}
 function onFail(message) {
    alert('Failed because: ' + message);
} 
    });
*/


    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        return new Blob([ab], {
            type: mimeString
        });
    }


    //alert(image2.src);

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('.previewupload').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }



    getPostsOnLoad();

    function getPostsOnLoad() {

        $('#statusPost').empty();
        //get posts
        var register = Parse.Object.extend("cigarwall");
        var query = new Parse.Query(register);
        query.limit(3);
        query.descending("createdAt");
        query.find({
            success: function(results) {
                // alert("Successfully retrieved " + results.length + ".");
                imageURLs = [];
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var objectstring = object.id;
                    var imageFile = object.get('imagefile');
                    var postNameUser = object.get('appuser');
                    var imageURL = imageFile.url();
                    var postupdate = object.get('statusupdate');
                    $('#statusPost').append('<div class="cigarpost" id="' + objectstring + '">' + '<span class="postuser">' + postNameUser + '</span>' + '<div class="imgpost">' + '<img class="postcigimg" data-name="' + postNameUser + '"' + 'src="' + imageURL + '"' + 'width="294"' + '">' + '</div>' + '<span class="statusupdate">' + postupdate + '</span>' + '<img src="img/likeBtn2.png" class="likeicon" style="display:none;">' + '<div class="likesbox" style="display:none;">' + '</div>' + '<img src="img/commentBtn2.png" class="commenticon" style="display:none">' + '<div class="commentsbox" style="display:none;">' + '</div>' + '<div class="postinteraction">' + '<div class="likeBtn">' + '<img src="img/likeBtn.png">' + '<span>like</span>' + '</div>' + '<div class="commentBtn">' + '<img src="img/commentBtn.png">' + '<span>comment</span>' + '</div>' + '<img src="img/sharepost.png" class="sharepost">' + '<img src="img/flag.png" class="flagpost">' + '</div>' + '</div>');
                    postsTracker.push(objectstring);
                    arraycigPosts.push(objectstring);
                }
                getLikesCommentsFlags();

                sharePost();
                flagPost();
                morePostsClick();
                    /*if (results.length <= 2 ){
                            $('#morePosts').hide();
                        }*/

            },
            error: function(error) {
                //alert("Error: " + error.code + " " + error.message);
            }
        });
    }



    $('<img src="img/mapclose.png" id="mapClose">').appendTo('#mapWrapper');



    function getLikesCommentsFlags() {
        getIfCommentExists();
        getIfLikeExists();
        getLikes();
        getUserComments();
        getFlaggedPosts();
        commentClick();
        likeClick();
    }



    function morePostsClick() {
        $('#statusPost').append('<div id="morePosts">See More</div>');

        var register = Parse.Object.extend("cigarwall");
        var query = new Parse.Query(register);
        $('#morePosts').on('click', function() {
            $('.likesbox, .commentsbox').empty();
            var findPost = $('.cigarpost').length;
            query.skip(findPost);
            query.limit(3);
            query.descending("createdAt");
            query.find({
                success: function(results) {

                    // alert("Successfully retrieved " + results.length + ".");
                    imageURLs = [];
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        var objectstring = object.id;
                        var imageFile = object.get('imagefile');
                        var postNameUser = object.get('appuser');
                        var imageURL = imageFile.url();
                        var postupdate = object.get('statusupdate');
                        $('#statusPost').append('<div class="cigarpost" id="' + objectstring + '">' + '<span class="postuser">' + postNameUser + '</span>' + '<div class="imgpost">' + '<img class="postcigimg" data-name="' + postNameUser + '"' + 'src="' + imageURL + '"' + 'width="294"' + '">' + '</div>' + '<span class="statusupdate">' + postupdate + '</span>' + '<img src="img/likeBtn2.png" class="likeicon" style="display:none;">' + '<div class="likesbox" style="display:none;">' + '</div>' + '<img src="img/commentBtn2.png" class="commenticon" style="display:none">' + '<div class="commentsbox" style="display:none;">' + '</div>' + '<div class="postinteraction">' + '<div class="likeBtn">' + '<img src="img/likeBtn.png">' + '<span>like</span>' + '</div>' + '<div class="commentBtn">' + '<img src="img/commentBtn.png">' + '<span>comment</span>' + '</div>' + '</div>' + '<img src="img/sharepost.png" class="sharepost">' + '<img src="img/flag.png" class="flagpost">' + '</div>' + '</div>');
                        //arraycigPosts.push(objectstring);
                    }

                    sharePost();
                    flagPost();


                    $('#morePosts').detach();

                    setTimeout(function() {
                        getLikesCommentsFlags();
                        morePostsClick();
                    }, 300)

                }
            });


        });

    }



    function getAllNewPosts() {
        var reverseArray = arraycigPosts.reverse();
        console.log(reverseArray);

        var register = Parse.Object.extend("cigarwall");
        var query = new Parse.Query(register);
        reverseArray.forEach(function(post) {
            query.equalTo('objectId', post);
            // query.descending("createdAt"); 
            query.find({
                success: function(postings) {
                    // alert("Successfully retrieved " + results.length + ".");
                    imageURLs = [];
                    for (var i = 0; i < postings.length; i++) {
                        var object = postings[i];
                        var objectstring = object.id;
                        var imageFile = object.get('imagefile');
                        var postNameUser = object.get('appuser');
                        var imageURL = imageFile.url();
                        var postupdate = object.get('statusupdate');
                        $('#statusPost').append('<div class="cigarpost" id="' + objectstring + '">' + '<span class="postuser">' + postNameUser + '</span>' + '<div class="imgpost">' + '<img class="postcigimg" data-name="' + postNameUser + '"' + 'src="' + imageURL + '"' + 'width="294"' + '">' + '</div>' + '<span class="statusupdate">' + postupdate + '</span>' + '<img src="img/likeBtn2.png" class="likeicon" style="display:none;">' + '<div class="likesbox" style="display:none;">' + '</div>' + '<img src="img/commentBtn2.png" class="commenticon" style="display:none">' + '<div class="commentsbox" style="display:none;">' + '</div>' + '<div class="postinteraction">' + '<div class="likeBtn">' + '<img src="img/likeBtn.png">' + '<span>like</span>' + '</div>' + '<div class="commentBtn">' + '<img src="img/commentBtn.png">' + '<span>comment</span>' + '</div>' + '</div>' + '<img src="img/sharepost.png" class="sharepost">' + '<img src="img/flag.png" class="flagpost">' + '</div>' + '</div>');
                    }
                    sharePost();
                    flagPost();

                }
            });

        });

        setTimeout(function() {
            var cigPost = $('.cigarpost');
            //alert(cigPost.length);
            if (reverseArray.length == cigPost.length) {
                getLikesCommentsFlags();
                morePostsClick();
            } else {
                alert("Posts are loading");
            }


        }, 1000);


        /*
setInterval(function(){
if(reverseArray.length == cigPost.length ){
getLikesCommentsFlags();
morePostsClick();
alert("yes");
}
else{
alert("Posts are loading");
}
}, 20000);*/

    }




    function getFlaggedPosts() {
        countTracker.length = 0;
        var flaggedResults = Parse.Object.extend("flaggedPosts");
        var queryflag = new Parse.Query(flaggedResults);
        queryflag.find({
            success: function(flagresults) {
                countTracker.length == 0;
                for (var i = 0; i < flagresults.length; i++) {
                    var object = flagresults[i];

                    countTracker.push(object.get('flagged'));
                }
                var arr = countTracker;
                var sorted_arr = countTracker.sort();
                var results = [];
                for (var i = 0; i < arr.length - 1; i++) {
                    if (sorted_arr[i + 1] == sorted_arr[i]) {
                        results.push(sorted_arr[i]);
                    }

                }
                var index;
                for (index = 0; index < results.length; ++index) {
                    console.log(results[index]);
                    $('#' + results[index]).find('.postinteraction, .likesbox, .commentsbox, .likeicon, .commenticon, .statusupdate, .sharepost, .flagpost').remove();
                    $('#' + results[index]).find('.imgpost').find('.postcigimg').attr('src', 'img/postingflagged.jpg').hide().fadeIn();

                }

            },
            error: function() {

            }
        });

    }



    function commentClick() {
        // send comment
        $('.commentBtn').unbind();
        $('.commentBtn').bind('click', function() {

            var CommentsDatabase = Parse.Object.extend("CommentsDatabase");
            var commentsDatabase = new CommentsDatabase();
            var postId = $(this).parent().closest('.cigarpost').attr('id');

            $('#appContainer').append('<div class="commentBox dbWrap mainsection"><img src="img/closestatus.png" class="closestatus"></div>');

            $(this).parent().parent().find('.commentsbox').clone().appendTo('.commentBox');
            $('.commentBox').find('#commentBtn').remove();
            $('.commentBox').append('<textarea class="commentSubmit" id="commentarea"></textarea><div class="sendComment" style="color:#ffffff;">Send</div>');
            $('.sendComment').fadeTo(200, 0.4);
            $('#commentarea').val().length = 0;
            setTimeout(function() {
                $('.commentBox').css('visibility', 'visible');
                $('.commentBox').addClass('slideLeft');
            }, 300);
        $('.closestatus').click(function() {
        $(this).addClass('tapActive');
    setTimeout(function() {
         $('.closestatus').removeClass('tapActive');
        setTimeout(function() {
        $('.commentBox').removeClass('slideLeft');
            },100);

        setTimeout(function(){
            $('.commentBox').remove();
        },300);

       }, 150);
    });
            //adjust click here color
            $('.commentSubmit').focus(function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.scrollTo(0, 0);

                $('.sendComment').fadeTo(200, 1.0);
            });
            // validate form
            $('.sendComment').click(function() {
                var valCom = $('#commentarea').val();
                if (valCom.length <= 1) {
                //$('#commentarea, #reviewarea').remove();

                    entercommentAlert();
                    //return false;
                } else if (valCom.length >= 2) {
                    var currentUser = Parse.User.current();
                    var commentItem = $('#commentarea').val();
                    var nameCurrent = currentUser.getUsername();
                    commentsDatabase.set("username", nameCurrent);
                    commentsDatabase.set("usercomments", commentItem);
                    commentsDatabase.set("postid", postId);
                    commentsDatabase.save();
                    $('#' + postId).find('.commenticon, .commentsbox').show();

                    $('#' + postId).find('.commentsbox').append('<div class="commentposted">' + '<div class="commentUser">' + nameCurrent + '</div>' + '<div class="commentPost">' + commentItem + '</div>' + '</div>');

                    $('.commentBox').removeClass('slideLeft');
                    setTimeout(function() {
                        $('.commentBox').remove();

                    }, 350);
                    //$('.commentBtn').addClass('activecomment');

                }
            });
        });

    }




    function likeClick() {
        $('.likeBtn').unbind();
        //send Like
        $('.likeBtn').bind('click', function() {
            if ($(this).hasClass('likeactive')) {
                $(this).removeClass('likeactive');

                var LikesDatabase = Parse.Object.extend("LikesDatabase");
                var queryremovelikes = new Parse.Query(LikesDatabase);
                var closestID = $(this).parent().closest('.cigarpost').attr('id');
                //console.log(closestID);
                $(this).parent().closest('.cigarpost').find('.likeposted:last-child').remove();
                $(this).parent().closest('.cigarpost').find('.likeposted:last-child').find('.comma:last-child').hide();

                if( $(this).parent().parent().find('.likesbox').is(':empty')) {
                   
                   $(this).parent().parent().find('.likeicon').hide();
                }

                $(this).find('img').attr('src', 'img/likeBtn.png');


                queryremovelikes.descending("createdAt");
                queryremovelikes.equalTo("postid", closestID);
                queryremovelikes.first({
                    success: function(object) {

                        object.destroy();
                        //$('.likeposted:last-child').find('.comma').remove();

                        // The object was retrieved successfully.
                    },
                    error: function(object, error) {
                        // The object was not retrieved successfully.
                        // error is a Parse.Error with an error code and description.
                    }

                });
            } else {

                $(this).addClass('likeactive');
                $('.likeactive img').attr('src', 'img/likeBtn2.png');
                var LikesDatabase = Parse.Object.extend("LikesDatabase");
                var likesDatabase = new LikesDatabase();
                var commentItem = "like";
                var currentUser = Parse.User.current();

                var nameCurrent = currentUser.getUsername();
                $(this).parent().closest('.cigarpost').find('.likeicon, .likesbox').show();

                $(this).parent().closest('.cigarpost').find('.likesbox').find('.likeposted:last-child').find('.likeUser:last-child').append('<span class="comma">,</span>');

                $(this).parent().closest('.cigarpost').find('.likesbox').append('<div class="likeposted">' + '<div class="likeUser">' + nameCurrent + '</div>' + '</div>');

                var currentUser = Parse.User.current();

                var postId = $(this).parent().closest('.cigarpost').attr('id');
                likesDatabase.set("username", nameCurrent);
                likesDatabase.set("userlikes", commentItem);
                likesDatabase.set("postid", postId);
                likesDatabase.save({
                    success: function() {
                        //getsingleLike();
                    },
                    error: function() {
                        alert('not saved');
                    }
                });

            }

        });

    }






    function getUserComments() {
        //get user comments
        var CommentsDatabase = Parse.Object.extend("CommentsDatabase");
        var querycomments = new Parse.Query(CommentsDatabase);
        querycomments.find({
            success: function(results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var commentuser = object.get("username");
                    var comment = object.get("usercomments");
                    var postidget = object.get("postid");
                    $('#' + postidget).find('.commentsbox').append('<div class="commentposted">' + '<div class="commentUser">' + commentuser + '</div>' + '<div class="commentPost">' + comment + '</div>' + '</div>');
                }
                // The object was retrieved successfully.
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
            }
        });
    }

    function getIfCommentExists() {
        //get user comment
        var CommentsDatabase = Parse.Object.extend("CommentsDatabase");
        var querycomments = new Parse.Query(CommentsDatabase);
        querycomments.find({
            success: function(results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var postid = object.get("postid");
                    $('#' + postid).find('.commenticon, .commentsbox').show();
                }

                // The object was retrieved successfully.
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
            }
        });

    }

    function getIfLikeExists() {

        //get user like
        var LikesDatabase = Parse.Object.extend("LikesDatabase");
        var querylikes = new Parse.Query(LikesDatabase);
        querylikes.find({
            success: function(results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var postid = object.get("postid");

                    $('#' + postid).find('.likeicon, .likesbox').show();

                }

                // The object was retrieved successfully.
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
            }
        });

    }


    function getLikes() {

        //get user like
        var LikesDatabase = Parse.Object.extend("LikesDatabase");
        var querylikes = new Parse.Query(LikesDatabase);
        querylikes.find({
            success: function(results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var likeuser = object.get("username");
                    //var likes = object.get("userlikes");
                    var postidget = object.get("postid");
                    $('#' + postidget).find('.likesbox').append('<div class="likeposted">' + '<div class="likeUser">' + likeuser + '<span class="comma">,</span>' + '</div>' + '</div>');

                    if (likeuser == userArrayLogged) {
                        $('#' + postidget).find('.likeBtn').addClass('likeactive');
                        $('#' + postidget).find('.likeBtn').find('img').attr('src', 'img/likeBtn2.png');
                    }


                }
                $('.likeposted:last-child').find('.comma').remove();


                // The object was retrieved successfully.
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
            }
        });

    }



    function sharePost() {
        $('.sharepost').click(function() {
                $(this).addClass('tapActive');
            var shareID = $(this).closest('.cigarpost').attr('id');
            var statusmessage = $(this).closest('.cigarpost').find('.statusupdate').html();
            var imgurl = $(this).closest('.cigarpost').find('.postcigimg').attr('src');
            window.plugins.socialsharing.share(statusmessage + ' #cigarclique', null, imgurl);
        });
    }

    function flagPost() {
        $('.flagpost').unbind();
        $('.flagpost').bind().one('click', function() {
            $(this).addClass('activeclick');
            var nameCurrent = currentUser.getUsername();
            var postid = $(this).closest('.cigarpost').attr('id');
            var postArray = [];
            postArray.push(postid);
            var flaggedPosts = new Parse.Object("flaggedPosts");
            flaggedPosts.set("flagged", postid);
            flaggedPosts.set("user", nameCurrent);
            flaggedPosts.save({
                success: function() {
                    flagAlert();
                    $('#' + postArray).find('.postinteraction, .likesbox, .commentsbox, .likeicon, .commenticon, .statusupdate, .sharepost, .flagpost').remove();
                    $('#' + postArray).find('.imgpost').find('.postcigimg').attr('src', 'img/postingflagged.jpg').hide().fadeIn();
                },
                error: function() {}
            });
        });

    }


    //  not sure about this app.initialize();

    //localstorage load
    var i = 0;
    for (var key in localStorage) {
        if (key.indexOf('task-') === 0) {
            //alert(key);
            $("#tasks").append("<li id='" + key + "'>" + '<span class="taskSpan">' + localStorage.getItem(key) + '</span>' + '<img src="img/closestatus.png" class="removeThis">' + "</li>");

        }
        if (key.indexOf('fav-') === 0) {
            //alert(key);
            $("#favsmokes").append("<li id='" + key + "'>" + '<span class="taskSpan">' + localStorage.getItem(key) + '</span>' + '<img src="img/closestatus.png" class="removeThis">' + "</li>");
        }

    }

    //add a cigar to humidor

/*    $('#task, #cigar, input').focus(function(e) {
        window.scrollTo(0, 0);
        e.preventDefault();
        e.stopPropagation();
    });
*/
    $("#cigarname, #tasks-form").submit(function() {

var length = 12;
var lengthName = 8;
var myString = $("#task").val();
var mynameString = $("#cigar").val();

var myTruncatedString = myString.substring(0,length);
var myTruncatedNameString = mynameString.substring(0,lengthName);



        if (myString === "") {
            humidorAlert();
        } else if (myTruncatedString != "") {
            localStorage.setItem('task-' + myTruncatedString + myTruncatedNameString, myTruncatedString + ' ' + myTruncatedNameString);
            $("#tasks").append('<li id="task-' + myTruncatedString + '">' + '<span class="taskSpan">' + myTruncatedString + ' ' + myTruncatedNameString + '</span>' + '<img src="img/closestatus.png" class="removeThis">' + '</li>')
            $("#" + myTruncatedString).css('display', 'none');
            $("#" + myTruncatedString).fadeIn(350);

        }

        // Remove a task      
        $('.removeThis').click(function() {
            localStorage.removeItem($(this).parent().attr("id"));
            $(this).parent().slideUp(300, function() {
                $(this).remove();
            });
            /*for(i=0; i<localStorage.length; i++) {
if( !localStorage.getItem("task-"+i)) {
localStorage.setItem("task-"+i, localStorage.getItem('task-' + (i+1) ) );
localStorage.removeItem('task-'+ (i+1) );
}
}*/
        });


        return false;

    });
    // Remove a task      
    // Remove a task      
    $('.removeThis').click(function() {
        localStorage.removeItem($(this).parent().attr("id"));
        $(this).parent().slideUp(300, function() {
            $(this).remove();
        });
        /*for(i=0; i<localStorage.length; i++) {
if( !localStorage.getItem("task-"+i)) {
localStorage.setItem("task-"+i, localStorage.getItem('task-' + (i+1) ) );
localStorage.removeItem('task-'+ (i+1) );
}
}*/
    });

    /* $(".addafav").live("click", function() {
var valuefav = $(this).parent().find('.taskSpan').html(); 
localStorage.setItem( "fav-"+valuefav, valuefav);

if (  $("#fav").val() != "" ) {
$("#favsmokes").append("<li id='fav-" + valuefav + "'>"  + '<span class="taskSpan">' + valuefav + '</span>' + '<a href="#">x</a>'  + '</li>')
$("#fav-" + valuefav).css('display', 'none');
$("#fav-" + valuefav).fadeIn(350);
i++;
}
});

// Remove a fav      
$("#favsmokes li a").live("click", function() {
localStorage.removeItem($(this).parent().attr("id"));
$(this).parent().slideUp(300, function() { $(this).remove(); } );
});*/

});

/*document.addEventListener('touchmove', function (e) { 
e.preventDefault(); 
}, false);  */
$('#locateicon').on('click', function() {
    onDeviceReady();

    $(this).attr('src', 'img/locateiconhover.png').show();
    $(this).parent().addClass('footeractive');
    $('#cigarlisticon, #myhumidoricon, #updateicon').parent().removeClass('footeractive');
    $('#cigarlisticon').attr('src', 'img/cigarlist.png').show();
    $('#myhumidoricon').attr('src', 'img/myhumidor.png').show();
    $('#updateicon').attr('src', 'img/updateicon.png').show();

    $('.mainsection, .statuscue, .indicatorsLeft, .indicatorsAdd, .indicatortopRated').hide();
    $('#locatePage').show();
    $('#brandTitle').html('Locate a Cigar Bar or Shop');


});



$('#cigarlisticon').click(function() {
    $('#cigarslistNameWrapper, #cigarslistWrapper').removeClass('slideLeft');
    $(this).attr('src', 'img/cigarlisthover.png').show();
    $(this).parent().addClass('footeractive');
    $('#locateicon, #updateicon, #myhumidoricon').parent().removeClass('footeractive');
    $('#locateicon').attr('src', 'img/locateicon.png').show();
    $('#myhumidoricon').attr('src', 'img/myhumidor.png').show();
    $('#updateicon').attr('src', 'img/updateicon.png').show();
    $('.indicatortopRated').show();
/*
    //$('#cigarslistForm').removeClass('fadeout').css('visibility','visible');
    if ($('#cigardatabase').hasClass('level2') || $('#cigardatabase').hasClass('level3')) {
        $('.indicatorsLeft').removeClass('commentactive');

        $('.indicatorsLeft').removeClass('fadeout').addClass('titleactive');
        var matchBrandName = $('#cigarslistNameWrapper ul').find('.cigartitle').attr('data-brand-cigar');
        $('#brandTitle').html(matchBrandName + ' Cigars');
        $('.mainsection, .statuscue, .indicatorsLeft, .indicatorsAdd').hide();
        $('#cigardatabase, .indicatorsAdd').show();
        return false;
    }*/

    $('.indicatorsLeft').removeClass('commentactive');
    $('.mainsection, .statuscue, .indicatorsLeft, .indicatorsAdd').hide();
    $('#cigardatabase, .indicatorsAdd').show();
    $('#brandTitle').html('Brands');
});


$('#myhumidoricon').on('click', function() {
    $(this).attr('src', 'img/myhumidorhover.png?v=2').show();
    $(this).parent().addClass('footeractive');
    $('#locateicon, #cigarlisticon, #updateicon').parent().removeClass('footeractive');
    $('#locateicon').attr('src', 'img/locateicon.png').show();
    $('#cigarlisticon').attr('src', 'img/cigarlist.png').show();
    $('#updateicon').attr('src', 'img/updateicon.png').show();
    $('.mainsection, .statuscue, .indicatorsLeft, .indicatorsAdd, .indicatortopRated').hide();
    $('#listPage').show();
    $('#brandTitle').html('My Humidor');

    //end of doucment ready
});





//autocomplete for adding cigar to taks list
$(function() {
    var availableTags = [

        "1608",
        "1881",
        "1886",
        "420's",
        "5 Vegas",
        "57",
        "601",
        "777",
        "A. Fernandez",
        "A. Turrent",
        "AVO",
        "ACID",
        "Adan y Eva",
        "Adrian's",
        "After Dinner",
        "Aging Room",
        "Agio",
        "Alamo",
        "Alhambra",
        "Alec Bradley",
        "Aliados",
        "Alonso Menendez",
        "Amador",
        "Ambrosia",
        "Angelina",
        "Ankara",
        "Antonius",
        "Antonio Gimenez",
        "Avanti",
        "Aray & Sons",
        "Aristoff",
        "El Aroma",
        "La Aroma de Cuba",
        "Aroma de San Andrés",
        "Aroma Reál",
        "Arsen",
        "El Arte Cigar Company",
        "Arte Cubano",
        "Arturo Fuente",
        "Ashton",
        "Ász",
        "Augusta",
        "Augusto Reyes",
        "La Aurora",
        "BH Puros",
        "Baccarat",
        "Backwoods",
        "Bahia",
        "Bahiba",
        "Bahias de Costa Rica",
        "Bahman",
        "Barracuda",
        "Bauza",
        "Belinda",
        "Bellman Siesta",
        "Benedit",
        "Bermudez",
        "Black & Mild",
        "Black Patch Reserve",
        "Black Patch Select",
        "Bolívar",
        "Bossner",
        "Brasil Autênticos",
        "Bravo",
        "Brazil",
        "Brun del Ré",
        "Bucanero",
        "C.A.O.",
        "C.E. Beck y Cia",
        "Cabaiguan",
        "Cabañas",
        "Las Cabrillas",
        "Cain",
        "Café Crème",
        "Calypso",
        "Camacho",
        "Camaguey",
        "Campo Verde",
        "Caonabo",
        "Capote",
        "Captaris",
        "Caravelas",
        "La Caridad del Cobre",
        "Carlos Toraño",
        "Carlscorona",
        "La Carolina",
        "Casa Blanca",
        "Casa de Nicaragua",
        "Casa de Torres",
        "Casa Magna",
        "La Casona",
        "La Cava del Puro",
        "Cesars",
        "Chaman",
        "Charatan",
        "Charles Parker",
        "Chateau Real",
        "Che",
        "El Che",
        "Chicos",
        "Chieftain's",
        "Chinchalero",
        "Chubbys",
        "Churchill Nicaragua",
        "Cifuentes",
        "Cigars NB",
        "Cigalia",
        "Cohiba",
        "Cojimar",
        "Colinas",
        "Colón",
        "Condal",
        "Conuco",
        "La Corona",
        "El Credito - Altadis",
        "Criollitos",
        "Crispin Patiño",
        "Crown Fumas",
        "Cruzero de Panamá",
        "Cruz Real",
        "Cuaba",
        "Cuesta-Rey",
        "Cuban Crafters",
        "Cuban Stock",
        "Cucaracha",
        "Cumbres de Puriscal",
        "La Cumanesa",
        "Cumbalette",
        "Cumpay",
        "Cupido",
        "D8",
        "DaMatta",
        "Dannemann",
        "Davidoff",
        "Dawa",
        "De Graaff's-Gravenhage",
        "De Hertogh",
        "De Nobili",
        "De Olifant",
        "Del Paraiso",
        "Delectados",
        "Delicioso",
        "Devil's Weed",
        "Diamond Crown",
        "Diesel",
        "Dignity",
        "Diplomáticos",
        "Domenico",
        "Dominique",
        "Don Alfredo",
        "Don Alfredo Denominativo",
        "Don Antonio",
        "Don Benigno",
        "Don Bienve",
        "Don Cándido",
        "Don Chango",
        "Don Chicho",
        "Don Collins",
        "Don Diego",
        "Don Esteban",
        "Don Fernando",
        "Don Horacio del Monte",
        "Don Jose",
        "Don Juan Urquijo",
        "Don Kiki",
        "Don Leon",
        "Don Lino",
        "Don Luis \"Secretos del Maestro\"",
        "Don Mateo",
        "Don Pedro Cigars",
        "Don Pepe",
        "Don Pepin Garcia",
        "Don Porfírio",
        "Don Ramos",
        "Don Rigo",
        "Don Sebastian",
        "Don Tomas",
        "Don Tuto",
        "Don Ursulo",
        "Doña Erô",
        "Doña Flor",
        "Dunhill",
        "Dutch Masters",
        "DUX",
        "Edicion Especial",
        "Ejecutivos",
        "Elisabeth Bas",
        "Emilio",
        "Emilio Reyes",
        "Encanto",
        "La Escepción",
        "Eureka",
        "Excalibur",
        "Exhibit",
        "Exquisito",
        "La Familia de la Casa de Hidalgo",
        "Farias",
        "Farvardin",
        "Femöring",
        "El Fenicio",
        "Fenix",
        "Fighting Cock",
        "Fittipaldi",
        "La Flor de Caney",
        "Flor de Cano",
        "Flor de Copan",
        "La Flor de Cuba",
        "Flor de Cumbal",
        "La Flor de Gonzalaz (Hialeah,FL)",
        "Flor de Filipinas",
        "Flor de Jalapa",
        "Flor de Jardin",
        "La Flor de la Isabela",
        "Flor de Maria Mancini",
        "Flor del Punto",
        "La Flor de Rizal",
        "Flor de Selva",
        "La Flor Dominicana",
        "Flor Real",
        "Florette",
        "Fonseca",
        "Fuente",
        "Las Fumas De Puerto Rico",
        "Fundacion Ancestral",
        "Galactico",
        "Galiano",
        "Galopp",
        "Game",
        "Garcia Y Vega",
        "Garo Habano",
        "Göta Lejon",
        "Gispert",
        "La Gloria Cubana",
        "Glorias de España",
        "Goviado",
        "Goya",
        "Gran Habano",
        "Graycliff",
        "The Griffins",
        "Guane de Oro",
        "Guantanamera",
        "Gurkha",
        "H. Upmann",
        "Habana",
        "La Habanera",
        "Hacienda Veracruz",
        "Hajenius",
        "Hav-A-Tampa (discontinued in 2009)",
        "Havana Soul",
        "Habaneros",
        "Heat",
        "Helix",
        "Henri Wintermans",
        "Henry Clay",
        "Heren van Ruysdaal",
        "La Herencia de Cuba (Ybor City)",
        "Heritage",
        "Hofnar",
        "Hoja Boricua",
        "Hoja de Mexicali",
        "Hoja de Oro",
        "Homa 20",
        "Homage 1492",
        "Hoyo de Casa",
        "Hoyo de Monterrey",
        "Huifkar",
        "Hunor",
        "Independencía 1898",
        "Indian Tabac",
        "Inter A7mer",
        "Irene",
        "Isla de Sol",
        "Isleños",
        "J. Cortès",
        "J. Fuego",
        "J.L. Salazar y Hermanos",
        "JM's Dominicans",
        "J.R. Tobacco",
        "Jamaica Small Cigars",
        "Jason Crouch select",
        "Java",
        "Java Royale",
        "José Bartolo",
        "Jose Carlos",
        "José L. Piedra",
        "Joya de Havana",
        "Joya de Nicaragua",
        "Joyas de Panama",
        "Joya de San Andrés",
        "Joya Real",
        "Juan Clemente",
        "Juan López",
        "Julio Cesar",
        "Juno",
        "Justus van Maurik",
        "Karel 1",
        "Kenbano",
        "King Edward the Seventh",
        "Krush",
        "Lars Tetens",
        "Latinos",
        "Leite & Alves",
        "León Jimenez",
        "Los Libertadores",
        "Liga Privada",
        "Lochem Cigars",
        "Lucas Santana",
        "Luna Perfecta",
        "M. Vito",
        "MR",
        "Macanudo",
        "Maker's Mark",
        "Man O' War",
        "Marca Fina",
        "Maria Divina",
        "Marco V",
        "María Guerrero",
        "Marmara",
        "Marqués de la Palma",
        "Marsh Wheeling",
        "Marty Oswald Cigars",
        "Matacan",
        "Maximus",
        "Maxum",
        "Mehr",
        "Miguel Grau",
        "Miranda",
        "Mito de San Andres",
        "MJ Frias Cigars",
        "Mombacho",
        "Monseñor",
        "Monte Canario",
        "Monte Pascoal",
        "Monteros",
        "Montesino",
        "Montecristo",
        "Montecruz",
        "Morro Castle",
        "Muriel",
        "My Father",
        "Mythos Solitude",
        "Nabucco",
        "Nat Sherman",
        "Nelly",
        "NFUZE",
        "Nicaragua Habanos",
        "Nick Bada Bing Cigars",
        "La Nobleza Manila",
        "Nomad Cigar Company",
        "Nomi",
        "Nub",
        "Old Henry",
        "Oliva",
        "Oliveros",
        "Olor Del Cibao Cigars",
        "Orange Label",
        "Ordibehesht",
        "Oro de Panama",
        "Origen",
        "Ortega Serie D Maduro",
        "Ortega Serie D Naturals",
        "Oshno",
        "Oud Kampen",
        "Padilla",
        "Padrón",
        "La Palina",
        "Panter",
        "Parodi",
        "Partagás",
        "Paul Garmirian",
        "La Paz",
        "Peerless",
        "Peñamil",
        "Perdomo",
        "Petri",
        "Phillies",
        "Pichón",
        "Piano",
        "Plantation Reserve",
        "Plasencia",
        "Playboy",
        "Por Larrañaga",
        "Pricewise Cigars",
        "Pride of Panama",
        "Primo del Rey",
        "Puerto Rico 965",
        "Punch",
        "Punto De Oro",
        "Puros Reynoso",
        "Purisco",
        "Puros Indios",
        "Puros Julio",
        "Puros Richard",
        "Puros Sol Dorado",
        "Puyana",
        "Pythia",
        "Quai d'Orsay",
        "Quesada",
        "Quevedo",
        "Quiteria",
        "Quintero",
        "Quorum",
        "Rafael González",
        "Ram",
        "Ramón Allones",
        "Ranch Hand",
        "Real Pedro",
        "La Regenta",
        "Reloba",
        "Republic Cigars",
        "Reserva Cristobal",
        "Reserva Ecologica",
        "Reserva Miraflor",
        "La Restina",
        "Rewaechad",
        "El Rey de los Habanos",
        "El Rey del Mundo",
        "La Rica",
        "La Rica Hoja",
        "El Rico Habano",
        "Rima",
        "Ritmeester",
        "Rivalos",
        "Rocky Patel",
        "Romano",
        "Romeo y Julieta",
        "La Rosa Cubana",
        "Royal Barbados",
        "Royal Jamaican",
        "El Rubio",
        "Sabrositos",
        "Saint Luis Rey",
        "Solomne",
        "Salute to Arms",
        "Sam Houston",
        "Sam Lord",
        "San Bosco",
        "San Cristóbal de la Habana",
        "San Martín",
        "San Miguel",
        "San Teodoro",
        "Sancho Panza",
        "Sandes",
        "Santa Clara 1830",
        "Santa Rosa",
        "São Salvador",
        "Savinelli",
        "Schimmelpenninck",
        "Senator",
        "Señor de Sipán",
        "El Septimo",
        "Sexy Sticks",
        "Sibelius",
        "Siboney",
        "Siglo",
        "l Sitio",
        "Smokin' Toad",
        "Sosa",
        "Srintil",
        "Los Statos de Luxe",
        "Stormen",
        "Strandrove",
        "Sueños Oro",
        "Suerdieck",
        "Svea",
        "Swag",
        "Swisher",
        "Taino",
        "Talavera",
        "Tambor",
        "Tabacos Brito",
        "Tatiana",
        "Tatuaje",
        "Tabacos Baez",
        "Tabak Especial",
        "Tambo",
        "Te Amo",
        "Tenorio",
        "Thomas Hinds",
        "Tierra del Sol",
        "Tir",
        "Tabacos Costa",
        "Tony Alvarez",
        "Topkapı",
        "Toppers",
        "Toraño",
        "Tortuga Reserva",
        "Petri Toscanelli",
        "Toscanello",
        "Toscano",
        "Travis Club",
        "Tres Hermanos",
        "Trinidad",
        "Troya",
        "Uiltje",
        "La Unica",
        "Vallejuelo",
        "Valdez",
        "Van der Donk",
        "Vargas",
        "Vato Cigars",
        "Vegafina",
        "Vegas Cubanas",
        "Vegas de Santiago",
        "Vegas de Tabacalera Esteli",
        "Vegas Robaina",
        "Vegueros",
        "Veracruz",
        "El Verso",
        "La Vieja Habana",
        "Vieux Carré",
        "La Vigía",
        "Villa Zamorano",
        "Villiger",
        "Vintage X",
        "Virreyes de México",
        "Viva Republica",
        "Vueltabajo",
        "Vulcan",
        "White Owl",
        "Willem II",
        "Zar",
        "Zino"

    ];
    $("#task").autocomplete({
        source: availableTags
    });
});




//open Fav Page
/*$('#favicon').on('click', function(){
$('#listPage, #locatePage, #homePage, #statusUpdate').hide("slide", { direction: "right" }, 350);
$('#favPage').show("slide", { direction: "right" }, 350)

});*/
//open Staus



//location js
function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}

// onSuccess Geolocation
//
function onSuccess(position) {
    var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    map = new google.maps.Map(document.getElementById('geoLocation'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        preserveViewport: false,
        zoom: 18
    });


    var request = {
        location: myLocation,
        radius: 15000,
        keyword: ["cigar", "cigars", "cigar bar"],
    };

    placesList = document.getElementById('places');

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);



}

function callback(results, status, pagination) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers(results);

        if (pagination.hasNextPage) {
            var moreButton = document.getElementById('more');

            //moreButton.disabled = false;

            google.maps.event.addDomListenerOnce(moreButton, 'click',
                function() {
                    moreButton.disabled = true;
                    pagination.nextPage();
                });

        }
    }
}
var placeNameArray = [];
var placeVicinityArray = [];

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {

        placesList.innerHTML += '<li class="placelist">' + '<span class="nameText">' + place.name + '</span>' + '<br>' + '<span class="addy">' + place.vicinity + '</span>' + '<span class="placeid">' + place.place_id + '</span>' + '</li>';

    }

    $('.placelist').on('click', function() {
        placeNameArray.length = 0;
        placeVicinityArray.length = 0;

        var nameHolder = $(this).find('.nameText').html();
        var addyHolder = $(this).find('.addy').html();

        placeNameArray.push(nameHolder);
        placeVicinityArray.push(addyHolder);

        $('#mapWrapperOuter').css('visibility', 'visible').css('display', 'block');
        setTimeout(function() {
            $('#mapWrapperOuter').addClass('slideLeft');

        }, 300);

        $('#mapClose').click(function() {
            $('#mapWrapperOuter').removeClass('slideLeft');
            setTimeout(function() {
                $('#mapWrapperOuter').css('visibility', 'hidden').css('display', 'none')
            }, 300);

        });
        var array = [];
        var geocoder = new google.maps.Geocoder();
        var markerBounds = new google.maps.LatLngBounds();

        var myOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            preserveViewport: false,
            zoom: 18
        };

        var map = new google.maps.Map(document.getElementById("geoLocation"), myOptions);
        array.length = 0;
        var name = $(this).find('.addy').html();
        var placeIdholder = $(this).find('.placeid').html();


        array.push(name);
        for (var i = 0; i < array.length; i++) {
            geocoder.geocode({
                'address': array[i]
            }, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                    setTimeout(function() {
                        markerBounds.extend(results[0].geometry.location);
                        map.fitBounds(markerBounds);
                    }, 700);


                    var zoomChangeBoundsListener =
                        google.maps.event.addListener(map, 'bounds_changed', function(event) {
                            google.maps.event.removeListener(zoomChangeBoundsListener);
                            map.setZoom(Math.min(15, map.getZoom()));
                        });
                    var request = {
                        placeId: placeIdholder
                    };

                    var service = new google.maps.places.PlacesService(map);

                    service.getDetails(request, function(place, status) {
                        $('#clickcall').attr('href', 'tel:' + place.formatted_phone_number);
                        $('#smsBtn').click(function() {
                            shareSMS();
                        });
                    });
                } else {
                    locationAlert();
                }


            });

        }
    });


}

function onError(error) {
    locationAlert();
}

function shareSMS() {
    window.plugins.socialsharing.shareViaSMS('I' + "'" + 'm smoking at ' + placeNameArray + ' ' + placeVicinityArray + ' #cigarclique', null /* see the note below */ , function(msg) {
        console.log('ok: ' + msg)
    }, function(msg) {
        alert('error: ' + msg)
    })

}


function addaFav() {

    $(".addafav").live('click', function() {
        var i = 0;
        var addFav = $(this).parent().find('.taskSpan').html();
        var addFavString = addFav.toString();
        favArray.push(addFavString);
        localStorage.setItem('cigarFavs', favArray);
        $("#favsmokes").append("<li id='fav-" + i + "'>" + '<span class="taskSpan">' + addFavString + '</span>' + '<a href="#">x</a>' + '</li>')
        $("#fav-" + i).css('display', 'none');
        $("#fav-" + i).fadeIn(350);
        return false;
    });


}

function removeaFav() {

    // Remove a Fav Smoke      
    $("#tasks li a").live("click", function() {});
}



function addStatus() {
    $("#twshare").click(function() {
        shareTW();
    });
    $("#fbshare").click(function() {
        shareFB();
    });
}




function shareTW() {
    var shareMessage = $('#status').val();
    window.plugins.socialsharing.shareViaTwitter(shareMessage + ' ' + '#cigarclique');
}


function shareFB() {
    var cigarName = $('#status').val();

    FB.ui({
        method: 'feed',
        name: 'Cigar Clique',
        picture: '',
        caption: cigarName
    });

}

function closeCue(){
    $('#usercueintro, #closeUser').addClass('slideOut');
     setTimeout(function(){
     $('#usercueintro, #closeUser').remove();

     },1500);

}

function preventFocus(){
        var elelist = document.getElementsByTagName("input");
for(i=0; i < elelist.length; i++){
    elelist[i].setAttribute("onfocus","this.blur()");
}
}


function enableFocus(){
        var elelist = document.getElementsByTagName("input");
for(i=0; i < elelist.length; i++){
    elelist[i].setAttribute("onfocus","this.focus()");
}
}

/*custom alerts*/

    // alert dialog dismissed
        function alertDismissed() {
            // do something
        }
        function alertDismissed2() {
            // do something
        }
        function alertDismissed3() {
            // do something
        }  

        function alertDismissed4() {
            // do something
        }  
        
        function alertDismissed5() {
            // do something
        }  

        function alertDismissed6() {
            // do something
        } 

        function alertDismissed7() {
            // do something
        } 


        function alertDismissed8() {
            // do something
        } 


        function alertDismissed9() {
            // do something
        } 


        function alertDismissed10() {
            // do something
        } 

        function alertDismissed11() {
            // do something
        } 

    // Show a custom alertDismissed
    //
    function signupAlert() {
        navigator.notification.alert(
            'Please enter a Username and Password',  // message
            alertDismissed,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }

    function wronguserAlert() {
        navigator.notification.alert(
            'The Username or Password you entered is incorrect',  // message
            alertDismissed2,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }


        function fbUserAlert() {
        navigator.notification.alert(
            'Enter your Facebook Email.',  // message
            alertDismissed3,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }

        function flagAlert() {
        navigator.notification.alert(
            'This post has been reported. We will review this posting.',  // message
            alertDismissed4,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }

        function selectphotoAlert() {
        navigator.notification.alert(
            'Select a photo and post!',  // message
            alertDismissed5,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }


        function entercommentAlert() {
        navigator.notification.alert(
            'Enter a comment, then click "send"',  // message
            alertDismissed6,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }


        function humidorAlert() {
        navigator.notification.alert(
            'Please Enter A Cigar Brand',  // message
            alertDismissed7,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }

        function wrongEmailAlert() {
        navigator.notification.alert(
            'The email address does not match our records',  // message
            alertDismissed8,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }

        function cigarexistsAlert() {
        navigator.notification.alert(
            'This Cigar Exists! Please enter a new Cigar!',  // message
            alertDismissed9,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }

        function cigarinfoAlert() {
        navigator.notification.alert(
            'Enter the cigar information in this form and submit!',  // message
            alertDismissed10,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }

        function locationAlert() {
        navigator.notification.alert(
            'Please Turn On Location Services For Cigar Clique',  // message
            alertDismissed11,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }
    