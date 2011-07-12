NotesApp.views.NoteEditor = Ext.extend(Ext.form.FormPanel, {
	id		: 'noteEditor',

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
			dock : 'bottom',
			items : [
				{ xtype : 'spacer' },
				{
					iconCls : 'trash',
					iconMask : true,
					listeners : {
						scope : this,
						click : {
							element : 'el',
							fn : this.deleteNote
						}
					}
				}
			]
		});

		this.items = [
			{
				xtype : 'textfield',
				name : 'title',
				label : 'Title',
				required : true
			},
			{
				xtype : 'textareafield',
				name : 'narrative',
				label : 'Narrative'
			}
		];

		this.dockedItems = [
			this.noteEditorTopToolbar,
			this.noteEditorBottomToolbar
		];

		NotesApp.views.NoteEditor.superclass.initComponent.apply(this, arguments);
	},

	deleteNote : function() {
		// Fire an event with the current record
		this.fireEvent("deleteNote", this.getRecord());
	},
	
	saveNote : function(btn, cmp) {
		this.fireEvent("saveNote", this.getRecord(), cmp);
	},
	
	backToHome : function(btn, evt) {
		this.fireEvent("backToHome", btn, evt);
	}
});

// Register the xtype 'notesListContainer' for the view object
Ext.reg('noteEditor', NotesApp.views.NoteEditor);
