Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _sbEventKit = require('sb-event-kit');

var _helpers = require('./helpers');

'use babel';

var Commands = (function () {
  function Commands() {
    _classCallCheck(this, Commands);

    this.active = null;
    this.emitter = new _sbEventKit.Emitter();
    this.subscriptions = new _sbEventKit.CompositeDisposable();

    this.subscriptions.add(this.emitter);
  }

  _createClass(Commands, [{
    key: 'activate',
    value: function activate() {
      var _this = this;

      this.subscriptions.add(atom.commands.add('atom-text-editor:not([mini])', {
        'intentions:show': function intentionsShow(e) {
          (0, _helpers.preventDefault)(e);
          _this.shouldShow();
        },
        'intentions:hide': function intentionsHide(e) {
          (0, _helpers.preventDefault)(e);
          _this.shouldHide();
        },
        'intentions:confirm': function intentionsConfirm(e) {
          (0, _helpers.preventDefault)(e);
          _this.shouldConfirm();
        },
        'intentions:highlight': function intentionsHighlight(e) {
          (0, _helpers.preventDefault)(e);
          _this.shouldHighlight();
        }
      }));
    }
  }, {
    key: 'shouldShow',
    value: _asyncToGenerator(function* () {
      var _this2 = this;

      if (!this.active || this.active.type === _helpers.ACTIVE_TYPE.LIST) {
        var _editor = atom.workspace.getActiveTextEditor();
        var _e = { show: false, editor: _editor };
        this.disposeActive();
        yield this.emitter.emit('should-show', _e);
        if (_e.show) {
          var active = this.active = {
            type: _helpers.ACTIVE_TYPE.LIST,
            subscriptions: new _sbEventKit.CompositeDisposable(),
            editor: atom.views.getView(_editor)
          };
          active.editor.classList.add('intentions-active');
          active.subscriptions.add((0, _helpers.disposableEvent)(active.editor, 'mousedown', function (e) {
            (0, _helpers.preventDefault)(e);
            _this2.shouldHide();
          }));
          active.subscriptions.add((0, _helpers.disposableEvent)(active.editor, 'keydown', function (e) {
            if (e.which === 38) {
              (0, _helpers.preventDefault)(e);
              _this2.shouldMoveUp();
            } else if (e.which === 40) {
              (0, _helpers.preventDefault)(e);
              _this2.shouldMoveDown();
            } else if (e.which == 13) {
              // Do Nothing, we let the intentions:confirm command work
            } else {
                _this2.shouldHide();
              }
          }));
        }
      }
    })
  }, {
    key: 'shouldHide',
    value: function shouldHide() {
      if (this.active !== null) {
        this.disposeActive();
        this.emitter.emit('should-hide');
      }
    }
  }, {
    key: 'shouldHighlight',
    value: _asyncToGenerator(function* () {
      var _this3 = this;

      if (this.active === null) {
        var _editor2 = atom.workspace.getActiveTextEditor();
        var _e2 = { show: false, editor: _editor2 };
        yield this.emitter.emit('should-highlight', _e2);
        if (_e2.show) {
          var active = this.active = {
            type: _helpers.ACTIVE_TYPE.HIGHLIGHT,
            subscriptions: new _sbEventKit.CompositeDisposable(),
            editor: atom.views.getView(_editor2)
          };
          active.editor.classList.add('intentions-active');
          active.subscriptions.add((0, _helpers.disposableEvent)(active.editor, 'keyup', function (e) {
            _this3.emitter.emit('should-hide');
            _this3.disposeActive();
          }));
        }
      }
    })
  }, {
    key: 'shouldConfirm',
    value: function shouldConfirm() {
      if (this.active && this.active.type === _helpers.ACTIVE_TYPE.LIST) {
        this.disposeActive();
        this.emitter.emit('should-confirm');
      }
    }
  }, {
    key: 'shouldMoveUp',
    value: function shouldMoveUp() {
      this.emitter.emit('should-move-up');
    }
  }, {
    key: 'shouldMoveDown',
    value: function shouldMoveDown() {
      this.emitter.emit('should-move-down');
    }
  }, {
    key: 'onShouldShow',
    value: function onShouldShow(callback) {
      return this.emitter.on('should-show', callback);
    }
  }, {
    key: 'onShouldHide',
    value: function onShouldHide(callback) {
      return this.emitter.on('should-hide', callback);
    }
  }, {
    key: 'onShouldConfirm',
    value: function onShouldConfirm(callback) {
      return this.emitter.on('should-confirm', callback);
    }
  }, {
    key: 'onShouldHighlight',
    value: function onShouldHighlight(callback) {
      return this.emitter.on('should-highlight', callback);
    }
  }, {
    key: 'onShouldMoveUp',
    value: function onShouldMoveUp(callback) {
      return this.emitter.on('should-move-up', callback);
    }
  }, {
    key: 'onShouldMoveDown',
    value: function onShouldMoveDown(callback) {
      return this.emitter.on('should-move-down', callback);
    }
  }, {
    key: 'disposeActive',
    value: function disposeActive() {
      var active = this.active;
      if (active) {
        active.editor.classList.remove('intentions-active');
        active.subscriptions.dispose();
        this.active = null;
      }
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.disposeActive();
      this.subscriptions.dispose();
    }
  }]);

  return Commands;
})();

