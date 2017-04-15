import React from "react";
import colors from "./colors";
import Main from "./Main";
import Sidebar from "./Sidebar";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import sizeMe from "react-sizeme";

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			notes: [
				{
					text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
					tag: ["lorem", "1500"],
					color: "#eddece",
					id: 1
				},
				{
					text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
					tag: ["lorem", "random"],
					color: "#ccd0d0",
					id: 2
				}
         	],
			isSidebarOpen: true,
			isNoteCreatorOpen: false,
			isSettingsOpen: false,
			filterVisibleNotes: "all",
			isTags: true,
			uniqueTagsArr: ["lorem", "1500", "random"]
		};
	}

	componentDidMount() {
		let localNotes = JSON.parse(localStorage.getItem("notes"));
		let localTags = JSON.parse(localStorage.getItem("tags"));
		let localuniqueTagsArr = JSON.parse(localStorage.getItem("uniqueTagsArr"));
		if (localNotes) {
			this.setState({
				notes: localNotes,
				isTags: localTags,
				uniqueTagsArr: localuniqueTagsArr
			});
		}
	}

	componentDidUpdate() {
		this._updateLocalStorage();
	}

	_updateLocalStorage() {
		let notes = JSON.stringify(this.state.notes);
		localStorage.setItem("notes", notes);
		let tags = JSON.stringify(this.state.isTags);
		localStorage.setItem("tags", tags);
		let uniqueTagsArr = JSON.stringify(this.state.uniqueTagsArr);
		localStorage.setItem("uniqueTagsArr", uniqueTagsArr);
	}

	switchModeSidebar() {
		this.setState({
			isSidebarOpen: !this.state.isSidebarOpen
		});

		if (document.body.clientWidth < 750) {
			let buttonColor = this.state.isSidebarOpen ? "#3a3b3d" : "#d1c2af";
			this.setState({
				buttonColor: buttonColor
			});
		}
	}

	switchModeNoteCreator() {
		this.setState({
			isNoteCreatorOpen: !this.state.isNoteCreatorOpen,
			buttonColor: "#3a3b3d"
		});
	}

	switchModeSettings() {
		this.setState({
			isSettingsOpen: !this.state.isSettingsOpen,
			buttonColor: "#3a3b3d"
		});
	}

	addNewNote(newNote) {
		let notes = this.state.notes;
		notes.unshift(newNote);

		this.isTagsCheck();

		this.setState({
			notes: notes
		});
	}

	isTagsCheck(newNotes) {
		let notes = newNotes || this.state.notes;
		let isTags = false;
		let tagsArr = [];
		for (let i = 0; i < notes.length; i++) {
			if (notes[i].tag === null) continue;
			else if (notes[i].tag.length === 0) continue;
			else {
				isTags = true;
				tagsArr.push(notes[i].tag);
			}
		}

		tagsArr = tagsArr.reduce(function(flat, current) { return flat.concat(current); }, [])
		let uniqueTagsArr = [...new Set(tagsArr)];

		// let uniqueTagsArr = tagsArr.filter((x, i, a) => a.indexOf(x) == i)

		this.setState({
			isTags: isTags,
			uniqueTagsArr: uniqueTagsArr
		});
	}

	removeNote(note) {
		let noteId = note.id;
		let newNotes = this.state.notes.filter(function(note) {
			return note.id !== noteId;
		});

		this.isTagsCheck(newNotes);

		this.setState({
			notes: newNotes
		});
	}

	removeTag(note, e) {
		let currentTag = e.target.parentNode.childNodes[2].textContent;

		let newNotes = this.state.notes.filter(function() {
			for (let i = 0; i < note.tag.length; i++) {
				if (note.tag[i] === currentTag) {
					note.tag.splice(i, 1);
				}
			}
			return note;
		});

		this.isTagsCheck();

		this.setState({
			notes: newNotes
		});
	}

	filterVisibleNotes(e) {
		this.setState({
			filterVisibleNotes: e,
			buttonColor: "#3a3b3d"
		});
	}

	showAllNotes() {
		this.setState({
			filterVisibleNotes: "all",
			buttonColor: "#3a3b3d"
		})
	}

	editNote(note, e) {
		let noteId = note.id;
		let newNotes = this.state.notes.filter((note) => {
			if (note.id === noteId) {
				if (e.target.className === "text-for-edit") {
					note.text = e.target.value;
				}
				if (e.target.className === "tag-for-edit") {
					let value = e.target.value;
					let array = [];

					array = value.split(",");

					note.tag = array;

					this.isTagsCheck();
				}

				if (e.target.parentElement.className === "selection-for-colors") {
					note.color = e.target.style.backgroundColor;
				}
			}

			return note;
		});

		this.setState({
			notes: newNotes
		});
	}

	deleteAllNotes() {
		this.setState({
			notes: []
		});

		this.setState({
			isTags: false,
			uniqueTagsArr: []
		})
	}

	shouldComponentUpdate() {
		const { width, height } = this.props.size;
		if (width < 750) {
			this.setState({
				isSidebarOpen: false
			});
		} else {
			this.setState({
				isSidebarOpen: true
			});
		}
		return true;
	}

	render() {
		return (
			<ReactCSSTransitionGroup
				className="wrap"
				component="div"
				transitionName="side-bar"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}
			>
				{
					this.state.isSidebarOpen ?
						<Sidebar
							isNoteCreatorOpen={this.state.isNoteCreatorOpen}
							switchModeNoteCreator={this.switchModeNoteCreator.bind(this)}
							switchModeSettings={this.switchModeSettings.bind(this)}
							isSettingsOpen={this.state.isSettingsOpen}
							notes={this.state.notes}
							isNoteCreatorOpen={this.state.isNoteCreatorOpen}
							filterVisibleNotes={this.filterVisibleNotes.bind(this)}
							stateVisibleNotes={this.state.filterVisibleNotes}
							showAllNotes={this.showAllNotes.bind(this)}
							isTags={this.state.isTags}
							uniqueTagsArr={this.state.uniqueTagsArr}
						/> : null
				}
				<Main
					switchModeSidebar={this.switchModeSidebar.bind(this)}
					switchModeSettings={this.switchModeSettings.bind(this)}
					isNoteCreatorOpen={this.state.isNoteCreatorOpen}
					isSettingsOpen={this.state.isSettingsOpen}
					isSidebarOpen={this.state.isSidebarOpen}
					switchModeNoteCreator={this.switchModeNoteCreator.bind(this)}
					addNewNote={this.addNewNote.bind(this)}
					removeNote={this.removeNote.bind(this)}
					removeTag={this.removeTag.bind(this)}
					editNote={this.editNote.bind(this)}
					notes={this.state.notes}
					filterVisibleNotes={this.state.filterVisibleNotes}
					deleteAllNotes={this.deleteAllNotes.bind(this)}
					buttonColor={this.state.buttonColor}
				/>
			</ReactCSSTransitionGroup>
		)
	}
}

export default sizeMe({ monitorHeight: true })(App);