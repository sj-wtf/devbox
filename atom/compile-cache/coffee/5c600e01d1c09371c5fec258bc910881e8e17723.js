(function() {
  var FooterView;

  module.exports = FooterView = (function() {
    function FooterView(isWhitespaceIgnored) {
      var copyToLeftButton, copyToRightButton, ignoreWhitespaceLabel, ignoreWhitespaceValue, left, mid, nextDiffButton, numDifferences, prevDiffButton, right, selectionDivider;
      this.element = document.createElement('div');
      this.element.classList.add('split-diff-ui');
      prevDiffButton = document.createElement('button');
      prevDiffButton.classList.add('btn');
      prevDiffButton.classList.add('btn-md');
      prevDiffButton.classList.add('prev-diff');
      prevDiffButton.onclick = function() {
        return atom.commands.dispatch(atom.views.getView(atom.workspace), 'split-diff:prev-diff');
      };
      prevDiffButton.title = 'Move to Previous Diff';
      nextDiffButton = document.createElement('button');
      nextDiffButton.classList.add('btn');
      nextDiffButton.classList.add('btn-md');
      nextDiffButton.classList.add('next-diff');
      nextDiffButton.onclick = function() {
        return atom.commands.dispatch(atom.views.getView(atom.workspace), 'split-diff:next-diff');
      };
      nextDiffButton.title = 'Move to Next Diff';
      this.selectionCountValue = document.createElement('span');
      this.selectionCountValue.classList.add('selection-count-value');
      this.element.appendChild(this.selectionCountValue);
      selectionDivider = document.createElement('span');
      selectionDivider.textContent = '/';
      selectionDivider.classList.add('selection-divider');
      this.element.appendChild(selectionDivider);
      this.selectionCount = document.createElement('div');
      this.selectionCount.classList.add('selection-count');
      this.selectionCount.classList.add('hidden');
      this.selectionCount.appendChild(this.selectionCountValue);
      this.selectionCount.appendChild(selectionDivider);
      this.numDifferencesValue = document.createElement('span');
      this.numDifferencesValue.classList.add('num-diff-value');
      this.numDifferencesValue.textContent = '...';
      this.numDifferencesText = document.createElement('span');
      this.numDifferencesText.textContent = 'differences';
      this.numDifferencesText.classList.add('num-diff-text');
      numDifferences = document.createElement('div');
      numDifferences.classList.add('num-diff');
      numDifferences.appendChild(this.numDifferencesValue);
      numDifferences.appendChild(this.numDifferencesText);
      left = document.createElement('div');
      left.classList.add('left');
      left.appendChild(prevDiffButton);
      left.appendChild(nextDiffButton);
      left.appendChild(this.selectionCount);
      left.appendChild(numDifferences);
      this.element.appendChild(left);
      copyToLeftButton = document.createElement('button');
      copyToLeftButton.classList.add('btn');
      copyToLeftButton.classList.add('btn-md');
      copyToLeftButton.classList.add('copy-to-left');
      copyToLeftButton.onclick = function() {
        return atom.commands.dispatch(atom.views.getView(atom.workspace), 'split-diff:copy-to-left');
      };
      copyToLeftButton.title = 'Copy to Left';
      copyToRightButton = document.createElement('button');
      copyToRightButton.classList.add('btn');
      copyToRightButton.classList.add('btn-md');
      copyToRightButton.classList.add('copy-to-right');
      copyToRightButton.onclick = function() {
        return atom.commands.dispatch(atom.views.getView(atom.workspace), 'split-diff:copy-to-right');
      };
      copyToRightButton.title = 'Copy to Right';
      mid = document.createElement('div');
      mid.classList.add('mid');
      mid.appendChild(copyToLeftButton);
      mid.appendChild(copyToRightButton);
      this.element.appendChild(mid);
      ignoreWhitespaceValue = document.createElement('input');
      ignoreWhitespaceValue.type = 'checkbox';
      ignoreWhitespaceValue.id = 'ignore-whitespace-checkbox';
      ignoreWhitespaceValue.checked = isWhitespaceIgnored;
      ignoreWhitespaceValue.addEventListener('change', function() {
        return atom.commands.dispatch(atom.views.getView(atom.workspace), 'split-diff:ignore-whitespace');
      });
      ignoreWhitespaceLabel = document.createElement('label');
      ignoreWhitespaceLabel.classList.add('ignore-whitespace-label');
      ignoreWhitespaceLabel.htmlFor = 'ignore-whitespace-checkbox';
      ignoreWhitespaceLabel.textContent = 'Ignore Whitespace';
      right = document.createElement('div');
      right.classList.add('right');
      right.appendChild(ignoreWhitespaceValue);
      right.appendChild(ignoreWhitespaceLabel);
      this.element.appendChild(right);
    }

    FooterView.prototype.destroy = function() {
      this.element.remove();
      return this.footerPanel.destroy();
    };

    FooterView.prototype.getElement = function() {
      return this.element;
    };

    FooterView.prototype.createPanel = function() {
      return this.footerPanel = atom.workspace.addBottomPanel({
        item: this.element
      });
    };

    FooterView.prototype.show = function() {
      return this.footerPanel.show();
    };

    FooterView.prototype.hide = function() {
      return this.footerPanel.hide();
    };

    FooterView.prototype.setNumDifferences = function(num) {
      if (num === 1) {
        this.numDifferencesText.textContent = 'difference';
      } else {
        this.numDifferencesText.textContent = 'differences';
      }
      return this.numDifferencesValue.textContent = num;
    };

    FooterView.prototype.showSelectionCount = function(count) {
      this.selectionCountValue.textContent = count;
      return this.selectionCount.classList.remove('hidden');
    };

    return FooterView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3N0am9obnNvbi9yZXBvc2l0b3JpZXMvZG90ZmlsZXMvYXRvbS9wYWNrYWdlcy9zcGxpdC1kaWZmL2xpYi9mb290ZXItdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsVUFBQTs7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLG9CQUFDLG1CQUFELEdBQUE7QUFFWCxVQUFBLHFLQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLENBQVgsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBbkIsQ0FBdUIsZUFBdkIsQ0FEQSxDQUFBO0FBQUEsTUFRQSxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBUmpCLENBQUE7QUFBQSxNQVNBLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBekIsQ0FBNkIsS0FBN0IsQ0FUQSxDQUFBO0FBQUEsTUFVQSxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQXpCLENBQTZCLFFBQTdCLENBVkEsQ0FBQTtBQUFBLE1BV0EsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUF6QixDQUE2QixXQUE3QixDQVhBLENBQUE7QUFBQSxNQVlBLGNBQWMsQ0FBQyxPQUFmLEdBQXlCLFNBQUEsR0FBQTtlQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUF2QixFQUEyRCxzQkFBM0QsRUFEdUI7TUFBQSxDQVp6QixDQUFBO0FBQUEsTUFjQSxjQUFjLENBQUMsS0FBZixHQUF1Qix1QkFkdkIsQ0FBQTtBQUFBLE1BZ0JBLGNBQUEsR0FBaUIsUUFBUSxDQUFDLGFB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

//# sourceURL=/Users/stjohnson/repositories/dotfiles/atom/packages/split-diff/lib/footer-view.coffee
