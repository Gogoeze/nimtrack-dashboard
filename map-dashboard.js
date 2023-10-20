fetch('https://api.thingspeak.com/channels/2295961/feeds.json?api_key=1JBRCYLYC6RUDDR2', {
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => response.json()) // Parse the JSON response
        .then(jsonData => {
          // Do something with the JSON data
          let lastFeedIndex = jsonData.feeds.length - 1;
          let lastFeed = jsonData.feeds[lastFeedIndex];
          let field3 = Number(lastFeed.field3);
          let field4 = Number(lastFeed.field4);
          let field1 = Number(lastFeed.field1);
          let field2 = Number(lastFeed.field2);
        //   let field5 = Number(lastFeed.field5);

          // to reduce decimal of long and lat to 5 decimal places.
          // let field3_rounded = Math.round(field3 * 10000) / 10000;
          // let field4_rounded = Math.round(field4 * 10000) / 10000;

          // to switch visibility image
        //   let visibilityOnImage = "https://img.icons8.com/matisse/100/wifi.png";
        //   let visibilityOffImage = "https://img.icons8.com/matisse/100/wifi-off.png";
        //   let visibilityImage = visibilityOnImage;
        //   let status = "On";


        //   if (field5 === '0') {
        //     visibilityImage = visibilityOffImage;
        //     status = "Off";
        //   }

          document.getElementById("node-battery").innerHTML = `${field1}%`;
          document.getElementById("gateway-battery").innerHTML = `${field2}%`;
          document.getElementById("longitude").innerHTML = field3;
          document.getElementById("latitude").innerHTML = field4;
        //   // document.getElementById("box2").src = visibilityImage;
        //   document.getElementById("gateway-status").innerHTML = status;

          drawMap(field4, field3);
        });


      function drawMap(field4, field3) {
        google.charts.load("current", {
          "packages": ["map"],
          "mapsApiKey": "AIzaSyAH-jpwf1X6GPWLiR3k9vEgrNHSBPoM2BM"
        });
        google.charts.setOnLoadCallback(() => drawChart(field4, field3));
      }

      function drawChart(field4, field3) {
        console.log(`field 4 is ${field4} and field 3 is ${field3}, drawing chart now...`);
        var data = google.visualization.arrayToDataTable([
          ['Lat', 'Long', 'Name'],
          [field4, field3, 'Node1'],
        ]);
        var options = {
          mapType: 'styledMap',
          zoomLevel: 12,
          showTooltip: true,
          showInfoWindow: true,
          useMapTypeControl: true,
          maps: {
            // Your custom mapTypeId holding custom map styles.
            styledMap: {
              name: 'Styled Map', // This name will be displayed in the map type control.
              styles: [{
                featureType: 'poi.attraction',
                stylers: [{
                  color: '#fce8b2'
                }]
              },
              {
                featureType: 'road.highway',
                stylers: [{
                  hue: '#0277bd'
                }, {
                  saturation: -50
                }]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.icon',
                stylers: [{
                  hue: '#000'
                }, {
                  saturation: 100
                }, {
                  lightness: 50
                }]
              },
              {
                featureType: 'landscape',
                stylers: [{
                  hue: '#259b24'
                }, {
                  saturation: 10
                }, {
                  lightness: -22
                }]
              }
              ]
            }
          }
        };
        var map = new google.visualization.Map(document.getElementById('map_markers_div'));
        map.draw(data, options);
      }