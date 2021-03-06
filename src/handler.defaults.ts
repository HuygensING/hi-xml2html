const handlerDefaults: HandlerDefaults = {
	// Transformers
	change: {
		active: true,
		changeFunc: (el: Element) => el,
		selector: '',
		type: 'change',
	},
	exclude: {
		active: true,
		selector: [],
		type: 'exclude',
	},
	rename: {
		active: true,
		selector: '',
		renameFunc: () => '',
		type: 'rename',
	},
	replace: {
		active: true,
		removeSource: true,
		sourceSelectorFunc: () => '',
		targetSelector: '',
		type: 'replace',
	},
	select: {
		active: true,
		selector: '',
		type: 'select',
	},

	// Exporters
	xml: {
		active: true,
		type: 'xml'
	},
	data: {
		active: true,
		deep: true,
		text: true,
		type: 'data'
	},
	text: {
		active: true,
		join: ' ',
		type: 'text'
	},
	dom: {
		active: true,
		type: 'dom'
	}
}

export default handlerDefaults
