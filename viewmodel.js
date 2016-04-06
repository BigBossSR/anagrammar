/**
 * Created by sross on 4/5/2016.
 */
var inputData = []; //comes from input - split into arr
//option: make a letter observable object,
//split the string into new letter
//-use ko.utils.arrayMap
//could set an id, so never more letters than max id
//what if it just checks if it's in there and steals it?
//then on delete, pushes it back in...
//use a computed to see if it's in the letter bank?

var Letter = function(char) {
    this.character = ko.observable(char);
    this.charCode = char.charCodeAt();
};

var viewModel = {
    self: this,

    letters: ko.observableArray(),
    composition: ko.observableArray(),


//behaviors can use push and remove to mirror letters
    processInput: function(alphaNumString) {
       
        
        var charArr = alphaNumString.split("");

        for (var i = 0; i < alphaNumString.length; i++) {
            var letter = new Letter(alphaNumString[i]);
            this.letters.push(letter);
        }
/*        viewModel.letters = ko.utils.arrayMap(charArr, function(char) {
            var letter = new Letter(char);
            return letter;
        });*/
        this.lazyShuffle();
    },

    lazyShuffle: function () {
        this.letters.sort(function(k) {
            return k.charCode;
        })
    },

    handleKeystroke: function(k) {
        var newCharCode = k.keyCode;
        if (newCharCode !== 32 || newCharCode !== 8 || newCharCode !== 46) {
            k.preventDefault();

            var letterBank = viewModel.letters();

            for (var i = 0; i < letterBank.length; i++) {
                if (letterBank[i].charCode === newCharCode) {
                    console.log("I found it");
                    viewModel.composition.push(letterBank[i].character());
                    this.letters.remove(letterBank[i]);

                    break;
                }
            }
        }
        console.log(k);
        console.log(viewModel.composition())

    }
    
}

ko.applyBindings(viewModel);

