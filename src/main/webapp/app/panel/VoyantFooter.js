Ext.define('Voyant.panel.VoyantFooter', {
	extend: 'Ext.container.Container',
	mixins: ['Voyant.panel.Panel'],
	alias: 'widget.voyantfooter',
    statics: {
    	i18n: {
    	}
    },
	height: 36,
	cls: 'x-tab-bar-default voyant-footer',
	listeners: {
		boxready: function(container, width, height) {
			var parts = [
				"<a href='https://voyant-tools.org/docs/' target='voyantdocs'>"+container.localize('voyantTools')+" Help</a> ",
				", <a href='http://stefansinclair.name/'>St&eacute;fan Sinclair</a> &amp; <a href='http://geoffreyrockwell.com'>Geoffrey Rockwell</a>",
				" (<a href='http://creativecommons.org/licenses/by/4.0/' target='_blank'><span class='cc'>c</span></a> "+ new Date().getFullYear() +")",
				" <a class='privacy' href='https://voyant-tools.org/docs/#!/guide/about-section-privacy-statement' target='top'>"+container.localize('privacy')+"</a>",
				" v. "+Voyant.application.getVersion() + (Voyant.application.getBuild() ? " ("+Voyant.application.getBuild()+")" : ""),
				"<div class=\"contact\">For any questions or issues regarding this custom Voyant Tools installation, please email us at <a href=\"mailto:info@clarin.dk\">info@clarin.dk</a></div>" 
			];
			var footer = '';
			var footerWidth = 0;
			var partWidth;
			var el = container.getEl();
			for (var i=0;i<parts.length;i++) {
				partWidth = el.getTextWidth(parts[i].replace(/data-qtip.+?-->/,">").replace(/<.+?>/g, ""));
				if (footerWidth+partWidth < width) {
					footer += parts[i];
					footerWidth += partWidth;
				}
			}
			container.update(footer);
        	Ext.tip.QuickTipManager.register({
                target: container.getTargetEl().dom.querySelector(".privacy"),
                text: this.localize('privacyMsg')
            });
		},
		beforedestroy: function(container) {
    		Ext.tip.QuickTipManager.unregister(container.getTargetEl().dom.querySelector(".privacy"));
    	}
	}
});