exports.Commands = Commands;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdGpvaG5zb24vcmVwb3NpdG9yaWVzL2RvdGZpbGVzL2F0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvY29tbWFuZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUlzQixRQUFROzs7OzBCQUNhLGNBQWM7O3VCQUNFLFdBQVc7O0FBTnRFLFdBQVcsQ0FBQTs7SUFTRSxRQUFRO0FBU1IsV0FUQSxRQUFRLEdBU0w7MEJBVEgsUUFBUTs7QUFVakIsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7QUFDbEIsUUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBYSxDQUFBO0FBQzVCLFFBQUksQ0FBQyxhQUFhLEdBQUcscUNBQXlCLENBQUE7O0FBRTlDLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtHQUNyQzs7ZUFmVSxRQUFROztXQWdCWCxvQkFBRzs7O0FBQ1QsVUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUU7QUFDdkUseUJBQWlCLEVBQUUsd0JBQUEsQ0FBQyxFQUFJO0FBQ3RCLHVDQUFlLENBQUMsQ0FBQyxDQUFBO0FBQ2pCLGdCQUFLLFVBQVUsRUFBRSxDQUFBO1NBQ2xCO0FBQ0QseUJBQWlCLEVBQUUsd0JBQUEsQ0FBQyxFQUFJO0FBQ3RCLHVDQUFlLENBQUMsQ0FBQyxDQUFBO0FBQ2pCLGdCQUFLLFVBQVUsRUFBRSxDQUFBO1NBQ2xCO0FBQ0QsNEJBQW9CLEVBQUUsMkJBQUEsQ0FBQyxFQUFJO0FBQ3pCLHVDQUFlLENBQUMsQ0FBQyxDQUFBO0FBQ2pCLGdCQUFLLGFBQWEsRUFBRSxDQUFBO1NBQ3JCO0FBQ0QsOEJBQXNCLEVBQUUsNkJBQUEsQ0FBQyxFQUFJO0FBQzNCLHVDQUFlLENBQUMsQ0FBQyxDQUFBO0FBQ2pCLGdCQUFLLGVBQWUsRUFBRSxDQUFBO1NBQ3ZCO09BQ0YsQ0FBQyxDQUFDLENBQUE7S0FDSjs7OzZCQUNlLGFBQVk7OztBQUMxQixVQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxxQkFBWSxJQUFJLEVBQUU7QUFDekQsWUFBTSxPQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0FBQ25ELFlBQU0sRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQU4sT0FBTSxFQUFDLENBQUE7QUFDaEMsWUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0FBQ3BCLGNBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQyxDQUFBO0FBQ3pDLFlBQUksRUFBQyxDQUFDLElBQUksRUFBRTtBQUNWLGNBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUc7QUFDM0IsZ0JBQUksRUFBRSxxQkFBWSxJQUFJO0FBQ3RCLHlCQUFhLEVBQUUscUNBQXlCO0FBQ3hDLGtCQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTSxDQUFDO1dBQ25DLENBQUE7QUFDRCxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDaEQsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLDhCQUFnQixNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFBLENBQUMsRUFBSTtBQUN4RSx5Q0FBZSxDQUFDLENBQUMsQ0FBQTtBQUNqQixtQkFBSyxVQUFVLEVBQUUsQ0FBQTtXQUNsQixDQUFDLENBQUMsQ0FBQTtBQUNILGdCQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyw4QkFBZ0IsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBQSxDQUFDLEVBQUk7QUFDdEUsZ0JBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDbEIsMkNBQWUsQ0FBQyxDQUFDLENBQUE7QUFDakIscUJBQUssWUFBWSxFQUFFLENBQUE7YUFDcEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO0FBQ3pCLDJDQUFlLENBQUMsQ0FBQyxDQUFBO0FBQ2pCLHFCQUFLLGNBQWMsRUFBRSxDQUFBO2FBQ3RCLE1BQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRTs7YUFFekIsTUFBTTtBQUNMLHVCQUFLLFVBQVUsRUFBRSxDQUFBO2VBQ2xCO1dBQ0YsQ0FBQyxDQUFDLENBQUE7U0FDSjtPQUNGO0tBQ0Y7OztXQUNTLHNCQUFHO0FBQ1gsVUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtBQUN4QixZQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7QUFDcEIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7T0FDakM7S0FDRjs7OzZCQUNvQixhQUFZOzs7QUFDL0IsVUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtBQUN4QixZQUFNLFFBQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUE7QUFDbkQsWUFBTSxHQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBTixRQUFNLEVBQUMsQ0FBQTtBQUNoQyxjQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEdBQUMsQ0FBQyxDQUFBO0FBQzlDLFlBQUksR0FBQyxDQUFDLElBQUksRUFBRTtBQUNWLGNBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUc7QUFDM0IsZ0JBQUksRUFBRSxxQkFBWSxTQUFTO0FBQzNCLHlCQUFhLEVBQUUscUNBQXlCO0FBQ3hDLGtCQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBTSxDQUFDO1dBQ25DLENBQUE7QUFDRCxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDaEQsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLDhCQUFnQixNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxVQUFBLENBQUMsRUFBSTtBQUNwRSxtQkFBSyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ2hDLG1CQUFLLGFBQWEsRUFBRSxDQUFBO1dBQ3JCLENBQUMsQ0FBQyxDQUFBO1NBQ0o7T0FDRjtLQUNGOzs7V0FDWSx5QkFBRztBQUNkLFVBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxxQkFBWSxJQUFJLEVBQUU7QUFDeEQsWUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0FBQ3BCLFlBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7T0FDcEM7S0FDRjs7O1dBQ1csd0JBQUc7QUFDYixVQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0tBQ3BDOzs7V0FDYSwwQkFBRztBQUNmLFVBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7S0FDdEM7OztXQUNXLHNCQUFDLFFBQTJELEVBQWM7QUFDcEYsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDaEQ7OztXQUNXLHNCQUFDLFFBQXNCLEVBQWM7QUFDL0MsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDaEQ7OztXQUNjLHlCQUFDLFFBQXNCLEVBQWM7QUFDbEQsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUNuRDs7O1dBQ2dCLDJCQUFDLFFBQTJELEVBQWM7QUFDekYsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUNyRDs7O1dBQ2Esd0JBQUMsUUFBc0IsRUFBYztBQUNqRCxhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0tBQ25EOzs7V0FDZSwwQkFBQyxRQUFzQixFQUFjO0FBQ25ELGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDckQ7OztXQUNZLHlCQUFHO0FBQ2QsVUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtBQUMxQixVQUFJLE1BQU0sRUFBRTtBQUNWLGNBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ25ELGNBQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDOUIsWUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7T0FDbkI7S0FDRjs7O1dBQ00sbUJBQUc7QUFDUixVQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7QUFDcEIsVUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtLQUM3Qjs7O1NBdklVLFFBQVEiLCJmaWxlIjoiL1VzZXJzL3N0am9obnNvbi9yZXBvc2l0b3JpZXMvZG90ZmlsZXMvYXRvbS9wYWNrYWdlcy9pbnRlbnRpb25zL2xpYi9jb21tYW5kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbi8qIEBmbG93ICovXG5cbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnYXNzZXJ0J1xuaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlLCBFbWl0dGVyfSBmcm9tICdzYi1ldmVudC1raXQnXG5pbXBvcnQge2Rpc3Bvc2FibGVFdmVudCwgcHJldmVudERlZmF1bHQsIEFDVElWRV9UWVBFfSBmcm9tICcuL2hlbHBlcnMnXG5pbXBvcnQgdHlwZSB7RGlzcG9zYWJsZSwgVGV4dEVkaXRvcn0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGNsYXNzIENvbW1hbmRzIHtcbiAgYWN0aXZlOiA/e1xuICAgIHR5cGU6IG51bWJlcixcbiAgICBzdWJzY3JpcHRpb25zOiBDb21wb3NpdGVEaXNwb3NhYmxlLFxuICAgIGVkaXRvcjogSFRNTEVsZW1lbnRcbiAgfTtcbiAgZW1pdHRlcjogRW1pdHRlcjtcbiAgc3Vic2NyaXB0aW9uczogQ29tcG9zaXRlRGlzcG9zYWJsZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG51bGxcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLmVtaXR0ZXIpXG4gIH1cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvcjpub3QoW21pbmldKScsIHtcbiAgICAgICdpbnRlbnRpb25zOnNob3cnOiBlID0+IHtcbiAgICAgICAgcHJldmVudERlZmF1bHQoZSlcbiAgICAgICAgdGhpcy5zaG91bGRTaG93KClcbiAgICAgIH0sXG4gICAgICAnaW50ZW50aW9uczpoaWRlJzogZSA9PiB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpXG4gICAgICAgIHRoaXMuc2hvdWxkSGlkZSgpXG4gICAgICB9LFxuICAgICAgJ2ludGVudGlvbnM6Y29uZmlybSc6IGUgPT4ge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKVxuICAgICAgICB0aGlzLnNob3VsZENvbmZpcm0oKVxuICAgICAgfSxcbiAgICAgICdpbnRlbnRpb25zOmhpZ2hsaWdodCc6IGUgPT4ge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKVxuICAgICAgICB0aGlzLnNob3VsZEhpZ2hsaWdodCgpXG4gICAgICB9XG4gICAgfSkpXG4gIH1cbiAgYXN5bmMgc2hvdWxkU2hvdygpOiBQcm9taXNlIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlIHx8IHRoaXMuYWN0aXZlLnR5cGUgPT09IEFDVElWRV9UWVBFLkxJU1QpIHtcbiAgICAgIGNvbnN0IGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICAgICAgY29uc3QgZSA9IHsgc2hvdzogZmFsc2UsIGVkaXRvcn1cbiAgICAgIHRoaXMuZGlzcG9zZUFjdGl2ZSgpXG4gICAgICBhd2FpdCB0aGlzLmVtaXR0ZXIuZW1pdCgnc2hvdWxkLXNob3cnLCBlKVxuICAgICAgaWYgKGUuc2hvdykge1xuICAgICAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmFjdGl2ZSA9IHtcbiAgICAgICAgICB0eXBlOiBBQ1RJVkVfVFlQRS5MSVNULFxuICAgICAgICAgIHN1YnNjcmlwdGlvbnM6IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCksXG4gICAgICAgICAgZWRpdG9yOiBhdG9tLnZpZXdzLmdldFZpZXcoZWRpdG9yKVxuICAgICAgICB9XG4gICAgICAgIGFjdGl2ZS5lZGl0b3IuY2xhc3NMaXN0LmFkZCgnaW50ZW50aW9ucy1hY3RpdmUnKVxuICAgICAgICBhY3RpdmUuc3Vic2NyaXB0aW9ucy5hZGQoZGlzcG9zYWJsZUV2ZW50KGFjdGl2ZS5lZGl0b3IsICdtb3VzZWRvd24nLCBlID0+IHtcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdChlKVxuICAgICAgICAgIHRoaXMuc2hvdWxkSGlkZSgpXG4gICAgICAgIH0pKVxuICAgICAgICBhY3RpdmUuc3Vic2NyaXB0aW9ucy5hZGQoZGlzcG9zYWJsZUV2ZW50KGFjdGl2ZS5lZGl0b3IsICdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgICAgaWYgKGUud2hpY2ggPT09IDM4KSB7XG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChlKVxuICAgICAgICAgICAgdGhpcy5zaG91bGRNb3ZlVXAoKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gNDApIHtcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGUpXG4gICAgICAgICAgICB0aGlzLnNob3VsZE1vdmVEb3duKClcbiAgICAgICAgICB9IGVsc2UgaWYgKGUud2hpY2ggPT0gMTMpIHtcbiAgICAgICAgICAgIC8vIERvIE5vdGhpbmcsIHdlIGxldCB0aGUgaW50ZW50aW9uczpjb25maXJtIGNvbW1hbmQgd29ya1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3VsZEhpZGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNob3VsZEhpZGUoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmRpc3Bvc2VBY3RpdmUoKVxuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3Nob3VsZC1oaWRlJylcbiAgICB9XG4gIH1cbiAgYXN5bmMgc2hvdWxkSGlnaGxpZ2h0KCk6IFByb21pc2Uge1xuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpXG4gICAgICBjb25zdCBlID0geyBzaG93OiBmYWxzZSwgZWRpdG9yfVxuICAgICAgYXdhaXQgdGhpcy5lbWl0dGVyLmVtaXQoJ3Nob3VsZC1oaWdobGlnaHQnLCBlKVxuICAgICAgaWYgKGUuc2hvdykge1xuICAgICAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmFjdGl2ZSA9IHtcbiAgICAgICAgICB0eXBlOiBBQ1RJVkVfVFlQRS5ISUdITElHSFQsXG4gICAgICAgICAgc3Vic2NyaXB0aW9uczogbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKSxcbiAgICAgICAgICBlZGl0b3I6IGF0b20udmlld3MuZ2V0VmlldyhlZGl0b3IpXG4gICAgICAgIH1cbiAgICAgICAgYWN0aXZlLmVkaXRvci5jbGFzc0xpc3QuYWRkKCdpbnRlbnRpb25zLWFjdGl2ZScpXG4gICAgICAgIGFjdGl2ZS5zdWJzY3JpcHRpb25zLmFkZChkaXNwb3NhYmxlRXZlbnQoYWN0aXZlLmVkaXRvciwgJ2tleXVwJywgZSA9PiB7XG4gICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3Nob3VsZC1oaWRlJylcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VBY3RpdmUoKVxuICAgICAgICB9KSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2hvdWxkQ29uZmlybSgpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUgJiYgdGhpcy5hY3RpdmUudHlwZSA9PT0gQUNUSVZFX1RZUEUuTElTVCkge1xuICAgICAgdGhpcy5kaXNwb3NlQWN0aXZlKClcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdzaG91bGQtY29uZmlybScpXG4gICAgfVxuICB9XG4gIHNob3VsZE1vdmVVcCgpIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnc2hvdWxkLW1vdmUtdXAnKVxuICB9XG4gIHNob3VsZE1vdmVEb3duKCkge1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdzaG91bGQtbW92ZS1kb3duJylcbiAgfVxuICBvblNob3VsZFNob3coY2FsbGJhY2s6ICgoZToge3Nob3c6IGJvb2xlYW4sIGVkaXRvcjogVGV4dEVkaXRvcn0pID0+IGFueSkpOiBEaXNwb3NhYmxlIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdzaG91bGQtc2hvdycsIGNhbGxiYWNrKVxuICB9XG4gIG9uU2hvdWxkSGlkZShjYWxsYmFjazogKCgpID0+IHZvaWQpKTogRGlzcG9zYWJsZSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignc2hvdWxkLWhpZGUnLCBjYWxsYmFjaylcbiAgfVxuICBvblNob3VsZENvbmZpcm0oY2FsbGJhY2s6ICgoKSA9PiB2b2lkKSk6IERpc3Bvc2FibGUge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ3Nob3VsZC1jb25maXJtJywgY2FsbGJhY2spXG4gIH1cbiAgb25TaG91bGRIaWdobGlnaHQoY2FsbGJhY2s6ICgoZToge3Nob3c6IGJvb2xlYW4sIGVkaXRvcjogVGV4dEVkaXRvcn0pID0+IGFueSkpOiBEaXNwb3NhYmxlIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdzaG91bGQtaGlnaGxpZ2h0JywgY2FsbGJhY2spXG4gIH1cbiAgb25TaG91bGRNb3ZlVXAoY2FsbGJhY2s6ICgoKSA9PiB2b2lkKSk6IERpc3Bvc2FibGUge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ3Nob3VsZC1tb3ZlLXVwJywgY2FsbGJhY2spXG4gIH1cbiAgb25TaG91bGRNb3ZlRG93bihjYWxsYmFjazogKCgpID0+IHZvaWQpKTogRGlzcG9zYWJsZSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignc2hvdWxkLW1vdmUtZG93bicsIGNhbGxiYWNrKVxuICB9XG4gIGRpc3Bvc2VBY3RpdmUoKSB7XG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5hY3RpdmVcbiAgICBpZiAoYWN0aXZlKSB7XG4gICAgICBhY3RpdmUuZWRpdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ2ludGVudGlvbnMtYWN0aXZlJylcbiAgICAgIGFjdGl2ZS5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuICAgICAgdGhpcy5hY3RpdmUgPSBudWxsXG4gICAgfVxuICB9XG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5kaXNwb3NlQWN0aXZlKClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gIH1cbn1cbiJdfQ==
//# sourceURL=/Users/stjohnson/repositories/dotfiles/atom/packages/intentions/lib/commands.js
