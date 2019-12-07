const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });
var csvWriter = require('csv-write-stream');

let xml_string = fs.readFileSync("keepass.xml", "utf8");
var writer = csvWriter()
writer.pipe(fs.createWriteStream('1password.csv'));

parser.parseString(xml_string, function(error, result) {
    if(error === null) {
    	result.KeePassFile.Root.forEach(function(item, i, arr) {
	        item.Group.forEach(function(item, i, arr) {
        		item.Group.forEach(function(item, i, arr) {
        			if (item.Entry) {
	        			item.Entry.forEach(function(item, i, arr) {
		        			writeToCsv(item.String);
		        		});
        			}
        		});
	        });
        });

        writer.end();
    }
    else {
        console.log(error);
    }
});

function writeToCsv(strings) {
	var model = {Title: null, Website: null, Username: null, Password: null, Notes: null};

	strings.forEach(function(item) {
		switch (item.Key[0]) {
			case 'Title':
				model.Title = item.Value[0];
				break;
			case 'URL':
				model.Website = item.Value[0];
				break;
			case 'UserName':
				model.Username = item.Value[0];
				break;
			case 'Password':
				model.Password = item.Value[0]._;
				break;
			case 'Notes':
				model.Notes = item.Value[0];
				break;
		}
	});

	console.log(model);
	writer.write(model);
}