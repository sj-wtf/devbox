Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _helpers = require('./helpers');

var _commands = require('./commands');

var _providersList = require('./providers-list');

var _providersHighlight = require('./providers-highlight');

var _viewList = require('./view-list');

'use babel';

var Intentions = (function () {
  function Intentions() {
    var _this = this;

    _classCallCheck(this, Intentions);

    this.active = null;
    this.commands = new _commands.Commands();
    this.providersList = new _providersList.ProvidersList();
    this.providersHighlight = new _providersHighlight.ProvidersHighlight();
    this.subscriptions = new _atom.CompositeDisposable();

    this.subscriptions.add(this.commands);
    this.subscriptions.add(this.providersList);
    this.subscriptions.add(this.providersHighlight);

    this.commands.onShouldShow(_asyncToGenerator(function* (e) {
      _this.disposeActive();
      var results = yield _this.providersList.trigger(e.editor);
      if (results && results.length) {
        var active = _this.active = { type: _helpers.ACTIVE_TYPE.LIST, view: new _viewList.ListView(), subscriptions: null };
        active.view.activate(e.editor, results);
        active.view.onDidSelect(function (intention) {
          intention.selected();
        });
        e.show = true;
      }
    }));
    this.commands.onShouldMoveUp(function () {
      _this.active && _this.active.view && _this.active.view.moveUp();
    });
    this.commands.onShouldMoveDown(function () {
      _this.active && _this.active.view && _this.active.view.moveDown();
    });
    this.commands.onShouldConfirm(function () {
      _this.active && _this.active.view && _this.active.view.selectActive();
    });
    this.commands.onShouldHide(function () {
      _this.disposeActive();
    });
    this.commands.onShouldHighlight(_asyncToGenerator(function* (e) {
      _this.disposeActive();
      var results = yield _this.providersHighlight.trigger(e.editor);
      if (results && results.length) {
        _this.active = {
          type: _helpers.ACTIVE_TYPE.HIGHLIGHT,
          view: null,
          subscriptions: _this.providersHighlight.paint(e.editor, results)
        };
        e.show = true;
      }
    }));
  }

  _createClass(Intentions, [{
    key: 'activate',
    value: function activate() {
      this.commands.activate();
    }
  }, {
    key: 'consumeListProvider',
    value: function consumeListProvider(provider) {
      this.providersList.addProvider(provider);
    }
  }, {
    key: 'deleteListProvider',
    value: function deleteListProvider(provider) {
      this.providersList.deleteProvider(provider);
    }
  }, {
    key: 'consumeHighlightProvider',
    value: function consumeHighlightProvider(provider) {
      this.providersHighlight.addProvider(provider);
    }
  }, {
    key: 'deleteHighlightProvider',
    value: function deleteHighlightProvider(provider) {
      this.providersHighlight.deleteProvider(provider);
    }
  }, {
    key: 'disposeActive',
    value: function disposeActive() {
      this.commands.disposeActive();
      if (this.active) {
        if (this.active.view) {
          this.active.view.dispose();
        } else if (this.active.subscriptions) {
          this.active.subscriptions.dispose();
        }
        this.active = null;
      }
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.subscriptions.dispose();
    }
  }]);

  return Intentions;
})();

