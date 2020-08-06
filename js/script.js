(function ($) {
	// Typed JS options
	const options = {
		strings: ['Note-Pad App.', 'take notes anywhere,','anytime...'],
		typeSpeed: 80,
		smartBackspace: true,
		loop: true,
		showCursor: false,
		backDelay: 700,
		fadeOut: true,
	  };

	  const typed = new Typed('.heading', options);

	// Initialize global array to store our notes
	let notesArray = [];

	// initialize variables to store our edited note and its index in the notesArray
	let editedNote;
	let editedNoteIndex;

	/** CREATE NOTES FUNCTION
	 * This function goes throuhg the list of notes in notesArray and add them to the HTML
	 * It will be used in the addNote and deleteNote functions.
	 */
	function displayNotes( array ) {
		$("#notes-display").html("");

		/**Add each note in the notesArray to the unordered list with id #notes-display
		 * Give each list item an id with the format id="note-<indexOf(note)>". 
				 E.g the first note <li id="0"> and so on.
		 */
		return array.forEach(function (note, index) {
			$("#notes-display").prepend(function () {
				return `<li id=${index} class="list-group-item d-flex justify-content-between align-items-center">
						<span class="note">${note}</span>
						<span class="badge badge-danger badge-pill delete">
								<i class="fas fa-trash-alt"></i>
						</span>
				</li>`;
			});
		});
	}

	$("#write-note").click(function (event) {
		event.preventDefault();

		const addedNote = $("textarea#note-content").val();

		if (addedNote !== '') {
			notesArray.push(addedNote);
		}

		// Show the notes in the HTML
		displayNotes(notesArray);

		//Clear the text area
		$("textarea#note-content").val("");
	});

	/** DELETE NOTE FUNCTION:
	 * This method is used since the HTML for the list of notes is dynamically generated
	 * We have to bind the click event to an already existing parent, in this case #notes-display
	 * Get the note's id from the <li> id attribute
	 * The note's id - 1 = the index of the note in the notesArray
	 * Use .splice() method to remove the note from the array 
	 */
	$('#notes-display').on('click', 'li > .delete', function () {
		const noteIndex = parseInt($(this).parent().attr('id'));

		// Delete the note from the noteArray
		notesArray.splice(noteIndex, 1);

		// clear the textarea
		$("#note-content").val("");
		
		//  Show the notes in the HTML
		displayNotes(notesArray);
	});

	/** EDIT NOTE FUNCTION:
	 * Disable the add note button and add an edit note button
	 * Get the note and the note index
	 * Display the note in the text area
	 * After editing the note, replace it into the notesArray using .splice() at its index
	 * .splice() can add new elements, replace an element or delete an element from an array*/ 
	$('#notes-display').on('click', 'li > .note', function () {
		// remove the add note button and replace it with the edit note button
		$('#display-add-button').html(``);
		$('#display-edit-button').html(`
			<button class="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded "
			type="button" id="edit-note">
				<i class="fas fa-pen"></i> Edit Note
			</button>
		`)

		// Get the content of the note
		const note = $(this).text();

		// Get the id of the note
		editedNoteIndex = parseInt($(this).parent().attr('id'));

		// Place the note content in the textarea
		$('#note-content').val(note);

		//The newly edited note
		editedNote = $('#note-content').val();

		console.log(editedNote, editedNoteIndex);
	});

	/** Bind the click event to the edit note button
		 * Add the edited note to the notesArray at its original index
		 */
		$("#display-edit-button").on('click', '#display-edit-button> #edit-note', function() {
			console.log('editing note');
			//replace the old note at its index 
		// notesArray.splice(noteIndex, 1, editedNote);
		// console.log(notesArray, editedNote)
		})

	
})(jQuery);
