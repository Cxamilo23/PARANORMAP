function iniciarMap() {
  var coordinates = { lat: 4.599978, lng: -74.070448 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coordinates,
    styles: [
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ecd7c5"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#f2f2f2"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#e0cab2"
          },
          {
            "saturation": 25
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#d2acac"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a4b87a"
          }
        ]
      },
      {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a4b191"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#afa597"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#867b5b"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#919191"
          },
          {
            "weight": 0.5
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#808080"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#6b6b6b"
          }
        ]
      },
      {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#9e9676"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b5d4e3"
          },
          {
            "saturation": -35
          }
        ]
      }
    ]
  });

  var marker;
  var infowindow = new google.maps.InfoWindow({
    onCloseclick: function() {
      if (marker) {
        // Elimina el marcador de manera lenta en un lapso de 2 segundos
        setTimeout(function() {
          marker.setMap(null);
        }, 2000);
      }
    }
  });

  google.maps.event.addListener(map, 'click', function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();

    if (marker) {
      marker.setMap(null); // Elimina el marcador anterior
    }

    marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      title: 'Marcador'
    });

    infowindow.setContent('<div>' +
      '<h2>Información del lugar</h2>' +
      '<p>Coordenadas: ' + lat + ', ' + lng + '</p>' +
      '<img src="https://maps.googleapis.com/maps/api/streetview/v1/image?location=' + lat + ',' + lng + '&key=AIzaSyDQv56U32h3zCBC2RbAMsUAJBlhROp8VTI&size=200x200" alt="Imagen del lugar">' +
      '</div>');

    infowindow.open(map, marker);
    var eliminarMarcador = function() {
      if (marker) {
        marker.setMap(null);
      }
    };

    // Agrega el evento de cerrar la ventana emergente
    google.maps.event.addListener(infowindow, 'closeclick', eliminarMarcador);
  }); 
}

// Obtener los elementos del DOM
const inputBusqueda = document.getElementById('input-busqueda');
const botonBuscar = document.getElementById('boton-buscar');
const resultadoBusqueda = document.getElementById('resultado-busqueda');
const mapa = document.getElementById('mapa');

// Agregar evento de búsqueda
botonBuscar.addEventListener('click', () => {
  const busqueda = inputBusqueda.value.trim();
  if (busqueda !== '') {
    // Utilizar la API de Google Maps para buscar la ubicación
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${busqueda}&key=AIzaSyDQv56U32h3zCBC2RbAMsUAJBlhROp8VTI`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const resultado = data.results[0];
        if (resultado) {
          const latitud = resultado.geometry.location.lat;
          const longitud = resultado.geometry.location.lng;
          const direccion = resultado.formatted_address;
          resultadoBusqueda.innerHTML = `Ubicación encontrada: ${direccion} (${latitud}, ${longitud})`;
          // Mostrar la ubicación en el mapa
          mostrarUbicacionEnMapa(latitud, longitud);
        } else {
          resultadoBusqueda.innerHTML = 'No se encontró la ubicación';
        }
      })
      .catch(error => console.error(error));
  }
});

// Función para mostrar la ubicación en el mapa
function mostrarUbicacionEnMapa(latitud, longitud) {
  const mapaUrl = `https://www.google.com/maps/@?api=1&map_action=map&center=${latitud},${longitud}&zoom=14`;
  mapa.innerHTML = `<iframe src="${mapaUrl}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
}

