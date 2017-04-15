import React from "react";
import colors from "./colors";

class AddNewNote extends React.Component {
	constructor() {
		super();

		this.state = {
			color: colors[0].color,
			text: "",
			tag: ""
		};
	}

	switchColor(currentColor) {
		this.setState({
			color: currentColor.color,
		});

		let newColorState = colors.filter((color) => {
			if(color.color === currentColor.color) {
				color.isSelected = true;
			} else {
				color.isSelected = false;
			}
		});
	}

	textareaCatcher(e) {
		if (e.target.className === "add-text") {
			this.setState({
				text: e.target.value
			});
		}
	}

	clickCollector() {
		this.addNote();
		this.props.switchModeNoteCreator();
	}

	addNote(e) {
		if (this.state.text.length === 0) {
			return null;
		}

		if (this.state.tag === [""]) {
			this.setState({
				tag: null
			});
		}

		let note = {
			text: this.state.text,
			color: this.state.color,
			tag: this.state.tag || null,
			id: Date.now()
		}

		this.props.addNewNote(note);
	}

	blurForTag(e) {
		let value = e.target.value;
		let array = [];

		array = value.split(",");
		this.setState({
			tag: array
		});
	}

	render() {
		return (
			<div className="add-new-note">
				<textarea
					className="add-text"
					placeholder="Add new notes"
					onChange={this.textareaCatcher.bind(this)}
				></textarea>
				<textarea
					className="add-tag"
					placeholder="Add tags (use comma to separate tags). E.g. 'home,work,shopping' "
					onChange={this.textareaCatcher.bind(this)}
					onBlur={this.blurForTag.bind(this)}
				></textarea>
				<div className="selection-for-colors">
					{
						colors.map((color) => {
							let backgroundColor = {
								backgroundColor: color.color
							}
							return (
								<span
									key={color.color}
									style={backgroundColor}
									onClick={this.switchColor.bind(this, color)}
								>
									{ color.isSelected ? <p></p> : null }
								</span>
							)
						})
					}
				</div>
				<button onClick={this.clickCollector.bind(this)} className="submit-button">Add</button>
			</div>
		)
	}
}

export default AddNewNote;