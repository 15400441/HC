 google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Disk', 'G'],
          ['Use',     11],
          ['Free',      2]
         
        ]);

        var options = {
          title: 'Disk usage',
          pieHole: 0.5,
          chartArea:{top:30,width:'80%',height:'100%'},
          colors:['red','green']
        };

        var chart = new google.visualization.PieChart(document.getElementById('diskUsage'));
        chart.draw(data, options);
      }
