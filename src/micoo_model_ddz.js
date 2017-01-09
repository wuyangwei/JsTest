/*
*   斗地主玩法
*/

var ddz = {};
micoo.ddz = ddz;

// 普通牌、癞子牌
ddz.CARD_KIND = {
	Normal:0,
	Laizi:1
};

ddz.rule = micoo.Card.rule.extend({
	ctor:function(codes) {
        micoo.Card.rule.prototype.ctor.call(this, codes);
	},
	// 普通、癞子
	code2kind:function(code) {
        return code > 0x3F ? ddz.CARD_KIND.Laizi : ddz.CARD_KIND.Normal;
	},
    // 癞子牌变化之后的点子
    code2pointDis:function(code) {
        return code > 0x3F ? code >> 6 : null;
	},
	// @override 生成牌
	_card:function(code) {
        return new ddz.card(code, this);
	},
	// @override
	isLegal:function(code) {
		return this.codes.indexOf(code & 0x3F) != -1;
	},
});

ddz.card = micoo.Card.base.extend({
	kind:null,
    pointDis:null, // 如果是
	ctor:function(code, rule){
        micoo.Card.base.prototype.ctor.call(this, code, rule);
		var self = this;
		self.kind = rule.code2kind(code);
        self.pointDis = rule.code2pointDis(code);
	},

	isLaizi:function() {
		return this.kind == ddz.CARD_KIND.Laizi;
	}
});

ddz.playModeBase = cc.Class.extend({
    rule:null,
    cards:null,
    codes:null,
    cgKinds:null, // 所有支持的牌型
    ctor:function(codes) {
        this.rule = new ddz.rule(codes);
        this.codes = codes;
        this.cards = [];
        for (var i = 0; i < codes.length; i++) {
            var c = new this.rule.createCard(codes[i]);
            this.cards.push(c);
        }
        this.cgKinds = {};
    },

    addCGKind:function(cgKind) {
        cc.asset(micoo.CardGroup.isCgType(cgKind), 'kind is not subobject of CardGroup.base');
        if (!this.cgKinds[cgKind.kindId]) {
            this.cgKinds[cgKind.kindId] = cgKind;
        }
    },
});