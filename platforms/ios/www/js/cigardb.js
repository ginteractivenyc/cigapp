
$(document).ready(function() {
	$(function() {
		FastClick.attach(document.body);
	});







	//cigar database
	var cigarbrandArray = [];
	var resultsarray = [];
var arraycigs = [];
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
				$(this).addClass('bgactive');
				setTimeout(function() {
					$('.cigarbrand').removeClass('bgactive');

				}, 800);
				$(' .indicatortopRated, .indicatorRecco').hide();
				$('.indicatorsLeft, #cigarslistNameWrapper').show();
				$('#cigardatabase').removeClass('level1');
				$('#cigardatabase').addClass('level2');
				$('#cigarslistNameWrapper').empty();
				var matchBrandName = $(this).attr('data-brandname');
				$('#brandTitle').html(matchBrandName + ' Cigars');
				setTimeout(function() {
					$('#cigarslistNameWrapper').addClass('slideLeft');
					$('#cigardatabase').hide();
				}, 200);
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					var cigar = object.get("cigar");
				    var cigId = object.id;
					var cigarBrand = object.get("cigarBrand");
					if (cigarBrand == matchBrandName) {

						$('#cigarslistNameWrapper').append('<ul>' + '<li class="cigartitle" data-name-cigar="' + cigar + '"' + 'data-brand-cigar="' + cigarBrand + '"'  + 'data-id-cigar="' + cigId + '"'   + '>' + cigar + '</li>' + '</ul>');

					}
				}
				//on click match cigar with cigar name
				$('.cigartitle').click(function() {
				
				$(this).addClass('bgactive');
				setTimeout(function() {
					$('.cigartitle').removeClass('bgactive');

				}, 800);					
					arraycigs.length = 0;
					$('#cigardatabase').removeClass('level2');
					$('#cigardatabase').addClass('level3');
					//$('#cigarslistNameWrapper').hide();
					$('#cigarslistWrapper').show();
					$('#cigarslistWrapper').empty();
					setTimeout(function() {
						$('#cigarslistWrapper').addClass('slideLeft');
						$('#cigarslistNameWrapper').hide();
					}, 200);
					$('.indicatorsLeft').addClass('titleactive');
					var matchThisTitle = $(this).attr('data-name-cigar');
					var matchThisBrand = $(this).attr('data-brand-cigar');
					var nameofBrand = $(this).attr('data-brand-cigar');
					var nameofCigar = $(this).attr('data-name-cigar');
					var cigarId = $(this).attr('data-id-cigar');

					for (var i = 0; i < results.length; i++) {
						var object = results[i];
						var cigarName = object.get("cigar");
						var cigarBrand = object.get("cigarBrand");
						var cigarWrapper = object.get("wrapper");
						var cigarStrength = object.get("strength");
						var cigarOrigin = object.get("origin");
						var cigId = object.id;

						if (cigarId === cigId ) {
							$('#cigarslistWrapper').append('<ul>' + '<li class="cigartitle" data-name-cigar="' + cigarName + '"' + 'data-name-brand="' + cigarBrand + '"' + 'data-strength="' + cigarStrength + '">' + cigarName + '</li>' + '<li>' + '<span class="cigarsubs">' + 'wrapper: ' + '</span>' + cigarWrapper + '</li>' + '<li>' + '<span class="cigarsubs">' + 'strength: ' + '</span>' + cigarStrength + '</li>' + '<li class="cigarsubs">' + '<span class="cigarsubs">' + 'origin: ' + '</span>' + cigarOrigin + '</li>' + '<li class="ratingwrapper cigarlast">' + '<span class="cigarrate">' + 'Rating:' + '</span>' + '<div class="rating-container" data-id="' + cigarName + '">' +
								' <img class="star" data-rating="1" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="2" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="3" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="4" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="5" src="img/cigar.png?v=4">' + '</div>' + '</li>' + '</ul>');
							 $('#cigarslistWrapper').append('<ul id="commentBox">' +'<li>' + '<img src="img/commentBtn2.png" class="reviewicon">' + '<span class="cigarsubs">' + 'Reviews: ' + '</span>'  + '<ul class="commentsList">' + '</ul>' + '</li>'  + '</ul>');

							 

					//add a review
					setTimeout(function(){
						reviewClick();
					},0);
					
					
					//get ratings
					setTimeout(function(){	
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
								$(".rating-container").attr('data-id', nameofCigar).find('.star').addClass('active');
								$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
								return false;
							}
							if (summedTotal === 4) {
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(5)').prevAll('.star').addClass('active');
								$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
								return false;
							}
							if (summedTotal === 3) {
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(4)').prevAll('.star').addClass('active');
								$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
								return false;
							}
							if (summedTotal === 2) {
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(3)').prevAll('.star').addClass('active');
								$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
								return false;
							}
							if (summedTotal === 1) {
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(1)').addClass('active');
								$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
								return false;

							}
							if (summedTotal > 4 && summedTotal < 5) {
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(5)').prevAll('.star').addClass('active');
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(5)').addClass('halfActive');
								$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
								$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

								return false;

							}
							
							if (summedTotal > 3 && summedTotal < 4) {
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(4)').prevAll('.star').addClass('active');
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(4)').addClass('halfActive');
								$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
								$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

								return false;
							}
							if (summedTotal > 2 && summedTotal < 3) {
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(3)').prevAll('.star').addClass('active');
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(3)').addClass('halfActive');
								$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
								$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

								return false;
							}
							if (summedTotal > 1 && summedTotal < 2) {
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(2)').prevAll('.star').addClass('active');
								$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(2)').addClass('halfActive');
								$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
								$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

								return false;
							}
						},
						error: function(error) {
							alert("Error: " + error.code + " " + error.message);
						}

					});
					}, 20);

			// retrieve cigar comments
		setTimeout(function(){	
        var cigarComments = Parse.Object.extend("cigarComments");
        var querycigarComments = new Parse.Query(cigarComments);
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
                }, 40);

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
						var strengthofCigar = $(this).parent().parent().parent().find('.cigartitle').attr('data-strength');
						var rateValue = $(this).attr('data-rating');
						var currentUser = Parse.User.current();
						var nameCurrent = currentUser.getUsername();

						//var postACL = new Parse.ACL(Parse.User.current());

						//postACL.setPublicReadAccess(true);
						//postACL.setPublicWriteAccess(false);
						//ratingsCount.setACL(postACL);
						ratingsCount.save({
							cigarBrand: nameofBrand,
							cigarName: nameofCigar,
							cigarRating: rateValue,
							cigarStrength: strengthofCigar,
							username: nameCurrent
						});
					}); //end of rating






						}
					}

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

