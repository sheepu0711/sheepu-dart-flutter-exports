const assert = require('assert');
const vscode = require('vscode');
const extension = require('../extension');

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('generateFileContent should generate correct content', () => {
        const folderName = 'testFolder';
        const subfolders = ['subfolder1', 'subfolder2'];
        const files = ['file1.dart', 'file2.dart'];

        const result = extension.generateFileContent(folderName, subfolders, files);

        const expected = `export '../subfolder1/subfolder1.dart';\n`
            + `export '../subfolder2/subfolder2.dart';\n`
            + `export 'file1.dart';\n`
            + `export 'file2.dart';`;

        assert.strictEqual(result, expected);
    });

    test('shouldSkip should correctly identify files and folders to skip', () => {
        const hiddenFile = '.hiddenFile';
        const skippedFile = 'skippedFile.g.dart';
        const skippedFolder = 'l10n';

        const resultHiddenFile = extension.shouldSkip(hiddenFile);
        const resultSkippedFile = extension.shouldSkip(skippedFile);
        const resultSkippedFolder = extension.shouldSkip(skippedFolder);

        assert.strictEqual(resultHiddenFile, true);
        assert.strictEqual(resultSkippedFile, true);
        assert.strictEqual(resultSkippedFolder, true);
    });
});
