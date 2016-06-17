Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _elementsList = require('./elements/list');

'use babel';

var ListView = (function () {
  function ListView() {
    _classCallCheck(this, ListView);

    this.active = true;
    this.emitter = new _atom.Emitter();
    this.element = new _elementsList.ListElement();
    this.subscriptions = new _atom.CompositeDisposable();

    this.subscriptions.add(this.emitter);
    this.subscriptions.add(this.element);
  }

  _createClass(ListView, [{
    key: 'activate',
    value: function activate(editor, suggestion) {
      var _this = this;

      this.element.render(suggestion, function (selected) {
        _this.emitter.emit('did-select', selected);
        _this.dispose();
      });
      this.element.moveDown();

      var bufferPosition = editor.getCursorBufferPosition();
      var marker = editor.markBufferRange([bufferPosition, bufferPosition], { invalidate: 'never' });
      editor.decorateMarker(marker, {
        type: 'overlay',
        item: this.element
      });
      this.subscriptions.add(new _atom.Disposable(function () {
        marker.destroy();
      }));
    }
  }, {
    key: 'moveUp',
    value: function moveUp() {
      this.element.moveUp();
    }
  }, {
    key: 'moveDown',
    value: function moveDown() {
      this.element.moveDown();
    }
  }, {
    key: 'selectActive',
    value: function selectActive() {
      this.element.selectActive();
    }
  }, {
    key: 'onDidSelect',
    value: function onDidSelect(callback) {
      return this.emitter.on('did-select', callback);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.active) {
        this.active = false;
        this.emitter.emit('did-close');
        this.subscriptions.dispose();
      }
    }
  }]);

  return ListView;
})();