$("#strengthSubmit").change(function () {
        $(this).removeClass("inactiveselect");
        $(this).addClass('activeselect');
    });

$("#wrapperSubmit").change(function () {
        $(this).removeClass("inactiveselect");
        $(this).addClass('activeselect');
    });

$("#originSubmit").change(function () {
        $(this).removeClass("inactiveselect");
        $(this).addClass('activeselect');
    });
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
           $('.indicatorsAdd').removeClass('tapActive');
           	setTimeout(function() {
           	$('#cigarslistForm').css('visibility', 'visible');
			$('#cigarslistForm').addClass('slideLeft');
			},200);
          }, 150);


	});


	$('.closestatus').click(function() {
		$(this).addClass('tapActive');
	setTimeout(function() {
		 $('.closestatus').removeClass('tapActive');
		setTimeout(function() {
		$('#cigarslistForm').removeClass('slideLeft');
			},100);	

		setTimeout(function(){
			$('.commentBox').remove();
		},300);

       }, 150);
	});

	$('.statusclose').click(function() {
		$(this).addClass('tapActive');
		  setTimeout(function() {
           $('.statusclose, .statuscue, #uploadBtn').removeClass('tapActive');
           	setTimeout(function() {
           	$('#statusInnerWrapper').removeClass('slideLeft');
			$('.cameraAlert').removeClass('slideLeft');
			},100);
			
		setTimeout(function(){
			$('.commentBox').remove();
		},300);

          }, 150);

	});

	//click through cigardb
	$('.indicatorsLeft').click(function() {
			$(this).addClass('tapActive');
		if ($('#cigardatabase').hasClass('level2')) {
			$('#cigarslistNameWrapper').removeClass('slideLeft');
			setTimeout(function() {
				$('.indicatorsLeft').removeClass('tapActive');
				$('#cigardatabase').show();

			}, 300);
			$('#cigardatabase').removeClass('level2');
			$('#cigardatabase').addClass('level1');
			$(this).hide();
			$('#brandTitle').html('brand');
			$('.indicatortopRated, .indicatorRecco').show();
		}

		if ($('#cigardatabase').hasClass('level3')) {
			$('#cigarslistWrapper').removeClass('slideLeft');
			setTimeout(function() {
				$('.indicatorsLeft').removeClass('tapActive');
				$('#cigarslistNameWrapper').show();
			}, 300);
			$('#cigardatabase').removeClass('level3');
			$('#cigardatabase').addClass('level2');

		}


	});






    function getTopRated() {
			$('.indicatortopRated, .indicatorRecco').hide();

    	 $('#topCigs').empty();
        //get user comments
        var topCount = [];
        var topRatedDatabase = Parse.Object.extend("RatingsObject");
        var queryRatings = new Parse.Query(topRatedDatabase);
        queryRatings.descending("cigarRating");
        queryRatings.limit(150);
        queryRatings.find({
            success: function(results) {
            	$('.spinner').hide();
                for (var i = 0; i < results.length; i++) {

                    var object = results[i];
                    var  topName = object.get("cigarName");
                    var topBrand = object.get("cigarBrand");

if(topName === topName){
    //console.log(object.get("cigarName"));
    var pushThis = '<span class="topName" data-topname="' + topName + '">' + topName +'</span>' +  ' - ' + '<span class="topBrand" data-topbrand="' +  topBrand   +    '">' + topBrand + '</span>';
    topCount.push(pushThis);
}

            }
            var hash = [];

            for (var n = topCount.length; n--;) {
                if (typeof hash[topCount[n]] === 'undefined') hash[topCount[n]] = [];
                hash[topCount[n]].push(n);
            }

            var duplicates = [];
            for (var key in hash) {
                if (hash.hasOwnProperty(key) && hash[key].length > 1) {
                    duplicates.push(key);
                }
            }

            //console.log(duplicates);
            for (var i = 0; i < duplicates.length; i++) {
                $('#topCigs').append('<li class="cigartitle">' + duplicates[i] + '</li>');

            }

                $('#topCigs li.cigartitle').click(function(){
               $(this).addClass('bgactive2');
				setTimeout(function() {
					$('#topCigs li.cigartitle').removeClass('bgactive2');

				}, 800);	
                	arraycigs.length = 0;
					$('#toplistWrapper').show();
					$('#toplistWrapper').empty();
					$('.closeTop').hide();
					$('.indicatorsLeftTop').fadeIn();


					setTimeout(function() {
						$('#toplistWrapper').addClass('slideLeft');
					}, 200);

					$('.indicatorsLeftTop').click(function(){
						$('#toplistWrapper').removeClass('slideLeft');
						$(this).hide();
						$('.closeTop').show();
						$('#brandTitle').html("top rated cigars");
					});

						var matchThisTitle = $(this).find('.topName').attr('data-topname');
						var matchThisBrand = $(this).find('.topBrand').attr('data-topbrand');
						var nameofCigar = $(this).find('.topName').attr('data-topname');
						var nameofBrand = $(this).find('.topBrand').attr('data-topbrand');
						var CigarList = Parse.Object.extend("CigarList");
						var querycigarList = new Parse.Query(CigarList);
					querycigarList.equalTo("cigarBrand", matchThisBrand);
					querycigarList.find({
					success: function(results) {
					for (var i = 0; i < results.length; i++) {
						var object = results[i];
						var cigarName = object.get("cigar");
						var cigarBrand = object.get("cigarBrand");
						var cigarWrapper = object.get("wrapper");
						var cigarStrength = object.get("strength");
						var cigarOrigin = object.get("origin");

						if (cigarName == matchThisTitle && cigarBrand == matchThisBrand) {
								$('#brandTitle').html(matchThisBrand);
							$('#toplistWrapper').append('<ul>' + '<li class="cigartitle" data-name-cigar="' + cigarName + '"' + 'data-name-brand="' + cigarBrand + '"' + 'data-strength="' + cigarStrength +  '">' + cigarName + '</li>' + '<li>' + '<span class="cigarsubs">' + 'wrapper: ' + '</span>' + cigarWrapper + '</li>' + '<li>' + '<span class="cigarsubs">' + 'strength: ' + '</span>' + cigarStrength + '</li>' + '<li class="cigarsubs">' + '<span class="cigarsubs">' + 'origin: ' + '</span>' + cigarOrigin + '</li>' + '<li class="ratingwrapper cigarlast">' + '<span class="cigarrate">' + 'Rating:' + '</span>' + '<div class="rating-container" data-id="' + cigarName + '">' +
								' <img class="star" data-rating="1" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="2" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="3" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="4" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="5" src="img/cigar.png?v=4">' + '</div>' + '</li>' + '</ul>');
							 $('#toplistWrapper').append('<ul id="commentBox">' +'<li>' + '<img src="img/commentBtn2.png" class="reviewicon">' + '<span class="cigarsubs">' + 'Reviews: ' + '</span>'  + '<ul class="commentsList">' + '</ul>' + '</li>'  + '</ul>');



									setTimeout(function() {
										reviewClick();
									}, 0);

									//get ratings
									setTimeout(function() {
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
													$(".rating-container").attr('data-id', nameofCigar).find('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													return false;
												}
												if (summedTotal === 4) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(5)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													return false;
												}
												if (summedTotal === 3) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(4)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													return false;
												}
												if (summedTotal === 2) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(3)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													return false;
												}
												if (summedTotal === 1) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(1)').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													return false;

												}
												if (summedTotal > 4 && summedTotal < 5) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(5)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(5)').addClass('halfActive');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

													return false;

												}

												if (summedTotal > 3 && summedTotal < 4) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(4)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(4)').addClass('halfActive');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

													return false;
												}
												if (summedTotal > 2 && summedTotal < 3) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(3)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(3)').addClass('halfActive');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

													return false;
												}
												if (summedTotal > 1 && summedTotal < 2) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(2)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(2)').addClass('halfActive');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

													return false;
												}



											},
											error: function(error) {
													alert("Error: " + error.code + " " + error.message);
												}
												/*end of topratings li click*/
										});

									}, 20);

									//get comments
									setTimeout(function() {
										// retrieve cigar comments
										var cigarComments = Parse.Object.extend("cigarComments");
										var querycigarComments = new Parse.Query(cigarComments);



										querycigarComments.find({
											success: function(comments) {
												for (var i = 0; i < comments.length; i++) {
													var object = comments[i];
													var cigarName = object.get("cigarname");
													var cigarBrand = object.get("cigarbrand");
													var commentUser = object.get("user");
													var userComment = object.get("comment");
													if (cigarName == nameofCigar && cigarBrand == nameofBrand) {

														$('.commentsList').append('<li class="addedComment">' + '<span class="commentUser">' + commentUser + '</span>' + '<span class="commentPost">' + userComment + '</span>' + '</li>');

													}
												}
											},
											error: function(comments, error) {
												alert('no comments');
											}
										});
									}, 40);


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
										var strengthofCigar = $(this).parent().parent().parent().find('.cigartitle').attr('data-strength');
										var currentUser = Parse.User.current();
										var nameCurrent = currentUser.getUsername();
										//var postACL = new Parse.ACL(Parse.User.current());

										//postACL.setPublicReadAccess(true);
										//postACL.setPublicWriteAccess(false);
										//ratingsCount.setACL(postACL);
										ratingsCount.save({
											cigarBrand: nameofBrand,
											cigarName: nameofCigar,
											cigarRating: rateValue,
											cigarStrength: strengthofCigar,
											username: nameCurrent
										});
									}); //end of rating




						}
					}


				}

			});

