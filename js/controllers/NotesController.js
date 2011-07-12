Ext.regController('NotesController', {

	index : function() {
		
		this.notesListContainer = this.render({
			xtype: 'notesListContainer',
			listeners: {
				scope:	this,
				addNote: this.addNewNote,
				editNote: this.editNote
			}	
		});

		this.noteEditor = this.render({
			xtype: 'noteEditor',
			listeners : {
				scope : this,
				backToHome : this.backToHome,
				saveNote : this.saveNote,
				deleteNote : this.deleteNote
			}
		});

		this.application.viewport.setActiveItem(this.notesListContainer);
	},

	deleteNote : function(record) {
		console.log(record);
		var currentNote = record;
		var notesList = this.notesListContainer.list;
		var notesStore = notesList.getStore();

		if(notesStore.findRecord('id', currentNote.data.id)) {
			notesStore.remove(currentNote);
		}
		notesStore.sync();
		notesList.refresh();
		this.application.viewport.setActiveItem(this.notesListContainer, {type:'slide', direction:'right'});
	},

	editNote : function(record) {
		console.log(record);
		var selectedNote = record;
		this.noteEditor.load(selectedNote);

		this.application.viewport.setActiveItem(this.noteEditor, {type:'slide', direction:'left'});
	},

	addNewNote : function(btn, evt) {
		console.log("In NotesController.addNewNote()");

		var now = new Date();
		var noteId = now.getTime();
		var note = Ext.ModelMgr.create({
			id: noteId,
			date: now,
			title: '',
			narrative: ''}, 'Note');
		this.noteEditor.load(note);

		this.application.viewport.setActiveItem(this.noteEditor, {type:'slide', direction:'left'});
	},
	
	/**
	 * Function to save a note.
	 * @param record The current record being edited.
	 * @param cmp    The html component that generated the event.
	 */
	saveNote : function(record, cmp) {
		var currentNote = record;

		// Transfer the values from the form's fields to the currentNote.
		this.noteEditor.updateRecord(currentNote);

		// Validation takes place via the errors object returned by the call to
		// validate() on the note data model.
		var errors = currentNote.validate();
		if(!errors.isValid()) {
			// Look up the message to this error, and simply return.
			Ext.Msg.alert('Wait!', errors.getByField('title')[0].message, Ext.emptyFn);
			return;
		}
		
		// Passed validation -- get a reference to the notes cache and add it to the
		// cache if it doesn't already exist.
		var notesList = this.notesListContainer.list;
		var notesStore = notesList.getStore();
		if(notesStore.findRecord('id', currentNote.data.id) === null) {
			console.log("Adding currentNote to the store");
			notesStore.add(currentNote);
		}

		// Make the changes permanent
		notesStore.sync();

		// Sore the notes by date
		notesStore.sort([{ property: 'date', direction: 'DESC'}]);
		
		// Render the updated list
		notesList.refresh();
		this.application.viewport.setActiveItem(this.notesListContainer, {type: 'slide', direction: 'right' });
	},

	backToHome : function(btn, evt) {
		this.application.viewport.setActiveItem(this.notesListContainer, {type:'slide', direction:'right'});
	}
});

