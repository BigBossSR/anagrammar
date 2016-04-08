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
    this.unmatched = ko.observable(true);
};

function ViewModel () {
    var self = this;

    self.letters = ko.observableArray();
    self.composition = ko.observable();

//behaviors can use push and remove to mirror letters
    self.processInput =  function(alphaNumString) {
       
        
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
    };

    self.lazyShuffle =  function () {
        this.letters.sort(function(k) {
            return k.charCode;
        })
    };

    self.handleKeystroke =  function(k) {
        var newCharCode = k.keyCode;
        var typed = String.fromCharCode(newCharCode);

        var pattern = new RegExp("^[a-zA-Z0-9]+$");

        if (pattern.test(typed)) {
            self.compareToBank(typed);
        }
    };

    self.compareToBank =  function(typed) {
        var letterBank = self.letters();
/*        letterBank.forEach(function(letter){
            letter.unmatched = true;
        });*/

        var reduced = letterBank.reduce(function(prevChar, currentChar){
            console.log(currentChar, typed);
            if ( currentChar.character() === prevChar && currentChar.unmatched() ) {
                return prevChar = currentChar;
            } else {
                return prevChar = prevChar;
            }
        }, typed);
        console.log(reduced)
        typeof(reduced) === "object" ? reduced.unmatched(false) : console.log("not observable");

    };
    
}
var viewModel = new ViewModel();
ko.applyBindings(viewModel);