//get ratings


                });

            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
            }
        });
/*end of topratings function*/
    }






//get Reccomendations
    function getRecco() {
			$('.indicatorRecco, .indicatortopRated').hide();

    	 $('#reccoCigs').empty();
        //get user comments
        var reccoCount = [];
        var strengthCount = [];
        var strengthFinalString = [];
        var topRatedDatabase = Parse.Object.extend("RatingsObject");
        var queryRatings = new Parse.Query(topRatedDatabase);
       var currentUser = Parse.User.current().getUsername().toString();
       queryRatings.equalTo("username", currentUser);
        queryRatings.find({
            success: function(results) {
            	$('.spinner').hide();
                for (var i = 0; i < results.length; i++) {

                    var object = results[i];
                    var  topName = object.get("cigarName");
                    var topBrand = object.get("cigarBrand");
                    var topStrength = object.get("cigarStrength");
strengthCount.push(topStrength);
}

mode(strengthCount);
function mode(array)
{
    if(array.length == 0)
    	return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
    	var el = array[i];
    	if(modeMap[el] == null)
    		modeMap[el] = 1;
    	else
    		modeMap[el]++;	
    	if(modeMap[el] > maxCount)
    	{
    		maxEl = el;
    		maxCount = modeMap[el];
    	}
    }
   
strengthFinalString.push(maxEl);
}


        var reccoCigars = Parse.Object.extend("CigarList");
        var queryreccoCigars = new Parse.Query(reccoCigars);
       queryreccoCigars.equalTo("strength", strengthFinalString.toString());
       queryreccoCigars.limit(50);
        queryreccoCigars.find({
            success: function(results) {
                for (var i = 0; i < results.length; i++) {
                	
                	var object = results[i];
                    var reccoName = object.get("cigar");
                    var reccoBrand = object.get("cigarBrand");
                    var reccoStrength = object.get("strength");
 

    //console.log(object.get("cigarName"));
    var pushThis = '<span class="topName" data-topname="' + reccoName + '">' + reccoName +'</span>' +  ' - ' + '<span class="topBrand" data-topbrand="' +  reccoBrand   +    '">' + reccoBrand + '</span>';
 $('#reccoCigs').append('<li class="cigartitle">' + pushThis + '</li>');

   
}

 
                $('#reccoCigs li.cigartitle').click(function(){
 				$(this).addClass('bgactive2');
				setTimeout(function() {
					$('#reccoCigs li.cigartitle').removeClass('bgactive2');

				}, 800);               
                	arraycigs.length = 0;
					$('#reccolistWrapper').show();
					$('#reccolistWrapper').empty();
					$('.closeTop').hide();
					$('.indicatorsLeftTop').fadeIn();


					setTimeout(function() {
						$('#reccolistWrapper').addClass('slideLeft');
					}, 200);

					$('.indicatorsLeftTop').click(function(){
						$('#reccolistWrapper').removeClass('slideLeft');
						$(this).hide();
						$('.closeTop').show();
						$('#brandTitle').html("Recommended For Me");
					});

						var matchThisTitle = $(this).find('.topName').attr('data-topname');
						var matchThisBrand = $(this).find('.topBrand').attr('data-topbrand');
						var nameofCigar = $(this).find('.topName').attr('data-topname');
						var nameofBrand = $(this).find('.topBrand').attr('data-topbrand');
						var CigarList = Parse.Object.extend("CigarList");
						var querycigarList = new Parse.Query(CigarList);
					querycigarList.equalTo("cigarBrand", matchThisBrand);
					querycigarList.find({
					success: function(results) {
					for (var i = 0; i < results.length; i++) {
						var object = results[i];
						var cigarName = object.get("cigar");
						var cigarBrand = object.get("cigarBrand");
						var cigarWrapper = object.get("wrapper");
						var cigarStrength = object.get("strength");
						var cigarOrigin = object.get("origin");

						if (cigarName == matchThisTitle && cigarBrand == matchThisBrand) {
							$('#brandTitle').html(matchThisBrand);
							$('#reccolistWrapper').append('<ul>' + '<li class="cigartitle" data-name-cigar="' + cigarName + '"' + 'data-name-brand="' + cigarBrand + '"' + 'data-strength="' + cigarStrength + '">' + cigarName + '</li>' + '<li>' + '<span class="cigarsubs">' + 'wrapper: ' + '</span>' + cigarWrapper + '</li>' + '<li>' + '<span class="cigarsubs">' + 'strength: ' + '</span>' + cigarStrength + '</li>' + '<li class="cigarsubs">' + '<span class="cigarsubs">' + 'origin: ' + '</span>' + cigarOrigin + '</li>' + '<li class="ratingwrapper cigarlast">' + '<span class="cigarrate">' + 'Rating:' + '</span>' + '<div class="rating-container" data-id="' + cigarName + '">' +
								' <img class="star" data-rating="1" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="2" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="3" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="4" src="img/cigar.png?v=4">' + ' <img class="star" data-rating="5" src="img/cigar.png?v=4">' + '</div>' + '</li>' + '</ul>');
							 $('#reccolistWrapper').append('<ul id="commentBox">' +'<li>' + '<img src="img/commentBtn2.png" class="reviewicon">' + '<span class="cigarsubs">' + 'Reviews: ' + '</span>'  + '<ul class="commentsList">' + '</ul>' + '</li>'  + '</ul>');



									setTimeout(function() {
										reviewClick();
									}, 0);

									//get ratings
									setTimeout(function() {
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
													$(".rating-container").attr('data-id', nameofCigar).find('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													return false;
												}
												if (summedTotal === 4) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(5)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													return false;
												}
												if (summedTotal === 3) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(4)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													return false;
												}
												if (summedTotal === 2) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(3)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													return false;
												}
												if (summedTotal === 1) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(1)').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													return false;

												}
												if (summedTotal > 4 && summedTotal < 5) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(5)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(5)').addClass('halfActive');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

													return false;

												}

												if (summedTotal > 3 && summedTotal < 4) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(4)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(4)').addClass('halfActive');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

													return false;
												}
												if (summedTotal > 2 && summedTotal < 3) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(3)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(3)').addClass('halfActive');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

													return false;
												}
												if (summedTotal > 1 && summedTotal < 2) {
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(2)').prevAll('.star').addClass('active');
													$(".rating-container").attr('data-id', nameofCigar).find('.star:nth-child(2)').addClass('halfActive');
													$(".rating-container").attr('data-id', nameofCigar).find('.active').attr('src', 'img/cigarFilled.png?v=4');
													$(".rating-container").attr('data-id', nameofCigar).find('.halfActive').attr('src', 'img/cigarHalfFilled.png?v=4');

													return false;
												}



											},
											error: function(error) {
													alert("Error: " + error.code + " " + error.message);
												}
												/*end of topratings li click*/
										});

									}, 20);

									//get comments
									setTimeout(function() {
										// retrieve cigar comments
										var cigarComments = Parse.Object.extend("cigarComments");
										var querycigarComments = new Parse.Query(cigarComments);



										querycigarComments.find({
											success: function(comments) {
												for (var i = 0; i < comments.length; i++) {
													var object = comments[i];
													var cigarName = object.get("cigarname");
													var cigarBrand = object.get("cigarbrand");
													var commentUser = object.get("user");
													var userComment = object.get("comment");
													if (cigarName == nameofCigar && cigarBrand == nameofBrand) {

														$('.commentsList').append('<li class="addedComment">' + '<span class="commentUser">' + commentUser + '</span>' + '<span class="commentPost">' + userComment + '</span>' + '</li>');

													}
												}
											},
											error: function(comments, error) {
												alert('no comments');
											}
										});
									}, 40);

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
										var strengthofCigar = $(this).parent().parent().parent().find('.cigartitle').attr('data-strength');
										var rateValue = $(this).attr('data-rating');
										var currentUser = Parse.User.current();
										var nameCurrent = currentUser.getUsername();
										//var postACL = new Parse.ACL(Parse.User.current());

										//postACL.setPublicReadAccess(true);
										//postACL.setPublicWriteAccess(false);
										//ratingsCount.setACL(postACL);
										ratingsCount.save({
											cigarBrand: nameofBrand,
											cigarName: nameofCigar,
											cigarRating: rateValue,
											cigarStrength: strengthofCigar,
											username: nameCurrent
										});

									}); //end of rating




						}


					}


				}

			});


