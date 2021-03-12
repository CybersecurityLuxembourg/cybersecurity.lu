import React from "react";
import "./TreeTaxonomy.css";
import Tree from "react-d3-tree";

export default class TreeTaxonomy extends React.Component {
	constructor(props) {
		super(props);

		this.getChildCategories = this.getChildCategories.bind(this);
		this.getTreeData = this.getTreeData.bind(this);
		this.fillChildrenRecursively = this.fillChildrenRecursively.bind(this);
		this.getLevelsOfCategory = this.getLevelsOfCategory.bind(this);

		this.state = {
			activeClick: false,
		};
	}

	getChildCategories() {
		return this.props.taxonomy.categories
			.filter((c) => this.props.taxonomy.category_hierarchy
				.map((ch) => ch.parent_category).indexOf(c.name) < 0);
	}

	getTreeData(category) {
		const treeData = {
			name: "",
		};

		// Get levels of tree

		const levels = this.getLevelsOfCategory(category);

		// Build data structure

		treeData.children = this.fillChildrenRecursively(null, -1, levels);

		return [treeData];
	}

	fillChildrenRecursively(parent, parentLevel, levels) {
		if (parentLevel + 1 >= levels.length) return undefined;

		const childCategory = levels[parentLevel + 1];
		let childValues = this.props.taxonomy.values.filter((v) => v.category === childCategory);

		if (parent !== null) {
			childValues = childValues
				.filter((v) => this.props.taxonomy.value_hierarchy
					.filter((hv) => hv.parent_value === parent)
					.map((hv) => hv.child_value)
					.indexOf(v.id) >= 0);
		}

		const children = [];

		for (let i = 0; i < childValues.length; i++) {
			const child = {
				child_id: childValues[i].id,
				name: childValues[i].name,
				children: this.fillChildrenRecursively(childValues[i].id, parentLevel + 1, levels),
				leafLevel: levels.length,
			};

			if (parentLevel + 2 === levels.length) {
				let active;

				if (this.props.companyAssignment === null) {
					active = undefined;
				} else if (this.props.companyAssignment
					.filter((a) => a === childValues[i].id).length > 0) {
					active = true;
				} else {
					active = false;
				}

				child.active = active;
			}

			children.push(child);
		}

		return children;
	}

	getLevelsOfCategory(category) {
		let levels = [category];

		while (this.props.taxonomy.category_hierarchy
			.map((ch) => ch.child_category).indexOf(levels[0]) >= 0) {
			const link = this.props.taxonomy.category_hierarchy
			// eslint-disable-next-line no-loop-func
				.filter((ch) => ch.child_category === levels[0])[0];
			levels = [link.parent_category].concat(levels);
		}

		return levels;
	}

	static renderRectSvgNode({ nodeDatum }) {
		return (<g>
			<circle
				r="14"
				x="-10"
				stroke="lightgrey"
				fill={nodeDatum.active ? "#bcebff" : "#fed7da"}
			/>
			<text
				fill="black"
				strokeWidth="1"
				x="25"
				y="5"
			>
				{nodeDatum.name}
			</text>
		</g>);
	}

	render() {
		return (
			<div
				className="TreeTaxonomy"
				style={{
					height: 100 + 25 * this.props.taxonomy.values
						.filter((v) => v.category === this.props.category).length,
				}}>

				{!this.state.activeClick
					&& <div className={"TreeTaxonomy-cover"}/>
				}

				<div className={"TreeTaxonomy-button"}>
					{this.state.activeClick
						? <button
							className={"small-button"}
							onClick={() => this.setState({ activeClick: !this.state.activeClick })}>
							<i className="fas fa-lock-open"/>
						</button>
						: <button
							className={"small-button"}
							onClick={() => this.setState({ activeClick: !this.state.activeClick })}>
							<i className="fas fa-lock"/>
						</button>
					}
				</div>

				<Tree
					data={this.getTreeData(this.props.category)}
					zoom={0.8 - (0.05 * (this.getLevelsOfCategory(this.props.category).length - 1))}
					enableLegacyTransition={true}
					transitionDuration={0}
					translate={{
						x: 100,
						y: 50 + (25 * this.props.taxonomy.values
							.filter((v) => v.category === this.props.category).length) / 2,
					}}
					separation={{
						siblings: 0.24,
						nonSiblings: 0.3,
					}}
					nodeSize={{
						y: 140,
						x: 300,
					}}
					textLayout={{
						x: 20,
						y: 0,
						transform: "string",
					}}
					rootNodeClassName="TreeTaxonomy__root"
					branchNodeClassName="TreeTaxonomy__branch"
					leafNodeClassName="TreeTaxonomy__leaf"
					renderCustomNodeElement={TreeTaxonomy.renderRectSvgNode}
				/>
			</div>
		);
	}
}