exports['default'] = Intentions;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdGpvaG5zb24vcmVwb3NpdG9yaWVzL2RvdGZpbGVzL2F0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUlrQyxNQUFNOzt1QkFDZCxXQUFXOzt3QkFDZCxZQUFZOzs2QkFDUCxrQkFBa0I7O2tDQUNiLHVCQUF1Qjs7d0JBQ2pDLGFBQWE7O0FBVHBDLFdBQVcsQ0FBQTs7SUFjVSxVQUFVO0FBVWxCLFdBVlEsVUFBVSxHQVVmOzs7MEJBVkssVUFBVTs7QUFXM0IsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7QUFDbEIsUUFBSSxDQUFDLFFBQVEsR0FBRyx3QkFBYyxDQUFBO0FBQzlCLFFBQUksQ0FBQyxhQUFhLEdBQUcsa0NBQW1CLENBQUE7QUFDeEMsUUFBSSxDQUFDLGtCQUFrQixHQUFHLDRDQUF3QixDQUFBO0FBQ2xELFFBQUksQ0FBQyxhQUFhLEdBQUcsK0JBQXlCLENBQUE7O0FBRTlDLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNyQyxRQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDMUMsUUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7O0FBRS9DLFFBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxtQkFBQyxXQUFNLENBQUMsRUFBSTtBQUNwQyxZQUFLLGFBQWEsRUFBRSxDQUFBO0FBQ3BCLFVBQU0sT0FBTyxHQUFHLE1BQU0sTUFBSyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMxRCxVQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO0FBQzdCLFlBQU0sTUFBTSxHQUFHLE1BQUssTUFBTSxHQUFHLEVBQUUsSUFBSSxFQUFFLHFC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SSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7QUFDcEMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDcEM7QUFDRCxZQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtPQUNuQjtLQUNGOzs7V0FDTSxtQkFBRztBQUNSLFVBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUE7S0FDN0I7OztTQTlFa0IsVUFBVTs7O3FCQUFWLFVBQVUiLCJmaWxlIjoiL1VzZXJzL3N0am9obnNvbi9yZXBvc2l0b3JpZXMvZG90ZmlsZXMvYXRvbS9wYWNrYWdlcy9pbnRlbnRpb25zL2xpYi9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcblxuLyogQGZsb3cgKi9cblxuaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHtBQ1RJVkVfVFlQRX0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHtDb21tYW5kc30gZnJvbSAnLi9jb21tYW5kcydcbmltcG9ydCB7UHJvdmlkZXJzTGlzdH0gZnJvbSAnLi9wcm92aWRlcnMtbGlzdCdcbmltcG9ydCB7UHJvdmlkZXJzSGlnaGxpZ2h0fSBmcm9tICcuL3Byb3ZpZGVycy1oaWdobGlnaHQnXG5pbXBvcnQge0xpc3RWaWV3fSBmcm9tICcuL3ZpZXctbGlzdCdcblxuaW1wb3J0IHR5cGUge0Rpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQgdHlwZSB7SW50ZW50aW9ucyRQcm92aWRlciRMaXN0LCBJbnRlbnRpb25zJFByb3ZpZGVyJEhpZ2hsaWdodH0gZnJvbSAnLi90eXBlcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZW50aW9ucyB7XG4gIGFjdGl2ZTogP3tcbiAgICB0eXBlOiBudW1iZXIsXG4gICAgdmlldzogP09iamVjdCxcbiAgICBzdWJzY3JpcHRpb25zOiA/RGlzcG9zYWJsZVxuICB9O1xuICBjb21tYW5kczogQ29tbWFuZHM7XG4gIHByb3ZpZGVyc0xpc3Q6IFByb3ZpZGVyc0xpc3Q7XG4gIHByb3ZpZGVyc0hpZ2hsaWdodDogUHJvdmlkZXJzSGlnaGxpZ2h0O1xuICBzdWJzY3JpcHRpb25zOiBDb21wb3NpdGVEaXNwb3NhYmxlO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG51bGxcbiAgICB0aGlzLmNvbW1hbmRzID0gbmV3IENvbW1hbmRzKClcbiAgICB0aGlzLnByb3ZpZGVyc0xpc3QgPSBuZXcgUHJvdmlkZXJzTGlzdCgpXG4gICAgdGhpcy5wcm92aWRlcnNIaWdobGlnaHQgPSBuZXcgUHJvdmlkZXJzSGlnaGxpZ2h0KClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHRoaXMuY29tbWFuZHMpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLnByb3ZpZGVyc0xpc3QpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLnByb3ZpZGVyc0hpZ2hsaWdodClcblxuICAgIHRoaXMuY29tbWFuZHMub25TaG91bGRTaG93KGFzeW5jIGUgPT4ge1xuICAgICAgdGhpcy5kaXNwb3NlQWN0aXZlKClcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLnByb3ZpZGVyc0xpc3QudHJpZ2dlcihlLmVkaXRvcilcbiAgICAgIGlmIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuYWN0aXZlID0geyB0eXBlOiBBQ1RJVkVfVFlQRS5MSVNULCB2aWV3OiBuZXcgTGlzdFZpZXcoKSwgc3Vic2NyaXB0aW9uczogbnVsbCB9XG4gICAgICAgIGFjdGl2ZS52aWV3LmFjdGl2YXRlKGUuZWRpdG9yLCByZXN1bHRzKVxuICAgICAgICBhY3RpdmUudmlldy5vbkRpZFNlbGVjdChmdW5jdGlvbihpbnRlbnRpb24pIHtcbiAgICAgICAgICBpbnRlbnRpb24uc2VsZWN0ZWQoKVxuICAgICAgICB9KVxuICAgICAgICBlLnNob3cgPSB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmNvbW1hbmRzLm9uU2hvdWxkTW92ZVVwKCgpID0+IHsgdGhpcy5hY3RpdmUgJiYgdGhpcy5hY3RpdmUudmlldyAmJiB0aGlzLmFjdGl2ZS52aWV3Lm1vdmVVcCgpIH0pXG4gICAgdGhpcy5jb21tYW5kcy5vblNob3VsZE1vdmVEb3duKCgpID0+IHsgdGhpcy5hY3RpdmUgJiYgdGhpcy5hY3RpdmUudmlldyAmJiB0aGlzLmFjdGl2ZS52aWV3Lm1vdmVEb3duKCkgfSlcbiAgICB0aGlzLmNvbW1hbmRzLm9uU2hvdWxkQ29uZmlybSgoKSA9PiB7IHRoaXMuYWN0aXZlICYmIHRoaXMuYWN0aXZlLnZpZXcgJiYgdGhpcy5hY3RpdmUudmlldy5zZWxlY3RBY3RpdmUoKSB9KVxuICAgIHRoaXMuY29tbWFuZHMub25TaG91bGRIaWRlKCgpID0+IHsgdGhpcy5kaXNwb3NlQWN0aXZlKCkgfSlcbiAgICB0aGlzLmNvbW1hbmRzLm9uU2hvdWxkSGlnaGxpZ2h0KGFzeW5jIGUgPT4ge1xuICAgICAgdGhpcy5kaXNwb3NlQWN0aXZlKClcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLnByb3ZpZGVyc0hpZ2hsaWdodC50cmlnZ2VyKGUuZWRpdG9yKVxuICAgICAgaWYgKHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB7XG4gICAgICAgICAgdHlwZTogQUNUSVZFX1RZUEUuSElHSExJR0hULFxuICAgICAgICAgIHZpZXc6IG51bGwsXG4gICAgICAgICAgc3Vic2NyaXB0aW9uczogdGhpcy5wcm92aWRlcnNIaWdobGlnaHQucGFpbnQoZS5lZGl0b3IsIHJlc3VsdHMpXG4gICAgICAgIH1cbiAgICAgICAgZS5zaG93ID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5jb21tYW5kcy5hY3RpdmF0ZSgpXG4gIH1cbiAgY29uc3VtZUxpc3RQcm92aWRlcihwcm92aWRlcjogSW50ZW50aW9ucyRQcm92aWRlciRMaXN0KSB7XG4gICAgdGhpcy5wcm92aWRlcnNMaXN0LmFkZFByb3ZpZGVyKHByb3ZpZGVyKVxuICB9XG4gIGRlbGV0ZUxpc3RQcm92aWRlcihwcm92aWRlcjogSW50ZW50aW9ucyRQcm92aWRlciRMaXN0KSB7XG4gICAgdGhpcy5wcm92aWRlcnNMaXN0LmRlbGV0ZVByb3ZpZGVyKHByb3ZpZGVyKVxuICB9XG4gIGNvbnN1bWVIaWdobGlnaHRQcm92aWRlcihwcm92aWRlcjogSW50ZW50aW9ucyRQcm92aWRlciRIaWdobGlnaHQpIHtcbiAgICB0aGlzLnByb3ZpZGVyc0hpZ2hsaWdodC5hZGRQcm92aWRlcihwcm92aWRlcilcbiAgfVxuICBkZWxldGVIaWdobGlnaHRQcm92aWRlcihwcm92aWRlcjogSW50ZW50aW9ucyRQcm92aWRlciRIaWdobGlnaHQpIHtcbiAgICB0aGlzLnByb3ZpZGVyc0hpZ2hsaWdodC5kZWxldGVQcm92aWRlcihwcm92aWRlcilcbiAgfVxuICBkaXNwb3NlQWN0aXZlKCkge1xuICAgIHRoaXMuY29tbWFuZHMuZGlzcG9zZUFjdGl2ZSgpXG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmUudmlldykge1xuICAgICAgICB0aGlzLmFjdGl2ZS52aWV3LmRpc3Bvc2UoKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZS5zdWJzY3JpcHRpb25zKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gICAgICB9XG4gICAgICB0aGlzLmFjdGl2ZSA9IG51bGxcbiAgICB9XG4gIH1cbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gIH1cbn1cbiJdfQ==
//# sourceURL=/Users/stjohnson/repositories/dotfiles/atom/packages/intentions/lib/main.js
