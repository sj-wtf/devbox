Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _validate = require('./validate');

var _elementsHighlight = require('./elements/highlight');

'use babel';

var ProvidersHighlight = (function () {
  function ProvidersHighlight() {
    _classCallCheck(this, ProvidersHighlight);

    this.number = 0;
    this.providers = new Set();
  }

  _createClass(ProvidersHighlight, [{
    key: 'addProvider',
    value: function addProvider(provider) {
      if (!this.hasProvider(provider)) {
        (0, _validate.provider)(provider);
        this.providers.add(provider);
      }
    }
  }, {
    key: 'hasProvider',
    value: function hasProvider(provider) {
      return this.providers.has(provider);
    }
  }, {
    key: 'deleteProvider',
    value: function deleteProvider(provider) {
      if (this.hasProvider(provider)) {
        this.providers['delete'](provider);
      }
    }
  }, {
    key: 'trigger',
    value: _asyncToGenerator(function* (textEditor) {
      var editorPath = textEditor.getPath();
      var bufferPosition = textEditor.getCursorBufferPosition();

      if (!editorPath) {
        return null;
      }

      var scopes = textEditor.scopeDescriptorForBufferPosition(bufferPosition).getScopesArray();
      scopes.push('*');

      var visibleRange = _atom.Range.fromObject([textEditor.bufferPositionForScreenPosition([textEditor.getFirstVisibleScreenRow(), 0]), textEditor.bufferPositionForScreenPosition([textEditor.getLastVisibleScreenRow(), 0])]);
      // Setting this to infinity on purpose, cause the buffer position just marks visible column
      // according to element width
      visibleRange.end.column = Infinity;

      var promises = [];
      this.providers.forEach(function (provider) {
        if (scopes.some(function (scope) {
          return provider.grammarScopes.indexOf(scope) !== -1;
        })) {
          promises.push(new Promise(function (resolve) {
            resolve(provider.getIntentions({ textEditor: textEditor, visibleRange: visibleRange }));
          }).then(function (results) {
            if (atom.inDevMode()) {
              (0, _validate.suggestionsShow)(results);
            }
            return results;
          }));
        }
      });

      var number = ++this.number;
      var results = (yield Promise.all(promises)).reduce(function (items, item) {
        if (Array.isArray(item)) {
          return items.concat(item);
        } else return items;
      }, []);

      if (number !== this.number) {
        // If has been executed one more time, ignore these results
        return null;
      } else if (!results.length) {
        // We got nothing here
        return null;
      }

      return results;
    })
  }, {
    key: 'paint',
    value: function paint(textEditor, intentions) {
      var markers = [];

      var _loop = function (intention) {
        var matchedText = textEditor.getTextInBufferRange(intention.range);
        var marker = textEditor.markBufferRange(intention.range);
        var element = (0, _elementsHighlight.create)(intention, matchedText.length);
        intention.created({ textEditor: textEditor, element: element, marker: marker, matchedText: matchedText });
        textEditor.decorateMarker(marker, {
          type: 'overlay',
          position: 'tail',
          item: element
        });
        marker.onDidChange(function (_ref) {
          var start = _ref.newHeadBufferPosition;
          var end = _ref.oldTailBufferPosition;

          element.textContent = _elementsHighlight.PADDING_CHARACTER.repeat(textEditor.getTextInBufferRange([start, end]).length);
        });
        markers.push(marker);
      };

      for (var intention of intentions) {
        _loop(intention);
      }
      return new _atom.Disposable(function () {
        markers.forEach(function (marker) {
          try {
            marker.destroy();
          } catch (_) {}
        });
      });
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.providers.clear();
    }
  }]);

  return ProvidersHighlight;
})();

