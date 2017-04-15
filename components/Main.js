import React from "react";
import AddNewNote from "./AddNewNote";
import Notes from './Notes';
import Settings from './Settings';

class Main extends React.Component {
	render() {
		const style = {background: this.props.buttonColor};
		return (
			<div className={this.props.isSidebarOpen ? "main after" : "main"}>
				<div
					className="menu-button"
					onClick={this.props.switchModeSidebar}
				>
					<span style={style}></span>
					<span style={style}></span>
					<span style={style}></span>
				</div>
				{
					this.props.isSettingsOpen ?
						<Settings
							deleteAllNotes={this.props.deleteAllNotes}
							switchModeSettings={this.props.switchModeSettings}
						/> :
							this.props.isNoteCreatorOpen ?
								<AddNewNote
									switchModeNoteCreator={this.props.switchModeNoteCreator}
									addNewNote={this.props.addNewNote}
								/> : <Notes
										notes={this.props.notes}
										removeNote={this.props.removeNote}
										removeTag={this.props.removeTag}
										editNote={this.props.editNote}
										filterVisibleNotes={this.props.filterVisibleNotes}
									 />
				}
			</div>
		)
	}
}

export default Main;