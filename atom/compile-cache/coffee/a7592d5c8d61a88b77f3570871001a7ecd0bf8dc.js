(function() {
  var CompositeDisposable, DiffViewEditor, Directory, File, FooterView, LoadingView, SplitDiff, SyncScroll, configSchema, path, _ref;

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Directory = _ref.Directory, File = _ref.File;

  DiffViewEditor = require('./build-lines');

  LoadingView = require('./loading-view');

  FooterView = require('./footer-view');

  SyncScroll = require('./sync-scroll');

  configSchema = require("./config-schema");

  path = require('path');

  module.exports = SplitDiff = {
    config: configSchema,
    subscriptions: null,
    diffViewEditor1: null,
    diffViewEditor2: null,
    editorSubscriptions: null,
    linkedDiffChunks: null,
    diffChunkPointer: 0,
    isFirstChunkSelect: true,
    wasEditor1SoftWrapped: false,
    wasEditor2SoftWrapped: false,
    isEnabled: false,
    wasEditor1Created: false,
    wasEditor2Created: false,
    hasGitRepo: false,
    process: null,
    loadingView: null,
    copyHelpMsg: 'Place your cursor in a chunk first!',
    activate: function(state) {
      this.subscriptions = new CompositeDisposable();
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'split-diff:enable': (function(_this) {
          return function() {
            return _this.diffPanes();
          };
        })(this),
        'split-diff:next-diff': (function(_this) {
          return function() {
            if (_this.isEnabled) {
              return _this.nextDiff();
            }
          };
        })(this),
        'split-diff:prev-diff': (function(_this) {
          return function() {
            if (_this.isEnabled) {
              return _this.prevDiff();
            }
          };
        })(this),
        'split-diff:copy-to-right': (function(_this) {
          return function() {
            if (_this.isEnabled) {
              return _this.copyChunkToRight();
            }
          };
        })(this),
        'split-diff:copy-to-left': (function(_this) {
          return function() {
            if (_this.isEnabled) {
              return _this.copyChunkToLeft();
            }
          };
        })(this),
        'split-diff:disable': (function(_this) {
          return function() {
            return _this.disable();
          };
        })(this),
        'split-diff:ignore-whitespace': (function(_this) {
          return function() {
            return _this.toggleIgnoreWhitespace();
          };
        })(this),
        'split-diff:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
    },
    deactivate: function() {
      this.disable();
      return this.subscriptions.dispose();
    },
    toggle: function() {
      if (this.isEnabled) {
        return this.disable();
      } else {
        return this.diffPanes();
      }
    },
    disable: function() {
      this.isEnabled = false;
      if (this.editorSubscriptions != null) {
        this.editorSubscriptions.dispose();
        this.editorSubscriptions = null;
      }
      if (this.diffViewEditor1 != null) {
        if (this.wasEditor1SoftWrapped) {
          this.diffViewEditor1.enableSoftWrap();
        }
        if (this.wasEditor1Created) {
          this.diffViewEditor1.cleanUp();
        }
      }
      if (this.diffViewEditor2 != null) {
        if (this.wasEditor2SoftWrapped) {
          this.diffViewEditor2.enableSoftWrap();
        }
        if (this.wasEditor2Created) {
          this.diffViewEditor2.cleanUp();
        }
      }
      if (this.footerView != null) {
        this.footerView.destroy();
        this.footerView = null;
      }
      this._clearDiff();
      this.diffChunkPointer = 0;
      this.isFirstChunkSelect = true;
      this.wasEditor1SoftWrapped = false;
      this.wasEditor1Created = false;
      this.wasEditor2SoftWrapped = false;
      this.wasEditor2Created = false;
      return this.hasGitRepo = false;
    },
    toggleIgnoreWhitespace: function() {
      var isWhitespaceIgnored;
      isWhitespaceIgnored = this._getConfig('ignoreWhitespace');
      return this._setConfig('ignoreWhitespace', !isWhitespaceIgnored);
    },
    nextDiff: function() {
      if (!this.isFirstChunkSelect) {
        this.diffChunkPointer++;
        if (this.diffChunkPointer >= this.linkedDiffChunks.length) {
          this.diffChunkPointer = 0;
        }
      } else {
        this.isFirstChunkSelect = false;
      }
      return this._selectDiffs(this.linkedDiffChunks[this.diffChunkPointer], this.diffChunkPointer);
    },
    prevDiff: function() {
      if (!this.isFirstChunkSelect) {
        this.diffChunkPointer--;
        if (this.diffChunkPointer < 0) {
          this.diffChunkPointer = this.linkedDiffChunks.length - 1;
        }
      } else {
        this.isFirstChunkSelect = false;
      }
      return this._selectDiffs(this.linkedDiffChunks[this.diffChunkPointer], this.diffChunkPointer);
    },
    copyChunkToRight: function() {
      var diffChunk, lastBufferRow, lineRange, linesToMove, moveText, offset, _i, _len, _results;
      linesToMove = this.diffViewEditor1.getCursorDiffLines();
      if (linesToMove.length === 0) {
        atom.notifications.addWarning('Split Diff', {
          detail: this.copyHelpMsg,
          dismissable: false,
          icon: 'diff'
        });
      }
      offset = 0;
      _results = [];
      for (_i = 0, _len = linesToMove.length; _i < _len; _i++) {
        lineRange = linesToMove[_i];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = this.linkedDiffChunks;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            diffChunk = _ref1[_j];
            if (lineRange.start.row === diffChunk.oldLineStart) {
              moveText = this.diffViewEditor1.getEditor().getTextInBufferRange([[diffChunk.oldLineStart, 0], [diffChunk.oldLineEnd, 0]]);
              lastBufferRow = this.diffViewEditor2.getEditor().getLastBufferRow();
              if ((diffChunk.newLineStart + offset) > lastBufferRow) {
                this.diffViewEditor2.getEditor().setCursorBufferPosition([lastBufferRow, 0], {
                  autoscroll: false
                });
                this.diffViewEditor2.getEditor().insertNewline();
              }
              this.diffViewEditor2.getEditor().setTextInBufferRange([[diffChunk.newLineStart + offset, 0], [diffChunk.newLineEnd + offset, 0]], moveText);
              _results1.push(offset += (diffChunk.oldLineEnd - diffChunk.oldLineStart) - (diffChunk.newLineEnd - diffChunk.newLineStart));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    },
    copyChunkToLeft: function() {
      var diffChunk, lastBufferRow, lineRange, linesToMove, moveText, offset, _i, _len, _results;
      linesToMove = this.diffViewEditor2.getCursorDiffLines();
      if (linesToMove.length === 0) {
        atom.notifications.addWarning('Split Diff', {
          detail: this.copyHelpMsg,
          dismissable: false,
          icon: 'diff'
        });
      }
      offset = 0;
      _results = [];
      for (_i = 0, _len = linesToMove.length; _i < _len; _i++) {
        lineRange = linesToMove[_i];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = this.linkedDiffChunks;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            diffChunk = _ref1[_j];
            if (lineRange.start.row === diffChunk.newLineStart) {
              moveText = this.diffViewEditor2.getEditor().getTextInBufferRange([[diffChunk.newLineStart, 0], [diffChunk.newLineEnd, 0]]);
              lastBufferRow = this.diffViewEditor1.getEditor().getLastBufferRow();
              if ((diffChunk.oldLineStart + offset) > lastBufferRow) {
                this.diffViewEditor1.getEditor().setCursorBufferPosition([lastBufferRow, 0], {
                  autoscroll: false
                });
                this.diffViewEditor1.getEditor().insertNewline();
              }
              this.diffViewEditor1.getEditor().setTextInBufferRange([[diffChunk.oldLineStart + offset, 0], [diffChunk.oldLineEnd + offset, 0]], moveText);
              _results1.push(offset += (diffChunk.newLineEnd - diffChunk.newLineStart) - (diffChunk.oldLineEnd - diffChunk.oldLineStart));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    },
    diffPanes: function() {
      var editors, isWhitespaceIgnored;
      this.disable();
      this.editorSubscriptions = new CompositeDisposable();
      editors = this._getVisibleEditors();
      this.editorSubscriptions.add(editors.editor1.onDidStopChanging((function(_this) {
        return function() {
          return _this.updateDiff(editors);
        };
      })(this)));
      this.editorSubscriptions.add(editors.editor2.onDidStopChanging((function(_this) {
        return function() {
          return _this.updateDiff(editors);
        };
      })(this)));
      this.editorSubscriptions.add(editors.editor1.onDidDestroy((function(_this) {
        return function() {
          return _this.disable();
        };
      })(this)));
      this.editorSubscriptions.add(editors.editor2.onDidDestroy((function(_this) {
        return function() {
          return _this.disable();
        };
      })(this)));
      this.editorSubscriptions.add(atom.config.onDidChange('split-diff', (function(_this) {
        return function() {
          return _this.updateDiff(editors);
        };
      })(this)));
      isWhitespaceIgnored = this._getConfig('ignoreWhitespace');
      if (this.footerView == null) {
        this.footerView = new FooterView(isWhitespaceIgnored);
        this.footerView.createPanel();
      }
      this.footerView.show();
      if (!this.hasGitRepo) {
        this.updateDiff(editors);
      }
      this.editorSubscriptions.add(atom.menu.add([
        {
          'label': 'Packages',
          'submenu': [
            {
              'label': 'Split Diff',
              'submenu': [
                {
                  'label': 'Ignore Whitespace',
                  'command': 'split-diff:ignore-whitespace'
                }, {
                  'label': 'Move to Next Diff',
                  'command': 'split-diff:next-diff'
                }, {
                  'label': 'Move to Previous Diff',
                  'command': 'split-diff:prev-diff'
                }, {
                  'label': 'Copy to Right',
                  'command': 'split-diff:copy-to-right'
                }, {
                  'label': 'Copy to Left',
                  'command': 'split-diff:copy-to-left'
                }
              ]
            }
          ]
        }
      ]));
      return this.editorSubscriptions.add(atom.contextMenu.add({
        'atom-text-editor': [
          {
            'label': 'Split Diff',
            'submenu': [
              {
                'label': 'Ignore Whitespace',
                'command': 'split-diff:ignore-whitespace'
              }, {
                'label': 'Move to Next Diff',
                'command': 'split-diff:next-diff'
              }, {
                'label': 'Move to Previous Diff',
                'command': 'split-diff:prev-diff'
              }, {
                'label': 'Copy to Right',
                'command': 'split-diff:copy-to-right'
              }, {
                'label': 'Copy to Left',
                'command': 'split-diff:copy-to-left'
              }
            ]
          }
        ]
      }));
    },
    updateDiff: function(editors) {
      var BufferedNodeProcess, args, command, computedDiff, editorPaths, exit, isWhitespaceIgnored, stderr, stdout, theOutput;
      this.isEnabled = true;
      if (this.process != null) {
        this.process.kill();
        this.process = null;
      }
      isWhitespaceIgnored = this._getConfig('ignoreWhitespace');
      editorPaths = this._createTempFiles(editors);
      if (this.loadingView == null) {
        this.loadingView = new LoadingView();
        this.loadingView.createModal();
      }
      this.loadingView.show();
      BufferedNodeProcess = require('atom').BufferedNodeProcess;
      command = path.resolve(__dirname, "./compute-diff.js");
      args = [editorPaths.editor1Path, editorPaths.editor2Path, isWhitespaceIgnored];
      computedDiff = '';
      theOutput = '';
      stdout = (function(_this) {
        return function(output) {
          theOutput = output;
          return computedDiff = JSON.parse(output);
        };
      })(this);
      stderr = (function(_this) {
        return function(err) {
          return theOutput = err;
        };
      })(this);
      exit = (function(_this) {
        return function(code) {
          var _ref1;
          if ((_ref1 = _this.loadingView) != null) {
            _ref1.hide();
          }
          if (code === 0) {
            return _this._resumeUpdateDiff(editors, computedDiff);
          } else {
            console.log('BufferedNodeProcess code was ' + code);
            return console.log(theOutput);
          }
        };
      })(this);
      return this.process = new BufferedNodeProcess({
        command: command,
        args: args,
        stdout: stdout,
        stderr: stderr,
        exit: exit
      });
    },
    _resumeUpdateDiff: function(editors, computedDiff) {
      var isWordDiffEnabled, lastDiffChunk, newChunkRange, oldChunkRange, syncHorizontalScroll, _ref1;
      this.linkedDiffChunks = this._evaluateDiffOrder(computedDiff.chunks);
      if ((_ref1 = this.footerView) != null) {
        _ref1.setNumDifferences(this.linkedDiffChunks.length);
      }
      if (this.linkedDiffChunks.length > 0) {
        lastDiffChunk = this.linkedDiffChunks[this.linkedDiffChunks.length - 1];
        oldChunkRange = lastDiffChunk.oldLineEnd - lastDiffChunk.oldLineStart;
        newChunkRange = lastDiffChunk.newLineEnd - lastDiffChunk.newLineStart;
        if (oldChunkRange > newChunkRange) {
          computedDiff.newLineOffsets[lastDiffChunk.newLineStart + newChunkRange] = oldChunkRange - newChunkRange;
        } else if (newChunkRange > oldChunkRange) {
          computedDiff.oldLineOffsets[lastDiffChunk.oldLineStart + oldChunkRange] = newChunkRange - oldChunkRange;
        }
      }
      this._clearDiff();
      this._displayDiff(editors, computedDiff);
      isWordDiffEnabled = this._getConfig('diffWords');
      if (isWordDiffEnabled) {
        this._highlightWordDiff(this.linkedDiffChunks);
      }
      syncHorizontalScroll = this._getConfig('syncHorizontalScroll');
      this.syncScroll = new SyncScroll(editors.editor1, editors.editor2, syncHorizontalScroll);
      return this.syncScroll.syncPositions();
    },
    _getVisibleEditors: function() {
      var BufferExtender, activeItem, buffer1LineEnding, buffer2LineEnding, editor1, editor2, editors, leftPane, lineEndingMsg, p, panes, rightPane, _i, _len;
      editor1 = null;
      editor2 = null;
      panes = atom.workspace.getPanes();
      for (_i = 0, _len = panes.length; _i < _len; _i++) {
        p = panes[_i];
        activeItem = p.getActiveItem();
        if (atom.workspace.isTextEditor(activeItem)) {
          if (editor1 === null) {
            editor1 = activeItem;
          } else if (editor2 === null) {
            editor2 = activeItem;
            break;
          }
        }
      }
      if (editor1 === null) {
        editor1 = atom.workspace.buildTextEditor();
        this.wasEditor1Created = true;
        leftPane = atom.workspace.getActivePane();
        leftPane.addItem(editor1);
      }
      if (editor2 === null) {
        editor2 = atom.workspace.buildTextEditor();
        this.wasEditor2Created = true;
        editor2.setGrammar(editor1.getGrammar());
        rightPane = atom.workspace.getActivePane().splitRight();
        rightPane.addItem(editor2);
      }
      BufferExtender = require('./buffer-extender');
      buffer1LineEnding = (new BufferExtender(editor1.getBuffer())).getLineEnding();
      if (this.wasEditor2Created) {
        atom.views.getView(editor1).focus();
        if (buffer1LineEnding === '\n' || buffer1LineEnding === '\r\n') {
          this.editorSubscriptions.add(editor2.onWillInsertText(function() {
            return editor2.getBuffer().setPreferredLineEnding(buffer1LineEnding);
          }));
        }
      }
      this._setupGitRepo(editor1, editor2);
      editor1.unfoldAll();
      editor2.unfoldAll();
      if (editor1.isSoftWrapped()) {
        this.wasEditor1SoftWrapped = true;
        editor1.setSoftWrapped(false);
      }
      if (editor2.isSoftWrapped()) {
        this.wasEditor2SoftWrapped = true;
        editor2.setSoftWrapped(false);
      }
      buffer2LineEnding = (new BufferExtender(editor2.getBuffer())).getLineEnding();
      if (buffer2LineEnding !== '' && (buffer1LineEnding !== buffer2LineEnding)) {
        lineEndingMsg = 'Warning: Editor line endings differ!';
        atom.notifications.addWarning('Split Diff', {
          detail: lineEndingMsg,
          dismissable: false,
          icon: 'diff'
        });
      }
      editors = {
        editor1: editor1,
        editor2: editor2
      };
      return editors;
    },
    _setupGitRepo: function(editor1, editor2) {
      var directory, editor1Path, gitHeadText, i, projectRepo, relativeEditor1Path, _i, _len, _ref1, _results;
      editor1Path = editor1.getPath();
      if ((editor1Path != null) && (editor2.getLineCount() === 1 && editor2.lineTextForBufferRow(0) === '')) {
        _ref1 = atom.project.getDirectories();
        _results = [];
        for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
          directory = _ref1[i];
          if (editor1Path === directory.getPath() || directory.contains(editor1Path)) {
            projectRepo = atom.project.getRepositories()[i];
            if ((projectRepo != null) && (projectRepo.repo != null)) {
              relativeEditor1Path = projectRepo.relativize(editor1Path);
              gitHeadText = projectRepo.repo.getHeadBlob(relativeEditor1Path);
              if (gitHeadText != null) {
                editor2.selectAll();
                editor2.insertText(gitHeadText);
                this.hasGitRepo = true;
                break;
              } else {
                _results.push(void 0);
              }
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    },
    _createTempFiles: function(editors) {
      var editor1Path, editor1TempFile, editor2Path, editor2TempFile, editorPaths, tempFolderPath;
      editor1Path = '';
      editor2Path = '';
      tempFolderPath = atom.getConfigDirPath() + '/split-diff';
      editor1Path = tempFolderPath + '/split-diff 1';
      editor1TempFile = new File(editor1Path);
      editor1TempFile.writeSync(editors.editor1.getText());
      editor2Path = tempFolderPath + '/split-diff 2';
      editor2TempFile = new File(editor2Path);
      editor2TempFile.writeSync(editors.editor2.getText());
      editorPaths = {
        editor1Path: editor1Path,
        editor2Path: editor2Path
      };
      return editorPaths;
    },
    _selectDiffs: function(diffChunk, selectionCount) {
      if (diffChunk != null) {
        this.diffViewEditor1.deselectAllLines();
        this.diffViewEditor2.deselectAllLines();
        this.diffViewEditor1.selectLines(diffChunk.oldLineStart, diffChunk.oldLineEnd);
        this.diffViewEditor1.getEditor().setCursorBufferPosition([diffChunk.oldLineStart, 0], {
          autoscroll: true
        });
        this.diffViewEditor2.selectLines(diffChunk.newLineStart, diffChunk.newLineEnd);
        this.diffViewEditor2.getEditor().setCursorBufferPosition([diffChunk.newLineStart, 0], {
          autoscroll: true
        });
        return this.footerView.showSelectionCount(selectionCount + 1);
      }
    },
    _clearDiff: function() {
      var _ref1;
      if ((_ref1 = this.loadingView) != null) {
        _ref1.hide();
      }
      if (this.diffViewEditor1 != null) {
        this.diffViewEditor1.destroyMarkers();
        this.diffViewEditor1 = null;
      }
      if (this.diffViewEditor2 != null) {
        this.diffViewEditor2.destroyMarkers();
        this.diffViewEditor2 = null;
      }
      if (this.syncScroll != null) {
        this.syncScroll.dispose();
        return this.syncScroll = null;
      }
    },
    _displayDiff: function(editors, computedDiff) {
      var leftColor, rightColor;
      this.diffViewEditor1 = new DiffViewEditor(editors.editor1);
      this.diffViewEditor2 = new DiffViewEditor(editors.editor2);
      leftColor = this._getConfig('leftEditorColor');
      rightColor = this._getConfig('rightEditorColor');
      if (leftColor === 'green') {
        this.diffViewEditor1.setLineHighlights(computedDiff.removedLines, 'added');
      } else {
        this.diffViewEditor1.setLineHighlights(computedDiff.removedLines, 'removed');
      }
      if (rightColor === 'green') {
        this.diffViewEditor2.setLineHighlights(computedDiff.addedLines, 'added');
      } else {
        this.diffViewEditor2.setLineHighlights(computedDiff.addedLines, 'removed');
      }
      this.diffViewEditor1.setLineOffsets(computedDiff.oldLineOffsets);
      return this.diffViewEditor2.setLineOffsets(computedDiff.newLineOffsets);
    },
    _evaluateDiffOrder: function(chunks) {
      var c, diffChunk, diffChunks, newLineNumber, oldLineNumber, prevChunk, _i, _len;
      oldLineNumber = 0;
      newLineNumber = 0;
      prevChunk = null;
      diffChunks = [];
      for (_i = 0, _len = chunks.length; _i < _len; _i++) {
        c = chunks[_i];
        if (c.added != null) {
          if ((prevChunk != null) && (prevChunk.removed != null)) {
            diffChunk = {
              newLineStart: newLineNumber,
              newLineEnd: newLineNumber + c.count,
              oldLineStart: oldLineNumber - prevChunk.count,
              oldLineEnd: oldLineNumber
            };
            diffChunks.push(diffChunk);
            prevChunk = null;
          } else {
            prevChunk = c;
          }
          newLineNumber += c.count;
        } else if (c.removed != null) {
          if ((prevChunk != null) && (prevChunk.added != null)) {
            diffChunk = {
              newLineStart: newLineNumber - prevChunk.count,
              newLineEnd: newLineNumber,
              oldLineStart: oldLineNumber,
              oldLineEnd: oldLineNumber + c.count
            };
            diffChunks.push(diffChunk);
            prevChunk = null;
          } else {
            prevChunk = c;
          }
          oldLineNumber += c.count;
        } else {
          if ((prevChunk != null) && (prevChunk.added != null)) {
            diffChunk = {
              newLineStart: newLineNumber - prevChunk.count,
              newLineEnd: newLineNumber,
              oldLineStart: oldLineNumber,
              oldLineEnd: oldLineNumber
            };
            diffChunks.push(diffChunk);
          } else if ((prevChunk != null) && (prevChunk.removed != null)) {
            diffChunk = {
              newLineStart: newLineNumber,
              newLineEnd: newLineNumber,
              oldLineStart: oldLineNumber - prevChunk.count,
              oldLineEnd: oldLineNumber
            };
            diffChunks.push(diffChunk);
          }
          prevChunk = null;
          oldLineNumber += c.count;
          newLineNumber += c.count;
        }
      }
      if ((prevChunk != null) && (prevChunk.added != null)) {
        diffChunk = {
          newLineStart: newLineNumber - prevChunk.count,
          newLineEnd: newLineNumber,
          oldLineStart: oldLineNumber,
          oldLineEnd: oldLineNumber
        };
        diffChunks.push(diffChunk);
      } else if ((prevChunk != null) && (prevChunk.removed != null)) {
        diffChunk = {
          newLineStart: newLineNumber,
          newLineEnd: newLineNumber,
          oldLineStart: oldLineNumber - prevChunk.count,
          oldLineEnd: oldLineNumber
        };
        diffChunks.push(diffChunk);
      }
      return diffChunks;
    },
    _highlightWordDiff: function(chunks) {
      var ComputeWordDiff, c, excessLines, i, isWhitespaceIgnored, j, leftColor, lineRange, rightColor, wordDiff, _i, _j, _len, _results;
      ComputeWordDiff = require('./compute-word-diff');
      leftColor = this._getConfig('leftEditorColor');
      rightColor = this._getConfig('rightEditorColor');
      isWhitespaceIgnored = this._getConfig('ignoreWhitespace');
      _results = [];
      for (_i = 0, _len = chunks.length; _i < _len; _i++) {
        c = chunks[_i];
        if ((c.newLineStart != null) && (c.oldLineStart != null)) {
          lineRange = 0;
          excessLines = 0;
          if ((c.newLineEnd - c.newLineStart) < (c.oldLineEnd - c.oldLineStart)) {
            lineRange = c.newLineEnd - c.newLineStart;
            excessLines = (c.oldLineEnd - c.oldLineStart) - lineRange;
          } else {
            lineRange = c.oldLineEnd - c.oldLineStart;
            excessLines = (c.newLineEnd - c.newLineStart) - lineRange;
          }
          for (i = _j = 0; _j < lineRange; i = _j += 1) {
            wordDiff = ComputeWordDiff.computeWordDiff(this.diffViewEditor1.getEditor().lineTextForBufferRow(c.oldLineStart + i), this.diffViewEditor2.getEditor().lineTextForBufferRow(c.newLineStart + i));
            if (leftColor === 'green') {
              this.diffViewEditor1.setWordHighlights(c.oldLineStart + i, wordDiff.removedWords, 'added', isWhitespaceIgnored);
            } else {
              this.diffViewEditor1.setWordHighlights(c.oldLineStart + i, wordDiff.removedWords, 'removed', isWhitespaceIgnored);
            }
            if (rightColor === 'green') {
              this.diffViewEditor2.setWordHighlights(c.newLineStart + i, wordDiff.addedWords, 'added', isWhitespaceIgnored);
            } else {
              this.diffViewEditor2.setWordHighlights(c.newLineStart + i, wordDiff.addedWords, 'removed', isWhitespaceIgnored);
            }
          }
          _results.push((function() {
            var _k, _results1;
            _results1 = [];
            for (j = _k = 0; _k < excessLines; j = _k += 1) {
              if ((c.newLineEnd - c.newLineStart) < (c.oldLineEnd - c.oldLineStart)) {
                if (leftColor === 'green') {
                  _results1.push(this.diffViewEditor1.setWordHighlights(c.oldLineStart + lineRange + j, [
                    {
                      changed: true,
                      value: this.diffViewEditor1.getEditor().lineTextForBufferRow(c.oldLineStart + lineRange + j)
                    }
                  ], 'added', isWhitespaceIgnored));
                } else {
                  _results1.push(this.diffViewEditor1.setWordHighlights(c.oldLineStart + lineRange + j, [
                    {
                      changed: true,
                      value: this.diffViewEditor1.getEditor().lineTextForBufferRow(c.oldLineStart + lineRange + j)
                    }
                  ], 'removed', isWhitespaceIgnored));
                }
              } else if ((c.newLineEnd - c.newLineStart) > (c.oldLineEnd - c.oldLineStart)) {
                if (rightColor === 'green') {
                  _results1.push(this.diffViewEditor2.setWordHighlights(c.newLineStart + lineRange + j, [
                    {
                      changed: true,
                      value: this.diffViewEditor2.getEditor().lineTextForBufferRow(c.newLineStart + lineRange + j)
                    }
                  ], 'added', isWhitespaceIgnored));
                } else {
                  _results1.push(this.diffViewEditor2.setWordHighlights(c.newLineStart + lineRange + j, [
                    {
                      changed: true,
                      value: this.diffViewEditor2.getEditor().lineTextForBufferRow(c.newLineStart + lineRange + j)
                    }
                  ], 'removed', isWhitespaceIgnored));
                }
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          }).call(this));
        } else if (c.newLineStart != null) {
          lineRange = c.newLineEnd - c.newLineStart;
          _results.push((function() {
            var _k, _results1;
            _results1 = [];
            for (i = _k = 0; _k < lineRange; i = _k += 1) {
              if (rightColor === 'green') {
                _results1.push(this.diffViewEditor2.setWordHighlights(c.newLineStart + i, [
                  {
                    changed: true,
                    value: this.diffViewEditor2.getEditor().lineTextForBufferRow(c.newLineStart + i)
                  }
                ], 'added', isWhitespaceIgnored));
              } else {
                _results1.push(this.diffViewEditor2.setWordHighlights(c.newLineStart + i, [
                  {
                    changed: true,
                    value: this.diffViewEditor2.getEditor().lineTextForBufferRow(c.newLineStart + i)
                  }
                ], 'removed', isWhitespaceIgnored));
              }
            }
            return _results1;
          }).call(this));
        } else if (c.oldLineStart != null) {
          lineRange = c.oldLineEnd - c.oldLineStart;
          _results.push((function() {
            var _k, _results1;
            _results1 = [];
            for (i = _k = 0; _k < lineRange; i = _k += 1) {
              if (leftColor === 'green') {
                _results1.push(this.diffViewEditor1.setWordHighlights(c.oldLineStart + i, [
                  {
                    changed: true,
                    value: this.diffViewEditor1.getEditor().lineTextForBufferRow(c.oldLineStart + i)
                  }
                ], 'added', isWhitespaceIgnored));
              } else {
                _results1.push(this.diffViewEditor1.setWordHighlights(c.oldLineStart + i, [
                  {
                    changed: true,
                    value: this.diffViewEditor1.getEditor().lineTextForBufferRow(c.oldLineStart + i)
                  }
                ], 'removed', isWhitespaceIgnored));
              }
            }
            return _results1;
          }).call(this));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    _getConfig: function(config) {
      return atom.config.get("split-diff." + config);
    },
    _setConfig: function(config, value) {
      return atom.config.set("split-diff." + config, value);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3N0am9obnNvbi9yZXBvc2l0b3JpZXMvZG90ZmlsZXMvYXRvbS9wYWNrYWdlcy9zcGxpdC1kaWZmL2xpYi9zcGxpdC1kaWZmLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw4SEFBQTs7QUFBQSxFQUFBLE9BQXlDLE9BQUEsQ0FBUSxNQUFSLENBQXpDLEVBQUMsMkJBQUEsbUJBQUQsRUFBc0IsaUJBQUEsU0FBdEIsRUFBaUMsWUFBQSxJQUFqQyxDQUFBOztBQUFBLEVBQ0EsY0FBQSxHQUFpQixPQUFBLENBQVEsZUFBUixDQURqQixDQUFBOztBQUFBLEVBRUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUZkLENBQUE7O0FBQUEsRUFHQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVIsQ0FIYixDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBSmIsQ0FBQTs7QUFBQSxFQUtBLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FMZixDQUFBOztBQUFBLEVBTUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBTlAsQ0FBQTs7QUFBQSxFQVFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUEsR0FDZjtBQUFBLElBQUEsTUFBQSxFQUFRLFlBQVI7QUFBQSxJQUNBLGFBQUEsRUFBZSxJQURmO0FBQUEsSUFFQSxlQUFBLEVBQWlCLElBRmpCO0FBQUEsSUFHQSxlQUFBLEVBQWlCLElBSGpCO0FBQUEsSUFJQSxtQkFBQSxFQUFxQixJQUpyQjtBQUFBLElBS0EsZ0JBQUEsRUFBa0IsSUFMbEI7QUFBQSxJQU1BLGdCQUFBLEVBQWtCLENBTmxCO0FBQUEsSUFPQSxrQkFBQSxFQUFvQixJQVBwQjtBQUFBLElBUUEscUJBQUEsRUFBdUIsS0FSdkI7QUFBQSxJQVNBLHFCQUFBLEVBQXVCLEtB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

//# sourceURL=/Users/stjohnson/repositories/dotfiles/atom/packages/split-diff/lib/split-diff.coffee
