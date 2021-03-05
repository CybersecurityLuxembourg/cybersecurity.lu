import React from "react";
import "./Tab.css";

export default class Tab extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: this.props.menu[0],
		};
	}

	render() {
		return (
			<div className="Tab max-sized-page">
				<div className={"row"}>
					<div className="col-md-2">
						<div className={"row"}>
							<div className="col-md-2">
								<div className="Tab-menu">
									{this.props.menu.map((m) => {
										if (m === null) {
											return (
												<div
													key={m}
													className={"Tab-menu-el-empty"}
												/>
											);
										}
										return (
											<div
												key={m}
												className={this.state.selectedMenu === m ? "Tab-menu-el Tab-menu-el-selected" : "Tab-menu-el"}
												onClick={() => this.setState({ selectedMenu: m })}>
												{ m }
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-10 Tab-content">
						{this.props.menu.indexOf(this.state.selectedMenu) >= 0
							? this.props.content[this.props.menu.indexOf(this.state.selectedMenu)]
							: ""}
					</div>
				</div>
			</div>
		);
	}
}
