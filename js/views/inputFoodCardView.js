// Declare app if not declared
var app = app || {};

app.InputFoodCardView = Backbone.View.extend({
    el: '#inputFoodCard',
    events: {
        'keyup #inputFood': 'createOnEnter',
        'click #inputFoodSubmit': 'createFoodItem'
    },
    initialize: function () {
        this.$input = $('#inputFood');
        $.get('data/example_collection.json', function (data) {
            $('#InputFood').blur()
            $('#inputFood').typeahead({
                source: data,
                minLength: 1
            });
        }, 'json');
    },
    // render: function () { },
    createOnEnter: function (e) {
        console.log("typeahead running");
        // console.log(this.$input.val().trim().length);
        if (e.which === ENTER_KEY && this.$input.val().trim()) {
            // console.log("calling CreateFoodItem");
            this.createFoodItem(e);
        } else {

        }
    },

    // grab the string in the input field and return as object to be passed into foodItem constructor
    newAttributes: function () {
        return {
            name: this.$input.val().trim(),
            calories: 100
        };
    },

    createFoodItem: function (event) {
        // console.log("createFoodItem running");
        // if event wasn't triggered by the enter key or if the input field is empty, return out of the function
        // console.log(this.$input.val().trim());
        if (!this.$input.val().trim()) {
            return;
        }

        // create a new todo
        // console.log(this.newAttributes());
        app.foodItems.create(this.newAttributes());

        // erase the input field
        this.$input.val('');
    },

});