(function() {

	window.favorites = {
		insertLink: insertLink,
		addFavorite: addFavorite,
		removeFavorite: removeFavorite,
		signup: signup,
		signin: signin,
		signin_3rd: signin_3rd,
		goToFavorites: goToFavorites,
		forgotPassword: forgotPassword,
		showDialog: showDialog,
		hideDialog: hideDialog,
		divs: {},
		isLoggedIn: false,
        init: initFavorites
	};

    window.favorites.init();
	
	return;
	
	// interface functions

    /**
     * Initialize event handlers
     */
    function initFavorites() {
        $(document).mouseup(function(e) {
            var $target = $(e.target);
            if (
                    $target.parents('#favorite-dialog-signin-main').length == 0 &&
                    $target.parents('#favorite-dialog-signup-main').length == 0 &&
                    $target.parents('#favorite-dialog-forgot-password-main').length == 0
                )
            {
                window.favorites.hideDialog('main');
            }
        });

        // Copy this setting from the window scope, if it exists
        window.favorites.isLoggedIn = window.isLoggedIn;
    }

	function insertLink(divId, type, id) {
		window.favorites.divs[type] = divId;
		if (type == 'main') {
			id = 1;
		}
		// write out all the buttons and dialogs

		var html = [
			concat('<a href="#" onclick="window.favorites.goToFavorites();return false;" title="My Favorite Poetry" class="my-favorite-poetry" id="favorite-button-insert-point-'+type+'" style="display:none;">My Favorite Poetry</a>'),
			concat("<div id='favorite-buttons-", type, "' class='inline' style='display: none'>"),
				concat("<div id='favorite-button-add-", type, "' class='favorite-button-", type, " inline' style='display: none'>"),
					concat("<a href='#' onclick='window.favorites.addFavorite(\"", type, "\", ", id, "); return false;' class='add-favorite-link toggle'>Add to Favorite Poetry</a>"),
				"</div>",
				concat("<div id='favorite-button-remove-", type, "' class='favorite-button-", type, " inline' style='display: none'>"),
					concat("<a href='#' onclick='window.favorites.removeFavorite(\"", type, "\", ", id, "); return false;' class='remove-favorite-link toggle'>Remove from Favorite Poetry</a>"),
				"</div>",
			"</div>",
			concat("<div id='favorite-dialogs-", type, "' style='display: none'>"),
				concat("<div id='favorite-dialog-signup-", type, "' class='favorite-dialog-", type, "' style='display: none'>"),
					concat("<form class='favorite-dialog' onsubmit='window.favorites.signup(\"", type, "\",", id, ", this); return false;'>"),
						"<p class='modeltext'>Register</p>",
						"<p class='modelfields'><input type='text' name='username' class='field' value='Username' onblur='if(this.value==\"\") this.value=\"Username\";' onfocus='if(this.value==\"Username\") this.value=\"\";' /><br/>",
						"<input type='text' name='email' value='Email' class='field' onblur='if(this.value==\"\") this.value=\"Email\";' onfocus='if(this.value==\"Email\") this.value=\"\";' /><br/>",
						"<input type='password' name='password' class='field' value='Password' onblur='if(this.value==\"\") this.value=\"Password\";' onfocus='if(this.value==\"Password\") this.value=\"\";' /><br/>",
						"<span style='font-size:10px;'><input type='checkbox' name='agree_terms' value='1' />I agree to the <a href='/foundation/privacy#terms' target='_blank'>terms and conditions</a>.</span></p>",
						"<p class='modelsign'><input type='image' src='/images/model-submit.gif' value='Submit' />",
						concat("<span>or</span> <a href='#' onclick='window.favorites.showDialog(\"", type, "\", \"signin\"); return false;'>Log in</a></p>"),
						concat("<p class='modelforgot'><a href='#' onclick='window.favorites.showDialog(\"", type, "\", \"forgot-password\"); return false;'>Forgot Password?</a></p>"),
						concat("<p class='modelforgot'><a href='#' onclick='window.favorites.hideDialog(\"", type, "\"); return false;'>cancel</a></p>"),
					"</form>",
				"</div>",
				concat("<div id='favorite-dialog-signin-", type, "' class='favorite-dialog-", type, "' style='display: none'>"),
					concat("<form class='favorite-dialog' onsubmit='window.favorites.signin(\"", type, "\",", id, ", this); return false;'>"),
						"<p class='modeltext'>Please log in.</p>",
						"<p class='modelfields'><input type='text' name='username' class='field' value='Username or Email' onblur='if(this.value==\"\") this.value=\"Username or Email\";' onfocus='if(this.value==\"Username or Email\") this.value=\"\";' /><br/>",
						"<input type='password' name='password' class='field' value='Password' onblur='if(this.value==\"\") this.value=\"Password\";' onfocus='if(this.value==\"Password\") this.value=\"\";' /></p>",
						"<p class='modelsign'><input type='image' src='/images/model-login.gif' value='Log In' />",
						concat("<span>or</span> <a href='#' onclick='window.favorites.showDialog(\"", type, "\", \"signup\"); return false;'>Register</a></p>"),
						concat("<p class='modelforgot'><a href='#' onclick='window.favorites.showDialog(\"", type, "\", \"forgot-password\"); return false;'>Forgot Password?</a>"),
							concat( " &nbsp;  &nbsp;  &nbsp; <a href='#' onclick='window.favorites.hideDialog(\"", type, "\"); return false;'>cancel</a>"),
						"</p>",
						'<div class="remote-login-options" style="margin-top:0.5em;">',
							concat("<p class='modelforgot'><a href='#' onclick='window.favorites.signin_3rd(\"facebook\")'>" , '<img src="/images/login-facebook.png" width="162" height="29" alt="Log in with Facebook" title="" border="0">' , "</a></p>"),
							//concat("<p class='modelforgot'><a href='#' onclick='window.favorites.signin_3rd(\"twitter\")'>" , '<img src="/images/login-twitter.png" width="162" height="29" alt="Log in with Facebook" title="" border="0">' , "</a></p>"),
							//concat("<p class='modelforgot'><a href='#' onclick='window.favorites.signin_3rd(\"google\")'>" , '<img src="/images/login-google.png" width="162" height="29" alt="Log in with Facebook" title="" border="0">' , "</a></p>"),
						'</div>',
					"</form>",
				"</div>",
				concat("<div id='favorite-dialog-forgot-password-", type, "' class='favorite-dialog-", type, "' style='display: none'>"),
					concat("<form class='favorite-dialog' onsubmit='window.favorites.forgotPassword(\"", type, "\",", id, ", this); return false;'>"),
						"<p class='modeltext'>To recover your password, enter the email address that you used to register.</p>",
						"<p class='modelfields'><input type='text' name='email' class='field' value='Email Address' onblur='if(this.value==\"\") this.value=\"Email Address\";' onfocus='if(this.value==\"Email Address\") this.value=\"\";'></p>",
						"<p class='modelsign'><input type='image' src='/images/model-submit.gif' value='Submit' />",
						concat("<span>or</span> <a href='#' onclick='window.favorites.showDialog(\"", type, "\", \"signin\"); return false;'>Log In</a>"),
						concat("<span>or</span> <a href='#' onclick='window.favorites.showDialog(\"", type, "\", \"signup\"); return false;'>Register</a>"),
						concat("<p class='modelforgot'><a href='#' onclick='window.favorites.hideDialog(\"", type, "\"); return false;'>cancel</a></p>"),
					"</form>",
					"",
				"</div>",
			"</div>"
		];

		$("#" + divId).html(html.join("\n"));
		
		if (type != 'main' ) {
			// figure out which button to show

			// This section was added to prevent the need to ping the server on EVERY request.
			// If we already know the user is not logged in, just do this.
			if( window.favorites.isLoggedIn === false ) {
				showButton(type, "add"); 
				$('div.actions ul li.favorite a.toggle').live('click', function() {
					if ($(this).closest('li.favorite').hasClass('active')) {
						hideDialogs('poem');
					}

					$(this).closest('li.favorite').toggleClass('active');
				});
				return;
			}

			// User IS logged in or we don't know. Get information about the current user's status
			// and whether they have favorited the current item.
			$.getJSON(concat("/favorites/getbutton?type=", type, "&id=", id), function (data) {

				if (!data.button || (data.button == "add")) {
					showButton(type, "add");
				} else {
					showButton(type, "remove");
				}

				$('div.actions ul li.favorite a.toggle').live('click', function() {
					if (data.isLoggedIn !== true)
					{
						if ($(this).closest('li.favorite').hasClass('active')) {
							hideDialogs('poem');
						}

						$(this).closest('li.favorite').toggleClass('active');
					} else {
						$(this).closest('li.favorite').removeClass('active');
					}
				});
				window.favorites.isLoggedIn = data.isLoggedIn;
			});


		} else {
			$('a#favorite-button-insert-point-main').show();
		}
		
	}
	
	function goToFavorites () {
		$.getJSON("/favorites/GoToFavorites", function (data) {
			window.favorites.isLoggedIn = data.isLoggedIn;
			if (window.favorites.isLoggedIn) {
				redirectToFavorites();
			}
			else{
				$('div#topnav li.favorite').addClass('active');
				showDialog("main", "signin");
			}
				
		});
	}
	
	function addFavorite(type, id) {
		if (window.favorites.isLoggedIn) {
			$.post("/favorites/add", {type: type, id: id, ajax: true});
			showButton(type, "remove");
		} else {
			showDialog(type, "signin");
		}
	}
	
	function removeFavorite(type, id) {
		$.post("/favorites/remove", {type: type, id: id, ajax: true});
		showButton(type, "add");
	}
	
	function signup(type, id, form) {
		var username = form.username.value;
		var email = form.email.value;
		var password = form.password.value;
		var agree = form.agree_terms.checked ? 1 : 0;
		
		if ((username.length > 0) && (email.length > 0) && (password.length > 0)) {
			$.post("/favorites/signup", {username: username, email: email, password: password, agree: agree, ajax: true}, function (data) {
				window.favorites.isLoggedIn = data.isLoggedIn;
				if (data.error) {
					alert(data.error);
				}
				else {
					if (type != 'main') {
						addFavorite(type, id);
						hideDialogs(type);
					} else {
						redirectToFavorites();
					}		
				}
			}, "json");
		}	
	}
	
	function signin(type, id, form) {
		var username = form.username.value;
		var password = form.password.value;
		
		if ((username.length > 0) && (password.length > 0)) {
			$.post("/favorites/signin", {username: username, password: password, ajax: true}, function (data) {
				window.favorites.isLoggedIn = data.isLoggedIn;
				if (data.error) {
					alert(data.error);
				}
				else {
					if (type != 'main') {
						addFavorite(type, id);
						hideDialogs(type);
						$('div.actions ul li.favorite.active').removeClass('active');
					} else {
						redirectToFavorites();
					}	
				}
			}, "json");
		}
	}

	function signin_3rd(service) {
		//--- Not an AJAX submission... need to actually load new page for these
		$form = $('<form action="/favorites/signin3rd?service='+service+'" method="POST"></form>').css("display", "none");
		$("<input name='service' value='"+service+"'>").appendTo( $form );
		$("<input name='nowpage' value='"+window.location.pathname + (window.location.search ? '?' + window.location.search : '' ) +"'>").appendTo( $form );
		tryit = $form.appendTo( $("body") ).submit();
		return false;
	}
	
	function forgotPassword(type, id, form) {
		var email = form.email.value;

		if (email.length > 0) {
			$.post("/favorites/forgotpassword", {email: email, ajax: true}, function (data) {
				if (data.error) {
					alert(data.error);
				}
				else {
					if (data.message)
						alert(data.message);
					showDialog(type, "signin");
				}
			}, "json");
		}
	}
	
	// helper functions
	
	function concat() {
		var text = [];
		for (var i=0; i < arguments.length; i++)
			text.push(arguments[i]);
		return text.join("");
	}
	
	function showButton(type, action) {
		$(concat(".favorite-button-", type)).hide();
		$(concat("#favorite-button-", action, "-", type)).show();
		$(concat("#favorite-buttons-", type)).show();
	}
	
	function showDialog(type, action) {
		$(concat(".favorite-dialog-", type)).hide();
		$("#favorite-dialog-" + action + "-" + type).show();
		$(concat("#favorite-dialogs-", type)).show();
	}
	
	function hideDialog (type) {
		$('div#topnav li.favorite').removeClass('active');
		hideDialogs(type);
	}
	
	function hideDialogs(type) {
		$(concat(".favorite-dialog-", type)).hide();
		$(concat("#favorite-dialogs-", type)).hide();
	}
	
	function redirectToFavorites () {
		window.location.replace("/favorites/");
	}

})();

