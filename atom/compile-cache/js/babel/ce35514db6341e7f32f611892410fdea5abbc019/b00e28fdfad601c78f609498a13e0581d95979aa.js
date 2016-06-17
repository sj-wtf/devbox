Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helpers = require('./helpers');

var _validate = require('./validate');

'use babel';

var ProvidersList = (function () {
  function ProvidersList() {
    _classCallCheck(this, ProvidersList);

    this.number = 0;
    this.providers = new Set();
  }

  _createClass(ProvidersList, [{
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

      var promises = [];
      this.providers.forEach(function (provider) {
        if (scopes.some(function (scope) {
          return provider.grammarScopes.indexOf(scope) !== -1;
        })) {
          promises.push(new Promise(function (resolve) {
            resolve(provider.getIntentions({ textEditor: textEditor, bufferPosition: bufferPosition }));
          }).then(function (results) {
            if (atom.inDevMode()) {
              (0, _validate.suggestionsList)(results);
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

      return (0, _helpers.processSuggestions)(results);
    })
  }, {
    key: 'dispose',
    value: function dispose() {
      this.providers.clear();
    }
  }]);

  return ProvidersList;
})();

exports.ProvidersList = ProvidersList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdGpvaG5zb24vcmVwb3NpdG9yaWVzL2RvdGZpbGVzL2F0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvcHJvdmlkZXJzLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozt1QkFJaUMsV0FBVzs7d0JBQ3VDLFlBQVk7O0FBTC9GLFdBQVcsQ0FBQTs7SUFTRSxhQUFhO0FBSWIsV0FKQSxhQUFhLEdBSVY7MEJBSkgsYUFBYTs7QUFLdEIsUUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7QUFDZixRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7R0FDM0I7O2VBUFUsYUFBYTs7V0FRYixxQkFBQyxRQUFrQyxFQUFFO0FBQzlDLFVBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQy9CLGdDQUFpQixRQUFRLENBQUMsQ0FBQTtBQUMxQixZQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQUM3QjtLQUNGOzs7V0FDVSxxQkFBQyxRQUFrQyxFQUFXO0FBQ3ZELGFBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDcEM7OztXQUNhLHdCQUFDLFFBQWtDLEVBQUU7QUFDakQsVUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzlCLFlBQUksQ0FBQyxTQUFTLFVBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQUNoQztLQUNGOzs7NkJBQ1ksV0FBQyxVQUFzQixFQUErQztBQUNqRixVQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDdkMsVUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixFQUFFLENBQUE7O0FBRTNELFVBQUksQ0FBQyxVQUFVLEVBQUU7QUFDZixlQUFPLElBQUksQ0FBQTtPQUNaOztBQUVELFVBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxnQ0FBZ0MsQ0FBQyxjQUFjLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtBQUMzRixZQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBOztBQUVoQixVQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7QUFDbkIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBUyxRQUFRLEVBQUU7QUFDeEMsWUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSztpQkFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FBQSxDQUFDLEVBQUU7QUFDdEUsa0JBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUU7QUFDMUMsbUJBQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUMsVUFBVSxFQUFWLFVBQVUsRUFBRSxjQUFjLEVBQWQsY0FBYyxFQUFDLENBQUMsQ0FBQyxDQUFBO1dBQzlELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBUyxPQUFPLEVBQUU7QUFDeEIsZ0JBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO0FBQ3BCLDZDQUFvQixPQUFPLENBQUMsQ0FBQTthQUM3QjtBQUNELG1CQUFPLE9BQU8sQ0FBQTtXQUNmLENBQUMsQ0FBQyxDQUFBO1NBQ0o7T0FDRixDQUFDLENBQUE7O0FBRUYsVUFBTSxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFBO0FBQzVCLFVBQU0sT0FBTyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUUsTUFBTSxDQUFDLFVBQVMsS0FBSyxFQUFFLElBQUksRUFBRTtBQUN6RSxZQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkIsaUJBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMxQixNQUFNLE9BQU8sS0FBSyxDQUFBO09BQ3BCLEVBQUUsRUFBRSxDQUFDLENBQUE7O0FBRU4sVUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTs7QUFFMUIsZUFBTyxJQUFJLENBQUE7T0FDWixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFOztBQUUxQixlQUFPLElBQUksQ0FBQTtPQUNaOztBQUVELGFBQU8saUNBQW1CLE9BQU8sQ0FBQyxDQUFBO0tBQ25DOzs7V0FDTSxtQkFBRztBQUNSLFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDdkI7OztTQWxFVSxhQUFhIiwiZmlsZSI6Ii9Vc2Vycy9zdGpvaG5zb24vcmVwb3NpdG9yaWVzL2RvdGZpbGVzL2F0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvcHJvdmlkZXJzLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuXG4vKiBAZmxvdyAqL1xuXG5pbXBvcnQge3Byb2Nlc3NTdWdnZXN0aW9uc30gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHtwcm92aWRlciBhcyB2YWxpZGF0ZVByb3ZpZGVyLCBzdWdnZXN0aW9uc0xpc3QgYXMgdmFsaWRhdGVTdWdnZXN0aW9uc30gZnJvbSAnLi92YWxpZGF0ZSdcbmltcG9ydCB0eXBlIHtJbnRlbnRpb25zJFByb3ZpZGVyJExpc3QsIEludGVudGlvbnMkU3VnZ2VzdGlvbiRMaXN0fSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHR5cGUge1RleHRFZGl0b3J9IGZyb20gJ2F0b20nXG5cbmV4cG9ydCBjbGFzcyBQcm92aWRlcnNMaXN0IHtcbiAgbnVtYmVyOiBudW1iZXI7XG4gIHByb3ZpZGVyczogU2V0PEludGVudGlvbnMkUHJvdmlkZXIkTGlzdD47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5udW1iZXIgPSAwXG4gICAgdGhpcy5wcm92aWRlcnMgPSBuZXcgU2V0KClcbiAgfVxuICBhZGRQcm92aWRlcihwcm92aWRlcjogSW50ZW50aW9ucyRQcm92aWRlciRMaXN0KSB7XG4gICAgaWYgKCF0aGlzLmhhc1Byb3ZpZGVyKHByb3ZpZGVyKSkge1xuICAgICAgdmFsaWRhdGVQcm92aWRlcihwcm92aWRlcilcbiAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcilcbiAgICB9XG4gIH1cbiAgaGFzUHJvdmlkZXIocHJvdmlkZXI6IEludGVudGlvbnMkUHJvdmlkZXIkTGlzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnByb3ZpZGVycy5oYXMocHJvdmlkZXIpXG4gIH1cbiAgZGVsZXRlUHJvdmlkZXIocHJvdmlkZXI6IEludGVudGlvbnMkUHJvdmlkZXIkTGlzdCkge1xuICAgIGlmICh0aGlzLmhhc1Byb3ZpZGVyKHByb3ZpZGVyKSkge1xuICAgICAgdGhpcy5wcm92aWRlcnMuZGVsZXRlKHByb3ZpZGVyKVxuICAgIH1cbiAgfVxuICBhc3luYyB0cmlnZ2VyKHRleHRFZGl0b3I6IFRleHRFZGl0b3IpOiBQcm9taXNlPD9BcnJheTxJbnRlbnRpb25zJFN1Z2dlc3Rpb24kTGlzdD4+IHtcbiAgICBjb25zdCBlZGl0b3JQYXRoID0gdGV4dEVkaXRvci5nZXRQYXRoKClcbiAgICBjb25zdCBidWZmZXJQb3NpdGlvbiA9IHRleHRFZGl0b3IuZ2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24oKVxuXG4gICAgaWYgKCFlZGl0b3JQYXRoKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IHNjb3BlcyA9IHRleHRFZGl0b3Iuc2NvcGVEZXNjcmlwdG9yRm9yQnVmZmVyUG9zaXRpb24oYnVmZmVyUG9zaXRpb24pLmdldFNjb3Blc0FycmF5KClcbiAgICBzY29wZXMucHVzaCgnKicpXG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdXG4gICAgdGhpcy5wcm92aWRlcnMuZm9yRWFjaChmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgaWYgKHNjb3Blcy5zb21lKHNjb3BlID0+IHByb3ZpZGVyLmdyYW1tYXJTY29wZXMuaW5kZXhPZihzY29wZSkgIT09IC0xKSkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICByZXNvbHZlKHByb3ZpZGVyLmdldEludGVudGlvbnMoe3RleHRFZGl0b3IsIGJ1ZmZlclBvc2l0aW9ufSkpXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0cykge1xuICAgICAgICAgIGlmIChhdG9tLmluRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZVN1Z2dlc3Rpb25zKHJlc3VsdHMpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzXG4gICAgICAgIH0pKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBudW1iZXIgPSArK3RoaXMubnVtYmVyXG4gICAgY29uc3QgcmVzdWx0cyA9IChhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcykpLnJlZHVjZShmdW5jdGlvbihpdGVtcywgaXRlbSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLmNvbmNhdChpdGVtKVxuICAgICAgfSBlbHNlIHJldHVybiBpdGVtc1xuICAgIH0sIFtdKVxuXG4gICAgaWYgKG51bWJlciAhPT0gdGhpcy5udW1iZXIpIHtcbiAgICAgIC8vIElmIGhhcyBiZWVuIGV4ZWN1dGVkIG9uZSBtb3JlIHRpbWUsIGlnbm9yZSB0aGVzZSByZXN1bHRzXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH0gZWxzZSBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAvLyBXZSBnb3Qgbm90aGluZyBoZXJlXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBwcm9jZXNzU3VnZ2VzdGlvbnMocmVzdWx0cylcbiAgfVxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMucHJvdmlkZXJzLmNsZWFyKClcbiAgfVxufVxuIl19
//# sourceURL=/Users/stjohnson/repositories/dotfiles/atom/packages/intentions/lib/providers-list.js
