import React from "react";

class Settings extends React.Component {
	clickCollector() {
		this.props.switchModeSettings();
		this.props.deleteAllNotes();
	}

	render() {
		return (
			<div className="settings">
				<button onClick={this.clickCollector.bind(this)}>Delete all notes</button>
			</div>
		)
	}
}

export default Settings;