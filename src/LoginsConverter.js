module.exports = class LoginsConverter {
	constructor() {
		let xml2js = require('xml2js');
		this.fs = require('fs');
		this.xmlParser = new xml2js.Parser({attrkey: 'ATTR'});
	}

	open(fileName) {
		this.keepassXml = this.fs.readFileSync(fileName, 'utf8');
	}

	writeTo(fileName) {
		let csvWriter = require('csv-write-stream');
		csvWriter = csvWriter();
		csvWriter.pipe(this.fs.createWriteStream(fileName));

		this.xmlParser.parseString(this.keepassXml, function(error, result) {
		    if (error === null) {
		    	result.KeePassFile.Root.forEach(function(item, i, arr) {
			        item.Group.forEach(function(item, i, arr) {
		        		item.Group.forEach(function(item, i, arr) {
		        			if (item.Entry) {
			        			item.Entry.forEach(function(item, i, arr) {
			        				let model = LoginsConverter.getLoginModel(item.String);
									csvWriter.write(model);
				        		});
		        			}
		        		});
			        });
		        });

		        csvWriter.end();
		    }
		    else {
		        throw new Error(error);
		    }
		});
	}

	static getLoginModel(strings) {
		let model = {Title: null, Website: null, Username: null, Password: null, Notes: null};

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

		return model;
	}
}