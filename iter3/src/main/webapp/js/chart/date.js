/**
 * Created by codeworm on 5/6/16.
 */

function day(el, url) {
    var margin = {top: 20, right: 30, bottom: 30, left: 70},
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatDate = d3.time.format("%Y-%m-%d");

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y-%m-%d"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function (d) {
            return x(d.label);
        })
        .y(function (d) {
            return y(d.price);
        });

    var svg = d3.select(el).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(url, function (error, data) {
        if (error != null)
            return;

        data.forEach(function (d) {
            d.label = formatDate.parse(d.label);
            d.price = +d.price;
        });

        x.domain(d3.extent(data, function (d) {
            return d.label;
        }));
        y.domain(d3.extent(data, function (d) {
            return d.price;
        }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-size", "16px")
            .text("销售量");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
    });
}

function bar(el, url) {
    var margin = {top: 20, right: 30, bottom: 30, left: 70},
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangeBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select(el).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(url, function (error, data) {
        if (error != null)
            return;

        data.forEach(function (d) {
            d.price = +d.price;
        });

        x.domain(data.map(function (d) {
            return d.label;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.price;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-size", "16px")
            .text("销售量");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.label);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                return y(d.price);
            })
            .attr("height", function (d) {
                return height - y(d.price)
            });
    });
}
