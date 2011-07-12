NotesApp.views.NotesListContainer = Ext.extend(Ext.Panel, {
	id : 'notesListContainer',
	layout : 'fit',

	initComponent : function() {
		this.store = new Ext.data.Store({
			autoLoad : true,
			model : 'Note',
			sorters : [{
				property : 'date',
				direction : 'DESC'
			}],
			proxy : {
				type : 'localstorage',
				id : 'notes-app-store'
			},
			getGroupString : function(record) {
				if(record && record.data.date) {
					return record.get('date').toDateString();
				} else {
					return '';
				}
			}
			// TODO: remove this data after testing
//			data : [
//				{id:1, date: new Date(), title: 'Test Note', narrative: 'This is simply a test note'}
//			]
		});

		this.list = new Ext.List({
			id : 'notesList',
			store : this.store,
			grouped : true,
			emptyText : '<div style="margin: 5px;">No notes cached.</div>',
			itemTpl : '<div class="list-item-title">{title}</div>' +
			'<div class="list-item-narrative">{narrative}</div>',
			listeners : {
				scope : this,
				itemtap : this.editNote			}
		});

		this.dockedItems = [{
			xtype :'toolbar',
			id : 'notesListToolbar',
			title : 'My Notes',
			dock : 'top',
			items : [
				{ xtype : 'spacer' },
				{
					itemId : 'newNoteButton', // This needs to be itemId, NOT id, in order to work!!!
					text : 'New',
					ui : 'action',
					// I couldn't get 'handler' to fire properly
					listeners : {
						scope : this,
						// Since we're defining click, we need to define 'element' and 'fn' properties. If we
						// used 'tap', we wouldn't need to.
						click : {
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
		this.fireEvent('addNote', btn, evt);
	},

	editNote : function(ctList, itemIdx) {
		var note = ctList.store.getAt(itemIdx);
		this.fireEvent('editNote', note);
	}
});

// Register the xtype 'notesListContainer' for the view object
Ext.reg('notesListContainer', NotesApp.views.NotesListContainer);
