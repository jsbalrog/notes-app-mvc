NotesApp.views.NotesListContainer = Ext.extend(Ext.Panel, {
	id			: 'notesListContainer',
	layout		: 'fit',
//	html		: 'This is the notes list container',
//	dockedItems	: [NotesApp.views.notesListToolbar],
//	items		: [NotesApp.views.notesList]

	initComponent: function() {
		this.store = new Ext.data.Store({
			autoLoad: true,
			model: 'Note',
			sorters: [{
				property: 'date',
				direction: 'DESC'
			}],
			proxy: {
				type: 'localstorage',
				id: 'notes-app-store'
			}
			// TODO: remove this data after testing
//			data: [
//				{id:1, date: new Date(), title: 'Test Note', narrative: 'This is simply a test note'}
//			]
		});

		this.list = new Ext.List({
			id: 'notesList',
			store: this.store,
			itemTpl: '<div class="list-item-title">{title}</div>' +
			'<div class="list-item-narrative">{narrative}</div>',
			onItemDisclosure: function(record) {
				// TODO: Render the selected note in the note editor.
			}
		});

		this.dockedItems = [{
			xtype:'toolbar',
			id: 'notesListToolbar',
			title: 'My Notes',
			dock: 'top',
			items : [
				{ xtype: 'spacer' },
				{
					itemId: 'newNoteButton', // This needs to be itemId, NOT id, in order to work!!!
					text: 'New',
					ui: 'action',
					// I couldn't get 'handler' to fire properly
					listeners : {
						scope: this,
						// Since we're defining click, we need to define 'element' and 'fn' properties. If we
						// used 'tap', we wouldn't need to.
						click: {
							element : 'el',
							fn : this.addNewNote
						}
					}
				}
			]
		}];
		
		this.items = [this.list];

		NotesApp.views.NotesListContainer.superclass.initComponent.apply(this, arguments);
	},

	addNewNote : function(btn, evt) {
		console.log("In NotesListContainer.tapNewNoteButton");
		this.fireEvent('addNote', btn, evt);
	}
});

// Register the xtype 'notesListContainer' for the view object
Ext.reg('notesListContainer', NotesApp.views.NotesListContainer);
