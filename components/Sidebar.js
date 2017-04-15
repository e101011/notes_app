import React from "react";
import SidebarTags from "./SidebarTags";

class Sidebar extends React.Component {
	isFilterActive() {
		if (this.props.stateVisibleNotes === "all") {
			return true;
		} else {
			let counter = 0;
			this.props.notes.map((note) => {
				note.tag.map((tag) => {
					if (tag === this.props.stateVisibleNotes) {
						counter++;
					}
				})
			});
			if (counter === this.props.notes.length) {
				return true;
			}
			return false;
		}
	}

	render() {
		let filterVisibleNotes = this.props.filterVisibleNotes;
		let uniqueTagsArr = this.props.uniqueTagsArr;
		return (
			<div className="side-bar">
				<div className="inner-wrap">
				{
					this.props.isSettingsOpen ? null :
						<div
							className="add-new-element"
							onClick={this.props.switchModeNoteCreator}
						>
							{
								this.props.isNoteCreatorOpen ?
									<p><span>&lt;</span>Back to notes</p>
								:
									<p><span>+</span>New note</p>
							}
						</div>
				}
				{
					!this.props.isTags || this.props.isNoteCreatorOpen || this.props.isSettingsOpen ? null :
					<div className="wrap-for-tags">
						<div className="tags">
							<ul>
								{
									uniqueTagsArr.map(function(tag) {
										return <SidebarTags
													key={tag}
													tag={tag}
													filterVisibleNotes={filterVisibleNotes.bind(null, tag)}
												/>
									})
								}

							</ul>
						</div>
						{
							this.isFilterActive() ? null :
								<div className="show-all-notes">
									<p onClick={this.props.showAllNotes}>Show all notes</p>
								</div>
						}
					</div>
				}
				{
					this.props.isNoteCreatorOpen ? null :
						<div className="settings-sidebar" onClick={this.props.switchModeSettings}>
							{
								this.props.isSettingsOpen ?
									<p><span>&lt;</span>Back to notes</p> :
									<p>Settings</p>
							}
						</div>
				}
				</div>
			</div>
		)
	}
}

export default Sidebar;