function plumb(raw_data,data) {
        	this.raw_data = raw_data;
        	this.data = data;
        	return this;
        }

        plumb.prototype.keyPlumber = function() {}
        
        plumb.prototype.generateKey = function(plumber) {
        	this.keyPlumber = plumber;
        	this.data = [];
        	var data_plumb = this;
        	this.raw_data.forEach(function(record) {
        		data_plumb.data[data_plumb.keyPlumber(record)] = {};
        	});
        	return this;
        }

        plumb.prototype.meanField = function(field,label) {
        	var data_plumb = this;
        	this.raw_data.forEach(function(record) {
        		if(data_plumb.data[data_plumb.keyPlumber(record)][label] === undefined) { //this assumes first run
        			data_plumb.data[data_plumb.keyPlumber(record)][label] = 0;
        			data_plumb.data[data_plumb.keyPlumber(record)]["keyCount"]  = 0;
        		}
				data_plumb.data[data_plumb.keyPlumber(record)][label] += record[field];
				data_plumb.data[data_plumb.keyPlumber(record)]["keyCount"]++;
        	});

        	this.data.forEach(function(record) {
        	//	fieldCount = data_plumb.raw_data.length / data_plumb.data.length;
        		record[label] /= record["keyCount"];
        		console.log(record[label]);
        	});
        	return this;
        }

        plumb.prototype.maxField = function(field,label) {
        	var data_plumb = this;
        	this.raw_data.forEach(function(record) {
        		if(data_plumb.data[data_plumb.keyPlumber(record)][label] === undefined || record[field] > data_plumb.data[data_plumb.keyPlumber(record)][label]) {
        			data_plumb.data[data_plumb.keyPlumber(record)][label] = record[field];
        		}
        	});
        	return this;
        }

       	plumb.prototype.minField = function(field,label) {
        	var data_plumb = this;
        	this.raw_data.forEach(function(record) {
        		if(data_plumb.data[data_plumb.keyPlumber(record)][label] === undefined || record[field] < data_plumb.data[data_plumb.keyPlumber(record)][label]) {
        			data_plumb.data[data_plumb.keyPlumber(record)][label] = record[field];
        		}
        	});
        	return this;
        }