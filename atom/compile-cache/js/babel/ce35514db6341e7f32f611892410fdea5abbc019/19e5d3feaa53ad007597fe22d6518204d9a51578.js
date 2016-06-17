Object.defineProperty(exports, '__esModule', {
  value: true
});

/** @jsx jsx */

var _vanillaJsx = require('vanilla-jsx');

'use babel';var ListElement = (0, _vanillaJsx.createClass)({
  renderView: function renderView(suggestions, selectCallback) {
    var className = 'select-list popover-list';
    if (suggestions.length > 7) {
      className += ' intentions-scroll';
    }

    this.suggestions = suggestions;
    this.suggestionsCount = suggestions.length;
    this.suggestionsIndex = -1;
    this.selectCallback = selectCallback;

    return (0, _vanillaJsx.jsx)(
      'intentions-list',
      { 'class': className, id: 'intentions-list' },
      (0, _vanillaJsx.jsx)(
        'ol',
        { 'class': 'list-group', ref: 'list' },
        suggestions.map(function (suggestion) {
          return (0, _vanillaJsx.jsx)(
            'li',
            null,
            (0, _vanillaJsx.jsx)(
              'span',
              { 'class': suggestion['class'], 'on-click': function (e) {
                  selectCallback(suggestion);
                } },
              suggestion.title
            )
          );
        })
      )
    );
  },
  moveDown: function moveDown() {
    this.suggestionsIndex = (this.suggestionsIndex + 1) % this.suggestionsCount;
    this.selectOption(this.suggestionsIndex);
  },
  moveUp: function moveUp() {
    this.suggestionsIndex--;
    if (this.suggestionsIndex < 0) {
      this.suggestionsIndex = this.suggestionsCount - 1;
    } else {
      this.suggestionsIndex = this.suggestionsIndex % this.suggestionsCount;
    }
    this.selectOption(this.suggestionsIndex);
  },
  selectOption: function selectOption(index) {

    if (this.refs.active) {
      this.refs.active.classList.remove('selected');
    }

    this.refs.active = this.refs.list.children[index];
    this.refs.active.classList.add('selected');

    this.refs.active.scrollIntoViewIfNeeded(false);
  },
  selectActive: function selectActive() {
    this.selectCallback(this.suggestions[this.suggestionsIndex]);
  }
});
exports.ListElement = ListElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdGpvaG5zb24vcmVwb3NpdG9yaWVzL2RvdGZpbGVzL2F0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvZWxlbWVudHMvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7MEJBRytCLGFBQWE7O0FBSDVDLFdBQVcsQ0FBQSxBQUtKLElBQU0sV0FBVyxHQUFHLDZCQUFZO0FBQ3JDLFlBQVUsRUFBQSxvQkFBQyxXQUFXLEVBQUUsY0FBYyxFQUFFO0FBQ3RDLFFBQUksU0FBUyxHQUFHLDBCQUEwQixDQUFBO0FBQzFDLFFBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDMUIsZUFBUyxJQUFJLG9CQUFvQixDQUFBO0tBQ2xDOztBQUVELFFBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO0FBQzlCLFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFBO0FBQzFDLFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUMxQixRQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTs7QUFFcEMsV0FBTzs7UUFBaUIsU0FBTyxTQUFTLEFBQUMsRUFBQyxFQUFFLEVBQUMsaUJBQWlCO01BQzVEOztVQUFJLFNBQU0sWUFBWSxFQUFDLEdBQUcsRUFBQyxNQUFNO1FBQzlCLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBUyxVQUFVLEVBQUU7QUFDcEMsaUJBQU87OztZQUNMOztnQkFBTSxTQUFPLFVBQVUsU0FBTSxBQUFDLEVBQUMsWUFBVSxVQUFTLENBQUMsRUFBRTtBQUNuRCxnQ0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFBO2lCQUMzQixBQUFDO2NBQUUsVUFBVSxDQUFDLEtBQUs7YUFBUTtXQUN6QixDQUFBO1NBQ04sQ0FBQztPQUNDO0tBQ1csQ0FBQTtHQUNuQjtBQUNELFVBQVEsRUFBQSxvQkFBRztBQUNULFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUEsR0FBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUE7QUFDM0UsUUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtHQUN6QztBQUNELFFBQU0sRUFBQSxrQkFBRztBQUNQLFFBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0FBQ3ZCLFFBQUksSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsRUFBRTtBQUM3QixVQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQTtLQUNsRCxNQUFNO0FBQ0wsVUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUE7S0FDdEU7QUFDRCxRQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0dBQ3pDO0FBQ0QsY0FBWSxFQUFBLHNCQUFDLEtBQUssRUFBRTs7QUFFbEIsUUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNwQixVQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0tBQzlDOztBQUVELFFBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNqRCxRQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBOztBQUUxQyxRQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtHQUMvQztBQUNELGNBQVksRUFBQSx3QkFBRztBQUNiLFFBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO0dBQzdEO0NBQ0YsQ0FBQyxDQUFBIiwiZmlsZSI6Ii9Vc2Vycy9zdGpvaG5zb24vcmVwb3NpdG9yaWVzL2RvdGZpbGVzL2F0b20vcGFja2FnZXMvaW50ZW50aW9ucy9saWIvZWxlbWVudHMvbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHtjcmVhdGVDbGFzcywganN4fSBmcm9tICd2YW5pbGxhLWpzeCdcblxuZXhwb3J0IGNvbnN0IExpc3RFbGVtZW50ID0gY3JlYXRlQ2xhc3Moe1xuICByZW5kZXJWaWV3KHN1Z2dlc3Rpb25zLCBzZWxlY3RDYWxsYmFjaykge1xuICAgIGxldCBjbGFzc05hbWUgPSAnc2VsZWN0LWxpc3QgcG9wb3Zlci1saXN0J1xuICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGggPiA3KSB7XG4gICAgICBjbGFzc05hbWUgKz0gJyBpbnRlbnRpb25zLXNjcm9sbCdcbiAgICB9XG5cbiAgICB0aGlzLnN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnNcbiAgICB0aGlzLnN1Z2dlc3Rpb25zQ291bnQgPSBzdWdnZXN0aW9ucy5sZW5ndGhcbiAgICB0aGlzLnN1Z2dlc3Rpb25zSW5kZXggPSAtMVxuICAgIHRoaXMuc2VsZWN0Q2FsbGJhY2sgPSBzZWxlY3RDYWxsYmFja1xuXG4gICAgcmV0dXJuIDxpbnRlbnRpb25zLWxpc3QgY2xhc3M9e2NsYXNzTmFtZX0gaWQ9XCJpbnRlbnRpb25zLWxpc3RcIj5cbiAgICAgIDxvbCBjbGFzcz1cImxpc3QtZ3JvdXBcIiByZWY9XCJsaXN0XCI+XG4gICAgICAgIHtzdWdnZXN0aW9ucy5tYXAoZnVuY3Rpb24oc3VnZ2VzdGlvbikge1xuICAgICAgICAgIHJldHVybiA8bGk+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz17c3VnZ2VzdGlvbi5jbGFzc30gb24tY2xpY2s9e2Z1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgc2VsZWN0Q2FsbGJhY2soc3VnZ2VzdGlvbilcbiAgICAgICAgICAgIH19PntzdWdnZXN0aW9uLnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICB9KX1cbiAgICAgIDwvb2w+XG4gICAgPC9pbnRlbnRpb25zLWxpc3Q+XG4gIH0sXG4gIG1vdmVEb3duKCkge1xuICAgIHRoaXMuc3VnZ2VzdGlvbnNJbmRleCA9ICh0aGlzLnN1Z2dlc3Rpb25zSW5kZXggKyAxKSAlIHRoaXMuc3VnZ2VzdGlvbnNDb3VudFxuICAgIHRoaXMuc2VsZWN0T3B0aW9uKHRoaXMuc3VnZ2VzdGlvbnNJbmRleClcbiAgfSxcbiAgbW92ZVVwKCkge1xuICAgIHRoaXMuc3VnZ2VzdGlvbnNJbmRleC0tXG4gICAgaWYgKHRoaXMuc3VnZ2VzdGlvbnNJbmRleCA8IDApIHtcbiAgICAgIHRoaXMuc3VnZ2VzdGlvbnNJbmRleCA9IHRoaXMuc3VnZ2VzdGlvbnNDb3VudCAtIDFcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdWdnZXN0aW9uc0luZGV4ID0gdGhpcy5zdWdnZXN0aW9uc0luZGV4ICUgdGhpcy5zdWdnZXN0aW9uc0NvdW50XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0T3B0aW9uKHRoaXMuc3VnZ2VzdGlvbnNJbmRleClcbiAgfSxcbiAgc2VsZWN0T3B0aW9uKGluZGV4KSB7XG5cbiAgICBpZiAodGhpcy5yZWZzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5yZWZzLmFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG4gICAgfVxuXG4gICAgdGhpcy5yZWZzLmFjdGl2ZSA9IHRoaXMucmVmcy5saXN0LmNoaWxkcmVuW2luZGV4XVxuICAgIHRoaXMucmVmcy5hY3RpdmUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuXG4gICAgdGhpcy5yZWZzLmFjdGl2ZS5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKGZhbHNlKVxuICB9LFxuICBzZWxlY3RBY3RpdmUoKSB7XG4gICAgdGhpcy5zZWxlY3RDYWxsYmFjayh0aGlzLnN1Z2dlc3Rpb25zW3RoaXMuc3VnZ2VzdGlvbnNJbmRleF0pXG4gIH1cbn0pXG4iXX0=
//# sourceURL=/Users/stjohnson/repositories/dotfiles/atom/packages/intentions/lib/elements/list.js
