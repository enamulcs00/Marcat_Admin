/// /node_modules/@types/googlemaps/index.d.ts" 
import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import Swal from 'sweetalert2';
// import { google } from "google-maps";

@Component({
  selector: 'app-add-geofence',
  templateUrl: './add-geofence.component.html',
  styleUrls: ['./add-geofence.component.css']
})
export class AddGeofenceComponent implements OnInit{

  lat = 51.678418;
  lng = 7.809007;
  latitude: number;
  @ViewChild("AgmMap", { static: true }) Map: any;
  longitude: number;
  zoom: number;
  geoCoder: google.maps.Geocoder;
  drawingManager: google.maps.drawing.DrawingManager;
  polyarray: any = [];
  geofenceForm: FormGroup

  progress: boolean;
  sub: any;

  constructor(private mapsAPILoader: MapsAPILoader, private router: Router, private fb: FormBuilder, private apiService: ApiService, private commonService: CommonService) {
    this.setCurrentLocation()
  }

  ngOnInit() {
    this.geofenceForm = this.fb.group({
      geofenceName: ['',  [Validators.required,Validators.maxLength(30)]],
     
    })




    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
    });
  }


  setCurrentLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 11;
        this.getAddress(this.lat, this.lng);
      });
    }
  }


  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

    });
  }


  onMapReady(map) {
    this.Map = map;
    this.initDrawingManager(this.Map);
  }


  initDrawingManager(map: any) { // method is used to create POLYGON

    const options = {
      drawingControl: true,
      drawingControlOptions: {

        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };


    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);


    google.maps.event.addListener(this.drawingManager, 'overlaycomplete',
      (event) => {

        if (event.type === google.maps.drawing.OverlayType.POLYGON) { //this is the coordinate, you can assign it to a variable or pass into another function. 
          this.polyarray = event.overlay.getPath().getArray();


        }
      });

  }



  save() {

    if (this.geofenceForm.valid && this.polyarray.length > 0) {

      this.progress = true
      var geofenceData = {
        "name": this.geofenceForm.get('geofenceName').value,
        
        "locationPoints": this.polyarray
      }

      this.apiService.createGeoFencing(geofenceData).subscribe((res) => {
        if (res.success) {
          this.progress = false

          this.commonService.successToast(res.message)
          this.router.navigate(['geo-fence-List'])
        } else {
          this.progress = false
          this.commonService.errorToast(res.message)
        }
      });
    } else {
      this.commonService.errorToast('Make Sure you have typed in the name and selected the area for geofence')

    }

  }

  back() {
    history.back();
  }
}
