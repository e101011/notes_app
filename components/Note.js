import React from "react";
import colors from "./colors";
import Textarea from 'react-textarea-autosize';
import Masonry from 'masonry-layout';

class Note extends React.Component {
	constructor() {
		super();

		this.state = {
			isOptionsOpen: false,
			isEditorOpen: false,
		};
	}

	switchModeOptions() {
		this.setState({
			isOptionsOpen: !this.state.isOptionsOpen
		});
	}

	switchModeEditor() {
		this.setState({
			isEditorOpen: !this.state.isEditorOpen,
			isOptionsOpen: !this.state.isOptionsOpen
		});
	}

	closeEditor() {
		this.setState({
			isEditorOpen: false,
			isOptionsOpen: false
		});
	}

	controlTextareaHeigth(e) {
		let height = e.target.scrollHeight + "px";
		this.setState({
			textareaHeight: height
		});
	}

	componentDidMount () {
		let elem = document.querySelector('.notes');
		this.msnry = new Masonry( elem, {
			itemSelector: '.note',
			isFitWidth: true
		});
	}

	componentDidUpdate () {
		let a = setTimeout(() => {
			this.msnry.reloadItems();
			this.msnry.layout();
		}, 0);
	}

	render() {
		let buttonColor = this.state.isOptionsOpen ? "#d1c2af" : "#3a3b3d";
		return (
			<div className="note" style={{backgroundColor: this.props.color}}>
				<button
					className="settings-button"
					onClick={this.switchModeOptions.bind(this)}
					style={{color: buttonColor}}
				>...</button>
				{
					this.state.isOptionsOpen ?
						<div className="options">
							<button onClick={this.props.removeNote}>Delete</button>
							<button onClick={this.switchModeEditor.bind(this)}>Edit</button>
						</div>
					: null
				}

				{
					this.state.isEditorOpen ?
						<div className="editor">
							<Textarea
								defaultValue={this.props.text}
								onChange={this.props.editNote}
								style={{height: this.state.textareaHeight}}
								className="text-for-edit"
							/>
							{
								this.props.tag ?
									<Textarea
										defaultValue={this.props.tag}
										onChange={this.props.editNote}
										className="tag-for-edit"
									/>
									: <Textarea
										placeholder="Type tag"
										onChange={this.props.editNote}
										className="tag-for-edit"
									/>
							}
							<div className="selection-for-colors">
								{
									colors.map((color, i) => {
										let backgroundColor = {
											backgroundColor: color.color
										}
										return (
											<span key={i} onClick={this.props.editNote} style={backgroundColor}></span>
										)
									})
								}
							</div>
							<button className="edit-button" onClick={this.closeEditor.bind(this)}>Done</button>
						</div>
						: <p>{this.props.text}</p>
				}
				<div className="wrap-for-tags">
				{
					(this.props.tag && !this.state.isEditorOpen) ?
						this.props.tag.map((tag, i) => {
								return (
									<span key={i} className="tag">
									<button onClick={this.props.removeTag}>x</button>
										{tag}
									</span>
								)
						}) : null
				}
				</div>
			</div>
		)
	}
}

export default Note;