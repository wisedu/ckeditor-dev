/* bender-tags: editor, tableselection */
/* bender-ckeditor-plugins: tableselection */
/* bender-include: ../../_helpers/tableselection.js */
/* global tableSelectionHelpers */

( function() {
	'use strict';

	bender.editors = {
		classic: {},

		inline: {
			creator: 'inline'
		}
	};

	function stripExpectWhitespaces( expected ) {
		return expected.replace( /\s*\n\s*/g, '' );
	}

	var tests = {
		// #13884.
		'test getSelectedHtml with multiple ranges': function( editor ) {
			bender.tools.testInputOut( 'multipleRanges', function( input, expected ) {
				var sel = editor.getSelection(),
					ranges = [];

				bender.tools.selection.setWithHtml( editor, input );

				// Get ranges for cells in the first row.
				ranges = tableSelectionHelpers.getRangesForCells( editor, [ 0, 1 ] );

				sel.selectRanges( ranges );

				assert.isInnerHtmlMatching( stripExpectWhitespaces( expected ), editor.getSelectedHtml( true ) );
			} );
		},

		// #13884.
		'test getSelectedHtml with partial table selection': function( editor ) {
			bender.tools.testInputOut( 'partialTableSeleciton', function( input, expected ) {
				var sel = editor.getSelection(),
					ranges = [];

				bender.tools.selection.setWithHtml( editor, input );

				// Get ranges for first cells in rows.
				ranges = tableSelectionHelpers.getRangesForCells( editor, [ 0, 2 ] );

				sel.selectRanges( ranges );

				assert.isInnerHtmlMatching( stripExpectWhitespaces( expected ), editor.getSelectedHtml( true ) );
			} );
		},

		'test getSelectedHtml with [colspan] and [rowspan]': function( editor ) {
			bender.tools.testInputOut( 'rowspanColspan', function( input, expected ) {
				var sel = editor.getSelection(),
					ranges = [];

				bender.tools.selection.setWithHtml( editor, input );

				// Get ranges for all cells.
				ranges = tableSelectionHelpers.getRangesForCells( editor, [ 0, 1, 2, 3, 4, 5 ] );

				sel.selectRanges( ranges );

				assert.isInnerHtmlMatching( stripExpectWhitespaces( expected ), editor.getSelectedHtml( true ) );
			} );
		}
	};

	tests = bender.tools.createTestsForEditors( CKEDITOR.tools.objectKeys( bender.editors ), tests );

	tableSelectionHelpers.ignoreUnsupportedEnvironment( tests );

	bender.test( tests );
}() );
