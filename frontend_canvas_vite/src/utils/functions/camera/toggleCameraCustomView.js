export function toggleCameraCustomView(app) {
  if (app.camera.customView.state === false) {
    app.camera.customView = {
      state: true,
      zoom: app.camera.zoom.x,
      pan: {
        x: app.camera.pan.x,
        y: app.camera.pan.y,
      },
      keyPressCount: {
        start: 0,
        limit: 4,
      },
    };
  } else {
    app.camera.customView = {
      state: false,
      zoom: 0,
      pan: {
        x: 0,
        y: 0,
      },
      keyPressCount: {
        start: 0,
        limit: 4,
      },
    };
  }
}
