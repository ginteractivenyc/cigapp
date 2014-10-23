$(document).ready(function() {
	$(function() {
		FastClick.attach(document.body);
	});

	//cigar database
	var cigarbrandArray = [];
	var resultsarray = [];

	//get user comments
	var CigarList = Parse.Object.extend("CigarList");
	var querycigarList = new Parse.Query(CigarList);
	querycigarList.limit(1000);
	querycigarList.ascending("cigarBrand");
	querycigarList.find({
		success: function(results) {
			$('#cigardatabase').addClass('level1')
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				var cigarBrand = object.get("cigarBrand");
				var cigar = object.get("cigar");
				var strength = object.get("strength");
				var wrapper = object.get("wrapper");
				var origin = object.get("origin");
				$('#cigarslistWrapper').append('<ul class="cigarlisting" data-matchthis="' + cigarBrand + '">' + '<li class="cigarbrand">' + cigarBrand + '</li>' + '<li class="cigarbrand">' + cigar + '</li>' + '<li class="cigarbrand">' + strength + '</li>' + '<li class="cigarbrand">' + wrapper + '</li>' + '<li class="cigarbrand">' + origin + '</li>' + '</ul>');
				//$('#cigardbWrapper').append('<li class="cigarbrand"' + 'data-brandname="' + cigarBrand + '">'+ cigarBrand + '</li>');
				cigarbrandArray.push(cigarBrand);

			}

			var uniqueArray = cigarbrandArray.filter(function(elem, pos) {
				return cigarbrandArray.indexOf(elem) == pos;

			});

			for (i = 0; i < uniqueArray.length; i++) {
				$('#cigardbWrapper').append('<li class="cigarbrand"' + 'data-brandname="' + uniqueArray[i] + '">' + uniqueArray[i] + '</li>');
			}

			//on click match brand with cigar listings
			$('.cigarbrand').click(function() {
				$('#cigardatabase').hide();
				$('.indicatorsLeft, #cigarslistNameWrapper').show();
				$('#cigardatabase').removeClass('level1');
				$('#cigardatabase').addClass('level2');
				$('#cigarslistNameWrapper').empty();
				var matchBrandName = $(this).attr('data-brandname');
				$('#brandTitle').html(matchBrandName + ' Cigars');
				setTimeout(function() {
					$('#cigarslistNameWrapper').addClass('slideLeft');
				}, 200);
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					var cigar = object.get("cigar");
					var cigarBrand = object.get("cigarBrand");
					if (cigarBrand == matchBrandName) {

						$('#cigarslistNameWrapper').append('<ul>' + '<li class="cigartitle" data-name-cigar="' + cigar + '"' + 'data-brand-cigar="' + cigarBrand + '"' + '>' + cigar + '</li>' + '</ul>');

					}
				}
				//on click match cigar with cigar name
				$('.cigartitle').click(function() {
					$('#cigardatabase').removeClass('level2');
					$('#cigardatabase').addClass('level3');
					$('#cigarslistNameWrapper').hide();
					$('#cigarslistWrapper').show();
					$('#cigarslistWrapper').empty();
					setTimeout(function() {
						$('#cigarslistWrapper').addClass('slideLeft');
					}, 200);
					$('.indicatorsLeft').addClass('titleactive');
					var matchThisTitle = $(this).attr('data-name-cigar');
					var matchThisBrand = $(this).attr('data-brand-cigar');
					querycigarList.equalTo("cigarBrand", matchThisBrand);

					for (var i = 0; i < results.length; i++) {
						var object = results[i];
						var cigarName = object.get("cigar");
						var cigarBrand = object.get("cigarBrand");
						var cigarWrapper = object.get("wrapper");
						var cigarStrength = object.get("strength");
						var cigarOrigin = object.get("origin");

						if (cigarName == matchThisTitle && cigarBrand == matchThisBrand) {

							$('#cigarslistWrapper').append('<ul>' + '<li class="cigartitle" data-name-cigar="' + cigarName + '"' + 'data-name-brand="' + cigarBrand + '">' + cigarName + '</li>' + '<li>' + '<span class="cigarsubs">' + 'wrapper: ' + '</span>' + cigarWrapper + '</li>' + '<li>' + '<span class="cigarsubs">' + 'strength: ' + '</span>' + cigarStrength + '</li>' + '<li class="cigarsubs">' + '<span class="cigarsubs">' + 'origin: ' + '</span>' + cigarOrigin + '</li>' + '<li class="ratingwrapper cigarlast">' + '<span class="cigarrate">' + 'Rating:' + '</span>' + '<div class="rating-container" data-id="' + cigarName + '">' +
								' <img class="star" data-rating="1" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="2" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="3" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="4" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="5" src="img/cigar.png?v=4">' + '</div>' + '</li>' + '</ul>');
							 $('#cigarslistWrapper').append('<ul id="commentBox">' +'<li>' + '<img src="img/commentBtn2.png" class="reviewicon">' + '<span class="cigarsubs">' + 'Reviews: ' + '</span>'  + '<ul class="commentsList">' + '</ul>' + '</li>'  + '</ul>')

						}
					}

			// retrieve cigar comments
        var cigarComments = Parse.Object.extend("cigarComments");
        var querycigarComments = new Parse.Query(cigarComments);
        var matchThisTitle = $(this).attr('data-name-cigar');
        var matchThisBrand = $(this).attr('data-brand-cigar');
                    querycigarComments.find({
                        success: function(comments) {
                    for (var i = 0; i < comments.length; i++) {
                        var object = comments[i];
                        var cigarName = object.get("cigarname");
                        var cigarBrand = object.get("cigarbrand");
    					var commentUser= object.get("user");
						var userComment= object.get("comment");
                        if (cigarName == matchThisTitle && cigarBrand == matchThisBrand) {

                           $('.commentsList').append('<li class="addedComment">' + '<span class="commentUser">' + commentUser  + '</span>'  + '<span class="commentPost">' + userComment + '</span>' + '</li>');

                        }
                    }
                },
                error: function(comments, error){
                            alert('no comments');
                }
            });



//add a review
reviewClick();


//get ratings
					var arraycigs = [];
					var nameofBrand = $(this).attr('data-brand-cigar');
					var nameofCigar = $(this).attr('data-name-cigar');
					var RatingsObject = Parse.Object.extend("RatingsObject");
					var queryRatings = new Parse.Query(RatingsObject);
					queryRatings.equalTo("cigarBrand", nameofBrand);
					queryRatings.equalTo("cigarName", nameofCigar);

					queryRatings.find({
						success: function(ratings) {
							for (var i = 0; i < ratings.length; i++) {
								// Do something with the returned Parse.Object values    
								var object = ratings[i];
								//alert(object.id + ' - ' + object.get('cigarRating'));
								arraycigs.push(object.get('cigarRating'));

							}


							var lengthVal = arraycigs.length;
							var addedTotal = eval(arraycigs.join('+'));
							var summedTotal = addedTotal / lengthVal;
							if (summedTotal === 5) {
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star').addClass('active');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.active').attr('src', 'img/cigarFilled.png?v=4');
								return false;
							}
							if (summedTotal === 4) {
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(5)').prevAll('.star').addClass('active');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.active').attr('src', 'img/cigarFilled.png?v=4');
								return false;
							}
							if (summedTotal === 3) {
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(4)').prevAll('.star').addClass('active');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.active').attr('src', 'img/cigarFilled.png?v=4');
								return false;
							}
							if (summedTotal === 2) {
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(3)').prevAll('.star').addClass('active');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.active').attr('src', 'img/cigarFilled.png?v=4');
								return false;
							}
							if (summedTotal === 1) {
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(1)').addClass('active');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.active').attr('src', 'img/cigarFilled.png?v=4');
								return false;

							}
							if (summedTotal > 4 && summedTotal < 5) {
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(5)').prevAll('.star').addClass('active');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(5)').addClass('halfActive');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.active').attr('src', 'img/cigarFilled.png?v=4');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

								return false;

							}
							
							if (summedTotal > 3 && summedTotal < 4) {
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(4)').prevAll('.star').addClass('active');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(4)').addClass('halfActive');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.active').attr('src', 'img/cigarFilled.png?v=4');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

								return false;
							}
							if (summedTotal > 2 && summedTotal < 3) {
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(3)').prevAll('.star').addClass('active');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(3)').addClass('halfActive');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.active').attr('src', 'img/cigarFilled.png?v=4');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

								return false;
							}
							if (summedTotal > 1 && summedTotal < 2) {
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(2)').prevAll('.star').addClass('active');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.star:nth-child(2)').addClass('halfActive');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.active').attr('src', 'img/cigarFilled.png?v=4');
								$(".rating-container[data-id='" + nameofCigar + "']").find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

								return false;
							}
						},
						error: function(error) {
							alert("Error: " + error.code + " " + error.message);
						}

					});


					$('.rating-container .star').click(function() {
						$(this).addClass('staractive');
						$('.staractive').attr('src', 'img/cigarFilled.png?v=4');
						$('.rating-container .star').not(this).removeClass('active');


						$('.rating-container .star').not(this).attr('src', 'img/cigar.png?v=4');
						$(this).prevAll('.star').addBack().addClass('active');

						//alert();
						setTimeout(function() {
							$('.active').attr('src', 'img/cigarFilled.png?v=4');

						}, 300);
						var RatingsObject = Parse.Object.extend("RatingsObject");
						var ratingsCount = new RatingsObject();
						var nameofBrand = $(this).parent().parent().parent().find('.cigartitle').attr('data-name-brand');
						var nameofCigar = $(this).parent().parent().parent().find('.cigartitle').attr('data-name-cigar');
						var rateValue = $(this).attr('data-rating');
						var postACL = new Parse.ACL(Parse.User.current());
						postACL.setPublicReadAccess(true);
						postACL.setPublicWriteAccess(false);
						ratingsCount.setACL(postACL);
						ratingsCount.save({
							cigarBrand: nameofBrand,
							cigarName: nameofCigar,
							cigarRating: rateValue,
						});
					}); //end of rating

				});

			});


		},
		error: function(results, error) {
			alert();
		}



	}); //end of cigar query


	/*$('#brandSubmit, #nameSubmit, #strengthSubmit, #wrapperSubmit, #originSubmit').focus(function(e) {
		window.scrollTo(0, 0);
		e.preventDefault();
		e.stopPropagation();

	});*/



	//submit a cigar
	$('#submitCigar').click(function() {

		var SubmitCigarList = Parse.Object.extend("CigarList");
		var querySubmitCigarList = new Parse.Query(SubmitCigarList);
		var checkName = $('#nameSubmit').val();
		var checkBrand = $('#brandSubmit').val();
		var checkNameArray = [];
		var checkBrandArray = [];
		checkNameArray.push(checkName);
		checkBrandArray.push(checkBrand);

		checkNameArrayString = checkNameArray.toString();
		checkBrandArrayString = checkBrandArray.toString();

		var checkStringName = toTitleCase(checkNameArrayString);
		var checkStringBrand = toTitleCase(checkBrandArrayString);

		//querySubmitCigarList.equalTo("cigarBrand", checkBrand);	
		querySubmitCigarList.equalTo("cigarBrand", checkStringBrand);
		querySubmitCigarList.find({
			success: function(results) {
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					var cigarName = object.get("cigar");
					var cigarBrand = object.get("cigarBrand");


					if (checkStringName == cigarName && checkStringBrand == cigarBrand) {
						cigarexistsAlert();
						return false;
					}

				}
				if ($('#brandSubmit').val() == "" || $('#nameSubmit').val() == "" || $('#strengthSubmit').val() == "" || $('#wrapperSubmit').val() == "" || $('#originSubmit').val() == "") {
					cigarinfoAlert();
					return false;
				}
				var submitCigarList = new SubmitCigarList();
				var brandvalue = $('#brandSubmit').val();
				var brandstring = toTitleCase(brandvalue);
				var submitBrand = brandstring;
				var namevalue = $('#nameSubmit').val();
				var namestring = toTitleCase(namevalue);
				var submitName = namestring;
				var submitStrength = $('#strengthSubmit').val();
				var submitWrapper = $('#wrapperSubmit').val();
				var submitOrigin = $('#originSubmit').val();


				submitCigarList.save({
					cigarBrand: submitBrand,
					cigar: submitName,
					origin: submitOrigin,
					strength: submitStrength,
					wrapper: submitWrapper,
				}, {
					success: function(ratingsCount) {
						$('#cigarslistForm').removeClass('slideLeft');
						// The object was saved successfully.
					},
					error: function(ratingsCount, error) {
						// The save failed.
						// error is a Parse.Error with an error code and description.
					}

				});

			}
		});

	});






	//add cigar
	$('.indicatorsAdd').click(function() {
		$(this).addClass('tapActive');
		$('#brandSubmit, #nameSubmit, #strengthSubmit, #wrapperSubmit, #originSubmit').val('');

		setTimeout(function() {
			$('#cigarslistForm').css('visibility', 'visible');
			$('#cigarslistForm').addClass('slideLeft');
		}, 200);

	});


	$('.closestatus').click(function() {
		$(this).addClass('tapActive');
		$('#cigarslistForm').removeClass('slideLeft');

	});

	$('.statusclose').click(function() {
		$(this).addClass('tapActive');
		$('#statusInnerWrapper').removeClass('slideLeft');
		  /*setTimeout(function() {
            location.reload();
          }, 500);*/

	});

	//click through cigardb
	$('.indicatorsLeft').click(function() {
			$(this).addClass('tapActive');
		if ($('#cigardatabase').hasClass('level2')) {
			$('#cigarslistNameWrapper').removeClass('slideLeft');
			setTimeout(function() {
				$('#cigardatabase').show();

			}, 300);
			$('#cigardatabase').removeClass('level2');
			$('#cigardatabase').addClass('level1');
			$(this).hide();
			$('#brandTitle').html('brand');
		}

		if ($('#cigardatabase').hasClass('level3')) {
			$('#cigarslistWrapper').removeClass('slideLeft');
			setTimeout(function() {
				$('#cigarslistNameWrapper').show();
			}, 300);
			$('#cigardatabase').removeClass('level3');
			$('#cigardatabase').addClass('level2');

		}


	});



});

