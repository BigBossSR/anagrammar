/**
 * Created by sross on 4/4/2016.
 */

    var util = {
        stripToLetters: function (str) {
            str =  str.replace(/[^a-zA-Z0-9]/g,'');
            return str.toUpperCase();
        },

        getEl: function(str) {
            return document.getElementById(str);
        },

        screenInput: function(k) {
/*            var validChars = util.getEl("remaining-letters").innerHTML;
            validChars = new RegExp(validChars);*/

        }
    }

    var api = {

        populateLetterList: function(){
            var entry = util.stripToLetters(util.getEl("original-term").value);
            viewModel.letters.removeAll();
            viewModel.composition("");
            viewModel.processInput(entry);
        },

        handleKeystroke: function(k) {

/*            if (k.keyCode !== 68) {
                k.preventDefault();
                k.keyCode = 0;
                return false;
            }*/
            if (k.keyIdentifier === "d") {
                console.log("yes")
            }
            console.log(k);
            console.log(viewModel.composition)

        }
    }


//handsontable
/*var rawData = {
    originals: ["Sample Term", "Another", "Something Else"],
    anagrams: {
        1: ["arm temples", "metal sperm", "melts a perm"],
        2: ["heat ron"],
        3: ["Me English Toes", "Steel sing home"]
    }
},*/
var rawData = {
    "Sample Term": ["arm temples", "metal perms", "melts a perm"],
    "Another": ["heat ron"],
    "Something Else": ["Me English Toes", "Steel sing home"]

},
    container = util.getEl("hot-target"),
    hot1,
    hotData = [],
    colHeadersData =[],
    convertToVerticalRows = function() {
        var computedData = [],
            originalRow = Object.keys(rawData),
            colSpacer = 0,
            necessaryRows;

        hotData.length = 0;
        colHeadersData.length === 0 ? colHeadersData = originalRow.concat("") : null;

       // hotData.push(originalRow);
        for (key in rawData) {
            necessaryRows = rawData[key].length;
            while (hotData[necessaryRows] === undefined) {
                var paddingArr = [];
                for (var x = 0; x < originalRow.length; x++) {
                    paddingArr.push("");
                }
                hotData.push(paddingArr);
            }

            for (var i = 0; i < rawData[key].length; i++) {
                console.log(rawData[key])
                hotData[i][colSpacer] = rawData[key][i];
            }
            colSpacer++;
        }
       // hotData = computedData;
    };

convertToVerticalRows();
//colHeadersData = hotData[0];
hot1 = new Handsontable(container, {
    data: hotData,
    minSpareRows: 1,
    minSpareCols: 1,
    readOnly: true,
    colHeaders: colHeadersData
//TODO: click col header fill out input

});


util.getEl("original-term").autofocus;