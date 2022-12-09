module.exports = {
	async up(knex) {
		await knex.schema.createTable('redirects', (table) => {
			table.increments('id');
			table.integer('sort');
			table.boolean('active');
			table.boolean('regex');
			table.string('from');
			table.string('to');
		});

		await knex('directus_collections').insert([
			{
				collection: 'redirects',
				icon: 'airline_stops',
				note: null,
				display_template: null,
				hidden: 0,
				singleton: 0,
				translations: null,
				archive_field: null,
				archive_app_filter: 1,
				archive_value: null,
				unarchive_value: null,
				sort_field: 'sort',
				accountability: 'all',
				color: null,
				item_duplication_fields: null,
				sort: 14,
				group: null,
				collapse: 'open'
			},
		]);

		await knex('directus_fields').insert([
			{
				collection: 'redirects',
				field: 'id',
				special: null,
				interface: 'input',
				options: null,
				display: null,
				display_options: null,
				readonly: 1,
				hidden: 1,
				sort: 1,
				width: 'full',
				translations: null,
				note: null,
				conditions: null,
				required: 0,
				group: null,
				validation: null,
				validation_message: null
			},
			{
				collection: 'redirects',
				field: 'sort',
				special: null,
				interface: 'input',
				options: null,
				display: null,
				display_options: null,
				readonly: 0,
				hidden: 1,
				sort: 2,
				width: 'full',
				translations: null,
				note: null,
				conditions: null,
				required: 0,
				group: null,
				validation: null,
				validation_message: null
			},
			{
				collection: 'redirects',
				field: 'active',
				special: 'cast-boolean',
				interface: 'boolean',
				options: null,
				display: null,
				display_options: null,
				readonly: 0,
				hidden: 0,
				sort: 3,
				width: 'full',
				translations: null,
				note: null,
				conditions: null,
				required: 0,
				group: null,
				validation: null,
				validation_message: null
			},
			{
				collection: 'redirects',
				field: 'regex',
				special: 'cast-boolean',
				interface: 'boolean',
				options: null,
				display: null,
				display_options: null,
				readonly: 0,
				hidden: 0,
				sort: 4,
				width: 'full',
				translations: null,
				note: 'If this option is enabled, it is possible to enter a regex with the ECMAScript flavor in the "From" field.',
				conditions: null,
				required: 0,
				group: null,
				validation: null,
				validation_message: null
			},
			{
				collection: 'redirects',
				field: 'from',
				special: null,
				interface: 'input',
				options: '{"trim": true, "iconLeft": "insert_link", "placeholder": "/from/here"}',
				display: null,
				display_options: null,
				readonly: 0,
				hidden: 0,
				sort: 5,
				width: 'half',
				translations: '[{"language": "en-US", "translation": "From"}]',
				note: null,
				conditions: null,
				required: 1,
				group: null,
				validation: null,
				validation_message: null
			},
			{
				collection: 'redirects',
				field: 'to',
				special: null,
				interface: 'input',
				options: '{"trim": true, "iconLeft": "insert_link", "placeholder": "/to/here"}',
				display: null,
				display_options: null,
				readonly: 0,
				hidden: 0,
				sort: 6,
				width: 'half',
				translations: '[{"language": "en-US", "translation": "To"}]',
				note: null,
				conditions: null,
				required: 1,
				group: null,
				validation: null,
				validation_message: null
			},
			{
				collection: 'redirects',
				field: 'notice-owpzkj',
				special: 'alias,no-data',
				interface: 'presentation-notice',
				options: '{"text": "All URLs must start with a slash (/), and can only contain the characters a-z, A-Z, 0-9, -, _, Example: /events/2022_12_25-Christmas"}',
				display: null,
				display_options: null,
				readonly: 0,
				hidden: 0,
				sort: 7,
				width: 'full',
				translations: null,
				note: null,
				conditions: null,
				required: 0,
				group: null,
				validation: null,
				validation_message: null
			},
		]);
	},

	async down(knex) {
		await knex.schema.dropTable('redirects');
		await knex('directus_collections').where('collection', 'redirects').del()
		await knex('directus_fields').where('collection', 'redirects').del()
	},
};
