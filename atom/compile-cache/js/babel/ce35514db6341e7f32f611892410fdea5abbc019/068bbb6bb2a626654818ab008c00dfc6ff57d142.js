function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _atom = require('atom');

'use babel';

module.exports = {
  activate: function activate() {
    this.intentions = new _main2['default']();
    this.intentions.activate();
  },
  deactivate: function deactivate() {
    this.intentions.dispose();
  },
  consumeListIntentions: function consumeListIntentions(provider) {
    var _this = this;

    var providers = [].concat(provider);
    providers.forEach(function (provider) {
      _this.intentions.consumeListProvider(provider);
    });
    return new _atom.Disposable(function () {
      providers.forEach(function (provider) {
        _this.intentions.deleteListProvider(provider);
      });
    });
  },
  consumeHighlightIntentions: function consumeHighlightIntentions(provider) {
    var _this2 = this;

    var providers = [].concat(provider);
    providers.forEach(function (provider) {
      _this2.intentions.consumeHighlightProvider(provider);
    });
    return new _atom.Disposable(function () {
      providers.forEach(function (provider) {
        _this2.intentions.deleteHighlightProvider(provider);
      });
    });
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdGpvaG5zb24vcmVwb3NpdG9yaWVzL2RvdGZpbGVzL2F0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7b0JBRXVCLFFBQVE7Ozs7b0JBQ04sTUFBTTs7QUFIL0IsV0FBVyxDQUFBOztBQUtYLE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixVQUFRLEVBQUEsb0JBQUc7QUFDVCxRQUFJLENBQUMsVUFBVSxHQUFHLHVCQUFnQixDQUFBO0FBQ2xDLFFBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUE7R0FDM0I7QUFDRCxZQUFVLEVBQUEsc0JBQUc7QUFDWCxRQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFBO0dBQzFCO0FBQ0QsdUJBQXFCLEVBQUEsK0JBQUMsUUFBUSxFQUFFOzs7QUFDOUIsUUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNyQyxhQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUSxFQUFJO0FBQzVCLFlBQUssVUFBVSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQzlDLENBQUMsQ0FBQTtBQUNGLFdBQU8scUJBQWUsWUFBTTtBQUMxQixlQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUSxFQUFJO0FBQzVCLGNBQUssVUFBVSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO09BQzdDLENBQUMsQ0FBQTtLQUNILENBQUMsQ0FBQTtHQUNIO0FBQ0QsNEJBQTBCLEVBQUEsb0NBQUMsUUFBUSxFQUFFOzs7QUFDbkMsUUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNyQyxhQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUSxFQUFJO0FBQzVCLGFBQUssVUFBVSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ25ELENBQUMsQ0FBQTtBQUNGLFdBQU8scUJBQWUsWUFBTTtBQUMxQixlQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUSxFQUFJO0FBQzVCLGVBQUssVUFBVSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFBO09BQ2xELENBQUMsQ0FBQTtLQUNILENBQUMsQ0FBQTtHQUNIO0NBQ0YsQ0FBQSIsImZpbGUiOiIvVXNlcnMvc3Rqb2huc29uL3JlcG9zaXRvcmllcy9kb3RmaWxlcy9hdG9tL3BhY2thZ2VzL2ludGVudGlvbnMvbGliL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcblxuaW1wb3J0IEludGVudGlvbnMgZnJvbSAnLi9tYWluJ1xuaW1wb3J0IHtEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5pbnRlbnRpb25zID0gbmV3IEludGVudGlvbnMoKVxuICAgIHRoaXMuaW50ZW50aW9ucy5hY3RpdmF0ZSgpXG4gIH0sXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5pbnRlbnRpb25zLmRpc3Bvc2UoKVxuICB9LFxuICBjb25zdW1lTGlzdEludGVudGlvbnMocHJvdmlkZXIpIHtcbiAgICBjb25zdCBwcm92aWRlcnMgPSBbXS5jb25jYXQocHJvdmlkZXIpXG4gICAgcHJvdmlkZXJzLmZvckVhY2gocHJvdmlkZXIgPT4ge1xuICAgICAgdGhpcy5pbnRlbnRpb25zLmNvbnN1bWVMaXN0UHJvdmlkZXIocHJvdmlkZXIpXG4gICAgfSlcbiAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgcHJvdmlkZXJzLmZvckVhY2gocHJvdmlkZXIgPT4ge1xuICAgICAgICB0aGlzLmludGVudGlvbnMuZGVsZXRlTGlzdFByb3ZpZGVyKHByb3ZpZGVyKVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBjb25zdW1lSGlnaGxpZ2h0SW50ZW50aW9ucyhwcm92aWRlcikge1xuICAgIGNvbnN0IHByb3ZpZGVycyA9IFtdLmNvbmNhdChwcm92aWRlcilcbiAgICBwcm92aWRlcnMuZm9yRWFjaChwcm92aWRlciA9PiB7XG4gICAgICB0aGlzLmludGVudGlvbnMuY29uc3VtZUhpZ2hsaWdodFByb3ZpZGVyKHByb3ZpZGVyKVxuICAgIH0pXG4gICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgIHByb3ZpZGVycy5mb3JFYWNoKHByb3ZpZGVyID0+IHtcbiAgICAgICAgdGhpcy5pbnRlbnRpb25zLmRlbGV0ZUhpZ2hsaWdodFByb3ZpZGVyKHByb3ZpZGVyKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG4iXX0=
//# sourceURL=/Users/stjohnson/repositories/dotfiles/atom/packages/intentions/lib/index.js
