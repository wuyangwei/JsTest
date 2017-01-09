/*
*	牌模型
*/

var Card = {};
micoo.Card = Card;

// 牌类型（花色）
Card.SUIT = { 
	Spade:0,	// 黑桃
	Heart:1,	// 红桃
	Club:2,		// 梅花
	Diamond:3	// 方块
};

// 牌点
Card.POINT = { 
	Three:0x0,
	Four:0x1,
	Five:0x2,
	Six:0x3,
	Seven:0x4,
	Eight:0x5,
	Nine:0x6,
	Ten:0x7,
	Jake:0x8,
	Queen:0x9,
	King:0xA,
	Ace:0xB,
	Two:0xC,
	Moon:0xD,
	Sun:0xE
};

/*
*	牌规则基类 - 所有的牌由rule生成
*/
Card.rule = cc.Class.extend({
	codes:[], // 一局牌的所有牌的编码
	ctor:function(codes) {
		this.codes = codes;
	},
	// @override
	code2suit:function(code) {
        return (code >> 4) & 0x3;
	},
	// @override
	code2point:function(code) {
        return code & 0xF;
	},
	// @override 生成牌的规则
	_card:function(code) {
		cc.error('rule._card not implement');
	},
	// @fimal
	createCard:function(code) {
		cc.assert(this.isLegal(code), code + " is not legal.");
		return this._card(code);
	},
	// @override
	isLegal:function(code) {
		return this.codes.indexOf(code) != -1;
	},
});

/*
*	扑克牌基类
*	@code	牌的唯一编号
*	@suit 	牌花色
*	@point	牌点子
*/
Card.base = cc.Class.extend({
	code:null,
	suit:null,
	point:null,
	// rule:null,
	ctor:function(code, rule){
		var self = this;
		// self.rule = rule;
		self.suit = rule.code2suit(code);
		self.point = rule.code2point(code);
	},
	isJoker:function() {
		return this.point == Card.POINT.Moon || this.point == Card.POINT.Sun;
	},
});