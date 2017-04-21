/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.

    onDeviceReady: function() {
        
        this.receivedEvent('deviceready');
        
        // Date
        document.getElementById('timestamp').innerHTML = new Date();
        
        // Device
        document.getElementById('deviceapi').innerHTML = device.cordova;
        
        // Type de connexion
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        alert('Connection type: ' + states[networkState]);
        
        // Contact
        function onSuccess(contacts) {
            alert('Found ' + contacts.length + ' contacts.');
        };
        function onError(contactError) {
            alert('onError!');
        };
        var options      = new ContactFindOptions();
        options.multiple = true;
        var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        document.getElementById('contacts').innerHTML = JSON.stringify(navigator.contacts.find(fields, onSuccess, onError, options));

        // Camera
        
        function setOptions(srcType) {
            var options = {
                // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
                // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true  //Corrects Android orientation quirks
            }
            return options;
        }
        
        
        function openFilePicker(selection) {
            var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            var options = setOptions(srcType);
                navigator.camera.getPicture( function cameraSuccess(imageUri) {
                                            alert('it works');
                }, function cameraError(error) {
                    console.debug("Unable to obtain picture: " + error, "app");
                }, options);
        }
        
        openFilePicker();
        
        /*
        takePicture: function(evt) { navigator.camera.getPicture(this.onCameraSuccess, this.onCameraError, this.cameraOptions); }
        onCameraSuccess: function(imageData) { document.querySelector('#shot').src = imageData; }
        onCameraError: function(e) { alert("onCameraError (maybe on Simu: camera disabled!):" + e.code);}
         */
         
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
