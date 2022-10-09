console.log("Hello plugin")

exports.onPostBuild = async ({ cache }) => {
	await cache.set(`key`, `value`)
	const cachedValue = await cache.get(`key`)
	console.log("cache", cachedValue) // logs `value`
}

// const { getPages } = require("./src/notion-api/get-pages")
// const { getNotionPageProperties } = require("./src/transformers/get-page-properties")
// const { getNotionPageTitle } = require("./src/transformers/get-page-title")

// const NOTION_NODE_TYPE = "Notion"

// exports.sourceNodes = async (
// 	{ actions, createContentDigest, createNodeId, reporter },
// 	{ token, databaseId },
// ) => {
// 	const pages = await getPages({ token, databaseId }, reporter)

// 	pages.forEach((page) => {
// 		const title = getNotionPageTitle(page)
// 		const properties = getNotionPageProperties(page)

// 		console.log("📝", title)

// 		actions.createNode({
// 			id: createNodeId(`${NOTION_NODE_TYPE}-${page.id}`),
// 			title,
// 			properties,
// 			archived: page.archived,
// 			createdAt: page.created_time,
// 			updatedAt: page.last_edited_time,
// 			raw: page,
// 			json: JSON.stringify(page),
// 			parent: null,
// 			children: [],
// 			internal: {
// 				type: NOTION_NODE_TYPE,
// 				mediaType: "application/json",
// 				content: JSON.stringify(page),
// 				contentDigest: createContentDigest(JSON.stringify(page)),
// 			},
// 		})
// 	})
// }
