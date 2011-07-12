/**
 * Instantiate an application. This automatically creates a global <name>
 * variable (here, 'NotesApp') along with the following namespaces:
 * - NotesApp
 * - NotesApp.views
 * - NotesApp.controllers
 * - NotesApp.models
 * - NotesApp.stores
 * Internally, the following is run:
 * Ext.ns('NotesApp', 'NotesApp.views', 'NotesApp.stores', 'NotesApp.models', 'NotesApp.controllers');
 */
Ext.regApplication({
	name		: 'NotesApp',

	// launch() is called only once, when the app starts
	launch	: function() {
		this.viewport = new NotesApp.views.Viewport({
			application: this
		});
		Ext.dispatch({
			controller: 'NotesController',
			action: 'index'
		});
	}
});