exports.ProvidersHighlight = ProvidersHighlight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdGpvaG5zb24vcmVwb3NpdG9yaWVzL2RvdGZpbGVzL2F0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvcHJvdmlkZXJzLWhpZ2hsaWdodC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUlnQyxNQUFNOzt3QkFDNkMsWUFBWTs7aUNBQ3RDLHNCQUFzQjs7QUFOL0UsV0FBVyxDQUFBOztJQVVFLGtCQUFrQjtBQUlsQixXQUpBLGtCQUFrQixHQUlmOzBCQUpILGtCQUFrQjs7QUFLM0IsUUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7QUFDZixRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7R0FDM0I7O2VBUFUsa0JBQWtCOztXQVFsQixxQkFBQyxRQUF1QyxFQUFFO0FBQ25ELFVBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQy9CLGdDQUFpQixRQUFRLENBQUMsQ0FBQTtBQUMxQixZQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQUM3QjtLQUNGOzs7V0FDVSxxQkFBQyxRQUF1QyxFQUFXO0FBQzVELGFBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDcEM7OztXQUNhLHdCQUFDLFFBQXVDLEVBQUU7QUFDdEQsVUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzlCLFlBQUksQ0FBQyxTQUFTLFVBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQUNoQztLQUNGOzs7NkJBQ1ksV0FBQyxVQUFzQixFQUFvRDtBQUN0RixVQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDdkMsVUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixFQUFFLENBQUE7O0FBRTNELFVBQUksQ0FBQyxVQUFVLEVBQUU7QUFDZixlQUFPLElBQUksQ0FB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U0FBUztBQUNmLGtCQUFRLEVBQUUsTUFBTTtBQUNoQixjQUFJLEVBQUUsT0FBTztTQUNkLENBQUMsQ0FBQTtBQUNGLGNBQU0sQ0FBQyxXQUFXLENBQUMsVUFBUyxJQUEwRCxFQUFFO2NBQXBDLEtBQUssR0FBN0IsSUFBMEQsQ0FBekQscUJBQXFCO2NBQWdDLEdBQUcsR0FBekQsSUFBMEQsQ0FBM0IscUJBQXFCOztBQUM5RSxpQkFBTyxDQUFDLFdBQVcsR0FBRyxxQ0FBa0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ3JHLENBQUMsQ0FBQTtBQUNGLGVBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7OztBQWJ0QixXQUFLLElBQU0sU0FBUyxJQUFJLFVBQVUsRUFBRTtjQUF6QixTQUFTO09BY25CO0FBQ0QsYUFBTyxxQkFBZSxZQUFXO0FBQy9CLGVBQU8sQ0FBQyxPQUFPLENBQUMsVUFBUyxNQUFNLEVBQUU7QUFDL0IsY0FBSTtBQUNGLGtCQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7V0FDakIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1NBQ2YsQ0FBQyxDQUFBO09BQ0gsQ0FBQyxDQUFBO0tBQ0g7OztXQUNNLG1CQUFHO0FBQ1IsVUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtLQUN2Qjs7O1NBbkdVLGtCQUFrQiIsImZpbGUiOiIvVXNlcnMvc3Rqb2huc29uL3JlcG9zaXRvcmllcy9kb3RmaWxlcy9hdG9tL3BhY2thZ2VzL2ludGVudGlvbnMvbGliL3Byb3ZpZGVycy1oaWdobGlnaHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuXG4vKiBAZmxvdyAqL1xuXG5pbXBvcnQge1JhbmdlLCBEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHtwcm92aWRlciBhcyB2YWxpZGF0ZVByb3ZpZGVyLCBzdWdnZXN0aW9uc1Nob3cgYXMgdmFsaWRhdGVTdWdnZXN0aW9uc30gZnJvbSAnLi92YWxpZGF0ZSdcbmltcG9ydCB7Y3JlYXRlIGFzIGNyZWF0ZUVsZW1lbnQsIFBBRERJTkdfQ0hBUkFDVEVSfSBmcm9tICcuL2VsZW1lbnRzL2hpZ2hsaWdodCdcbmltcG9ydCB0eXBlIHtJbnRlbnRpb25zJFByb3ZpZGVyJEhpZ2hsaWdodCwgSW50ZW50aW9ucyRTdWdnZXN0aW9uJEhpZ2hsaWdodH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB0eXBlIHtUZXh0RWRpdG9yfSBmcm9tICdhdG9tJ1xuXG5leHBvcnQgY2xhc3MgUHJvdmlkZXJzSGlnaGxpZ2h0IHtcbiAgbnVtYmVyOiBudW1iZXI7XG4gIHByb3ZpZGVyczogU2V0PEludGVudGlvbnMkUHJvdmlkZXIkSGlnaGxpZ2h0PjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm51bWJlciA9IDBcbiAgICB0aGlzLnByb3ZpZGVycyA9IG5ldyBTZXQoKVxuICB9XG4gIGFkZFByb3ZpZGVyKHByb3ZpZGVyOiBJbnRlbnRpb25zJFByb3ZpZGVyJEhpZ2hsaWdodCkge1xuICAgIGlmICghdGhpcy5oYXNQcm92aWRlcihwcm92aWRlcikpIHtcbiAgICAgIHZhbGlkYXRlUHJvdmlkZXIocHJvdmlkZXIpXG4gICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpXG4gICAgfVxuICB9XG4gIGhhc1Byb3ZpZGVyKHByb3ZpZGVyOiBJbnRlbnRpb25zJFByb3ZpZGVyJEhpZ2hsaWdodCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnByb3ZpZGVycy5oYXMocHJvdmlkZXIpXG4gIH1cbiAgZGVsZXRlUHJvdmlkZXIocHJvdmlkZXI6IEludGVudGlvbnMkUHJvdmlkZXIkSGlnaGxpZ2h0KSB7XG4gICAgaWYgKHRoaXMuaGFzUHJvdmlkZXIocHJvdmlkZXIpKSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5kZWxldGUocHJvdmlkZXIpXG4gICAgfVxuICB9XG4gIGFzeW5jIHRyaWdnZXIodGV4dEVkaXRvcjogVGV4dEVkaXRvcik6IFByb21pc2U8P0FycmF5PEludGVudGlvbnMkU3VnZ2VzdGlvbiRIaWdobGlnaHQ+PiB7XG4gICAgY29uc3QgZWRpdG9yUGF0aCA9IHRleHRFZGl0b3IuZ2V0UGF0aCgpXG4gICAgY29uc3QgYnVmZmVyUG9zaXRpb24gPSB0ZXh0RWRpdG9yLmdldEN1cnNvckJ1ZmZlclBvc2l0aW9uKClcblxuICAgIGlmICghZWRpdG9yUGF0aCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCBzY29wZXMgPSB0ZXh0RWRpdG9yLnNjb3BlRGVzY3JpcHRvckZvckJ1ZmZlclBvc2l0aW9uKGJ1ZmZlclBvc2l0aW9uKS5nZXRTY29wZXNBcnJheSgpXG4gICAgc2NvcGVzLnB1c2goJyonKVxuXG4gICAgY29uc3QgdmlzaWJsZVJhbmdlID0gUmFuZ2UuZnJvbU9iamVjdChbXG4gICAgICB0ZXh0RWRpdG9yLmJ1ZmZlclBvc2l0aW9uRm9yU2NyZWVuUG9zaXRpb24oW3RleHRFZGl0b3IuZ2V0Rmlyc3RWaXNpYmxlU2NyZWVuUm93KCksIDBdKSxcbiAgICAgIHRleHRFZGl0b3IuYnVmZmVyUG9zaXRpb25Gb3JTY3JlZW5Qb3NpdGlvbihbdGV4dEVkaXRvci5nZXRMYXN0VmlzaWJsZVNjcmVlblJvdygpLCAwXSlcbiAgICBdKVxuICAgIC8vIFNldHRpbmcgdGhpcyB0byBpbmZpbml0eSBvbiBwdXJwb3NlLCBjYXVzZSB0aGUgYnVmZmVyIHBvc2l0aW9uIGp1c3QgbWFya3MgdmlzaWJsZSBjb2x1bW5cbiAgICAvLyBhY2NvcmRpbmcgdG8gZWxlbWVudCB3aWR0aFxuICAgIHZpc2libGVSYW5nZS5lbmQuY29sdW1uID0gSW5maW5pdHlcblxuICAgIGNvbnN0IHByb21pc2VzID0gW11cbiAgICB0aGlzLnByb3ZpZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICBpZiAoc2NvcGVzLnNvbWUoc2NvcGUgPT4gcHJvdmlkZXIuZ3JhbW1hclNjb3Blcy5pbmRleE9mKHNjb3BlKSAhPT0gLTEpKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIHJlc29sdmUocHJvdmlkZXIuZ2V0SW50ZW50aW9ucyh7dGV4dEVkaXRvciwgdmlzaWJsZVJhbmdlfSkpXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cykge1xuICAgICAgICAgIGlmIChhdG9tLmluRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZVN1Z2dlc3Rpb25zKHJlc3VsdHMpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzXG4gICAgICAgIH0pKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBudW1iZXIgPSArK3RoaXMubnVtYmVyXG4gICAgY29uc3QgcmVzdWx0cyA9IChhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcykpLnJlZHVjZShmdW5jdGlvbihpdGVtcywgaXRlbSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLmNvbmNhdChpdGVtKVxuICAgICAgfSBlbHNlIHJldHVybiBpdGVtc1xuICAgIH0sIFtdKVxuXG4gICAgaWYgKG51bWJlciAhPT0gdGhpcy5udW1iZXIpIHtcbiAgICAgIC8vIElmIGhhcyBiZWVuIGV4ZWN1dGVkIG9uZSBtb3JlIHRpbWUsIGlnbm9yZSB0aGVzZSByZXN1bHRzXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH0gZWxzZSBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAvLyBXZSBnb3Qgbm90aGluZyBoZXJlXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzXG4gIH1cbiAgcGFpbnQodGV4dEVkaXRvcjogVGV4dEVkaXRvciwgaW50ZW50aW9uczogQXJyYXk8SW50ZW50aW9ucyRTdWdnZXN0aW9uJEhpZ2hsaWdodD4pOiBEaXNwb3NhYmxlIHtcbiAgICBjb25zdCBtYXJrZXJzID0gW11cbiAgICBmb3IgKGNvbnN0IGludGVudGlvbiBvZiBpbnRlbnRpb25zKSB7XG4gICAgICBjb25zdCBtYXRjaGVkVGV4dCA9IHRleHRFZGl0b3IuZ2V0VGV4dEluQnVmZmVyUmFuZ2UoaW50ZW50aW9uLnJhbmdlKVxuICAgICAgY29uc3QgbWFya2VyID0gdGV4dEVkaXRvci5tYXJrQnVmZmVyUmFuZ2UoaW50ZW50aW9uLnJhbmdlKVxuICAgICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoaW50ZW50aW9uLCBtYXRjaGVkVGV4dC5sZW5ndGgpXG4gICAgICBpbnRlbnRpb24uY3JlYXRlZCh7dGV4dEVkaXRvciwgZWxlbWVudCwgbWFya2VyLCBtYXRjaGVkVGV4dH0pXG4gICAgICB0ZXh0RWRpdG9yLmRlY29yYXRlTWFya2VyKG1hcmtlciwge1xuICAgICAgICB0eXBlOiAnb3ZlcmxheScsXG4gICAgICAgIHBvc2l0aW9uOiAndGFpbCcsXG4gICAgICAgIGl0ZW06IGVsZW1lbnRcbiAgICAgIH0pXG4gICAgICBtYXJrZXIub25EaWRDaGFuZ2UoZnVuY3Rpb24oe25ld0hlYWRCdWZmZXJQb3NpdGlvbjogc3RhcnQsIG9sZFRhaWxCdWZmZXJQb3NpdGlvbjogZW5kfSkge1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gUEFERElOR19DSEFSQUNURVIucmVwZWF0KHRleHRFZGl0b3IuZ2V0VGV4dEluQnVmZmVyUmFuZ2UoW3N0YXJ0LCBlbmRdKS5sZW5ndGgpXG4gICAgICB9KVxuICAgICAgbWFya2Vycy5wdXNoKG1hcmtlcilcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKGZ1bmN0aW9uKCkge1xuICAgICAgbWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uKG1hcmtlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG1hcmtlci5kZXN0cm95KClcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMucHJvdmlkZXJzLmNsZWFyKClcbiAgfVxufVxuIl19
//# sourceURL=/Users/stjohnson/repositories/dotfiles/atom/packages/intentions/lib/providers-highlight.js
