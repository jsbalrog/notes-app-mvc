NotesApp.views.NoteEditor = Ext.extend(Ext.form.FormPanel, {
	id		: 'noteEditor',
//	html	: 'This is the note editor page',

	initComponent: function() {
		this.noteEditorTopToolbar = new Ext.Toolbar({
			title: 'Edit Note',
			items: [
				{
					text: 'Home',
					ui: 'back',
					listeners : {
						scope : this,
						click : {
							element : 'el',
							fn : this.backToHome
						}
					}
				},
				{
					xtype : 'spacer'
				},
				{
					text : 'Save',
					ui : 'action',
					listeners : {
						scope : this,
						click : {
							element : 'el',
							fn : this.saveNote
						}
					}
				}
			]
		});

		this.noteEditorBottomToolbar = new Ext.Toolbar({
			dock: 'bottom',
			items: [
				{ xtype: 'spacer' },
				{
					iconCls: 'trash',
					iconMask: true,
					handler: function() {
						// TODO: Delete current note.
					}
				}
			]
		});

		this.items = [
			{
				xtype: 'textfield',
				name: 'title',
				label: 'Title',
				required: true
			},
			{
				xtype: 'textareafield',
				name: 'narrative',
				label: 'Narrative'
			}
		];

		this.dockedItems = [
			this.noteEditorTopToolbar,
			this.noteEditorBottomToolbar
		];

		NotesApp.views.NoteEditor.superclass.initComponent.apply(this, arguments);
	},
	
	saveNote : function(btn, cmp) {
		console.log('In NoteEditor.saveNote()');
		this.fireEvent("saveNote", this.getRecord(), cmp);
	},
	
	backToHome : function(btn, evt) {
		console.log("In NoteEditor.backToHome");
		this.fireEvent("backToHome", btn, evt);
	}
});

// Register the xtype 'notesListContainer' for the view object
Ext.reg('noteEditor', NotesApp.views.NoteEditor);