//get ratings
           });


       	},

                error: function(error){

                }
            });

            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
            }
        });
/*end of recco function*/
    }




$('.indicatortopRated').on('click', function(){
	spinFunction();
			//$(this).addClass('tapActive');
	$('#brandTitle').html('Top Rated Cigars');
        $('.mainsection, .statuscue, .indicatorsLeft, .indicatorsAdd, .indicatorsLeftNotify').hide();
        $('#topratedPage, .closeTop').show();
        

        getTopRated();

});


$('.indicatorRecco').on('click', function(){
	spinFunction();
			//$(this).addClass('tapActive');
	$('#brandTitle').html('Recommended For Me');
        $('.mainsection, .statuscue, .indicatorsLeft, .indicatorsAdd, .indicatorsLeftNotify').hide();
        $('#reccoPage, .closeTop, .infoicon').show();
        

        getRecco();

});





	      	$('.closeTop').click(function(){

				$('#reccoPage, #topratedPage, .closeTop, .infoicon').hide();
		        $('#cigardatabase, .indicatorsAdd, .indicatortopRated, .indicatorRecco').show();
				$('#brandTitle').html('Brands');
      		 });
	
$('.infoicon').click(function(){
	reccoAlert();
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


        var spinFunction = function() {
            var opts = {
                lines: 10, // The number of lines to draw
                length: 7, // The length of each line
                width: 4, // The line thickness
                radius: 10, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                color: '#d19538', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 9999999, // The z-index (defaults to 2000000000)
                top: 25, // Top position relative to parent in px
                left: 110 // Left position relative to parent in px
            };
            var target = document.getElementById('appContainer');
            var loading;
            loading = false;
            if (loading == false) {
                var spinner = new Spinner(opts).spin(target);
            }
            loading = true;
            if (loading == true) {
                setTimeout(function() {
                    spinner.stop();
                }, 10000);
            }
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

            $('.commentBox').append('<textarea class="commentSubmit" id="reviewarea"> </textarea><div class="sendComment" style="color:#ffffff;">Send</div>');
            $('.sendComment').fadeTo(200, 0.4);
            $('#reviewarea').val().length = 0;
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
                var valReview = $('#reviewarea').val();
                if (valReview.length <= 1) {
                    enterreviewAlert();
                    //return false;
                } else if (valReview.length >= 2) {
                    var currentUser = Parse.User.current();
                    var commentItem = $('#reviewarea').val();
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
