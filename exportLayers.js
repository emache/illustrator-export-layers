// only do for the active document

if(documents.length > 0) {
    doc = app.activeDocument;
    main();
}
else alert("No file opened.");

function main () {
    var numberOfArtboards = doc.artboards.length;
    doc.artboards.setActiveArtboardIndex(0);
    var currentArtboard = doc.artboards.getActiveArtboardIndex();
    var filename = doc.fullName.name.split('.')[0];
    var destFolder = Folder.selectDialog("Select the folder to export the files to:");
    var numberOfLayers = doc.layers.length;

    // Hide all layers
    for ( var i = 0; i < numberOfLayers; i++){
        doc.layers[i].visible = false;
    }

    // Go through the layers one by one, starting from bottom in panel
    var k = 1;

    for (var i = 1; i < numberOfLayers + 1; i++ ){
        currentLayer = doc.layers[numberOfLayers-i];
        currentLayer.visible = true;

        var layerName = new String(currentLayer.name );
        var associatedArtboard = parseInt(layerName.split(' ')[0], 10);
        doc.artboards.setActiveArtboardIndex(associatedArtboard-1);

        if (currentArtboard != associatedArtboard) {
            k = 1;
        }

        var file = new File (destFolder + '/' + associatedArtboard + '-' + k + '.png');
        savePNG(file);

        currentArtboard = associatedArtboard;
        k++;
    }
}


function savePNG(targetFilename) {
    var exportOptions = new ExportOptionsPNG24();
    var type = ExportType.PNG24;

    exportOptions.antiAliasing = false;
    exportOptions.transparency = false;
    exportOptions.artBoardClipping = true;

    app.activeDocument.exportFile( targetFilename, type, exportOptions );
};

