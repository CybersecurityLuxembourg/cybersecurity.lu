export default function getLeavesOfNode(analytics, taxonomyValues) {
	if (analytics === null
		|| analytics.taxonomy_values === undefined
		|| analytics.taxonomy_categories === undefined
		|| analytics.taxonomy_category_hierarchy === undefined
		|| analytics.taxonomy_value_hierarchy === undefined) {
		return null;
	}

	const valueIds = [...new Set(taxonomyValues.map((v) => v.id))];

	const childValueIds = analytics.taxonomy_value_hierarchy
		.filter((c) => valueIds.indexOf(c.parent_value) >= 0)
		.map((c) => c.child_value);

	if (childValueIds.length > 0) {
		const childValues = analytics.taxonomy_values
			.filter((v) => childValueIds.indexOf(v.id) >= 0);
		return getLeavesOfNode(analytics, childValues);
	}

	return taxonomyValues;
}
