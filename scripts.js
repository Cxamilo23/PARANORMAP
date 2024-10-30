function iniciarMap() {
  var coordinates = { lat: 4.599978, lng: -74.070448 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coordinates,
    styles: [
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "saturation": -100
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#666666"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b59169"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#858585"
          },
          {
            "weight": 1
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#8a6500"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [
          {
            "color": "#7a5a00"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#704700"
          },
          {
            "saturation": -65
          },
          {
            "lightness": 15
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "stylers": [
          {
            "color": "#b37a00"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "color": "#8f6200"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#e3bf83"
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

