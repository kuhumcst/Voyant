var corpusList = new Ext.data.ArrayStore({
	fields: ['id', 'name'],
	data: [
	  ['1800talslyrik', "1800-talslyrik (adl.dk)"],
	  ['1800talsprosa_alfa', "1800-talsprosa (adl.dk) alfabetisk"],
	  ['1800talsprosa_kron', "1800-talsprosa (adl.dk) kronologisk"],
	  ['1800talsromaner', "1800-talsromaner (adl.dk)"],
	  ['brandes', "Brandes (dsl.dk)"],
	  ['engelskrenaessancesonnette', "Engelsk Ren&aelig;ssance Sonnette"],
	  ['grundtvig',"Grundtvig (test corpus)"],
	  ['hermanbang', "Herman Bang (adl.dk)"],
	  ['jvj',"Johannes V. Jensen (clarin.dk)"],
	  ['nielslyhne', "Niels Lyhne (adl.dk)"]
	]
});

Ext.define('Voyant.widget.CorpusSelector', {
    extend: 'Ext.form.field.ComboBox',
    mixins: ['Voyant.util.Localization', 'Voyant.util.Api'],
    alias: 'widget.corpusselector',
    statics: {
	    	i18n: {
	    	},
	    	api: {
	    		openMenu: undefined
	    	}
    },
    listeners: {
		select: function(el,type){}	
	},
    constructor: function(config) {
        config = config || {};
        
        // need to call here to get openMenu
		this.mixins['Voyant.util.Api'].constructor.apply(this, arguments);

		Ext.applyIf(this, {
    	    fieldLabel: this.localize('chooseCorpus'),
            labelWidth: 150,
            labelAlign: 'right',
            name:'corpus',
            queryMode:'local',
			displayField: 'name',
			valueField: 'id',
			editable: false,
				selectOnFocus: false,
			store: corpusList,
			tpl: Ext.create('Ext.XTemplate',
				'<ul class="x-list-plain"><tpl for=".">',
					'<li role="option" class="x-boundlist-item">{name}</li>',
				'</tpl></ul>'
			)
		});

		// check API and server option for open menu values
		if (this.getApiParam("openMenu")) {
			this.getStoreItemsFromDefinition(this.getApiParam("openMenu"));
		} else if (Voyant.application && Voyant.application.getOpenMenu && Voyant.application.getOpenMenu()) {
			var arg = Voyant.application.getOpenMenu();
			arg = decodeURIComponent(arg);
			arg = arg.replace(/\+/g,' ');
			if (arg.charAt(0)=='"' && arg.charAt(arg.length-1)=='"') {
				arg = arg.substring(1, arg.length-1);
			}
			this.getStoreItemsFromDefinition(arg);
		}

        this.callParent([config]);
    },

    initComponent: function(config) {
    	config = config || {};
        this.callParent([config]);
    },
    
    getStoreItemsFromDefinition: function(definition) {
	    	var data = [], items = definition.split(";");
	    	for (var i=0; i<items.length; i++) {
	    		var nameValue = items[i].split(":");
	    		if (nameValue[0]) {
	        		data.push([nameValue[0],nameValue[1] ? nameValue[1] : nameValue[0]]);
	    		}
	    	}
	    	return this.setStore(data);
    }
})