exports.ListView = ListView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdGpvaG5zb24vcmVwb3NpdG9yaWVzL2RvdGZpbGVzL2F0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvdmlldy1saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUl1RCxNQUFNOzs0QkFDbkMsaUJBQWlCOztBQUwzQyxXQUFXLENBQUE7O0lBU0UsUUFBUTtBQU1SLFdBTkEsUUFBUSxHQU1MOzBCQU5ILFFBQVE7O0FBT2pCLFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0FBQ2xCLFFBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQWEsQ0FBQTtBQUM1QixRQUFJLENBQUMsT0FBTyxHQUFHLCtCQUFpQixDQUFBO0FBQ2hDLFFBQUksQ0FBQyxhQUFhLEdBQUcsK0JBQXlCLENBQUE7O0FBRTlDLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNwQyxRQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7R0FDckM7O2VBZFUsUUFBUTs7V0FlWCxrQkFBQyxNQUFrQixFQUFFLFVBQTZDLEVBQUU7OztBQUMxRSxVQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBQSxRQUFRLEVBQUk7QUFDMUMsY0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUN6QyxjQUFLLE9BQU8sRUFBRSxDQUFBO09BQ2YsQ0FBQyxDQUFBO0FBQ0YsVUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQTs7QUFFdkIsVUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixFQUFFLENBQUE7QUFDdkQsVUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsRUFBRSxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFBO0FBQzlGLFlBQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO0FBQzVCLFlBQUksRUFBRSxTQUFTO0FBQ2YsWUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO09BQ25CLENBQUMsQ0FBQTtBQUNGLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLHFCQUFlLFlBQVc7QUFDL0MsY0FBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO09BQ2pCLENBQUMsQ0FBQyxDQUFBO0tBQ0o7OztXQUNLLGtCQUFHO0FBQ1AsVUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtLQUN0Qjs7O1dBQ08sb0JBQUc7QUFDVCxVQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO0tBQ3hCOzs7V0FDVyx3QkFBRztBQUNiLFVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUE7S0FDNUI7OztXQUNVLHFCQUFDLFFBQWtCLEVBQWM7QUFDMUMsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDL0M7OztXQUNNLG1CQUFHO0FBQ1IsVUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2YsWUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7QUFDbkIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDOUIsWUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtPQUM3QjtLQUNGOzs7U0FsRFUsUUFBUSIsImZpbGUiOiIvVXNlcnMvc3Rqb2huc29uL3JlcG9zaXRvcmllcy9kb3RmaWxlcy9hdG9tL3BhY2thZ2VzL2ludGVudGlvbnMvbGliL3ZpZXctbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbi8qIEBmbG93ICovXG5cbmltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZSwgRW1pdHRlciwgRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCB7TGlzdEVsZW1lbnR9IGZyb20gJy4vZWxlbWVudHMvbGlzdCdcbmltcG9ydCB0eXBlIHtUZXh0RWRpdG9yfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHR5cGUge0ludGVudGlvbnMkU3VnZ2VzdGlvbiRMaXN0fSBmcm9tICcuL3R5cGVzJ1xuXG5leHBvcnQgY2xhc3MgTGlzdFZpZXcge1xuICBhY3RpdmU6IGJvb2xlYW47XG4gIGVtaXR0ZXI6IEVtaXR0ZXI7XG4gIGVsZW1lbnQ6IExpc3RFbGVtZW50O1xuICBzdWJzY3JpcHRpb25zOiBDb21wb3NpdGVEaXNwb3NhYmxlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZVxuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKClcbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgTGlzdEVsZW1lbnQoKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5lbWl0dGVyKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5lbGVtZW50KVxuICB9XG4gIGFjdGl2YXRlKGVkaXRvcjogVGV4dEVkaXRvciwgc3VnZ2VzdGlvbjogQXJyYXk8SW50ZW50aW9ucyRTdWdnZXN0aW9uJExpc3Q+KSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbmRlcihzdWdnZXN0aW9uLCBzZWxlY3RlZCA9PiB7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLXNlbGVjdCcsIHNlbGVjdGVkKVxuICAgICAgdGhpcy5kaXNwb3NlKClcbiAgICB9KVxuICAgIHRoaXMuZWxlbWVudC5tb3ZlRG93bigpXG5cbiAgICBjb25zdCBidWZmZXJQb3NpdGlvbiA9IGVkaXRvci5nZXRDdXJzb3JCdWZmZXJQb3NpdGlvbigpXG4gICAgY29uc3QgbWFya2VyID0gZWRpdG9yLm1hcmtCdWZmZXJSYW5nZShbYnVmZmVyUG9zaXRpb24sIGJ1ZmZlclBvc2l0aW9uXSwge2ludmFsaWRhdGU6ICduZXZlcid9KVxuICAgIGVkaXRvci5kZWNvcmF0ZU1hcmtlcihtYXJrZXIsIHtcbiAgICAgIHR5cGU6ICdvdmVybGF5JyxcbiAgICAgIGl0ZW06IHRoaXMuZWxlbWVudFxuICAgIH0pXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChuZXcgRGlzcG9zYWJsZShmdW5jdGlvbigpIHtcbiAgICAgIG1hcmtlci5kZXN0cm95KClcbiAgICB9KSlcbiAgfVxuICBtb3ZlVXAoKSB7XG4gICAgdGhpcy5lbGVtZW50Lm1vdmVVcCgpXG4gIH1cbiAgbW92ZURvd24oKSB7XG4gICAgdGhpcy5lbGVtZW50Lm1vdmVEb3duKClcbiAgfVxuICBzZWxlY3RBY3RpdmUoKSB7XG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdEFjdGl2ZSgpXG4gIH1cbiAgb25EaWRTZWxlY3QoY2FsbGJhY2s6IEZ1bmN0aW9uKTogRGlzcG9zYWJsZSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLXNlbGVjdCcsIGNhbGxiYWNrKVxuICB9XG4gIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNsb3NlJylcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcbiAgICB9XG4gIH1cbn1cbiJdfQ==
//# sourceURL=/Users/stjohnson/repositories/dotfiles/atom/packages/intentions/lib/view-list.js
