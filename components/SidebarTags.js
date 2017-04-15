import React from "react";

class SidebarTags extends React.Component {
	render() {
		return (
			<div>
				<li onClick={this.props.filterVisibleNotes}>
					{this.props.tag}
				</li>
			</div>
		)
	}
}

export default SidebarTags;