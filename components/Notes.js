import React from "react";
import Note from "./Note"
import Masonry from 'masonry-layout';

class Notes extends React.Component {
	componentDidMount () {
		let elem = document.querySelector('.notes');
		this.msnry = new Masonry( elem, {
			itemSelector: '.note',
			isFitWidth: true
		});
	}

	componentDidUpdate (prevProps) {
		if (this.props.notes.length !== prevProps.notes.length) {
			this.msnry.reloadItems();
			this.msnry.layout();
		}
	}

	render() {
		let removeNote = this.props.removeNote;
		let removeTag = this.props.removeTag;
		let editNote = this.props.editNote;
		let filterVisibleNotes = this.props.filterVisibleNotes;
		return (
			<div className="notes">
				{
					this.props.notes.filter((note) => {
						if (filterVisibleNotes === "all") {
							return note;
						}
						for (let i = 0; i < note.tag.length; i++) {
							if (note.tag[i] === filterVisibleNotes) {
								return note;
							}
						}
					}).map(function(note) {
						return <Note
									key={note.id}
									text={note.text}
									color={note.color}
									tag={note.tag}
									removeNote={removeNote.bind(null, note)}
									removeTag={removeTag.bind(null, note)}
									editNote={editNote.bind(null, note)}
							   />
					})
				}
			</div>
		)
	}
}

export default Notes;