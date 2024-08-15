// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt


frappe.query_reports["UAE VAT 201"] = {
	"filters": [
		{
			"fieldname": "company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"reqd": 1,
			"default": frappe.defaults.get_user_default("Company"),
			"on_change": function(query_report){
				query_report.set_filter_value('company_trn', []);
				query_report.refresh();
			}
		},
		{
			"fieldname": "from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"reqd": 1,
			"default": frappe.datetime.add_months(frappe.datetime.get_today(), -3),
		},
		{
			"fieldname": "to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"reqd": 1,
			"default": frappe.datetime.get_today()
		},
		{
			"fieldname": "payment_status",
			"label": __("Payment Status"),
			"fieldtype": "Select",
			"reqd": 0,
			"options": '\nPaid,Partly Paid\nPaid\nPartly Paid\nUnpaid\nUnpaid and Discounted'
		},
		{
			"fieldname": "company_trn",
			"label": __("Company TRN"),
			"fieldtype": "MultiSelectList",
			"options": "Address",
			"reqd": 0,
			"get_data": function(txt){
				if (frappe.query_report.get_filter_value('company')){
					return frappe.db.get_list("Address", {filters: {'is_your_company_address': 1},fields: ['custom_trn as value', 'custom_trn as label','custom_trn as description'], distinct: 1})
				}
			},
			on_change: function(query_report) {
				query_report.refresh();
			}
		}
	],
	"formatter": function(value, row, column, data, default_formatter) {
		if (data
			&& (data.legend=='VAT on Sales and All Other Outputs' || data.legend=='VAT on Expenses and All Other Inputs')
			&& data.legend==value) {
			value = $(`<span>${value}</span>`);
			var $value = $(value).css("font-weight", "bold");
			value = $value.wrap("<p></p>").parent().html();
		}
		return value;
	},
};