//end of document ready
//capitalize  brand name on input
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
//camelcase
function toTitleCase(str) {
	return str.replace(/(?:^|\s)\w/g, function(match) {
		return match.toUpperCase();
	});
}







  function reviewClick() {
        // send comment
        $('.reviewicon').unbind();
        $('.reviewicon').bind('click', function() {
        var matchThisTitle = $(this).parent().parent().parent().find('.cigartitle').attr('data-name-cigar');
        var matchThisBrand = $(this).parent().parent().parent().find('.cigartitle').attr('data-name-brand');
       // alert(matchThisBrand + matchThisTitle);
            var cigarComments = Parse.Object.extend("cigarComments");
            var cigarCommentsDatabse = new cigarComments();
            var postId = $(this).parent().closest('.cigarpost').attr('id');

            $('#appContainer').append('<div class="commentBox dbWrap mainsection"><img src="img/closestatus.png" class="closestatus"></div>');

            $('.commentBox').append('<textarea class="commentSubmit" id="commentarea"></textarea><div class="sendComment" style="color:#ffffff;">Send</div>');
            $('.sendComment').fadeTo(200, 0.4);
            $('#commentarea').val().length = "";
            setTimeout(function() {
                $('.commentBox').css('visibility', 'visible');
                $('.commentBox').addClass('slideLeft');
            }, 300);
            $('.closestatus').click(function() {
                $('.commentBox').removeClass('slideLeft');


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
                var val = document.getElementById('commentarea').value;
                if (/^\s*$/g.test(val)) {
                    enterreviewAlert();
                    return false;
                } else {
                    var currentUser = Parse.User.current();
                    var commentItem = $('.commentSubmit').val();
                    var nameCurrent = currentUser.getUsername();

                    cigarCommentsDatabse.set("user", nameCurrent);
                    cigarCommentsDatabse.set("comment", commentItem);
                    cigarCommentsDatabse.set("cigarname", matchThisTitle);
                    cigarCommentsDatabse.set("cigarbrand", matchThisBrand);
                    cigarCommentsDatabse.save();
                    $('#' + postId).find('.commenticon, .commentsbox').show();

                    $('#' + postId).find('.commentsbox').append('<div class="commentposted">' + '<div class="commentUser">' + nameCurrent + '</div>' + '<div class="commentPost">' + commentItem + '</div>' + '</div>');

                    $('.commentBox').removeClass('slideLeft');
                    setTimeout(function() {
                        $('.commentBox').remove();

			// retrieve cigar reviews after submission
        var cigarComments = Parse.Object.extend("cigarComments");
        var querycigarComments = new Parse.Query(cigarComments);
        			querycigarComments.descending('createdAt');
        			querycigarComments.limit(1);
                    querycigarComments.find({
                        success: function(comments) {
                    for (var i = 0; i < comments.length; i++) {
                        var object = comments[i];
                        var cigarName = object.get("cigarname");
                        var cigarBrand = object.get("cigarbrand");
    					var commentUser= object.get("user");
						var userComment= object.get("comment");
                        if (cigarName == matchThisTitle && cigarBrand == matchThisBrand) {

                           $('.commentsList').append('<li class="addedComment">' + '<span class="commentUser">' + commentUser  + '</span>'  + '<span class="commentPost">' + userComment + '</span>' + '</li>');

                        }
                    }
                },
                error: function(comments, error){
                            alert('no comments');
                }
            });



                    }, 350);
                    //$('.commentBtn').addClass('activecomment');

                }
            });
        });

    }

        function enterreviewAlert() {
        navigator.notification.alert(
            'Enter a comment, then click "send"',  // message
            alertDismissed6,         // callback
            'Cigar Clique',            // title
            'Ok'                  // buttonName
        );
    }
