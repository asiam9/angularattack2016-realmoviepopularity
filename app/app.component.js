(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'my-app',
      template: '<h1>Real Movie Popularity</h1><p>This project runs!</p>'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
