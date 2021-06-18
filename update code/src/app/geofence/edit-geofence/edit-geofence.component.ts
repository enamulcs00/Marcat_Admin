import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-geofence',
  templateUrl: './edit-geofence.component.html',
  styleUrls: ['./edit-geofence.component.css']
})
export class EditGeofenceComponent implements OnInit  {

  address: string;
  driverName: any;
  private geoCoder;
  selectedZoom: number;
  latitude: number;
  longitude: number;
  zoom: number = 11;
  searchString: any;
  polyarray: any = [];
  geoId: any
  driverId: any
  drawingManager: any;
  addgeofence: boolean = true;
  fencingList: any = [];
  constructTriangle: any;
  @ViewChild("AgmMap", { static: true }) Map: any;
  adminId: any;
  vacantDriversList: any = [];
  selected: any[];
  otherDriversList: any = [];
  vacantDriverView: boolean = false;
  fancingDriverName: any;
  vacantDrivers: any = [];
  fencingDrivers: any;
  geoFenceId: any;
  fencingDriversList: any;
  geoFenceList: any;
  formGroup: any;
  list: any;
  multiple: any;
  usersession: any;
  permissions: any;
  locationPoints: any;
  progress: any;
  sub: any;
  geofenceForm: FormGroup;

  constructor(private service: ApiService, private mapsAPILoader: MapsAPILoader, private fb: FormBuilder, private commonService: CommonService,
    private ngZone: NgZone, private router: Router, private route: ActivatedRoute) {
    // this.setCurrentLocation();
  }
  ngAfterViewInit() { }
  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.geoFenceId = params['id'];
      });
    this.geofenceForm = this.fb.group({
      geofenceName: ['', [Validators.required,Validators.maxLength(30)] ],
     
    })


    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
    });
    this.getFencing()
  }

  back() {
    history.back()
  }
  getFencing() {


    this.service.getGeofencing(this.geoFenceId).subscribe((res) => {
      if (res['success'] == true) {

        this.locationPoints = res['data'].locationPoints;
        this.searchString = res['data'].name
        this.geofenceForm.get('geofenceName').setValue(res['data'].name)
     
        this.onEdit(this.locationPoints, this.geoFenceId)
      }

    });
  }
  save() {
    this.getPolygonCoordinates(this.constructTriangle);
  }
  Back() {
    this.router.navigate(['/geo-fence-List'])
  }
 

  markerDragEnd(ev) {
    // console.log(ev);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

    });
  }
  onMapReady(map) {
    this.Map = map;
    // this.initDrawingManager(this.Map);
  }
  onMapReady1(map) {
    this.Map = map;
    this.initDrawingManager(this.Map);

  }

  initDrawingManager(map: any) {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {

        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    });

    this.drawingManager.setMap(map);


    google.maps.event.addListener(this.drawingManager, 'overlaycomplete',
      (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) { //this is the coordinate, you can assign it to a variable or pass into another function. 

          this.polyarray = event.overlay.getPath().getArray();
        }
      });

  }

  getPolygonCoordinates(draggablePolygon) {

    const len = draggablePolygon.getPath().getLength();
    const polyArrayLatLng = [];

    for (let i = 0; i < len; i++) {
      const vertex = draggablePolygon.getPath().getAt(i);
      const vertexLatLng = { lat: vertex.lat(), lng: vertex.lng() };
      polyArrayLatLng.push(vertexLatLng);
    }

    if (this.geofenceForm.valid && polyArrayLatLng.length) {
      this.addgeofence = false;
      var geofenceData = {
        "id": this.geoFenceId,
        "name": this.geofenceForm.get('geofenceName').value,
       

        "locationPoints": polyArrayLatLng
      }
      this.service.updateGeofencing(geofenceData).subscribe((res) => {

        if (res['success'] == true) {
          this.addgeofence = false;
          this.commonService.successToast(res.message)

          this.router.navigate(['/geo-fence-List'])
        } else {
          this.commonService.errorToast(res.message)
        }

      });
    } else {
      // this.commonService.errorToast('Please Select a region')
    }
  }






  onEdit(locationPoints, geoId) {

    this.geoFenceId = '';
    // console.log('geoId', geoId);

    this.geoFenceId = geoId;
    var drawPolygonArr = [];
    locationPoints.forEach(element => {
      drawPolygonArr.push({
        lat: element.lat,
        lng: element.lng
      })
      this.latitude = element.lat;
      this.longitude = element.lng;
    });
    if (this.constructTriangle) {
      this.constructTriangle.setMap(null)
    }
    // Construct the polygon.
    this.constructTriangle = new google.maps.Polygon({
      paths: drawPolygonArr,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      editable: true,
      draggable: true
    })
    this.constructTriangle.setMap(null);

    this.constructTriangle.setMap(this.Map);


    // google.maps.event.addListener(this.constructTriangle, 'dragend',(event) => {
    // this.polyarray = event.overlay.getPath().getArray();


    // polygon.setPath(arrCoords);
    // (event) => {
    //   console.log(event,"ecehkjjk")
    //  this.polyarray = event.latLng.lat()

    console.log("this.polyarray ", this.polyarray)
    //   // }
    // });
    // })
  }

}
