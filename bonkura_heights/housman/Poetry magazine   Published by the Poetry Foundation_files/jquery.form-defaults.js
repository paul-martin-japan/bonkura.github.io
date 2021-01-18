var NERD = NERD || {};

NERD.FormDefaults = {
    forms: []
};

jQuery.fn.DefaultValue = function(text){
    return this.each(function(){
		//Make sure we're dealing with text-based form fields
		if(this.type != 'text' && this.type != 'password' && this.type != 'textarea')
			return;
		
		//Store field reference
		var fld_current=this;

		//Set value initially if none are specified
        if(this.value=='') {
			this.value=text;
		} else {
			//Other value exists - ignore
			return;
		}
		
		//Remove values on focus
		$(this).focus(function() {
			if(this.value==text || this.value=='')
				this.value='';
		});
		
		//Place values back on blur
		$(this).blur(function() {
			if(this.value==text || this.value=='')
				this.value=text;
		});

		//Capture parent form submission
		//Remove field values that are still default
		$(this).parents("form").each(function(parentFormIndex, parentForm) {

            // Have we already bound the submit event for this form?
            var matchedForms = [];
            matchedForms = $.grep(
                NERD.FormDefaults.forms,
                function(element) {
                    return element == parentForm
                }
            );

            // If this form has not already been added to the collection, add it
            // to the collection and bind the submit event to it.
            if (matchedForms.length == 0) {

                NERD.FormDefaults.forms.push(parentForm);

                //Bind parent form submit
                $(this).submit(function(e) {
                    if (fld_current.value==text) {
                        fld_current.value='';
                    }

                    // Add validation for blank form fields.
                    if (fld_current.value == '' && $(fld_current).is(":visible")  ) {
                        alert('This form cannot be blank.');
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }
		});
    });
};